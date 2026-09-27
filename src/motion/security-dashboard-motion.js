// Shared entrance for Passwork's code and infrastructure screens.

// The whole card is readable within ~0.6s; only the code keeps typing after.
// (It used to play at half speed, so the card sat empty for seconds.)
const tempo = value => value * .25;
const easing = 'cubic-bezier(.22, 1, .36, 1)';
const playbackRate = 1;
const CHAR_DESCRIPTION = 6, CHAR_CODE = 4;

export function mountSecurityDashboardMotion(card) {
  if (!card) return null;
  const description = card.querySelector(':scope > p');
  const code = card.querySelector('pre');
  const rows = [...card.querySelectorAll('.check-row')];
  const definitions = [
    [card, 0, 360, 16, 2.5],
    [card.querySelector('.check-heading'), 80, 360, 8, 2],
    [description, 140, 360, 8, 2],
    [rows[0], 260, 360, 8, 2],
    [rows[1], 340, 360, 8, 2],
    [card.querySelector('.protection-code'), 420, 360, 8, 2],
    ...[...card.querySelectorAll('[data-motion-at]')].map(element => [element, tempo(Number(element.dataset.motionAt)), 400, 8, 2]),
  ];
  if (!description || definitions.some(([element]) => !element)) return null;

  // Reserve the complete sentence's geometry while streaming its visible copy.
  const sentence = description.textContent;
  const reserve = document.createElement('span');
  reserve.className = 'forecast-copy-reserve';
  reserve.textContent = sentence;
  const stream = document.createElement('span');
  stream.className = 'forecast-copy-stream';
  description.replaceChildren(reserve, stream);
  description.classList.add('forecast-copy');

  const tokens = [];
  if (code) {
    const walker = document.createTreeWalker(code, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) tokens.push({node, text: node.textContent});
  }
  const codeLength = tokens.reduce((length, token) => length + token.text.length, 0);
  const descriptionStart = 140;
  const codeStart = 520;
  const finish = Math.max(codeStart + codeLength * CHAR_CODE, descriptionStart + sentence.length * CHAR_DESCRIPTION, ...definitions.map(([, delay, duration]) => delay + duration));
  const animations = definitions.map(([element, delay, duration, y]) => {
    // The card's CSS transform centers it in the stage; animating transform here
    // would replace that centering for the entire lifetime of a filled animation.
    const keyframes = element === card
      ? [{opacity: 0}, {opacity: 1}]
      : [{opacity: 0, transform: `translateY(${y}px)`}, {opacity: 1, transform: 'translateY(0)'}];
    const animation = element.animate(keyframes, {delay, duration, easing, fill: 'both'});
    animation.pause();
    return animation;
  });
  let elapsed = 0;
  let previous = 0;
  let frame = 0;
  let selected = false;
  let visible = false;
  let reduced = false;
  let lastSentenceLength = -1;
  let lastCodeLength = -1;

  function render() {
    const time = reduced ? finish : elapsed;
    animations.forEach(animation => { animation.currentTime = time; });
    const typedSentence = Math.max(0, Math.min(sentence.length, Math.round((time - descriptionStart) / CHAR_DESCRIPTION)));
    if (typedSentence !== lastSentenceLength) {
      stream.textContent = sentence.slice(0, typedSentence);
      lastSentenceLength = typedSentence;
    }
    const typedCode = Math.max(0, Math.min(codeLength, Math.round((time - codeStart) / CHAR_CODE)));
    if (typedCode !== lastCodeLength) {
      let remaining = typedCode;
      for (const token of tokens) {
        token.node.textContent = token.text.slice(0, Math.max(0, remaining));
        remaining -= token.text.length;
      }
      lastCodeLength = typedCode;
    }
    card.dataset.motionState = time >= finish ? 'complete' : time >= codeStart ? (code ? 'code' : 'diagram') : time >= descriptionStart ? 'checks' : 'entrance';
  }
  function tick(now) {
    frame = 0;
    elapsed = Math.min(finish, elapsed + (previous ? Math.min(80, now - previous) * playbackRate : 0));
    previous = now;
    render();
    if (elapsed < finish) frame = requestAnimationFrame(tick);
  }
  function sync() {
    const playing = selected && visible && !reduced && elapsed < finish;
    if (playing && !frame) { previous = 0; frame = requestAnimationFrame(tick); }
    if (!playing) { cancelAnimationFrame(frame); frame = 0; previous = 0; }
  }
  render();
  return {
    select(next) {
      if (next && !selected) { elapsed = 0; previous = 0; render(); }
      selected = next;
      sync();
    },
    setPlayback(inView, reduce) {
      visible = inView;
      reduced = reduce;
      render();
      sync();
    },
    destroy() {
      cancelAnimationFrame(frame);
      animations.forEach(animation => animation.cancel());
      description.classList.remove('forecast-copy');
      description.textContent = sentence;
      tokens.forEach(token => { token.node.textContent = token.text; });
      delete card.dataset.motionState;
    },
  };
}
