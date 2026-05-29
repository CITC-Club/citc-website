"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Search, Calendar, MapPin } from "lucide-react";
import type { Event } from "@/types";

interface Props {
  events: Event[];
}

export default function EventsTable({ events }: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = events.filter((e) => {
    if (statusFilter && e.status !== statusFilter) return false;
    if (search) {
      const s = search.toLowerCase();
      return e.title.toLowerCase().includes(s) || e.location.toLowerCase().includes(s);
    }
    return true;
  });

  const statusColors: Record<string, string> = {
    running: "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
    upcoming: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-400",
    past: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  };

  return (
    <div>
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <select
          value={statusFilter ?? ""}
          onChange={(e) => setStatusFilter(e.target.value || null)}
          className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300"
        >
          <option value="">All Status</option>
          <option value="running">Running</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Event</th>
              <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Date &amp; Time</th>
              <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Location</th>
              <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
              <th className="text-right px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((event) => (
              <tr
                key={event.id}
                className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0">
                      {event.image && (
                        <img src={event.image} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white max-w-xs truncate">
                        {event.title}
                      </p>
                      {event.tags && event.tags.length > 0 && (
                        <div className="flex gap-1 mt-1">
                          {event.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-cyan-50 dark:bg-cyan-900/10 text-cyan-600 dark:text-cyan-400">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{event.date}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{event.time}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{event.location}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[event.status] || ""}`}>
                    {event.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/events/${event.id}/edit`}
                      className="p-2 text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    {confirmDelete === event.id ? (
                      <div className="flex items-center gap-1">
                        <form action={`/api/events/${event.id}/delete`} method="POST">
                          <button className="px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-md hover:bg-red-600">
                            Confirm
                          </button>
                        </form>
                        <button onClick={() => setConfirmDelete(null)} className="px-2 py-1 text-xs font-semibold text-slate-600 bg-slate-200 dark:bg-slate-700 rounded-md hover:bg-slate-300">
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete(event.id)}
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
          <p className="text-slate-400 text-sm">No events found</p>
        </div>
      )}

      <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800">
        <p className="text-xs text-slate-400">{filtered.length} of {events.length} events</p>
      </div>
    </div>
  );
}
