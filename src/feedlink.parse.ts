import Parser, { ParserOptions } from "rss-parser";

import { ERRORS } from "./constants.js";
import { isValidHttpUrl } from "./helpers.js";
import { ParseResult } from "./types.js";

export async function parseFeed(
  input: string,
  options?: ParserOptions<{ [key: string]: any }, { [key: string]: any }>
): Promise<ParseResult> {
  const parser: Parser = new Parser(options);

  try {
    const parserFn = isValidHttpUrl(input)
      ? parser.parseURL(input)
      : parser.parseString(input);

    const feed = await parserFn;

    return { success: true, result: feed };
  } catch (err) {
    return { success: false, error: ERRORS.parsing_error };
  }
}
