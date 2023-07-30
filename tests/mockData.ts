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

export { INVALID_FEED_ATTRIBUTES, RSS_LINK_MOCKS };
