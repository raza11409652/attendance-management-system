import * as bcrypt from "bcrypt";
const SALT_ROUND = 10;
/**
 * Generate bcrypt hash
 * @param password
 * @returns
 */
export const generateBcryptHash = (password: string) => {
  const salt = bcrypt.genSaltSync(SALT_ROUND);
  return bcrypt.hashSync(password, salt);
};
/**
 * Compare bcrypt Hash and text
 * @param hash
 * @param text
 * @returns
 */
export const compareBcryptHash = (hash: string, text: string) => {
  return bcrypt.compareSync(text, hash);
};
