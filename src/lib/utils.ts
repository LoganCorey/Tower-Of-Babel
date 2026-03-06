// Utility functions
let seed = 6;

/**
 * A simple linear congruential generator (LCG) for seeded random number generation.
 * This ensures that the sequence of "random" numbers is deterministic if the seed is known.
 * Uses specific parameters (multiplier, increment, modulus) for the LCG algorithm to ensure repeatable results.
 */
export const seededRandom = (min: number = 0, max: number = 1): number => {
  const LCG_MULTIPLIER = 9301;
  const LCG_INCREMENT = 49297;
  const LCG_MODULUS = 233280;

  seed = (seed * LCG_MULTIPLIER + LCG_INCREMENT) % LCG_MODULUS;
  const rnd = seed / LCG_MODULUS;
  return min + rnd * (max - min);
};

export const hashCode = (s: string): number => {
  let hash = 0;
  if (s.length === 0) return hash;
  for (let i = 0; i < s.length; i++) {
    const chr = s.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return hash;
};

export const pad = (s: string, size: number): string => {
  while (s.length < size) s = '0' + s;
  return s;
};

/**
 * A proper modulo function that always returns a non-negative result.
 * The native JavaScript remainder operator (%) can return negative numbers,
 * which is not suitable for cryptographic or array-wrapping logic.
 * For example, mod(-1, 10) will return 9, whereas -1 % 10 is -1.
 */
export const mod = (n: number, m: number): number => {
  return ((n % m) + m) % m;
};

export const setSeed = (newSeed: number) => {
  seed = newSeed;
}
