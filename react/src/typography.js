const shortWords = /(^|[ («„\u00a0])(в|во|к|ко|с|со|у|о|об|обо|от|до|по|за|из|на|над|под|при|для|без|и|а|но) (?=\S)/giu;

/** Keep Russian service words with the word they introduce, without changing the copy. */
export function tidyCopy(value) {
  if (typeof value !== 'string') return value;
  let result = value;
  let previous;
  do {
    previous = result;
    result = result.replace(shortWords, '$1$2\u00a0');
  } while (result !== previous);
  return result.replace(/отечественного ПО/g, 'отечественного\u00a0ПО');
}
