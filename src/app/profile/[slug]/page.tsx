import { Prompt, Poppins } from "next/font/google";
import { redirect } from "next/navigation";
import { getDynamicProfileBySlug } from "@/app/go/lib/dynamic-profile";
import { getFeaturedGame } from "@/app/go/lib/members";
import type { AggregateMember } from "@/app/go/lib/members";
import { ProDetailClient } from "@/app/go/components/studio-profile/ProDetailClient";
import "@/app/go/page.css";
import "@/app/go/components/studio-profile/profile-page.css";

const prompt = Prompt({
  variable: "--font-prompt",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const dynamic = "force-dynamic";

function hidePrivateRecords(member: AggregateMember): AggregateMember {
  return {
    ...member,
    reports: [],
    certificates: [],
  };
}

export default async function ProDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const member = await getDynamicProfileBySlug(decodedSlug);

  if (!member) {
    redirect(`/profile?create=1&code=${encodeURIComponent(decodedSlug)}`);
  }

  const publicMember = hidePrivateRecords(member);
  const featured = getFeaturedGame(publicMember);

  return (
    <div className={`${prompt.variable} ${poppins.variable}`}>
      <ProDetailClient
        member={publicMember}
        featured={featured}
        dekhub={null}
        enableGamePopups={publicMember.games.some((game) => Boolean(game.videoUrl))}
      />
    </div>
  );
}
