'use client';

import {useEffect, useRef} from 'react';
import {X} from 'lucide-react';
import {motion, AnimatePresence} from 'framer-motion';
import MemberProfileContent from '@/components/MemberProfileContent';
import type {Member, Team} from '@/types';

interface MemberProfileModalProps {
  member: Member | null;
  team: Team | null;
  open: boolean;
  onClose: () => void;
}

export default function MemberProfileModal({
  member,
  team,
  open,
  onClose,
}: MemberProfileModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && member ? (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.button
            type="button"
            aria-label="Close profile"
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="member-profile-title"
            className="relative z-10 w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[88vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white dark:bg-citc-navy shadow-2xl border border-slate-200 dark:border-white/10"
            initial={{opacity: 0, y: 40}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 24}}
            transition={{type: 'spring', stiffness: 380, damping: 32}}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-20 flex justify-end p-3 sm:p-4 bg-white/90 dark:bg-citc-navy/90 backdrop-blur-md border-b border-slate-100 dark:border-white/5">
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-slate-500 hover:text-citc-navy dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-citc-blue"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 sm:p-8 pt-2">
              <MemberProfileContent member={member} team={team} />
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
