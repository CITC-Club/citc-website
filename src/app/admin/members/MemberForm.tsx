"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import type { Team, Member } from "@/types";

interface Props {
  teams: Team[];
  member?: Member;
}

export default function MemberForm({ teams, member }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState(member?.name || "");
  const [type, setType] = useState(member?.type || "Executive");
  const [title, setTitle] = useState(member?.title || "");
  const [department, setDepartment] = useState(member?.department || "");
  const [email, setEmail] = useState(member?.email || "");
  const [photo, setPhoto] = useState(member?.photo || "");
  const [memberYear, setMemberYear] = useState(member?.memberYear || new Date().getFullYear());
  const [teamId, setTeamId] = useState(member?.teamId || "");
  const [collegeYear, setCollegeYear] = useState(member?.collegeYear || 1);
  const [github, setGithub] = useState(member?.socials?.github || "");
  const [linkedin, setLinkedin] = useState(member?.socials?.linkedin || "");
  const [instagram, setInstagram] = useState(member?.socials?.instagram || "");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileName = `members/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(fileName, file);
    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("media").getPublicUrl(fileName);
    setPhoto(urlData.publicUrl);
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      name,
      type,
      title: title || null,
      department: department || null,
      email,
      photo: photo || null,
      memberYear,
      teamId,
      collegeYear,
      socials: { github, linkedin, instagram },
    };

    const url = member ? `/api/members/${member.id}` : "/api/members";
    const method = member ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to save");
      setLoading(false);
      return;
    }

    router.push("/admin/members");
    router.refresh();
  };

  return (
    <div>
      <Link
        href="/admin/members"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Members
      </Link>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {member ? "Edit Member" : "Add New Member"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white pb-4 border-b border-slate-200 dark:border-slate-800">
            Basic Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name *</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email *</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                <option value="Executive">Executive</option>
                <option value="Patron">Patron</option>
                <option value="Faculty Advisor">Faculty Advisor</option>
                <option value="Mentor">Mentor</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Title (e.g., President)</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Department</label>
              <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white pb-4 border-b border-slate-200 dark:border-slate-800">
            Membership Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Team *</label>
              <select value={teamId} onChange={(e) => setTeamId(e.target.value)} required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                <option value="">Select team</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>{team.name} ({team.year})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Member Year *</label>
              <input type="number" value={memberYear} onChange={(e) => setMemberYear(Number(e.target.value))} required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">College Year</label>
              <select value={collegeYear} onChange={(e) => setCollegeYear(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                {[1, 2, 3, 4].map((y) => (
                  <option key={y} value={y}>Year {y}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white pb-4 border-b border-slate-200 dark:border-slate-800">
            Photo
          </h2>

          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
              {photo ? (
                <img src={photo} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <Upload className="w-6 h-6" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-400 cursor-pointer hover:border-cyan-500 transition-colors">
                <Upload className="w-4 h-4" />
                {uploading ? "Uploading..." : "Upload Photo"}
                <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="hidden" />
              </label>
              <p className="text-xs text-slate-400 mt-1.5">Recommended: 400x500px, .avif or .webp</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white pb-4 border-b border-slate-200 dark:border-slate-800">
            Social Links
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">GitHub URL</label>
              <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-cyan-500">
                <span className="px-3 text-slate-400 text-sm bg-slate-50 dark:bg-slate-800 py-2.5 border-r border-slate-300 dark:border-slate-700">gh/</span>
                <input type="text" value={github} onChange={(e) => setGithub(e.target.value)} placeholder="username"
                  className="flex-1 px-3 py-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">LinkedIn URL</label>
              <input type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Instagram URL</label>
              <input type="url" value={instagram} onChange={(e) => setInstagram(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 text-sm"
          >
            {loading ? "Saving..." : member ? "Update Member" : "Create Member"}
          </button>
          <Link
            href="/admin/members"
            className="px-6 py-3 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
