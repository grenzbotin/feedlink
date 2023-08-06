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
    url: "",
    response: { success: false, err: ERRORS.invalid_url },
  },
];

const MOCK_W3C_XML_VALID = `<?xml version="1.0" encoding="UTF-8"?>
<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">
<env:Body>
<m:feedvalidationresponse env:encodingStyle="http://www.w3.org/2003/05/soap-encoding" xmlns:m="http://www.w3.org/2005/10/feed-validator">
      <m:uri></m:uri>
      <m:checkedby>http://validator.w3.org/check.cgi</m:checkedby>
      <m:date>2023-08-06T17:21:18.273733</m:date>
      <m:validity>true</m:validity>
  <m:errors>
        <m:errorcount>0</m:errorcount>
        <m:errorlist></m:errorlist>
    </m:errors>
    <m:warnings>
        <m:warningcount>5</m:warningcount>
        <m:warninglist><warning>
  <level>warning</level>
  <type>SelfDoesntMatchLocation</type>
  <line>15</line>
  <column>88</column>
  <text>Self reference doesn&apos;t match document location</text>
  <msgcount>1</msgcount>
  <backupcolumn>88</backupcolumn>
  <backupline>15</backupline>
  <element>href</element>
  <parent>channel</parent>
</warning>

<warning>
  <level>warning</level>
  <type>UnknownNamespace</type>
  <line>33</line>
  <column>0</column>
  <text>Use of unknown namespace: com-wordpress:feed-additions:1</text>
  <msgcount>16</msgcount>
  <backupcolumn>9</backupcolumn>
  <backupline>32</backupline>
  <namespace>com-wordpress:feed-additions:1</namespace>
</warning>

<warning>
  <level>warning</level>
  <type>NotHtml</type>
  <line>46</line>
  <column>0</column>
  <text>Invalid HTML</text>
  <msgcount>15</msgcount>
  <backupcolumn>3</backupcolumn>
  <backupline>49</backupline>
  <element>description</element>
  <message>Invalid HTML</message>
  <parent>item</parent>
  <value>Unexpected end tag (p). Ignored.</value>
</warning>

<warning>
  <level>warning</level>
  <type>NotHtml</type>
  <line>50</line>
  <column>0</column>
  <text>Invalid HTML</text>
  <msgcount>15</msgcount>
  <backupcolumn>3</backupcolumn>
  <backupline>419</backupline>
  <element>content:encoded</element>
  <message>Invalid HTML</message>
  <parent>item</parent>
  <value>Unexpected end tag (li). Ignored.</value>
</warning>

<warning>
  <level>warning</level>
  <type>ContainsRelRef</type>
  <line>419</line>
  <column>3</column>
  <text>content:encoded should not contain relative URL references</text>
  <msgcount>15</msgcount>
  <backupcolumn>3</backupcolumn>
  <backupline>419</backupline>
  <element>content:encoded</element>
  <parent>item</parent>
  <value>#terminology</value>
</warning>
</m:warninglist>
    </m:warnings>
    <m:informations>
        <m:infocount>0</m:infocount>
        <m:infolist></m:infolist>
    </m:informations>
</m:feedvalidationresponse>
</env:Body>
</env:Envelope>`;

const MOCK_W3C_XML_INVALID = `<?xml version="1.0" encoding="UTF-8"?>
<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">
<env:Body>
<m:feedvalidationresponse env:encodingStyle="http://www.w3.org/2003/05/soap-encoding" xmlns:m="http://www.w3.org/2005/10/feed-validator">
      <m:uri></m:uri>
      <m:checkedby>http://validator.w3.org/check.cgi</m:checkedby>
      <m:date>2023-08-06T17:21:18.273733</m:date>
      <m:validity>false</m:validity>
</m:feedvalidationresponse>
</env:Body>
</env:Envelope>`;

const MOCK_W3C_XML_VALID_WITH_ERROR = `<?xml version="1.0" encoding="UTF-8"?>
<env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">
<env:Body>
<m:feedvalidationresponse env:encodingStyle="http://www.w3.org/2003/05/soap-encoding" xmlns:m="http://www.w3.org/2005/10/feed-validator">
      <m:uri></m:uri>
      <m:checkedby>http://validator.w3.org/check.cgi</m:checkedby>
      <m:date>2023-08-06T17:21:18.273733</m:date>
      <m:validity>true</m:validity>
  <m:errors>
        <m:errorcount>0</m:errorcount>
        <m:errorlist>
        <error>
        <level>error</level>
  <type>SelfDoesntMatchLocation</type>
  <line>15</line>
  <column>88</column>
  <text>Self reference doesn&apos;t match document location</text>
  <msgcount>1</msgcount>
  <backupcolumn>88</backupcolumn>
  <backupline>15</backupline>
  <element>href</element>
  <parent>channel</parent>
        </error></m:errorlist>
    </m:errors>
    <m:informations>
        <m:infocount>0</m:infocount>
        <m:infolist></m:infolist>
    </m:informations>
</m:feedvalidationresponse>
</env:Body>
</env:Envelope>`;

export {
  INVALID_FEED_ATTRIBUTES,
  RSS_LINK_MOCKS,
  URL_MOCKS,
  FEEDLINK_URLS,
  MOCK_W3C_XML_VALID,
  MOCK_W3C_XML_INVALID,
  MOCK_W3C_XML_VALID_WITH_ERROR,
};
