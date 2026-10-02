"use client";

import React, { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  Clock,
  ShieldCheck,
  Search,
  Trash2,
  PlusCircle,
} from "lucide-react";
import { showSuccess, showError } from "~/components/toast/sonner";
import { DynamicFooter } from "../../_components/footer/dynamic-footer";

export interface ContributorRecord {
  id: string;
  fullName: string;
  zeduUsername: string;
  githubRepoUrl: string;
  submittedAt: string;
}

const STORAGE_KEY = "zedu_flamingo_contributors";

const DEFAULT_CONTRIBUTORS: ContributorRecord[] = [
  {
    id: "flam-1",
    fullName: "Timothy Mayor",
    zeduUsername: "timothymayor",
    githubRepoUrl: "https://github.com/timothymayor/zedu-fe",
    submittedAt: "2026-09-28T14:32:00.000Z",
  },
  {
    id: "flam-2",
    fullName: "Layo Bright",
    zeduUsername: "layobright",
    githubRepoUrl: "https://github.com/zedu-hng/zedu-fe",
    submittedAt: "2026-09-29T10:15:00.000Z",
  },
  {
    id: "flam-3",
    fullName: "Alex Chen",
    zeduUsername: "alexchen",
    githubRepoUrl: "https://github.com/alexchen/zedu-workflow-engine",
    submittedAt: "2026-09-30T09:45:00.000Z",
  },
];

