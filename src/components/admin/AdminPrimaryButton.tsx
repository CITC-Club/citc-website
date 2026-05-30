import type { ReactNode } from "react";
import Link from "next/link";

interface AdminPrimaryButtonProps {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
}

export default function AdminPrimaryButton({
  href,
  children,
  icon,
}: AdminPrimaryButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-forest px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-forest/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/50 active:scale-[0.98]"
    >
      {icon}
      {children}
    </Link>
  );
}
