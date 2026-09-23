// Pure scroll calculations shared by the pinned security scene and its tests.
export const clamp01 = value => Math.min(1, Math.max(0, value));

export function pinnedProgress(trackTop, trackHeight, viewportHeight) {
  const travel = Math.max(1, trackHeight - viewportHeight);
  return clamp01(-trackTop / travel);
}

export function chapterAt(progress, chapterCount) {
  const scaled = clamp01(progress) * chapterCount;
  const index = Math.min(chapterCount - 1, Math.floor(scaled));
  return { index, progress: clamp01(scaled - index) };
}

export function chapterScrollTop(trackTop, trackHeight, viewportHeight, index, chapterCount) {
  const travel = Math.max(1, trackHeight - viewportHeight);
  return trackTop + travel * ((index + .015) / chapterCount);
}
