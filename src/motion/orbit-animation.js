// Keep the original CSS timelines together and pause them while out of view.
export function mountOrbitAnimation(scene) {
  if (!scene) return () => {};
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  const update = () => {
    scene.classList.toggle('has-orbit-motion', !reduced.matches);
    scene.classList.toggle('is-orbit-active', visible && !document.hidden && !reduced.matches);
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    update();
  }, {threshold: 0});
  observer.observe(scene);
  reduced.addEventListener('change', update);
  document.addEventListener('visibilitychange', update);
  update();
  return () => {
    observer.disconnect();
    reduced.removeEventListener('change', update);
    document.removeEventListener('visibilitychange', update);
    scene.classList.remove('has-orbit-motion', 'is-orbit-active');
  };
}
