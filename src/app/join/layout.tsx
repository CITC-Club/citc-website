import type {Metadata} from 'next';
import {createPageMetadata} from '@/lib/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Join CITC',
  description:
    'Apply to join the Computer Engineering Innovation & Tech Club at Nepal College of Information Technology.',
  path: '/join',
  ogImagePath: '/join/opengraph-image',
});

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
