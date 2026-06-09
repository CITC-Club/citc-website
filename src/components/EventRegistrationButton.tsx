'use client';

import {ArrowRight} from 'lucide-react';
import Script from 'next/script';
import {getLumaEventId} from '@/lib/luma';

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
  const lumaEventId = getLumaEventId(href);

  if (lumaEventId) {
    return (
      <>
        <a
          href={href}
          className={`luma-checkout--button ${className}`}
          data-luma-action="checkout"
          data-luma-event-id={lumaEventId}
        >
          {label} <ArrowRight className={iconClassName} />
        </a>
        <Script
          id="luma-checkout"
          src="https://embed.lu.ma/checkout-button.js"
          strategy="afterInteractive"
        />
      </>
    );
  }

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
