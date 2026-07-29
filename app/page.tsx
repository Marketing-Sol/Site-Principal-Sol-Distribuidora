import { SitePage } from "./site";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page_id?: string; p?: string }>;
}) {
  const query = await searchParams;
  return <SitePage slug={query.page_id || query.p || "home"} />;
}
