"use client";

import {
  Calendar,
  ChevronDown,
  MapPin,
  Pencil,
  Search,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { Event } from "@/types";

interface Props {
  events: Event[];
}

export default function EventsTable({ events }: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const years = [...new Set(events.map((e) => e.academicYear || 2025))].sort(
    (a, b) => b - a,
  );
  const [yearFilter, setYearFilter] = useState<number | null>(
    years.length > 0 ? years[0] : new Date().getFullYear(),
  );

  const filtered = events.filter((e) => {
    if (statusFilter && e.status !== statusFilter) return false;
    if (yearFilter && e.academicYear !== yearFilter) return false;
    if (search) {
      const s = search.toLowerCase();
      return (
        e.title.toLowerCase().includes(s) ||
        e.location.toLowerCase().includes(s)
      );
    }
    return true;
  });

  const statusColors: Record<string, string> = {
    running:
      "bg-red-50 text-red-700 border-red-100 dark:bg-red-950/20 dark:text-red-450 dark:border-red-900/25",
    upcoming:
      "bg-cyan-50 text-cyan-700 border-cyan-100 dark:bg-cyan-950/20 dark:text-cyan-400 dark:border-cyan-900/25",
    past: "bg-slate-50 text-slate-500 border-slate-200 dark:bg-slate-800/40 dark:text-slate-400 dark:border-slate-800/30",
  };

  return (
    <div>
      <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/10 flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search events by title or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:focus:ring-cyan-400/20 focus:border-cyan-500 dark:focus:border-cyan-400 transition-all shadow-sm"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex items-center">
            <select
              value={yearFilter ?? ""}
              onChange={(e) =>
                setYearFilter(e.target.value ? Number(e.target.value) : null)
              }
              className="appearance-none pl-4 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 dark:focus:border-cyan-400 transition-all cursor-pointer shadow-sm min-w-[120px]"
            >
              <option value="">All Years</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative flex items-center">
            <select
              value={statusFilter ?? ""}
              onChange={(e) => setStatusFilter(e.target.value || null)}
              className="appearance-none pl-4 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 dark:focus:border-cyan-400 transition-all cursor-pointer shadow-sm min-w-[140px]"
            >
              <option value="">All Status</option>
              <option value="running">Running</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
            <ChevronDown className="absolute right-3 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60">
              <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Event
              </th>
              <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Date &amp; Time
              </th>
              <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Location
              </th>
              <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Status
              </th>
              <th className="text-right px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {filtered.map((event) => (
              <tr
                key={event.id}
                className="hover:bg-slate-50/40 dark:hover:bg-slate-800/20 transition-colors"
              >
                <td className="px-6 py-4.5">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 overflow-hidden shrink-0 shadow-sm">
                      {event.image && (
                        <img
                          src={event.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white max-w-xs truncate">
                        {event.title}
                      </p>
                      {event.tags && event.tags.length > 0 && (
                        <div className="flex gap-1 mt-1.5">
                          {event.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 border border-cyan-100/50 dark:border-cyan-900/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4.5">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>{event.date}</span>
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 pl-6">
                    {event.time}
                  </p>
                </td>
                <td className="px-6 py-4.5">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="truncate max-w-[180px]">
                      {event.location}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4.5">
                  <span
                    className={`inline-flex px-2.5 py-0.5 rounded-lg text-xs font-semibold border capitalize ${statusColors[event.status] || ""}`}
                  >
                    {event.status}
                  </span>
                </td>
                <td className="px-6 py-4.5 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Link
                      href={`/admin/events/${event.id}/edit`}
                      className="p-2 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 rounded-xl transition-all"
                      aria-label="Edit Event"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    {confirmDelete === event.id ? (
                      <div className="flex items-center gap-1.5">
                        <form
                          action={`/api/events/${event.id}/delete`}
                          method="POST"
                        >
                          <button className="px-2.5 py-1 text-xs font-bold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors shadow-sm shadow-red-500/10 cursor-pointer">
                            Confirm
                          </button>
                        </form>
                        <button
                          onClick={() => setConfirmDelete(null)}
                          className="px-2.5 py-1 text-xs font-bold text-slate-650 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete(event.id)}
                        className="p-2 text-slate-400 hover:text-red-655 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all cursor-pointer"
                        aria-label="Delete Event"
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
        <div className="text-center py-16 bg-slate-50/10 dark:bg-slate-900/5">
          <p className="text-slate-400 dark:text-slate-600 text-sm">
            No events match your active filters
          </p>
        </div>
      )}

      <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/10 dark:bg-slate-900/5">
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">
          Showing {filtered.length} of {events.length} total events
        </p>
      </div>
    </div>
  );
}
