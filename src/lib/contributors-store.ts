export interface ContributorSubmission {
  id: string;
  fullName: string;
  zeduUsername: string;
  githubRepoUrl: string;
  submittedAt: string;
  status?: "Active" | "Pending" | "Verified";
}

export const CONTRIBUTORS_STORAGE_KEY = "zedu_flamingo_contributors";

export const INITIAL_FLAMINGO_CONTRIBUTORS: ContributorSubmission[] = [
  {
    id: "flam-001",
    fullName: "Timothy Mayor",
    zeduUsername: "timothymayor",
    githubRepoUrl: "https://github.com/timothymayor/zedu-fe",
    submittedAt: "2026-09-28T14:32:00Z",
    status: "Verified",
  },
  {
    id: "flam-002",
    fullName: "Layo Bright",
    zeduUsername: "layobright",
    githubRepoUrl: "https://github.com/zedu-hng/zedu-fe",
    submittedAt: "2026-09-29T10:15:00Z",
    status: "Verified",
  },
  {
    id: "flam-003",
    fullName: "Alex Chen",
    zeduUsername: "alexchen",
    githubRepoUrl: "https://github.com/alexchen/zedu-workflow-engine",
    submittedAt: "2026-09-30T09:45:00Z",
    status: "Active",
  },
];

export function getContributors(): ContributorSubmission[] {
  if (typeof window === "undefined") {
    return INITIAL_FLAMINGO_CONTRIBUTORS;
  }

  try {
    const raw = localStorage.getItem(CONTRIBUTORS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(
        CONTRIBUTORS_STORAGE_KEY,
        JSON.stringify(INITIAL_FLAMINGO_CONTRIBUTORS)
      );
      return INITIAL_FLAMINGO_CONTRIBUTORS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return INITIAL_FLAMINGO_CONTRIBUTORS;
  } catch {
    return INITIAL_FLAMINGO_CONTRIBUTORS;
  }
}

export function addContributor(submission: Omit<ContributorSubmission, "id" | "submittedAt" | "status">): ContributorSubmission {
  const current = getContributors();
  const newEntry: ContributorSubmission = {
    id: `flam-${Date.now()}`,
    fullName: submission.fullName.trim(),
    zeduUsername: submission.zeduUsername.trim().replace(/^@/, ""),
    githubRepoUrl: submission.githubRepoUrl.trim(),
    submittedAt: new Date().toISOString(),
    status: "Verified",
  };

  const updated = [newEntry, ...current];
  if (typeof window !== "undefined") {
    localStorage.setItem(CONTRIBUTORS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("zedu_contributors_updated"));
  }

  return newEntry;
}
