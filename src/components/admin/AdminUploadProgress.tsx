'use client';

import {Check, Circle, Loader2} from 'lucide-react';

export type UploadProgressStepId =
  | 'selected'
  | 'compress'
  | 'upload'
  | 'done';

export interface UploadProgressStep {
  id: UploadProgressStepId;
  label: string;
}

const DEFAULT_STEPS: UploadProgressStep[] = [
  {id: 'selected', label: 'Image selected'},
  {id: 'compress', label: 'Converting to AVIF'},
  {id: 'upload', label: 'Uploading to storage'},
  {id: 'done', label: 'Ready to save'},
];

function stepIndex(id: UploadProgressStepId, steps: UploadProgressStep[]): number {
  return steps.findIndex((s) => s.id === id);
}

interface AdminUploadProgressProps {
  activeStep: UploadProgressStepId | null;
  fileName?: string;
  steps?: UploadProgressStep[];
  className?: string;
}

export default function AdminUploadProgress({
  activeStep,
  fileName,
  steps = DEFAULT_STEPS,
  className = '',
}: AdminUploadProgressProps) {
  if (!activeStep) return null;

  const activeIdx = stepIndex(activeStep, steps);

  return (
    <div
      className={`rounded-xl border border-sage/30 bg-sage-light/40 px-4 py-3 ${className}`}
      role="status"
      aria-live="polite"
    >
      {fileName ? (
        <p className="text-xs font-medium text-forest/70 truncate mb-2" title={fileName}>
          {fileName}
        </p>
      ) : null}
      <ol className="space-y-2">
        {steps.map((step, index) => {
          const done =
            activeStep === 'done' ? index <= activeIdx : index < activeIdx;
          const current = activeStep !== 'done' && step.id === activeStep;

          return (
            <li key={step.id} className="flex items-center gap-2.5 text-sm">
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  done ?
                    'bg-sage text-white' :
                    current ?
                    'bg-forest text-white dark:bg-citc-blue' :
                    'bg-stone/40 text-forest/40'
                }`}
              >
                {done ? (
                  <Check className="h-3 w-3" strokeWidth={2.5} />
                ) : current ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Circle className="h-2 w-2" fill="currentColor" strokeWidth={0} />
                )}
              </span>
              <span
                className={
                  done ?
                    'text-forest font-medium' :
                    current ?
                    'text-forest font-semibold' :
                    'text-forest/45'
                }
              >
                {step.label}
                {current && step.id === 'compress' ? '…' : ''}
                {current && step.id === 'upload' ? '…' : ''}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export const MEMBER_UPLOAD_STEPS: UploadProgressStep[] = [
  {id: 'selected', label: 'Photo selected'},
  {id: 'compress', label: 'Creating full photo & thumbnail'},
  {id: 'upload', label: 'Uploading to storage'},
  {id: 'done', label: 'Ready to save'},
];
