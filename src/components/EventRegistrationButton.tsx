'use client';

import {ArrowRight} from 'lucide-react';

interface EventRegistrationButtonProps {
  href: string;
  className: string;
  iconClassName?: string;
  label?: string;
}

export default function EventRegistrationButton({
  href,
  className,
  iconClassName = 'w-4 h-4',
  label = 'Register Now',
}: EventRegistrationButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {label} <ArrowRight className={iconClassName} />
    </a>
  );
}
