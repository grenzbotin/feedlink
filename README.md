# @grenzbotin/feedlink

[![npm](https://img.shields.io/npm/v/@grenzbotin/feedlink)](https://www.npmjs.com/package/@grenzbotin/feedlink)
[![npm](https://img.shields.io/npm/dm/@grenzbotin/feedlink)](https://www.npmjs.com/package/@grenzbotin/feedlink)
![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg) ![license](https://img.shields.io/github/license/grenzbotin/feedlink.svg)

![GitHub last commit](https://img.shields.io/github/last-commit/grenzbotin/feedlink)
![GitHub issues](https://img.shields.io/github/issues-raw/grenzbotin/feedlink) ![Tests](https://github.com/grenzbotin/feedlink/actions/workflows/ci.yml/badge.svg)

This package tries to retrieve the rss link from a website - if it exists.

---

Contents

1. [Installation](#installation)
2. [Usage](#usage)
   - [Example 1](#example-1-naturecom)
   - [Example 2](#example-2-css-trickscom)
   - [Example 3](#example-3-scienceorg)
3. [Limitation](#limitation)

---

## Installation

`npm i @grenzbotin/feedlink`

## Usage

Import the package.

```javascript
import * as feedlink from "@grenzbotin/feedlink";
```

Currently, there is only a `get` function available in the package.

**Note**: The function will return a promise:

```javascript
async function getRSS(link) {
  return feedlink.get(link);
}

const rssLink = await getRSS("https://www.(Example1|2|3)");

console.log("Result: ", rssLink);
```

### Example 1: nature.com

```
Result:  { success: true, href: 'https://www.nature.com/nature.rss' }
```

### Example 2: css-tricks.com

```
Result:  { success: true, href: 'https://css-tricks.com/feed/' }
```

### Example 3: science.org

```
Result:  { success: false, err: 'ERR_NON_2XX_3XX_RESPONSE' }
```

## Limitation

As you see on the third example, there is no guarantee that the module will find a feed link. While the package might become more clever over time and find more rss feeds on the go, not every page has an rss feed or wants to have one.
