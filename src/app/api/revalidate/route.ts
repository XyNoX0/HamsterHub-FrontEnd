import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

type RevalidateBody = {
  secret?: string;
  username?: string;
  usernames?: string[];
};

function uniqueUsernames(body: RevalidateBody) {
  const values = [
    body.username,
    ...(Array.isArray(body.usernames) ? body.usernames : []),
  ];
  return Array.from(
    new Set(
      values
        .map((value) => (typeof value === "string" ? value.trim().toLowerCase() : ""))
        .filter(Boolean),
    ),
  );
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as RevalidateBody;
  const expected = process.env.WEB_REVALIDATE_SECRET;

  if (expected && body.secret !== expected) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const usernames = uniqueUsernames(body);
  revalidatePath("/profile");
  revalidatePath("/go/pro");
  for (const username of usernames) {
    revalidatePath(`/profile/${username}`);
    revalidatePath(`/go/pro/${username}`);
  }

  return NextResponse.json({
    success: true,
    revalidated: [
      "/profile",
      "/go/pro",
      ...usernames.flatMap((username) => [`/profile/${username}`, `/go/pro/${username}`]),
    ],
  });
}
