// Roving-tabindex keyboard support for a WAI-ARIA tab list.
export function tabKeyHandler(count, select) {
  return (event, index) => {
    const next = {
      ArrowRight: (index + 1) % count,
      ArrowLeft: (index - 1 + count) % count,
      Home: 0,
      End: count - 1,
    }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    select(next);
    event.currentTarget.parentElement.children[next]?.focus();
  };
}
