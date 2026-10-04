"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Mail,
  Sparkles,
  Search,
  ArrowLeft,
} from "lucide-react";
import {
  ContributorSubmission,
  getContributors,
} from "~/lib/contributors-store";
import { DynamicFooter } from "../../_components/footer/dynamic-footer";

export default function ZeduFlamingoBoardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [contributors, setContributors] = useState<ContributorSubmission[]>([]);

  // Load persisted contributors on mount and subscribe to update events
  useEffect(() => {
    const loadData = () => {
      const saved = getContributors();
      setContributors(saved);
    };

    loadData();

    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener("zedu_contributors_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      window.removeEventListener("zedu_contributors_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const filteredContributors = contributors.filter((c) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      c.fullName.toLowerCase().includes(query) ||
      c.zeduUsername.toLowerCase().includes(query) ||
      c.emailAddress.toLowerCase().includes(query)
    );
  });

  return (
    <div className="w-full min-h-screen bg-[#FAFAFC] pt-10 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Banner */}
        <div className="text-center space-y-3 pt-6">
          <div className="flex items-center justify-center gap-2">
            <Link
              href="/contributors"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7141F8] hover:underline mr-2"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Contributors Form</span>
            </Link>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#7141F8]/20 bg-[#7141F8]/10 px-4 py-1 text-xs font-semibold text-[#7141F8]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Flamingo Contributor Registry</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
            Contributors Board
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-neutral-600">
            Live directory displaying all submitted contributors. Data is permanently persisted across sessions.
          </p>
        </div>

        {/* Section: Contributors Table */}
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
          {/* Table Header Controls */}
          <div className="p-6 border-b border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-neutral-50/40">
            <div>
              <h2 className="text-xl font-bold text-neutral-900">
                Contributors Table ({contributors.length})
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Permanently persisted submissions of registered contributors.
              </p>
            </div>

            {/* Live Search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, username, email..."
                className="w-full h-10 pl-9 pr-4 rounded-xl border border-neutral-200 bg-white text-xs text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#7141F8]/30"
              />
            </div>
          </div>

          {/* Table Element */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-100/70 text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  <th className="py-4 px-6">Full Names</th>
                  <th className="py-4 px-6">Zedu Username</th>
                  <th className="py-4 px-6">Zedu Email Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-sm">
                {filteredContributors.length > 0 ? (
                  filteredContributors.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-purple-50/20 transition-colors"
                    >
                      {/* Full Names */}
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

                      {/* Zedu Email Address */}
                      <td className="py-4 px-6 max-w-sm truncate">
                        <a
                          href={`mailto:${item.emailAddress}`}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#7141F8] hover:underline"
                        >
                          <Mail className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
                          <span className="truncate">{item.emailAddress}</span>
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-12 px-6 text-center text-sm text-neutral-500"
                    >
                      {searchQuery
                        ? `No contributor matching "${searchQuery}"`
                        : "No contributions in the table yet. Fill the form on the Contributors page to add one!"}
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
            <span>Persisted permanently in storage</span>
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
