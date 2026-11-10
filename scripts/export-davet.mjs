// Turns the built site into plain files for the Davet hosting (Apache + PHP).
//
// Run after `npx vinext build` with the production server up
// (`npx vinext start --port 4173`):
//   node scripts/export-davet.mjs [server] [outDir]
//
// Every page is fetched from the running server and saved as <slug>.html, so the
// files are exactly what the server renders. Redirects (old WordPress ids,
// renamed and hidden products) are asked of the server too and written as
// Apache rules, and the contact form is handled by api/contato.php.

import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { CATEGORY_META, HIDDEN_PRODUCTS, LEGACY_URLS, PAGE_IDS, PRODUCTS } from "../app/data.ts";

const SERVER = (process.argv[2] ?? "http://127.0.0.1:4173").replace(/\/$/, "");
const OUT = path.resolve(process.argv[3] ?? "davet-out");
const ROOT = path.resolve(import.meta.dirname, "..");

const PAGES = ["", "produtos", "sobre-nos", "sustentabilidade", "contato", "politica-de-privacidade",
  ...Object.keys(CATEGORY_META), ...PRODUCTS.map((product) => product.slug)];

async function get(pathname) {
  const response = await fetch(SERVER + pathname, { redirect: "manual" });
  return { status: response.status, location: response.headers.get("location"), body: await response.text() };
}

// Location headers may be absolute; keep only the path.
const localPath = (location) => new URL(location, SERVER).pathname;
const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\-]/g, "\\$&");

rmSync(OUT, { recursive: true, force: true });
// _headers and .assetsignore are Cloudflare files; .vite holds the build manifest.
cpSync(path.join(ROOT, "dist", "client"), OUT, { recursive: true, filter: (source) => ![".vite", "_headers", ".assetsignore"].includes(path.basename(source)) });

// Pages, then any internal link they point to that is not in the list yet.
const queue = [...new Set(PAGES)];
const saved = new Set();
const redirects = new Map();
for (let index = 0; index < queue.length; index++) {
  const slug = queue[index];
  const result = await get(`/${slug}`);
  if (result.status === 200) {
    writeFileSync(path.join(OUT, slug ? `${slug}.html` : "index.html"), result.body);
    saved.add(slug);
    for (const [, href] of result.body.matchAll(/href="\/([a-z0-9][a-z0-9-]*)(?:[?#"][^"]*)?"/g)) {
      if (!queue.includes(href) && !/\.[a-z0-9]+$/.test(href)) queue.push(href);
    }
  } else if (result.status >= 300 && result.status < 400) {
    redirects.set(slug, { status: result.status, target: localPath(result.location) });
  } else {
    throw new Error(`/${slug} answered ${result.status}`);
  }
}

// Navigation payloads. Links and the back/forward buttons fetch /<page>.rsc;
// without them the router falls back to reloading the same address, which for
// in-page links (#catalogo-...) fires another history event and loops forever.
mkdirSync(path.join(OUT, "_rsc"), { recursive: true });
const rscHeaders = [];
for (const slug of saved) {
  const response = await fetch(`${SERVER}/${slug}.rsc?_rsc`, { headers: { RSC: "1", Accept: "text/x-component" }, redirect: "manual" });
  if (response.status !== 200 || !response.headers.get("content-type")?.startsWith("text/x-component")) throw new Error(`/${slug}.rsc answered ${response.status}`);
  const file = `${slug || "index"}.rsc`;
  writeFileSync(path.join(OUT, "_rsc", file), Buffer.from(await response.arrayBuffer()));
  const params = response.headers.get("x-vinext-params");
  // mod_headers reads % as a format code, so a literal % is written %%.
  if (params) rscHeaders.push(`<Files "${file}">\n  Header set X-Vinext-Params "${params.replace(/%/g, "%%")}"\n</Files>`);
}
writeFileSync(path.join(OUT, "_rsc", ".htaccess"), `# Dados de navegação do site (gerados por scripts/export-davet.mjs).
AddType text/x-component .rsc
AddCharset utf-8 .rsc
<IfModule mod_headers.c>
  Header set Cache-Control "no-cache"
  Header set Vary "RSC, Accept"
${rscHeaders.join("\n").replace(/^/gm, "  ")}
</IfModule>
`);

// Old addresses: renamed products, hidden products and WordPress ids.
for (const slug of new Set([...Object.keys(LEGACY_URLS), ...Object.keys(HIDDEN_PRODUCTS), ...Object.keys(PAGE_IDS)])) {
  if (saved.has(slug) || redirects.has(slug)) continue;
  const result = await get(`/${slug}`);
  if (result.status >= 300 && result.status < 400) redirects.set(slug, { status: result.status, target: localPath(result.location) });
  else if (result.status !== 404) throw new Error(`/${slug} answered ${result.status}`);
}

// WordPress query links (/?page_id=15, /?p=979).
const queryRedirects = [];
for (const id of Object.keys(PAGE_IDS)) {
  const result = await get(`/?page_id=${encodeURIComponent(id)}`);
  if (result.status < 300 || result.status >= 400) throw new Error(`/?page_id=${id} answered ${result.status}`);
  const target = localPath(result.location);
  if (target !== "/") queryRedirects.push({ id, target });
}

