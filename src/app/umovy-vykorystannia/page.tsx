import { Metadata } from 'next';
import { LegalPage } from '@scootify/shared/components';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Умови використання | NAMI',
  description: 'Умови використання сайту NAMI — консультаційний сервіс з підбору електросамокатів.',
  alternates: { canonical: '/umovy-vykorystannia/' },
  openGraph: {
    type: 'website',
    url: '/umovy-vykorystannia/',
    siteName: 'NAMI',
    title: 'Умови використання | NAMI',
    description: 'Умови використання сайту NAMI.',
  },
};

export default function TermsPage() {
  return <LegalPage pageKey="terms" siteConfig={siteConfig} showTOC />;
}
