import { Prompt, Poppins } from "next/font/google";
import Navbar from "@/app/components/Navbar";
import { GoProAuthPanel } from "@/app/go/components/studio-profile/GoProAuthPanel";
import { ProDirectory } from "@/app/go/components/studio-profile/ProDirectory";
import { getDynamicProfileDirectory } from "@/app/go/lib/dynamic-profile";
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

type ProfileIndexProps = {
  searchParams?: Promise<{ page?: string; limit?: string }> | { page?: string; limit?: string };
};

export default async function ProfileIndex({ searchParams }: ProfileIndexProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params?.page) || 1);
  const requestedLimit = Number(params?.limit) || 30;
  const limit = Math.min(Math.max(requestedLimit, 1), 50);
  const directory = await getDynamicProfileDirectory({ page, limit });
  const members = directory?.members ?? [];

  return (
    <>
      <Navbar />
      <div className={`page-layout page-layout--siteNav ${prompt.variable} ${poppins.variable}`}>
        <main className="page-main page-main--standalone">
          <div className="page-scroll">
            <div className="page-container">
              <GoProAuthPanel />
              <ProDirectory
                members={members}
                pagination={directory ? {
                  total: directory.total,
                  page: directory.page,
                  limit: directory.limit,
                  totalPages: directory.totalPages,
                  hasNext: directory.hasNext,
                  hasPrev: directory.hasPrev,
                } : undefined}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
