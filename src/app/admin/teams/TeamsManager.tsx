"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Team } from "@/types";

interface Props {
  teams: Team[];
  countMap: Map<string, number>;
  years: number[];
}

const TEAM_TYPES = [
  { id: "t_patron", label: "Patron" },
  { id: "t_faculty", label: "Faculty Advisors" },
  { id: "t_mentors", label: "Mentors" },
  { id: "t_exec", label: "Executive Committee" },
];

export default function TeamsManager({ teams, countMap, years }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [newYear, setNewYear] = useState(new Date().getFullYear() + 1);
  const [newTeamId, setNewTeamId] = useState("t_exec");
  const [newTeamName, setNewTeamName] = useState("Executive Committee");
  const [error, setError] = useState("");

  const handleTeamTypeChange = (id: string) => {
    setNewTeamId(id);
    const t = TEAM_TYPES.find((t) => t.id === id);
    setNewTeamName(t?.label || id);
  };

  const createMutation = useMutation({
    mutationFn: async (payload: { id: string; name: string; year: number }) => {
      const res = await fetch("/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to create");
      }
    },
    onSuccess: () => {
      setShowForm(false);
      setError("");
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      router.refresh();
    },
    onError: (err: Error) => setError(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (teamId: string) => {
      const res = await fetch(`/api/teams/${teamId}/delete`, {
        method: "POST",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      router.refresh();
    },
  });

  const handleCreateTeam = async () => {
    const slug = `${newTeamId}_${newYear}`;
    const existing = teams.find((t) => t.id === slug);
    if (existing) {
      setError(`Team "${newTeamName} (${newYear})" already exists`);
      return;
    }
    createMutation.mutate({ id: slug, name: newTeamName, year: newYear });
  };

  const handleDeleteTeam = async (teamId: string, e: React.FormEvent) => {
    e.preventDefault();
    deleteMutation.mutate(teamId);
  };

  return (
    <div className="space-y-6">
      {years.map((year) => {
        const yearTeams = teams.filter((t) => t.year === year);
        return (
          <div
            key={year}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                {year} Teams
              </h2>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {yearTeams.map((team) => (
                <div
                  key={team.id}
                  className="px-6 py-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {team.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {countMap.get(team.id) || 0} members
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/members?team=${team.id}`}
                      className="px-3 py-1.5 text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors"
                    >
                      View Members
                    </Link>
                    <form
                      onSubmit={(e) => handleDeleteTeam(team.id, e)}
                    >
                      <button
                        type="submit"
                        disabled={deleteMutation.isPending}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Team for New Year
          </button>
        ) : (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Create New Team
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Team Type
                </label>
                <select
                  value={newTeamId}
                  onChange={(e) => handleTeamTypeChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
                >
                  {TEAM_TYPES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Year
                </label>
                <input
                  type="number"
                  value={newYear}
                  onChange={(e) => setNewYear(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
                />
              </div>
              <div className="flex items-end gap-2">
                <button
                  onClick={handleCreateTeam}
                  disabled={createMutation.isPending}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50"
                >
                  {createMutation.isPending ? "Creating..." : "Create"}
                </button>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setError("");
                  }}
                  className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
