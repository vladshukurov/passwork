export function featureProgress(rect, viewportHeight) {
  const marker = Math.min(viewportHeight * .42, 360);
  // The chapter is finished when its bottom reaches the lower visible area,
  // not when it has disappeared past the navigation's activation marker.
  const finishLine = viewportHeight * .85;
  const travel = Math.max(1, rect.height - (finishLine - marker));
  return Math.max(0, Math.min(1, (marker - rect.top) / travel));
}
