import { describe, it, expect } from 'vitest';
import { seededRandom, hashCode, pad, mod, setSeed } from './utils';

describe('utils', () => {
  describe('seededRandom', () => {
    it('should return a deterministic random number', () => {
      setSeed(123);
      const rand1 = seededRandom();
      setSeed(123);
      const rand2 = seededRandom();
      expect(rand1).toBe(rand2);
    });

    it('should return a number within the specified range', () => {
      setSeed(456);
      const rand = seededRandom(10, 20);
      expect(rand).toBeGreaterThanOrEqual(10);
      expect(rand).toBeLessThan(20);
    });
  });

  describe('hashCode', () => {
    it('should return a hash code for a string', () => {
      expect(hashCode('hello world')).toBe(1794106052);
    });

    it('should return 0 for an empty string', () => {
      expect(hashCode('')).toBe(0);
    });
  });

  describe('pad', () => {
    it('should pad a string with leading zeros', () => {
      expect(pad('123', 5)).toBe('00123');
    });

    it('should not pad a string that is already the correct size', () => {
      expect(pad('12345', 5)).toBe('12345');
    });

  it('should not pad a string that is larger than the size', () => {
    expect(pad('123456', 5)).toBe('123456');
  });
  });

  describe('mod', () => {
    it('should return the correct modulus for positive numbers', () => {
      expect(mod(10, 3)).toBe(1);
    });

    it('should return the correct modulus for negative numbers', () => {
      expect(mod(-10, 3)).toBe(2);
    });
  });

  describe('setSeed', () => {
    it('should reset the seed', () => {
      setSeed(1);
      const rand1 = seededRandom();
      setSeed(1);
      const rand2 = seededRandom();
      expect(rand1).toEqual(rand2);
    });
  });
});
