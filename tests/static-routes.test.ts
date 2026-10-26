import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { navItems, pageMeta, SITE_URL } from "../src/site.ts";

for (const { page, path } of navItems) {
  test(`production ${path} contains page content, metadata and factual structured data without JS`, () => {
    const html = readFileSync(
      `dist${path === "/" ? "" : path}/index.html`,
      "utf8",
    );
    const url = SITE_URL + (path === "/" ? "" : path);
    assert.ok(html.includes(pageMeta[page].title.replaceAll("&", "&amp;")));
    assert.ok(
      html.includes(pageMeta[page].description.replaceAll("&", "&amp;")),
    );
    assert.ok(html.includes(`<link rel="canonical" href="${url}"`));
    assert.ok(html.includes(`<meta property="og:url" content="${url}"`));
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.ok(html.includes('id="main-content"'));
    const schema = JSON.parse(
      html.match(
        /<script id="site-schema" type="application\/ld\+json">(.*?)<\/script>/s,
      )![1],
    );
    assert.ok(schema["@graph"].some((item) => item["@type"] === "Person"));
    assert.ok(
      schema["@graph"].some(
        (item) => item["@type"] === "WebPage" && item.url === url,
      ),
    );
    assert.ok(
      !/brickinfinity|real estate|cdn.tailwindcss|process.env.API_KEY/i.test(
        html,
      ),
    );
    assert.ok(
      !/aggregateRating|award|reviewCount/.test(JSON.stringify(schema)),
    );
  });
}
test("sitemap matches all four public routes and robots permits them", () => {
  const xml = readFileSync("public/sitemap.xml", "utf8");
  for (const { path } of navItems)
    assert.ok(xml.includes(`${SITE_URL}${path}`));
  assert.match(readFileSync("public/robots.txt", "utf8"), /Allow: \//);
});
