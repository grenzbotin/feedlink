import { ERRORS } from "../src/constants.js";
import { FeedAttributes } from "../src/types.js";

const INVALID_FEED_ATTRIBUTES: FeedAttributes[] = [
  { type: "" },
  { type: "text/xml" },
  { type: "application/xml" },
  { type: "application/xml", rel: "invalid" },
  { type: "invalid-something", rel: "alternate" },
];

const RSS_LINK_MOCKS = [
  { href: "", success: false },
  { href: "https://something.com/rs", success: false },
  { href: "https://www.something.com/rss", success: false },
  { href: "https://www.something.com/rss.rss", success: true },
  { href: "https://www.something.com/rss.rss/", success: true },
];

const URL_MOCKS = [
  { url: "", success: false },
  { url: "mailto:dasdV@cyxu.de", success: false },
  { url: "https://xycyx.com", success: true },
  { url: "http://xycyx.com", success: true },
  { url: "https://sub.xycyx.com", success: true },
  { url: "without-protocol.com", success: false },
  { url: "123", success: false },
];

const FEEDLINK_URLS = [
  {
    url: "https://nature.com",
    response: { success: true, href: "https://www.nature.com/nature.rss" },
  },
  {
    url: "https://css-tricks.com",
    response: { success: true, href: "https://css-tricks.com/feed/" },
  },
  {
    url: "https://science.org",
    response: { success: false, err: "ERR_NON_2XX_3XX_RESPONSE" },
  },
  {
    url: "",
    response: { success: false, err: ERRORS.invalid_url },
  },
];

export { INVALID_FEED_ATTRIBUTES, RSS_LINK_MOCKS, URL_MOCKS, FEEDLINK_URLS };