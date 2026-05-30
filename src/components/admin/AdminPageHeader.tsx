import {ChevronRight} from 'lucide-react';
import Link from 'next/link';
import type {ReactNode} from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  action?: ReactNode;
}

export default function AdminPageHeader({
  title,
  description,
  breadcrumbs,
  action,
}: AdminPageHeaderProps) {
  return (
    <div className="mb-6 md:mb-8 space-y-3">
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1 text-xs font-medium text-forest/50"
        >
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <span key={`${item.label}-${index}`} className="flex items-center gap-1">
                {index > 0 ? (
                  <ChevronRight className="h-3 w-3 shrink-0 text-stone" />
                ) : null}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-sage transition-colors rounded px-0.5"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? 'text-forest/70' : undefined}>
                    {item.label}
                  </span>
                )}
              </span>
            );
          })}
        </nav>
      ) : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-semibold text-forest tracking-tight">
            {title}
          </h1>
          {description ? (
            <p className="text-sm text-forest/60 max-w-2xl">{description}</p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  );
}
