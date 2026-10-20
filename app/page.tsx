import { permanentRedirect } from "next/navigation";
import { PAGE_IDS } from "./data";
import { SitePage } from "./site";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page_id?: string; p?: string }>;
}) {
  const query = await searchParams;
  // Old WordPress links (/?page_id=15, /?p=979) move permanently to the page's
  // current address; unknown ids fall back to the home page.
  const legacyId = query.page_id || query.p;
  if (legacyId) {
    const target = PAGE_IDS[legacyId];
    permanentRedirect(target && target !== "home" && target !== "home-nova" ? `/${target}` : "/");
  }
  return <SitePage slug="home" />;
}
