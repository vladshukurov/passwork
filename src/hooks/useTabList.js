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

// Scroll a tab row horizontally so the chosen tab is fully visible
// (tab rows scroll sideways on phones). Never scrolls the page.
export function revealTab(button) {
  const row = button?.parentElement;
  if (!row || row.scrollWidth <= row.clientWidth) return;
  const left = button.offsetLeft - 16;
  const right = button.offsetLeft + button.offsetWidth + 44 - row.clientWidth;
  const target = row.scrollLeft > left ? left : row.scrollLeft < right ? right : row.scrollLeft;
  row.scrollTo({ left: target, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}
