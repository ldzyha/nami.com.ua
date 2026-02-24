import { Metadata } from 'next';
import { LegalPage } from '@scootify/shared/components';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Cookies | NAMI',
  description: 'Політика використання cookies на сайті NAMI.',
  alternates: { canonical: '/cookies/' },
  openGraph: {
    type: 'website',
    url: '/cookies/',
    siteName: 'NAMI',
    title: 'Cookies | NAMI',
    description: 'Політика використання cookies на сайті NAMI.',
  },
};

export default function CookiesPage() {
  return <LegalPage pageKey="cookies" siteConfig={siteConfig} showTOC />;
}
