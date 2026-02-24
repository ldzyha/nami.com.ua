import { Header } from './Header';
import { Footer } from '@scootify/shared/components';
import {
  socialLinks,
  footerNavigation,
  footerContacts,
  footerFeatures,
  legalLinks,
} from '@/config/footer';

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <Footer
        tagline="Nami електросамокати — преміум клас"
        navigation={footerNavigation}
        contacts={footerContacts}
        socials={socialLinks}
        features={footerFeatures}
        legalLinks={legalLinks}
      />
    </>
  );
}
