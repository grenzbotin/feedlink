import test from "ava";
import { FEEDLINK_URLS } from "./_mockData.js";
import { getFeedLink } from "../src/feedlink.get.js";

FEEDLINK_URLS.forEach((url) => {
  test(`feedlink/getFeedLink: should return correct response for ${url.url}`, async (t) => {
    const result = await getFeedLink(url.url);

    t.deepEqual(result, url.response);
  });
});