export default function FlamingoBoardPage() {
  const [fullName, setFullName] = useState("");
  const [zeduUsername, setZeduUsername] = useState("");
  const [githubRepoUrl, setGithubRepoUrl] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [contributors, setContributors] = useState<ContributorRecord[]>(DEFAULT_CONTRIBUTORS);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Load persisted contributors from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setContributors(parsed);
          return;
        }
      }
      // If no saved data, initialize storage with defaults
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CONTRIBUTORS));
    } catch {
      // fallback to state
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = fullName.trim();
    const trimmedUser = zeduUsername.trim().replace(/^@/, "");
    const trimmedUrl = githubRepoUrl.trim();

    if (!trimmedName) {
      showError("Please enter your full name");
      return;
    }
    if (!trimmedUser) {
      showError("Please enter your Zedu username");
      return;
    }
    if (!trimmedUrl) {
      showError("Please enter your GitHub repository URL");
      return;
    }

    // Format url if missing protocol
    let validUrl = trimmedUrl;
    if (!validUrl.startsWith("http://") && !validUrl.startsWith("https://")) {
      validUrl = `https://${validUrl}`;
    }

    const newEntry: ContributorRecord = {
      id: `flam-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      fullName: trimmedName,
      zeduUsername: trimmedUser,
      githubRepoUrl: validUrl,
      submittedAt: new Date().toISOString(),
    };

    // Prepend to contributors list
    const updatedList = [newEntry, ...contributors];
    setContributors(updatedList);

    // Persist to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      window.dispatchEvent(new Event("zedu_contributors_updated"));
    } catch {
      // ignore
    }

    // Reset form inputs
    setFullName("");
    setZeduUsername("");
    setGithubRepoUrl("");

    showSuccess(`Successfully added "${trimmedName}" to the contributors table!`);
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    showSuccess("GitHub repository link copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    const updated = contributors.filter((c) => c.id !== id);
    setContributors(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
    showSuccess("Contributor record removed");
  };

  const filteredContributors = contributors.filter((c) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      c.fullName.toLowerCase().includes(query) ||
      c.zeduUsername.toLowerCase().includes(query) ||
      c.githubRepoUrl.toLowerCase().includes(query)
    );
  });

  return (
    <div className="w-full min-h-screen bg-[#FAFAFC] pt-12 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Banner */}
        <div className="text-center space-y-3 pt-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7141F8]/20 bg-[#7141F8]/10 px-4 py-1 text-xs font-semibold text-[#7141F8]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Flamingo Contributor Registry</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
            Contributors Board
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-600">
            Submit your profile details below. Submissions are immediately displayed in the persistent table in the next section.
          </p>
        </div>

        {/* Section 1: Form Section */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between border-b border-neutral-100 pb-4">
            <div className="flex items-center gap-2.5">
              <PlusCircle className="h-5 w-5 text-[#7141F8]" />
              <h2 className="text-xl font-bold text-neutral-900">
                Add Your Contribution
              </h2>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end"
          >
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                required
                placeholder="e.g. Timothy Mayor"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-11 text-sm bg-neutral-50/50 border-neutral-300 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-700">
                Zedu Username <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                required
                placeholder="e.g. timothymayor"
                value={zeduUsername}
                onChange={(e) => setZeduUsername(e.target.value)}
                className="w-full h-11 text-sm bg-neutral-50/50 border-neutral-300 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-700">
                GitHub Repo URL <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                required
                placeholder="https://github.com/..."
                value={githubRepoUrl}
                onChange={(e) => setGithubRepoUrl(e.target.value)}
                className="w-full h-11 text-sm bg-neutral-50/50 border-neutral-300 focus:bg-white"
              />
            </div>

            <div className="md:col-span-3 flex justify-end pt-2">
              <Button
                type="submit"
                className="bg-primary-500 hover:bg-primary-600 text-white font-semibold h-11 px-8 rounded-xl shadow-sm text-sm"
              >
                Submit Contribution
              </Button>
            </div>
          </form>
        </div>

        {/* Section 2: Table Section (Always Visible) */}
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
          {/* Table Header Controls */}
          <div className="p-6 border-b border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-neutral-50/40">
            <div>
              <h2 className="text-xl font-bold text-neutral-900">
                Contributions Table ({contributors.length})
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Real-time output of all submitted contributors and repository links.
              </p>
            </div>

            {/* Live Search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, username, repo..."
                className="w-full h-10 pl-9 pr-4 rounded-xl border border-neutral-200 bg-white text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#7141F8]/30"
              />
            </div>
          </div>

          {/* Table Element */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-100/70 text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  <th className="py-4 px-6">Full Name</th>
                  <th className="py-4 px-6">Zedu Username</th>
                  <th className="py-4 px-6">GitHub Repo URL</th>
                  <th className="py-4 px-6">Date Submitted</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-sm">
                {filteredContributors.length > 0 ? (
                  filteredContributors.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-purple-50/20 transition-colors"
                    >
                      {/* Full Name */}
                      <td className="py-4 px-6 font-semibold text-neutral-900">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#7141F8] to-[#9E77ED] flex items-center justify-center text-white font-bold text-xs shadow-xs">
                            {item.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>
                          <span>{item.fullName}</span>
                        </div>
                      </td>

                      {/* Zedu Username */}
                      <td className="py-4 px-6 text-neutral-700">
                        <span className="inline-flex items-center rounded-md bg-[#7141F8]/10 px-2.5 py-1 text-xs font-semibold text-[#7141F8]">
                          @{item.zeduUsername.replace(/^@/, "")}
                        </span>
                      </td>

                      {/* GitHub Repo URL */}
                      <td className="py-4 px-6 max-w-sm truncate">
                        <a
                          href={item.githubRepoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#7141F8] hover:underline"
                        >
                          <span className="truncate">{item.githubRepoUrl}</span>
                          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
                        </a>
                      </td>

                      {/* Date Submitted */}
                      <td className="py-4 px-6 text-xs text-neutral-500 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-neutral-400" />
                          <span>
                            {item.submittedAt
                              ? new Date(item.submittedAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })
                              : "Just now"}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 justify-end">
                          <button
                            type="button"
                            onClick={() => handleCopyUrl(item.githubRepoUrl, item.id)}
                            title="Copy GitHub URL"
                            className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900 transition-colors"
                          >
                            {copiedId === item.id ? (
                              <Check className="h-4 w-4 text-emerald-600" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            title="Delete Row"
                            className="p-2 rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-12 px-6 text-center text-sm text-neutral-500"
                    >
                      {searchQuery
                        ? `No contributor matching "${searchQuery}"`
                        : "No contributions in the table yet. Fill the form above to add one!"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer Summary */}
          <div className="p-4 border-t border-neutral-100 bg-neutral-50/50 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-2">
            <span>
              Showing <strong>{filteredContributors.length}</strong> of{" "}
              <strong>{contributors.length}</strong> total registered contributions
            </span>
            <span>Persisted locally in your browser storage</span>
          </div>
        </div>

      </div>

      <div className="mt-16">
        <DynamicFooter
          text="Empowering Collaborative Learning"
          description="Connect and build together on the Zedu platform."
        />
      </div>
    </div>
  );
}
