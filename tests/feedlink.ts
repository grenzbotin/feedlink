import test from "ava";
import {
  FEEDLINK_URLS,
  MOCK_XML_FEED_INVALID,
  MOCK_XML_FEED_VALID,
} from "./_mockData.js";
import { getFeedLink } from "../src/feedlink.get.js";
import { parseFeed } from "../src/feedlink.parse.js";
import { ERRORS } from "../src/constants.js";

FEEDLINK_URLS.forEach((url) => {
  test(`feedlink/getFeedLink: should return correct response for ${url.url}`, async (t) => {
    const result = await getFeedLink(url.url);

    t.deepEqual(result, url.response);
  });
});

test(`feedlink/parseFeed: should return successful state with correct mock result`, async (t) => {
  const result = await parseFeed(MOCK_XML_FEED_VALID);
  t.deepEqual(result, {
    result: {
      description: "description",
      image: {
        link: "url link",
        title: "image title",
        url: "image url",
      },
      items: [
        {
          content: "description",
          contentSnippet: "description",
          title: "title",
        },
      ],
      language: "en-en",
      link: "Website url",
      pubDate: "Sun, 6 Aug 2023 2:43:19",
      title: "Feed title",
    },
    success: true,
  });
});

test(`feedlink/parseFeed: should return failing state with parsing error`, async (t) => {
  const result = await parseFeed(MOCK_XML_FEED_INVALID);
  t.deepEqual(result, {
    error: ERRORS.parsing_error,
    success: false,
  });
});

test(`feedlink/parseFeed: should return success state with renaming in options`, async (t) => {
  const result = await parseFeed(MOCK_XML_FEED_VALID, {
    customFields: {
      item: [
        ["description", "👾content"],
        ["title", "👾title"],
      ],
    },
  });
  t.deepEqual(result, {
    result: {
      description: "description",
      image: {
        link: "url link",
        title: "image title",
        url: "image url",
      },
      items: [
        {
          "👾content": "description",
          content: "description",
          contentSnippet: "description",
          "👾title": "title",
          title: "title",
        },
      ],
      language: "en-en",
      link: "Website url",
      pubDate: "Sun, 6 Aug 2023 2:43:19",
      title: "Feed title",
    },
    success: true,
  });
});
