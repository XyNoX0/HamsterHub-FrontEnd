import { Prompt, Poppins } from "next/font/google";
import { LineProfileResolver } from "@/app/go/components/studio-profile/LineProfileResolver";
import "@/app/go/page.css";

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

type ProfileMeProps = {
  searchParams?: Promise<{ tab?: string }> | { tab?: string };
};

export default async function ProfileMe({ searchParams }: ProfileMeProps) {
  const params = await searchParams;
  return (
    <div className={`${prompt.variable} ${poppins.variable}`}>
      <LineProfileResolver tab={params?.tab || "profile"} />
    </div>
  );
}
