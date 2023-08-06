import { HTMLElement } from "node-html-parser";
import { Output } from "rss-parser";

interface FeedAttributes {
  [key: string]: string;
}

interface FeedlinkErrors {
  [key: string]: string;
}

type GetResult = {
  err?: string;
  href?: string;
};

type GetResultResponse = {
  success: boolean;
  error?: string;
  href?: string;
};

type ValidateRelevantNodeResult = {
  success: boolean;
  result?: HTMLElement;
};

type ValidateResult = {
  isValid: boolean;
  errorsList?: string[];
  infoList?: string[];
  warningsList?: string[];
};

type ParseResult = {
  success: boolean;
  error?: string;
  result?: Output<{ [key: string]: any }>;
};

export {
  FeedAttributes,
  FeedlinkErrors,
  GetResult,
  GetResultResponse,
  ValidateRelevantNodeResult,
  ValidateResult,
  ParseResult,
};
