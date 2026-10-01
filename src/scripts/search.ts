/**
 * Search-key normalisation shared by build time (palette index) and the client.
 * Lower-cases, folds Latin accents (ARÓM → arom) and strips separators so that
 * "nextjs", "next js" and "Next.js" all match each other.
 */
const SEPARATORS = /[\s.\-_/\\·•—–,:;()[\]'"’+&|]+/g;
const COMBINING = /[̀-ͯ]/g;

export function normalize(value: string): string {
  return value.toLowerCase().normalize('NFKD').replace(COMBINING, '').replace(SEPARATORS, '');
}

/** Split a raw query into normalised tokens (whitespace-separated words). */
export function tokens(query: string): string[] {
  return query
    .trim()
    .split(/\s+/)
    .map(normalize)
    .filter(Boolean);
}
