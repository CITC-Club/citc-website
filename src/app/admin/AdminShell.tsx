"use client";

import Sidebar from "@/components/admin/Sidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <div className="pl-64">
        <main className="p-6 md:p-8 max-w-6xl">{children}</main>
      </div>
    </div>
  );
}
