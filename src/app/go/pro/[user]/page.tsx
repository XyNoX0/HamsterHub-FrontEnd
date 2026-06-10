import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function GoProDetail({
  params,
}: {
  params: Promise<{ user: string }>;
}) {
  const { user } = await params;
  redirect(`/profile/${encodeURIComponent(decodeURIComponent(user))}`);
}
