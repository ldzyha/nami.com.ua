import Link from 'next/link';
import { MetallicText, MetallicLink, Icon } from '@/components/ui';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.code}>
          <MetallicText variant="brandText" as="span" className={styles.codeText}>
            404
          </MetallicText>
        </div>

        <MetallicText variant="silver" as="h1" className={styles.title}>
          Сторінку не знайдено
        </MetallicText>

        <p className={styles.description}>
          Схоже, ця сторінка переїхала або більше не існує. Поверніться до каталогу, щоб знайти потрібний самокат.
        </p>

        <MetallicLink
          href="/"
          variant="blue"
          size="md"
          renderLink={(props, children) => <Link {...props}>{children}</Link>}
        >
          <Icon name="chevronLeft" size="sm" />
          На головну
        </MetallicLink>

        <div className={styles.helpCard}>
          <div className={styles.helpInner}>
            <Icon name="phone" size="lg" metallic="blue" />
            <div className={styles.helpText}>
              <div className={styles.helpTitle}>Потрібна допомога?</div>
              <div className={styles.helpLinks}>
                <a href="tel:+380772770006" className={styles.helpLink}>+38 077 277 00 06</a>
                {' | '}
                <a href="https://t.me/scootify_eco" target="_blank" rel="noopener noreferrer" className={styles.helpLink}>Telegram</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
