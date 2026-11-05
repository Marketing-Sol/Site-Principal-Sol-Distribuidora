// Local stand-in for the Davet Apache, to check the exported site before upload.
// It follows the same rules as the generated .htaccess (redirects, /page ->
// page.html, 404 page). The contact form is NOT forwarded: /api/contato only
// answers with a validation error, so no lead reaches the real spreadsheet.
//   node scripts/serve-davet-local.mjs [dir] [port]

import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const DIR = path.resolve(process.argv[2] ?? "davet-out");
const PORT = Number(process.argv[3] ?? 8090);
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml", ".pdf": "application/pdf", ".xml": "application/xml", ".txt": "text/plain; charset=utf-8", ".json": "application/json", ".woff2": "font/woff2", ".ico": "image/x-icon", ".mp4": "video/mp4" };

const htaccess = readFileSync(path.join(DIR, ".htaccess"), "utf8");
const pathRules = [...htaccess.matchAll(/^RewriteRule \^(.+?)\/\?\$ (\S+) \[R=(\d+),L\]$/gm)].map(([, pattern, target, status]) => ({ re: new RegExp(`^${pattern}/?$`), target, status: Number(status) }));
const queryRules = [...htaccess.matchAll(/^RewriteCond %\{QUERY_STRING\} \(\^\|&\)\(page_id\|p\)=(.+?)\(&\|\$\)\nRewriteRule \^\$ (\S+)\? \[R=301,L\]$/gm)].map(([, id, target]) => ({ re: new RegExp(`(^|&)(page_id|p)=${id}(&|$)`), target }));
const headers = Object.fromEntries([...htaccess.matchAll(/^\s+Header always set (\S+) "(.*)"$/gm)].map(([, name, value]) => [name, value.replace(/\\"/g, '"')]));

function send(res, status, file, extra = {}) {
  res.writeHead(status, { ...headers, "Content-Type": TYPES[path.extname(file)] ?? "application/octet-stream", ...extra });
  res.end(readFileSync(file));
}
const redirect = (res, status, location) => { res.writeHead(status, { Location: location }); res.end(); };

createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const rel = decodeURIComponent(url.pathname).replace(/^\//, "");
  if (rel === "api/contato") {
    res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
    return res.end(JSON.stringify({ error: "Teste local: o formulário não envia dados nesta prévia." }));
  }
  if (rel.endsWith("/") && rel.length > 1 && !(existsSync(path.join(DIR, rel)) && statSync(path.join(DIR, rel)).isDirectory())) return redirect(res, 301, "/" + rel.slice(0, -1));
  if (rel === "" && /(^|&)(page_id|p)=/.test(url.search.slice(1))) {
    const rule = queryRules.find(({ re }) => re.test(url.search.slice(1)));
    return redirect(res, 301, rule ? rule.target : "/");
  }
  const pathRule = pathRules.find(({ re }) => re.test(rel));
  if (pathRule) return redirect(res, pathRule.status, pathRule.target);
  const rscMatch = /^([a-z0-9-]*)\.rsc$/.exec(rel);
  if (rscMatch) {
    const rscFile = path.join(DIR, "_rsc", `${rscMatch[1] || "index"}.rsc`);
    if (!existsSync(rscFile)) return send(res, 404, path.join(DIR, "404.html"));
    const params = new RegExp(`<Files "${rscMatch[1] || "index"}\\.rsc">\\s*Header set X-Vinext-Params "([^"]*)"`).exec(readFileSync(path.join(DIR, "_rsc", ".htaccess"), "utf8"))?.[1]?.replace(/%%/g, "%");
    return send(res, 200, rscFile, { "Content-Type": "text/x-component; charset=utf-8", ...(params ? { "X-Vinext-Params": params } : {}) });
  }
  const htmlMatch = /^(.*?)(index)?\.html$/.exec(rel);
  if (htmlMatch) return redirect(res, 301, "/" + htmlMatch[1]);
  const file = path.join(DIR, rel);
  if (!file.startsWith(DIR)) return send(res, 404, path.join(DIR, "404.html"));
  if (rel === "") return send(res, 200, path.join(DIR, "index.html"));
  if (existsSync(file) && statSync(file).isFile()) return send(res, 200, file);
  if (/^[a-z0-9-]+$/.test(rel) && existsSync(file + ".html")) return send(res, 200, file + ".html");
  return send(res, 404, path.join(DIR, "404.html"));
}).listen(PORT, () => console.log(`Prévia local em http://localhost:${PORT}`));
