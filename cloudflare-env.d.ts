// Types for the Cloudflare runtime module. The bindings listed here
// are the ones this site reads (db/); the full Workers typings are imported as
// modules so they do not clash with the DOM types used by the app.
declare module "cloudflare:workers" {
  export const env: {
    DB?: import("@cloudflare/workers-types/index").D1Database;
  };
}
