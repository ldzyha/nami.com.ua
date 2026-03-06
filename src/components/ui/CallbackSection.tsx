'use client';

import { CallbackRequest } from '@/components/ui';

const FIREBASE_FUNCTION_URL = 'https://order-tcq2t3iwxq-lm.a.run.app';
const SITE_NAME = 'NAMI.COM.UA';

async function sendToTelegram(phone: string): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(FIREBASE_FUNCTION_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerPhone: phone,
        isCallback: true,
        items: [],
        total: 0,
        siteName: SITE_NAME,
      }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) return { success: false, error: 'Помилка. Напишіть нам у Telegram.' };
    return { success: true };
  } catch {
    return { success: false, error: 'Помилка. Напишіть нам у Telegram.' };
  }
}

interface CallbackSectionProps {
  title?: string;
  subtitle?: string;
  privacyUrl?: string;
}

export function CallbackSection({
  title = 'Підберемо Nami для вас',
  subtitle = 'Залиште номер — наш менеджер зателефонує та допоможе з вибором моделі',
  privacyUrl = '/polityka-konfidentsiinosti/',
}: CallbackSectionProps) {
  return (
    <CallbackRequest
      title={title}
      subtitle={subtitle}
      onSubmit={sendToTelegram}
      privacyUrl={privacyUrl}
    />
  );
}
