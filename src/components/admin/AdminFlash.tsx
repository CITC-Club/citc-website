"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AdminAlert from "@/components/admin/AdminAlert";

const MESSAGES: Record<string, { variant: "success" | "error"; message: string }> =
  {
    saved: { variant: "success", message: "Your changes were saved successfully." },
    created: { variant: "success", message: "Created successfully." },
    deleted: { variant: "success", message: "Deleted successfully." },
    unauthorized: {
      variant: "error",
      message: "Your session expired. Please sign in again.",
    },
    team_has_members: {
      variant: "error",
      message:
        "This team still has members. Move or delete those members before removing the team.",
    },
    delete_failed: {
      variant: "error",
      message: "Could not complete the delete. Please try again.",
    },
  };

export default function AdminFlash() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const flash = searchParams.get("flash");
  const custom = searchParams.get("msg");
  const [shown, setShown] = useState(flash);

  useEffect(() => {
    setShown(flash);
  }, [flash]);

  useEffect(() => {
    if (!flash) return;
    const url = new URL(window.location.href);
    url.searchParams.delete("flash");
    url.searchParams.delete("msg");
    const t = window.setTimeout(() => {
      router.replace(url.pathname + url.search, { scroll: false });
    }, 8000);
    return () => window.clearTimeout(t);
  }, [flash, router]);

  if (!shown) return null;

  if (custom) {
    return (
      <AdminAlert
        variant="error"
        title="Something went wrong"
        message={decodeURIComponent(custom)}
      />
    );
  }

  const preset = MESSAGES[shown];
  if (!preset) return null;

  return (
    <AdminAlert
      variant={preset.variant}
      title={preset.variant === "success" ? "Done" : "Action needed"}
      message={preset.message}
    />
  );
}
