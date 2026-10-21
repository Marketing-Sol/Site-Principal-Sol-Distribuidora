// Packages the vinext build (made for Cloudflare Workers) as Vercel Build Output
// for preview deployments: dist/client becomes the static files and the Worker
// entry in dist/server runs inside one Node function. Run after `vinext build`.
import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const output = resolve(root, ".vercel/output");
const fn = resolve(output, "functions/index.func");

await rm(output, { recursive: true, force: true });
await mkdir(fn, { recursive: true });
await cp(resolve(root, "dist/client"), resolve(output, "static"), { recursive: true });
await cp(resolve(root, "dist/server"), resolve(fn, "server"), { recursive: true });

// Static files first; everything else goes to the function.
await writeFile(resolve(output, "config.json"), JSON.stringify({
  version: 3,
  routes: [{ handle: "filesystem" }, { src: "/(.*)", dest: "/index" }],
}, null, 2));

await writeFile(resolve(fn, ".vc-config.json"), JSON.stringify({
  runtime: "nodejs22.x",
  handler: "index.mjs",
  launcherType: "Nodejs",
  shouldAddHelpers: false,
  supportsResponseStreaming: true,
  environment: { SITE_PREVIEW: process.env.SITE_PREVIEW ?? "" },
}, null, 2));

await writeFile(resolve(fn, "package.json"), JSON.stringify({ type: "module" }));

await writeFile(resolve(fn, "index.mjs"), `import { Readable } from "node:stream";
import worker from "./server/index.js";

// Stand-in for the Cloudflare assets binding: files are read back from this
// deployment. Image resizing (/_vinext/image) is not available here, so those
// requests are redirected to the original file in the handler below.
function workerEnv(origin) {
  return {
    ASSETS: {
      fetch: (request) => fetch(new URL(new URL(request.url).pathname, origin), { headers: { [ASSET_LOOKUP]: "1" } }),
    },
  };
}

// Marks the assets lookups above: a file that is not among the static files
// comes back to this function, which answers 404 instead of looping.
const ASSET_LOOKUP = "x-sol-asset-lookup";

const ctx = { waitUntil() {}, passThroughOnException() {} };

export default async function handler(req, res) {
  if (req.headers[ASSET_LOOKUP]) {
    res.writeHead(404);
    return res.end();
  }
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const origin = \`\${proto}://\${host}\`;
  const url = new URL(req.url, origin);
  if (url.pathname === "/_vinext/image") {
    const source = url.searchParams.get("url") ?? "";
    const isLocal = source.startsWith("/") && !source.startsWith("//");
    res.writeHead(isLocal ? 307 : 400, isLocal ? { Location: source } : {});
    return res.end();
  }
  const headers = new Headers();
  for (const [name, value] of Object.entries(req.headers)) {
    if (value !== undefined) headers.set(name, Array.isArray(value) ? value.join(", ") : value);
  }
  const hasBody = req.method !== "GET" && req.method !== "HEAD";
  const request = new Request(url, {
    method: req.method,
    headers,
    body: hasBody ? Readable.toWeb(req) : undefined,
    duplex: hasBody ? "half" : undefined,
  });
  const response = await worker.fetch(request, workerEnv(origin), ctx);
  const outHeaders = {};
  response.headers.forEach((value, name) => {
    if (name === "set-cookie") return;
    outHeaders[name] = value;
  });
  const cookies = response.headers.getSetCookie?.() ?? [];
  if (cookies.length) outHeaders["set-cookie"] = cookies;
  res.writeHead(response.status, outHeaders);
  if (!response.body || req.method === "HEAD") return res.end();
  Readable.fromWeb(response.body).pipe(res);
}
`);

console.log("Vercel output ready in .vercel/output");
