import { parse } from "node-html-parser";
import HTMLElement, { Attributes } from "node-html-parser/dist/nodes/html";

import { ERRORS, VALID_FEED_ATTRIBUTES } from "./constants.js";
import {
  GetResult,
  GetResultResponse,
  ValidateRelevantNodeResult,
  ValidateResult,
} from "./types.js";
import { Node, NodeType } from "node-html-parser";

/* ################ */
/* Generic helpers */
/* ############### */

function isValidHttpUrl(urlAttempt: string): boolean {
  try {
    const newUrl = new URL(urlAttempt);
    return newUrl.protocol === "http:" || newUrl.protocol === "https:";
  } catch (err) {
    return false;
  }
}

/* ############ */
/* Get helpers */
/* ########### */

function isValidLinkTag(linkTag: Attributes): boolean {
  return VALID_FEED_ATTRIBUTES.some((values) =>
    Object.keys(values).every(
      (attribute) => linkTag[attribute] === values[attribute]
    )
  );
}

function processResult({ err, href }: GetResult): GetResultResponse {
  if (err || !href) {
    return { success: false, error: err };
  }
  return { success: true, href };
}

function isRSSLink(anchorHref: string): boolean {
  return anchorHref.endsWith(".rss") || anchorHref.endsWith(".rss/");
}

/* ################# */
/* Validate helpers */
/* ################# */

function findRelevantNode(
  el: HTMLElement,
  rawTag: string
): ValidateRelevantNodeResult {
  let response: ValidateRelevantNodeResult = { success: false };

  if (el?.rawTagName === rawTag) {
    response = { success: true, result: el };
  }

  let i = 0;
  const relevantChilds: Node[] = el?.childNodes.filter(
    (child: Node) => child.nodeType === NodeType.ELEMENT_NODE
  );
  while (!response.success && i < relevantChilds.length) {
    response = findRelevantNode(relevantChilds[i] as HTMLElement, rawTag);
    i += 1;
  }

  return response;
}

function getListByType(container: HTMLElement, type: string): string[] {
  let items: string[] = [];
  const itemsList = findRelevantNode(container, type);

  itemsList.result?.childNodes.forEach((item) => {
    if (item.nodeType === NodeType.ELEMENT_NODE) {
      // get type
      const child = findRelevantNode(item as HTMLElement, "type");

      // get type content
      if (child.result?.childNodes.length) {
        items.push(child.result?.childNodes[0].rawText);
      }
    }
  });

  return items;
}

function parseValidatorResponse(body: string): ValidateResult {
  if (body) {
    let isValid = false;
    const res = parse(body);

    const container = res.getElementsByTagName("env:Envelope");

    if (container[0]) {
      // get validity
      const feedValidity = findRelevantNode(container[0], "m:validity");
      if (feedValidity.result?.childNodes.length) {
        isValid = feedValidity.result.childNodes[0].rawText === "true";
      }

      // get errors, warnings, info
      const errorsList = getListByType(container[0], "m:errorlist");
      const warningsList = getListByType(container[0], "m:warninglist");
      const infoList = getListByType(container[0], "m:infolist");

      return { isValid, errorsList, warningsList, infoList };
    }
    return { isValid: false, errorsList: [ERRORS.parsing_error] };
  }
  return { isValid: false, errorsList: [ERRORS.parsing_error] };
}

export {
  isValidLinkTag,
  processResult,
  isRSSLink,
  isValidHttpUrl,
  parseValidatorResponse,
};
