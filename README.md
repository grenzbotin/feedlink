# @grenzbotin/feedlink

[![npm](https://img.shields.io/npm/v/@grenzbotin/feedlink)](https://www.npmjs.com/package/@grenzbotin/feedlink)
[![npm](https://img.shields.io/npm/dm/@grenzbotin/feedlink)](https://www.npmjs.com/package/@grenzbotin/feedlink)
[![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://www.npmjs.com/package/@grenzbotin/feedlink)
[![license](https://img.shields.io/github/license/grenzbotin/feedlink.svg)](https://github.com/grenzbotin/feedlink/blob/main/LICENSE)

[![GitHub last commit](https://img.shields.io/github/last-commit/grenzbotin/feedlink)](https://github.com/grenzbotin/feedlink)
[![GitHub issues](https://img.shields.io/github/issues-raw/grenzbotin/feedlink)](https://github.com/grenzbotin/feedlink/issues)
[![Tests](https://github.com/grenzbotin/feedlink/actions/workflows/ci.yml/badge.svg)](https://github.com/grenzbotin/feedlink/actions)

This package contains helpful utils for reading and working with rss feeds on websites.

---

**Contents**

1. [Installation](#installation)
2. [Functions](#functions)
   - [get](#get)
   - [validate](#validate)
   - [parse](#parse)
3. [Shoutout](#shoutout)

---

## 👋 Installation

`npm i @grenzbotin/feedlink`

## 🤘 Functions

### Usage

Import the package.

```javascript
import * as feedlink from "@grenzbotin/feedlink";
```

### Get

![since @grenzbotin/feedlink@0.1.0](https://img.shields.io/badge/since-v0.1.0-orange)

**Description:** The get function takes any website link and tries to find and return a feed link.

**Note:** Will return a promise.

```javascript
import * as feedlink from "@grenzbotin/feedlink";

async function getRSS(link) {
  return feedlink.get(link);
}

const rssLink = await getRSS("https://www.(Example1|2|3)");

console.log("Result: ", rssLink);
```

#### Example 1: nature.com

```
Result:  { success: true, href: 'https://www.nature.com/nature.rss' }
```

#### Example 2: css-tricks.com

```
Result:  { success: true, href: 'https://css-tricks.com/feed/' }
```

#### Example 3: science.org

```
Result:  { success: false, err: 'ERR_NON_2XX_3XX_RESPONSE' }
```

**Limitation**: As you see on the third example, there is no guarantee that the module will find a feed link. While the package might become more clever over time and find more rss feeds on the go, not every page has an rss feed or wants to have one.

---

### Validate

![since @grenzbotin/feedlink@0.1.3](https://img.shields.io/badge/since-v0.1.3-orange) <img src="https://avatars.githubusercontent.com/u/379216?s=48&v=4" height="20" alt="based on w3c validator service" />

**Description:** The validate function takes any feed link and returns whether its a valid link including potential errors, warnings or information with the help of the w3c validator. Not possible without the great work behind [validator.w3.org/feed](https://validator.w3.org/feed).

**Note:** Will return a promise.

```javascript
import * as feedlink from "@grenzbotin/feedlink";

async function validate(link) {
  return feedlink.validate(link);
}

const result = await validate("https://some-link");

console.log("Result: ", result);

// Result:  {
//  isValid: true,
//  errorsList: [],
//  warningsList: [
//    'SelfDoesntMatchLocation',
//    'UnknownNamespace',
//    'NotHtml',
//    'NotHtml',
//    'ContainsRelRef'
//  ],
//  infoList: []
// }
```

### Parse

![since @grenzbotin/feedlink@0.2.0](https://img.shields.io/badge/since-v0.2.0-orange)

**Description:** The parse function takes any feed link or feed string and returns feed information in json-format. It is just a simplified wrapper around the [rss-parser](https://github.com/rbren/rss-parser). Thus, you can hand in the same parsing options as described [here](https://github.com/rbren/rss-parser#xml-options).

**Note:** Will return a promise.

#### Example 1: parse link

```javascript
import * as feedlink from "@grenzbotin/feedlink";

async function parse(link) {
  return feedlink.parse(link);
}

const result = await parse("https://some-link");

console.log("Example result: ", result);

// Example result:  {
//  success: true,
//  result: {
//    items: [
//      [Object], [Object],
//      [Object], [Object],
//      [Object], [Object],
//      [Object], [Object],
//      [Object], [Object],
//      [Object], [Object],
//      [Object], [Object],
//      [Object]
//    ],
//    feedUrl: 'url',
//    image: {...},
//    paginationLinks: { self: 'url' },
//    title: 'title',
//    description: 'description',
//    generator: 'https://wordpress.org/?v=6.2.2',
//    link: 'url',
//    language: 'en-US',
//    lastBuildDate: 'Wed, 12 Apr 2023 17:42:35 +0000'
//  }
//}
```

#### Example 2: parse string

```javascript
import * as feedlink from "@grenzbotin/feedlink";

async function parse(string) {
  return feedlink.parse(string);
}

const exampleString = `
<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0">
  <channel>
    <title>Feed title</title>
    <link>Website url</link>
    <description>description</description>
    <language>en-en</language>
    <pubDate>Sun, 6 Aug 2023 2:43:19</pubDate>
    <image>
      <url>image url</url>
      <title>image title</title>
      <link>url link</link>
    </image>
    <item>
      <title>title</title>
      <description>description</description>
    </item>
  </channel>
</rss>`;

const result = await parse(exampleString);

console.log("Example result: ", result);

// Example result:  {
//  success: true,
//  result: {
//    items: [{
//      content: "description",
//      contentSnippet: "description",
//      title: "title",
//    }],
//    image: { link: 'url link', url: 'image url', title: 'image title' },
//    title: 'Feed title',
//    description: 'description',
//    pubDate: 'Sun, 6 Aug 2023 2:43:19',
//    link: 'Website url',
//    language: 'en-en'
//  }
//}
```

#### Example 3: parse string with renaming keys

```javascript
import * as feedlink from "@grenzbotin/feedlink";

async function parse(string) {
  return feedlink.parse(string);
}

const exampleString = `
<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0">
  <channel>
    <title>Feed title</title>
    <link>Website url</link>
    <description>description</description>
    <language>en-en</language>
    <pubDate>Sun, 6 Aug 2023 2:43:19</pubDate>
    <image>
      <url>image url</url>
      <title>image title</title>
      <link>url link</link>
    </image>
    <item>
      <title>title</title>
      <description>description</description>
    </item>
  </channel>
</rss>`;

const result = await parse(exampleString, {
  customFields: {
    item: [
      ["description", "👾content"],
      ["title", "👾title"],
    ],
  },
});

console.log("Example result: ", result);

// Example result:  {
//  success: true,
//  result: {
//    items: [  {
//      "👾content": "description",
//      content: "description",
//      contentSnippet: "description",
//      "👾title": "title",
//      title: "title",
//    }],
//    image: { link: 'url link', url: 'image url', title: 'image title' },
//    title: 'Feed title',
//    description: 'description',
//    pubDate: 'Sun, 6 Aug 2023 2:43:19',
//    link: 'Website url',
//    language: 'en-en'
//  }
//}
```

---

## 🌻 Shoutout

A big shoutout and thank you goes to

- [sindresorhus](https://github.com/sindresorhus) for [got](https://github.com/sindresorhus/got)
- [ashi009](https://github.com/ashi009) & [taoqf](https://github.com/taoqf) for [node-html-parser](https://github.com/taoqf/node-html-parser)
- [w3cdevs](https://github.com/w3c/) for [validator.w3.org/feed](https://validator.w3.org/feed)
- [avajs](https://github.com/avajs) (and the team behind) for [ava](https://github.com/avajs/ava)
- [rben](https://github.com/rbren) for the beautiful [rss-parser](https://github.com/rbren/rss-parser)

## Notes

- v0.5.0 Temporary adjustment: rss-parser: contains a reference to a commit to solve request timeout handling due to missing merge.
