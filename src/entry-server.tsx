import { renderToString } from "react-dom/server";
import App from "./App";
export { navItems, pageMeta, SITE_URL } from "./site";
export { structuredData } from "./seo";
export function render(path: string) {
  return renderToString(<App initialPath={path} />);
}
