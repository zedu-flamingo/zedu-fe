"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Input } from "~/components/ui/input";

interface Contributor {
  id: string;
  fullName: string;
  zeduUsername: string;
  githubRepoUrl: string;
}

export default function FlamingoBoardPage() {
  const [fullName, setFullName] = useState("");
  const [zeduUsername, setZeduUsername] = useState("");
  const [githubRepoUrl, setGithubRepoUrl] = useState("");
  const [contributors, setContributors] = useState<Contributor[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !zeduUsername.trim() || !githubRepoUrl.trim()) {
      alert("Please fill in all fields");
      return;
    }

    const newContributor: Contributor = {
      id: Date.now().toString(),
      fullName: fullName.trim(),
      zeduUsername: zeduUsername.trim(),
      githubRepoUrl: githubRepoUrl.trim(),
    };

    setContributors([...contributors, newContributor]);

    // Reset form
    setFullName("");
    setZeduUsername("");
    setGithubRepoUrl("");
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-blue-50/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-neutral-900 sm:text-5xl">
            Contributors Board
          </h1>
          <p className="mt-4 text-lg text-neutral-600">
            Join our community of contributors and share your GitHub projects
          </p>
        </div>

        {/* Form Section */}
        <div className="mb-12 rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-6 text-2xl font-semibold text-neutral-900">
            Add Your Contribution
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:gap-3 sm:items-end">
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Full Name
              </label>
              <Input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                Zedu Username
              </label>
              <Input
                type="text"
                placeholder="Enter your Zedu username"
                value={zeduUsername}
                onChange={(e) => setZeduUsername(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium text-neutral-700">
                GitHub Repo URL
              </label>
              <Input
                type="url"
                placeholder="https://github.com/..."
                value={githubRepoUrl}
                onChange={(e) => setGithubRepoUrl(e.target.value)}
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              className="bg-primary-500 hover:bg-primary-400 text-white font-medium px-6 py-2.5 rounded-full"
            >
              Submit
            </Button>
          </form>
        </div>

        {/* Table Section */}
        {contributors.length > 0 && (
          <div className="rounded-lg bg-white shadow-md overflow-hidden">
            <div className="p-8">
              <h2 className="mb-6 text-2xl font-semibold text-neutral-900">
                Contributions ({contributors.length})
              </h2>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-neutral-700 font-semibold">
                        Full Name
                      </TableHead>
                      <TableHead className="text-neutral-700 font-semibold">
                        Zedu Username
                      </TableHead>
                      <TableHead className="text-neutral-700 font-semibold">
                        GitHub Repo URL
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contributors.map((contributor) => (
                      <TableRow key={contributor.id}>
                        <TableCell className="text-neutral-800">
                          {contributor.fullName}
                        </TableCell>
                        <TableCell className="text-neutral-800">
                          {contributor.zeduUsername}
                        </TableCell>
                        <TableCell className="text-neutral-800">
                          <a
                            href={contributor.githubRepoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-500 hover:underline"
                          >
                            {contributor.githubRepoUrl}
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {contributors.length === 0 && (
          <div className="rounded-lg bg-blue-50/50 border border-blue-200 p-8 text-center">
            <p className="text-neutral-600">
              No contributions yet. Add your first contribution above!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
