import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import {
  render,
  navItems,
  pageMeta,
  structuredData,
  SITE_URL,
} from "../.prerender/entry-server.js";
const template = await readFile("dist/index.html", "utf8");
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
for (const { page, path } of navItems) {
  const meta = pageMeta[page];
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  let html = template.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escape(meta.title)}</title>`,
  );
  for (const name of ["description", "og:description", "twitter:description"]) {
    html = html.replace(
      new RegExp(`(<meta (?:name|property)="${name}" content=")[^"]*("[^>]*>)`),
      `$1${escape(meta.description)}$2`,
    );
  }
  for (const name of ["og:title", "twitter:title"])
    html = html.replace(
      new RegExp(`(<meta (?:name|property)="${name}" content=")[^"]*("[^>]*>)`),
      `$1${escape(meta.title)}$2`,
    );
  html = html
    .replace(/(<link rel="canonical" href=")[^"]*("[^>]*>)/, `$1${url}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*("[^>]*>)/, `$1${url}$2`)
    .replace('<div id="root"></div>', `<div id="root">${render(path)}</div>`)
    .replace(
      "<!--structured-data-->",
      `<script id="site-schema" type="application/ld+json">${JSON.stringify(structuredData(page)).replaceAll("<", "\\u003c")}</script>`,
    );
  const directory = path === "/" ? "dist" : `dist${path}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/index.html`, html);
  console.log(`Prerendered ${path}`);
}
await rm(".prerender", { recursive: true, force: true });
