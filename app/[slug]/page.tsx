import { SitePage } from "../site";

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <SitePage slug={slug} />;
}
