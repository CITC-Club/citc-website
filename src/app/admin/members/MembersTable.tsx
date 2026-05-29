"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Search, ChevronDown } from "lucide-react";
import type { Member, Team } from "@/types";

interface Props {
  members: Member[];
  teams: Team[];
  teamMap: Map<string, string>;
  years: number[];
}

export default function MembersTable({ members, teams, teamMap, years }: Props) {
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState<number | null>(null);
  const [teamFilter, setTeamFilter] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const filtered = members.filter((m) => {
    if (yearFilter && m.memberYear !== yearFilter) return false;
    if (teamFilter && m.teamId !== teamFilter) return false;
    if (search) {
      const s = search.toLowerCase();
      return (
        m.name.toLowerCase().includes(s) ||
        m.email.toLowerCase().includes(s) ||
        (m.department?.toLowerCase().includes(s) ?? false)
      );
    }
    return true;
  });

  return (
    <div>
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <div className="flex gap-3">
          <select
            value={yearFilter ?? ""}
            onChange={(e) => setYearFilter(e.target.value ? Number(e.target.value) : null)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300"
          >
            <option value="">All Years</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <select
            value={teamFilter ?? ""}
            onChange={(e) => setTeamFilter(e.target.value || null)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300"
          >
            <option value="">All Teams</option>
            {teams.map((t) => (
              <option key={t.id} value={t.id}>{t.name} ({t.year})</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Name</th>
              <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Team</th>
              <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Year</th>
              <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Type</th>
              <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">College Year</th>
              <th className="text-right px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((member) => (
              <tr
                key={member.id}
                className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{member.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    {teamMap.get(member.teamId) || member.teamId}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-400">
                    {member.memberYear}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{member.type}</td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                  {member.collegeYear ? `Year ${member.collegeYear}` : "-"}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/members/${member.id}/edit`}
                      className="p-2 text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    {confirmDelete === member.id ? (
                      <div className="flex items-center gap-1">
                        <form action={`/api/members/${member.id}/delete`} method="POST">
                          <button className="px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-md hover:bg-red-600">
                            Confirm
                          </button>
                        </form>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="px-2 py-1 text-xs font-semibold text-slate-600 bg-slate-200 dark:bg-slate-700 rounded-md hover:bg-slate-300"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete(member.id)}
                        className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-sm">No members found</p>
        </div>
      )}

      <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800">
        <p className="text-xs text-slate-400">{filtered.length} of {members.length} members</p>
      </div>
    </div>
  );
}
