import {renderOgImage} from '@/lib/og-image';

export const alt = 'Join CITC';
export const size = {width: 1200, height: 630};
export const contentType = 'image/png';

export default function Image() {
  return renderOgImage({
    title: 'Join CITC',
    subtitle: 'Become part of the tech community at NCIT',
    label: 'Membership',
  });
}
