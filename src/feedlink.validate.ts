import got from "got";

import { ERRORS, FEED_VALIDATOR_URL } from "./constants.js";
import { isValidHttpUrl, parseValidatorResponse } from "./helpers.js";
import { ValidateResult } from "./types.js";

export async function validateFeedLink(link: string): Promise<ValidateResult> {
  if (isValidHttpUrl(link)) {
    try {
      const res = await got(link);

      const validationResponse = await got.post(FEED_VALIDATOR_URL, {
        headers: { "Content-type": "application/x-www-form-urlencoded" },
        body: `manual=1&output=soap12&rawdata=${encodeURIComponent(res.body)}`,
      });

      if (validationResponse.statusCode === 200) {
        return parseValidatorResponse(validationResponse.body);
      }

      return { isValid: false, errorsList: [ERRORS.w3c_error] };
    } catch (err) {
      return { isValid: false, errorsList: [ERRORS.parsing_error] };
    }
  }

  return { isValid: false, errorsList: [ERRORS.invalid_url] };
}
