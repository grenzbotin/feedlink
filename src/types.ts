import { HTMLElement } from "node-html-parser";

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
  err?: string;
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

export {
  FeedAttributes,
  FeedlinkErrors,
  GetResult,
  GetResultResponse,
  ValidateRelevantNodeResult,
  ValidateResult,
};
