import got from "got";
import { parse } from "node-html-parser";

import { ERRORS } from "./constants.js";
import {
  processResult,
  isValidLinkTag,
  isRSSLink,
  isValidHttpUrl,
} from "./helpers.js";
import { GetResultResponse } from "./types.js";

export async function getFeedLink(link: string): Promise<GetResultResponse> {
  if (isValidHttpUrl(link)) {
    try {
      const res = await got(link);
      const root = parse(res.body);

      const linkTags = root.querySelectorAll("link");
      let href =
        linkTags.find((linkTag) => isValidLinkTag(linkTag?.attrs))?.attrs
          ?.href || null;

      // if no href found, try to find an anchor link that points to rss
      if (!href) {
        const anchorTags = root.querySelectorAll("a");
        href =
          anchorTags.find((anchor) => isRSSLink(anchor?.attrs?.href))?.attrs
            ?.href || null;
      }

      const payload = (href && { href }) || { err: ERRORS.no_feed };

      return processResult(payload);
    } catch (err) {
      return processResult({ err: err.code || ERRORS.invalid });
    }
  }

  return processResult({ err: ERRORS.invalid_url });
}
