import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type ProIndexProps = {
  searchParams?: Promise<{ page?: string; limit?: string }> | { page?: string; limit?: string };
};

export default async function ProIndex({ searchParams }: ProIndexProps) {
  const params = await searchParams;
  const query = new URLSearchParams();
  if (params?.page) query.set("page", params.page);
  if (params?.limit) query.set("limit", params.limit);
  redirect(`/profile${query.size ? `?${query.toString()}` : ""}`);
}
