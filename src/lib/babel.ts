import { LENGTH_OF_PAGE, LENGTH_OF_TITLE, AN, DIGS, TOTAL_PAGES } from './constants';
import { seededRandom, hashCode, pad, mod, setSeed } from './utils';

// Library of Babel functions

/**
 * Searches for a given string within the Library of Babel.
 * It generates a pseudo-random, but deterministic, location (address) for any given string.
 * The process involves hashing the search string to create a seed, generating a location,
 * and then creating an "encrypted" hex string that represents the original search string
 * at that location.
 * @param searchStr The string to search for.
 * @returns A Babel address string in the format "hex:wall:shelf:volume:page".
 */
export const search = (searchStr: string): string => {
  // 1. Seed the random number generator with the hash of the search string.
  setSeed(Math.abs(hashCode(searchStr)));

  // 2. Generate a random location (wall, shelf, volume, page).
  const wall = String(Math.floor(seededRandom(1, 4)));
  const shelf = String(Math.floor(seededRandom(1, 5)));
  const volume = pad(String(Math.floor(seededRandom(1, 32))), 2);
  const page = pad(String(Math.floor(seededRandom(1, TOTAL_PAGES))), 3);

  // 3. Create a hash from the location. This will be used to encrypt the text.
  const locHash = hashCode(wall + shelf + volume + page);

  let hex = '';
  // 4. Randomly pad the beginning of the search string to simulate finding it at a random depth on the page.
  const depth = Math.floor(seededRandom(0, LENGTH_OF_PAGE - searchStr.length));

  for (let x = 0; x < depth; x++) {
    searchStr = DIGS[Math.floor(seededRandom(0, DIGS.length))] + searchStr;
  }

  // 5. Re-seed with the location hash to perform the "encryption".
  setSeed(Math.abs(locHash));

  // 6. "Encrypt" the padded search string into a hex value.
  // This process is reversible if you know the location (and thus the locHash seed).
  for (let i = 0; i < searchStr.length; i++) {
    const index = DIGS.indexOf(searchStr[i]);
    const rand = seededRandom(0, DIGS.length);
    const newIndex = mod(index + Math.floor(rand), AN.length);
    const newChar = AN[newIndex];
    hex += newChar;
  }

  return `${hex}:${wall}:${shelf}:${parseInt(volume)}:${parseInt(page)}`;
};

/**
 * Retrieves the full text of a page from a given Babel address.
 * This function reverses the "encryption" process done by the search function.
 * It uses the location part of the address to generate the same seed used
 * for encryption, allowing it to "decrypt" the hex string back to the original text.
 * @param address The Babel address string (hex:wall:shelf:volume:page).
 * @returns The full text of the page.
 */
export const getPage = (address: string): string => {
  const addressArray = address.split(':');
  const hex = addressArray[0];
  // 1. Re-create the location hash from the address.
  const locHash = hashCode(
    addressArray[1] + addressArray[2] +
    pad(addressArray[3], 2) + pad(addressArray[4], 3)
  );

  // 2. Seed with the location hash to start decryption.
  setSeed(Math.abs(locHash));
  let result = '';

  // 3. "Decrypt" the hex string into the original (padded) search result.
  for (let i = 0; i < hex.length; i++) {
    const index = AN.indexOf(hex[i]);
    const rand = seededRandom(0, AN.length);
    const newIndex = mod(index - Math.floor(rand), DIGS.length);
    const newChar = DIGS[newIndex];
    result += newChar;
  }

  // 4. Re-seed with the hash of the decrypted text.
  setSeed(Math.abs(hashCode(result)));

  // 5. Fill the rest of the page with pseudo-random characters.
  while (result.length < LENGTH_OF_PAGE) {
    const index = Math.floor(seededRandom(0, DIGS.length));
    result += DIGS[index];
  }

  // The original text was padded at the beginning, so we take the end of the generated string.
  return result.slice(-LENGTH_OF_PAGE);
};

/**
 * Retrieves the title of a book from a given Babel address.
 * The logic is very similar to getPage, but it uses a slightly different
 * hashing convention for titles (a hardcoded '4') and a different length.
 * @param address The Babel address string (hex:wall:shelf:volume:page).
 * @returns The title of the book.
 */
export const getTitle = (address: string): string => {
  const addressArray = address.split(':');
  const hex = addressArray[0];
  // Note the '4' used here, a convention to distinguish titles.
  const locHash = hashCode(
    addressArray[1] + addressArray[2] + pad(addressArray[3], 2) + '4'
  );

  setSeed(Math.abs(locHash));
  let result = '';

  for (let i = 0; i < hex.length; i++) {
    const index = AN.indexOf(hex[i]);
    const rand = seededRandom(0, AN.length);
    const newIndex = mod(index - Math.floor(rand), DIGS.length);
    const newChar = DIGS[newIndex];
    result += newChar;
  }

  setSeed(Math.abs(hashCode(result)));

  while (result.length < LENGTH_OF_TITLE) {
    const index = Math.floor(seededRandom(0, DIGS.length));
    result += DIGS[index];
  }

  return result.slice(-LENGTH_OF_TITLE);
};

/**
 * Searches for a book title within the Library of Babel.
 * This is analogous to the `search` function but specifically for titles.
 * It uses the title-specific hashing convention (a hardcoded '4').
 * @param searchStr The title string to search for.
 * @returns A Babel address for the book in the format "hex:wall:shelf:volume".
 */
export const searchTitle = (searchStr: string): string => {
  setSeed(Math.abs(hashCode(searchStr)));
  const wall = String(Math.floor(seededRandom(1, 4)));
  const shelf = String(Math.floor(seededRandom(1, 5)));
  const volume = pad(String(Math.floor(seededRandom(1, 32))), 2);
  // Note the '4' used here, a convention to distinguish titles.
  const locHash = hashCode(wall + shelf + volume + '4');

  let hex = '';
  let titleStr = searchStr.slice(0, LENGTH_OF_TITLE);

  // Pad the title string with spaces to the required length.
  while (titleStr.length < LENGTH_OF_TITLE) {
    titleStr += ' ';
  }

  setSeed(Math.abs(locHash));

  for (let i = 0; i < titleStr.length; i++) {
    const index = DIGS.indexOf(titleStr[i]);
    const rand = seededRandom(0, DIGS.length);
    const newIndex = mod(index + Math.floor(rand), AN.length);
    const newChar = AN[newIndex];
    hex += newChar;
  }

  return `${hex}:${wall}:${shelf}:${parseInt(volume)}`;
};