const notFound = await get("/pagina-que-nao-existe-davet");
if (notFound.status !== 404) throw new Error(`404 page answered ${notFound.status}`);
writeFileSync(path.join(OUT, "404.html"), notFound.body);
for (const file of ["robots.txt", "sitemap.xml"]) {
  const result = await get(`/${file}`);
  if (result.status !== 200) throw new Error(`/${file} answered ${result.status}`);
  writeFileSync(path.join(OUT, file), result.body);
}

// Security headers come from next.config.ts, as the server sends them.
const pageHeaders = (await fetch(SERVER + "/contato")).headers;
const SECURITY_HEADERS = ["Strict-Transport-Security", "X-Content-Type-Options", "X-Frame-Options",
  "Referrer-Policy", "Permissions-Policy", "Content-Security-Policy"]
  .map((name) => [name, pageHeaders.get(name)])
  .filter(([, value]) => value);

const redirectRules = [...redirects]
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([slug, { status, target }]) => `RewriteRule ^${escapeRegex(slug)}/?$ ${target} [R=${status === 308 || status === 301 ? 301 : 302},L]`);
const queryRules = queryRedirects.flatMap(({ id, target }) => [
  `RewriteCond %{QUERY_STRING} (^|&)(page_id|p)=${escapeRegex(id)}(&|$)`,
  `RewriteRule ^$ ${target}? [R=301,L]`,
]);

const htaccess = `# Site da Sol Distribuidora: versão estática gerada por scripts/export-davet.mjs.
# Não edite à mão; gere de novo a partir do projeto.

Options -Indexes -MultiViews
DirectoryIndex index.html
ErrorDocument 404 /404.html
AddDefaultCharset utf-8
AddType text/javascript .js .mjs
AddType image/webp .webp
AddType image/avif .avif
AddType application/manifest+json .webmanifest

<IfModule mod_headers.c>
${SECURITY_HEADERS.map(([name, value]) => `  Header always set ${name} "${value.replace(/"/g, '\\"')}"`).join("\n")}
  Header unset X-Powered-By
  <If "%{REQUEST_URI} =~ m#^/assets/#">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </If>
  # Fonts keep their names between releases: long cache, without "immutable".
  <If "%{REQUEST_URI} =~ m#^/fonts/.+\\.woff2$#">
    Header set Cache-Control "public, max-age=31536000"
  </If>
  <If "%{REQUEST_URI} =~ m#\\.html$# || %{REQUEST_URI} !~ m#\\.[a-z0-9]+$#">
    Header set Cache-Control "no-cache"
  </If>
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json image/svg+xml text/plain application/xml
</IfModule>

RewriteEngine On

# Endereço oficial com www: o certificado do domínio cobre só www.distribuidorasol.com.br.
RewriteCond %{HTTP_HOST} !^www\\.distribuidorasol\\.com\\.br$ [NC]
RewriteCond %{HTTP_HOST} distribuidorasol\\.com\\.br\\.?$ [NC]
RewriteRule ^ https://www.distribuidorasol.com.br%{REQUEST_URI} [R=301,L]

# Sempre HTTPS.
RewriteCond %{HTTPS} !=on
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]

# Endereços antigos com barra no fim (/contato/) vão para o endereço sem barra.
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.+)/$ /$1 [R=301,L]

# Links antigos do WordPress (/?page_id=15, /?p=979).
${queryRules.join("\n")}
RewriteCond %{QUERY_STRING} (^|&)(page_id|p)=
RewriteRule ^$ /? [R=301,L]

# Endereços antigos, produtos renomeados e produtos fora do site.
${redirectRules.join("\n")}

# Endereços /index.html e /pagina.html ficam só na forma curta.
RewriteCond %{THE_REQUEST} \\s/([^?\\s]*?)(index)?\\.html[\\s?]
RewriteRule ^ /%1 [R=301,L]

# Dados de navegação: /.rsc e /pagina.rsc ficam em _rsc/.
RewriteRule ^\\.rsc$ _rsc/index.rsc [L]
RewriteRule ^([a-z0-9-]+)\\.rsc$ _rsc/$1.rsc [L]

# Formulário de contato.
RewriteRule ^api/contato$ api/contato.php [L]

# /contato serve contato.html.
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{DOCUMENT_ROOT}/$1.html -f
RewriteRule ^([a-z0-9-]+)$ $1.html [L]
`;
writeFileSync(path.join(OUT, ".htaccess"), htaccess);

mkdirSync(path.join(OUT, "api"), { recursive: true });
writeFileSync(path.join(OUT, "api", "contato.php"), readFileSync(path.join(ROOT, "davet", "contato.php")));

console.log(`Páginas: ${saved.size}`);
console.log(`Redirecionamentos: ${redirects.size} endereços, ${queryRedirects.length} ids do WordPress`);
console.log(`Saída: ${OUT}`);
