import { nanoid } from "nanoid";

export const generateShortUrl = (length) => {
  return nanoid(length);
}