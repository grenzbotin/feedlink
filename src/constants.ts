import { FeedlinkErrors, FeedAttributes } from "./types.js";

const ERRORS: FeedlinkErrors = {
  no_feed: "NO_FEED_FOUND",
  invalid: "INVALID",
  invalid_url: "INVALID_URL",
  parsing_error: "PARSING_ERROR",
  w3c_error: "W3C_VALIDATION_ERROR",
};

const VALID_FEED_ATTRIBUTES: FeedAttributes[] = [
  { type: "application/rss+xml" },
  { type: "application/atom+xml" },
  { type: "application/rss" },
  { type: "application/atom" },
  { type: "application/rdf+xml" },
  { type: "application/rdf" },
  { type: "text/rss" },
  { type: "text/rss+xml" },
  { type: "text/atom" },
  { type: "text/atom+xml" },
  { type: "text/rdf+xml" },
  { type: "text/rdf" },
  { rel: "alternate", type: "text/xml" },
  { rel: "alternate", type: "application/xml" },
];

const FEED_VALIDATOR_URL: string = "https://validator.w3.org/feed/check.cgi";

export { ERRORS, VALID_FEED_ATTRIBUTES, FEED_VALIDATOR_URL };
