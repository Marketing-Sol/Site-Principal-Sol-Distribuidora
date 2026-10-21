import { SITE_NAME } from "./catalog-meta";
import { NotFoundPage } from "./site";

// React hoists these tags into <head>; the layout sets no title or canonical,
// so the 404 page has its own title and stays out of search results.
export default function NotFound() {
  return <>
    <title>{`Página não encontrada | ${SITE_NAME}`}</title>
    <meta name="robots" content="noindex, follow" />
    <NotFoundPage />
  </>;
}
