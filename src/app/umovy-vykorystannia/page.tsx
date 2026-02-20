import { Metadata } from 'next';
import { MetallicText } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Умови використання',
  description: 'Умови використання сайту NAMI.',
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
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 16px 80px' }}>
      <MetallicText variant="silver" as="h1" style={{ fontSize: '32px', fontWeight: 700, marginBottom: '32px' }}>
        Умови використання
      </MetallicText>
      <div style={{ color: 'var(--foreground-muted)', fontSize: '15px', lineHeight: 1.8 }}>
        <p>Використовуючи сайт nami.com.ua, ви погоджуєтесь з цими умовами.</p>
        <h2 style={{ color: 'var(--foreground)', fontSize: '18px', fontWeight: 600, marginTop: '24px' }}>Загальні положення</h2>
        <p>Сайт nami.com.ua надає інформацію про електросамокати Nami та послуги з їх продажу. Всі матеріали сайту є власністю NAMI.</p>
        <h2 style={{ color: 'var(--foreground)', fontSize: '18px', fontWeight: 600, marginTop: '24px' }}>Ціни та наявність</h2>
        <p>Ціни вказані в гривнях та доларах США. Ціни можуть змінюватись без попереднього повідомлення. Актуальну ціну уточнюйте у менеджера.</p>
        <h2 style={{ color: 'var(--foreground)', fontSize: '18px', fontWeight: 600, marginTop: '24px' }}>Обмеження відповідальності</h2>
        <p>NAMI не несе відповідальності за неправильне використання продукції. Електросамокати є транспортними засобами підвищеної небезпеки.</p>
      </div>
    </div>
  );
}
