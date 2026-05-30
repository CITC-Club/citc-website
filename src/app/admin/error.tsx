'use client';

import {AlertCircle, RefreshCw} from 'lucide-react';
import Link from 'next/link';
import {useEffect} from 'react';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-14 h-14 rounded-2xl bg-terracotta/10 flex items-center justify-center text-terracotta mb-6">
        <AlertCircle className="w-7 h-7" strokeWidth={1.5} />
      </div>
      <h2 className="text-xl font-semibold text-forest mb-2">
        Something went wrong
      </h2>
      <p className="text-sm text-forest/60 max-w-md mb-8">
        The admin page could not load. Your data is still safe. Try again, or go
        back to the dashboard.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-xl bg-forest px-4 py-2.5 text-sm font-semibold text-white hover:bg-forest/90 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Try again
        </button>
        <Link
          href="/admin"
          className="inline-flex items-center rounded-xl border border-stone px-4 py-2.5 text-sm font-semibold text-forest hover:bg-clay-light/50 transition-colors"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
