// One continuous scale: its final stop requests a quote for teams above 100.

export function peopleAtProgress(progress) {
  const value = Math.max(0, Math.min(1000, Number(progress) || 0));
  return Math.round(1 + value * 99 / 1000);
}

export function progressAtPeople(people) {
  const value = Math.max(1, Math.min(100, Number(people) || 1));
  return Math.round((value - 1) * 1000 / 99);
}
