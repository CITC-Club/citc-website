"use client";

import { useState } from "react";
import { resolveMediaUrl } from "@/lib/media";

const DEFAULT_FALLBACK = "/media/og-team.avif";

interface MediaImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string;
  fallbackSrc?: string;
}

export default function MediaImage({
  src,
  fallbackSrc = DEFAULT_FALLBACK,
  alt = "",
  className,
  ...rest
}: MediaImageProps) {
  const [imgSrc, setImgSrc] = useState(() => resolveMediaUrl(src));

  return (
    <img
      {...rest}
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (imgSrc !== fallbackSrc) setImgSrc(fallbackSrc);
      }}
    />
  );
}
