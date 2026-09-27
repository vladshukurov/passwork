// Trusted Isoform exports: keep complete objects and their painter order, but
// drop the standalone <svg> wrapper and <title> so the page shows no tooltip.
export const isoformMarkup = source => source
  .replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/<title>[\s\S]*?<\/title>/, '');
