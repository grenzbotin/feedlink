import { Attributes } from "node-html-parser/dist/nodes/html";

import { VALID_FEED_ATTRIBUTES } from "./constants.js";
import { Result, ResultResponse } from "./types.js";

function isValidLinkTag(linkTag: Attributes): boolean {
  return VALID_FEED_ATTRIBUTES.some((values) =>
    Object.keys(values).every(
      (attribute) => linkTag[attribute] === values[attribute]
    )
  );
}

function processResult({ err, href }: Result): ResultResponse {
  if (err || !href) {
    return { success: false, err };
  }
  return { success: true, href };
}

function isRSSLink(anchorHref: string): boolean {
  return anchorHref.endsWith(".rss") || anchorHref.endsWith(".rss/");
}

export { isValidLinkTag, processResult, isRSSLink };
