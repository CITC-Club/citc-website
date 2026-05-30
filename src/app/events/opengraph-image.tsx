import { renderOgImage } from "@/lib/og-image";

export const alt = "CITC Events";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    title: "CITC Events",
    subtitle: "Workshops, competitions, and club activities",
    label: "Events",
  });
}
