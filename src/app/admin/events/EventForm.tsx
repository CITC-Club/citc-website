"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, X } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import type { Event } from "@/types";

interface Props {
  event?: Event;
}

export default function EventForm({ event }: Props) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState(event?.title || "");
  const [date, setDate] = useState(event?.date || "");
  const [time, setTime] = useState(event?.time || "");
  const [location, setLocation] = useState(event?.location || "");
  const [description, setDescription] = useState(event?.description || "");
  const [image, setImage] = useState(event?.image || "");
  const [status, setStatus] = useState<Event["status"]>(event?.status || "upcoming");
  const [registrationLink, setRegistrationLink] = useState(event?.registrationLink || "");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(event?.tags || []);

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");

    try {
      const { compressImageToAvif } = await import("@/utils/imageCompressor");
      const { blob, fileName: compressedName } = await compressImageToAvif(file, {
        maxWidth: 1200,
        quality: 75,
      });

      const uploadPath = `events/${Date.now()}-${compressedName}`;
      const { error: uploadError } = await supabase.storage
        .from("media")
        .upload(uploadPath, blob, {
          contentType: blob.type,
        });

      if (uploadError) {
        setError(uploadError.message);
        setUploading(false);
        return;
      }

      const { data: urlData } = supabase.storage.from("media").getPublicUrl(uploadPath);
      setImage(urlData.publicUrl);
    } catch (err: any) {
      setError(err.message || "Failed to compress or upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const id = event?.id || `e${Date.now()}`;
    const payload = {
      id,
      title,
      date,
      time,
      location,
      description,
      image,
      status,
      registrationLink: registrationLink || null,
      tags,
      gallery: null,
    };

    const url = event ? `/api/events/${event.id}` : "/api/events";
    const method = event ? "PUT" : "POST";
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

    router.push("/admin/events");
    router.refresh();
  };

  return (
    <div>
      <Link
        href="/admin/events"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Events
      </Link>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {event ? "Edit Event" : "Add New Event"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white pb-4 border-b border-slate-200 dark:border-slate-800">
            Event Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Title *</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Date *</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Time *</label>
              <input type="text" value={time} onChange={(e) => setTime(e.target.value)} required placeholder="e.g., 11:00 AM - 1:00 PM"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Location *</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Status *</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as Event["status"])}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                <option value="upcoming">Upcoming</option>
                <option value="running">Running</option>
                <option value="past">Past</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Registration Link</label>
              <input type="url" value={registrationLink} onChange={(e) => setRegistrationLink(e.target.value)} placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white pb-4 border-b border-slate-200 dark:border-slate-800">
            Cover Image
          </h2>

          <div className="flex items-start gap-6">
            <div className="w-40 h-28 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
              {image ? (
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <Upload className="w-8 h-8" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-400 cursor-pointer hover:border-cyan-500 transition-colors">
                <Upload className="w-4 h-4" />
                {uploading ? "Uploading..." : "Upload Image"}
                <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="hidden" />
              </label>
              <p className="text-xs text-slate-400 mt-1.5">Recommended: 1200x630px, .jpg or .png</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white pb-4 border-b border-slate-200 dark:border-slate-800">
            Description (Markdown)
          </h2>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Content *</label>
              <div className="relative">
                <div className="absolute top-3 left-3 flex gap-1">
                  <span className="px-2 py-0.5 text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 rounded">Markdown</span>
                </div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={16}
                  className="w-full px-4 pt-10 pb-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
            {description && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 max-h-48 overflow-y-auto">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Preview</p>
                <div className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap line-clamp-6">
                  {description.slice(0, 500)}
                  {description.length > 500 && "..."}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white pb-4 border-b border-slate-200 dark:border-slate-800">
            Tags
          </h2>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              placeholder="Type a tag and press Enter"
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button type="button" onClick={addTag}
              className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-medium rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              Add
            </button>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-900/10 text-cyan-700 dark:text-cyan-400 text-sm font-medium">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500 transition-colors">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
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
            {loading ? "Saving..." : event ? "Update Event" : "Create Event"}
          </button>
          <Link
            href="/admin/events"
            className="px-6 py-3 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
