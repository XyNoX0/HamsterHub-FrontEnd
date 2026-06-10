export interface GoProject {
  id: string;
  title: string;
  teamName: string;
  description: string;
  eventName: string;
  posterUrl: string;
  iconUrl: string;
  videoUrl: string;
  stats: { complexity: number; creativity: number; completeness: number; fun: number };
  teamMembers: { discordId: string; name: string; nickname: string; role: string; avatarUrl: string }[];
  achievements: string[];
  createdAt: string | null;
  updatedAt: string | null;
}

export interface FeaturedWorld {
  id: string;
  title: string;
  author: string;
  visits: string;
  posterSrc: string;
  thumbnailSrc: string;
  isHot?: boolean;
}

export interface ArenaGame {
  id: string;
  title: string;
  author: string;
  description: string;
  iconSrc: string;
  posterSrc: string;
  genre: string;
  stats: {
    complexity: number;
    creativity: number;
    completeness: number;
    fun: number;
  };
  teamMembers: any[];
  videoUrl: string;
  event?: string;
  achievements: string[];
}

export async function fetchProjects(): Promise<GoProject[]> {
  try {
    const res = await fetch("/api/go-projects", { cache: "no-store" });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.success) return [];
    return data.projects as GoProject[];
  } catch {
    return [];
  }
}

export const DiscoveryAPI = {
  async getFeaturedWorlds(): Promise<FeaturedWorld[]> {
    const projects = await fetchProjects();
    return projects.map(p => ({
      id: p.id,
      title: p.title,
      author: p.teamName,
      visits: "0",
      posterSrc: p.posterUrl,
      thumbnailSrc: p.posterUrl,
      isHot: p.achievements.includes("HOT"),
    }));
  },

  async getArenaGames(): Promise<ArenaGame[]> {
    const projects = await fetchProjects();
    return projects.map(p => ({
      id: p.id,
      title: p.title,
      author: p.teamName,
      description: p.description,
      iconSrc: p.iconUrl || p.posterUrl,
      posterSrc: p.posterUrl,
      genre: "Project",
      stats: p.stats,
      teamMembers: p.teamMembers.map(m => ({
        name: m.name || m.nickname,
        profileSrc: m.avatarUrl,
        roles: [m.role],
      })),
      videoUrl: p.videoUrl,
      event: p.eventName || undefined,
      achievements: p.achievements,
    }));
  },
};
