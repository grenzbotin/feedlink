import test from "ava";

import {
  isRSSLink,
  isValidHttpUrl,
  isValidLinkTag,
  processResult,
} from "../src/helpers.js";
import { ERRORS, VALID_FEED_ATTRIBUTES } from "../src/constants.js";
import {
  INVALID_FEED_ATTRIBUTES,
  RSS_LINK_MOCKS,
  URL_MOCKS,
} from "./mockData.js";

INVALID_FEED_ATTRIBUTES.forEach((attributes) => {
  test(`helpers/isValidLinkTag: "${attributes.type}" (rel: "${attributes?.rel}") should return false`, (t) => {
    const result = isValidLinkTag(attributes);
    t.false(result);
  });
});

VALID_FEED_ATTRIBUTES.forEach((attributes) => {
  test(`helpers/isValidLinkTag: "${attributes.type}" (rel: "${attributes?.rel}") should return true`, (t) => {
    const result = isValidLinkTag(attributes);
    t.true(result);
  });
});

Object.keys(ERRORS).forEach((err) => {
  test(`helpers/processResult: should return unsuccessful payload with error: ${ERRORS[err]}`, (t) => {
    const result = processResult({ err: ERRORS.no_feed });

    t.deepEqual(result, { success: false, err: ERRORS.no_feed });
  });
});

test("helpers/processResult: should return successful payload with right href", (t) => {
  const href = "https://some-url.com";
  const result = processResult({ href });

  t.deepEqual(result, { success: true, href });
});

RSS_LINK_MOCKS.forEach((mock) => {
  test(`helpers/isRSSLink: should return ${mock.success} for ${mock.href}`, (t) => {
    const result = isRSSLink(mock.href);

    t.is(result, mock.success);
  });
});

URL_MOCKS.forEach((mock) => {
  test(`helpers/isValidHttpUrl: should return ${mock.success} for ${mock.url}`, (t) => {
    const result = isValidHttpUrl(mock.url);

    t.is(result, mock.success);
  });
});
