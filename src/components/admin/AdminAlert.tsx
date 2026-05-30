'use client';

import {AlertCircle, CheckCircle2, Info, X} from 'lucide-react';
import {useState} from 'react';

type AlertVariant = 'success' | 'error' | 'info';

const styles: Record<
  AlertVariant,
  { box: string; icon: typeof CheckCircle2 }
> = {
  success: {
    box: 'bg-sage-light/80 border-sage/30 text-forest',
    icon: CheckCircle2,
  },
  error: {
    box: 'bg-terracotta/10 border-terracotta/25 text-forest',
    icon: AlertCircle,
  },
  info: {
    box: 'bg-clay-light/80 border-stone text-forest',
    icon: Info,
  },
};

interface AdminAlertProps {
  variant: AlertVariant;
  title?: string;
  message: string;
  dismissible?: boolean;
}

export default function AdminAlert({
  variant,
  title,
  message,
  dismissible = true,
}: AdminAlertProps) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const Icon = styles[variant].icon;

  return (
    <div
      role="alert"
      className={`mb-6 flex gap-3 rounded-xl border px-4 py-3 ${styles[variant].box}`}
    >
      <Icon className="h-5 w-5 shrink-0 mt-0.5 text-sage" strokeWidth={1.5} />
      <div className="flex-1 min-w-0 text-sm">
        {title ? <p className="font-semibold mb-0.5">{title}</p> : null}
        <p className="text-forest/80 leading-relaxed">{message}</p>
      </div>
      {dismissible ? (
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
