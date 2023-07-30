interface FeedAttributes {
  [key: string]: string;
}

interface FeedlinkErrors {
  [key: string]: string;
}

type Result = {
  err?: string;
  href?: string;
};

type ResultResponse = {
  success: boolean;
  err?: string;
  href?: string;
};

export { FeedAttributes, FeedlinkErrors, Result, ResultResponse };
