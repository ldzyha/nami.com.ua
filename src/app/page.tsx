import { Metadata } from 'next';
import Image from 'next/image';
import { MetallicText, MetallicButton, MetallicCard, ProductTile } from '@/components/ui';
import { CallbackSection } from '@/components/ui/CallbackSection';
import { getAllProductsAsync, productToTileData, getProductsBySeries, getSeriesInOrder } from '@/lib/products';
import { initExchangeRate } from '@scootify/shared/lib/currency';
import {
  generateWebPageSchema,
  generateItemListSchema,
  combineSchemas,
} from '@/lib/jsonld';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'NAMI | Електросамокати преміум класу — купити в Україні',
  description: 'Nami електросамокати — повна лінійка від Stellar до Burn-E MAX. Потужність до 8400W, гідравлічна підвіска, IPX5. Запас ходу до 150 км. Характеристики та огляди.',
  alternates: { canonical: '/' },
};

export default async function HomePage() {
  await initExchangeRate();
  const allProducts = await getAllProductsAsync();
  const productsBySeries = getProductsBySeries();
  const seriesInOrder = getSeriesInOrder();
  const heroProduct = allProducts[0];
  const heroImage = heroProduct?.images.find((img) => img.isMain) || heroProduct?.images[0];

  const homePageJsonLd = combineSchemas(
    generateWebPageSchema({
      title: 'NAMI | Електросамокати преміум класу',
      description: 'Nami електросамокати — повна лінійка від Stellar до Burn-E MAX. До 8400W потужності.',
      path: '/',
    }),
    generateItemListSchema(
      allProducts.map((p) => ({
        name: p.name,
        slug: p.slug,
        thumbnail: p.images.find((img) => img.isMain)?.url || p.images[0]?.url || '/placeholder.webp',
        priceUsdCents: p.priceUsdCents,
      })),
      'Nami електросамокати',
      '/'
    )
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd) }}
      />
      <div className={styles.page}>

        {/* ===== Hero ===== */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>NAMI ELECTRIC SCOOTERS 2026</div>
              <h1 className={styles.heroTitle}>
                <MetallicText variant="silver" as="span">КОМФОРТ.</MetallicText>
                <br />
                <MetallicText variant="silver" as="span">ПОТУЖНІСТЬ.</MetallicText>
                <br />
                <MetallicText variant="brandText" as="span">ПРЕМІУМ.</MetallicText>
              </h1>
              <p className={styles.heroSubtitle}>
                Повна лінійка Nami Electric — від компактного Stellar до флагманського Burn-E MAX.
                Гідравлічна підвіска, NFC, IPX5 захист, до 8400W потужності. 9 моделей на будь-який стиль їзди.
              </p>

              {heroProduct && heroImage && (
                <div className={styles.heroImageWrap}>
                  <Image
                    src={heroImage.url}
                    alt={heroProduct.name}
                    width={600}
                    height={450}
                    className={styles.heroImage}
                    priority
                  />
                </div>
              )}

              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>8 400W</span>
                  <span className={styles.statLabel}>Потужність</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>95 км/год</span>
                  <span className={styles.statLabel}>Швидкість</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>150 км</span>
                  <span className={styles.statLabel}>Запас ходу</span>
                </div>
              </div>
              <div className={styles.heroCTA}>
                <a href="#catalog" className={styles.ctaLink}>
                  <MetallicButton variant="brandBg" size="lg">
                    Переглянути каталог
                  </MetallicButton>
                </a>
                <a href="https://t.me/scootify_eco" target="_blank" rel="noopener noreferrer" className={styles.ctaLink}>
                  <MetallicButton variant="silver" size="lg">
                    Написати в Telegram
                  </MetallicButton>
                </a>
              </div>
            </div>

            {/* Contact card */}
            <div className={styles.heroSide}>
              <MetallicCard variant="blue" className={styles.contactCard}>
                <div className={styles.contactCardTitle}>Безкоштовна консультація</div>
                <p className={styles.contactCardText}>
                  Підберемо оптимальну модель Nami під ваш запит. З&apos;єднаємо з офіційним дистриб&apos;ютором.
                </p>
                <div className={styles.contactCardLinks}>
                  <a
                    href="https://t.me/scootify_eco"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactLink}
                  >
                    <span className={styles.contactLinkIcon}>✈</span>
                    <div>
                      <div className={styles.contactLinkTitle}>Telegram</div>
                      <div className={styles.contactLinkSub}>@scootify_eco</div>
                    </div>
                  </a>
                  <a href="tel:+380772770006" className={styles.contactLink}>
                    <span className={styles.contactLinkIcon}>📞</span>
                    <div>
                      <div className={styles.contactLinkTitle}>Телефон</div>
                      <div className={styles.contactLinkSub}>+38 077 277 00 06</div>
                    </div>
                  </a>
                </div>
              </MetallicCard>
            </div>
          </div>
        </section>

        {/* ===== Why Choose Us ===== */}
        <section className={styles.whySection}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <MetallicText variant="silver" as="h2" className={styles.sectionTitle}>
                Чому Nami?
              </MetallicText>
              <p className={styles.sectionSubtitle}>
                Преміальна якість збірки, передові технології та повна лінійка на будь-який стиль їзди
              </p>
            </div>
            <div className={styles.featuresGrid}>
              <MetallicCard variant="blue">
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>🏎️</div>
                  <h3 className={styles.featureTitle}>Гідравлічна підвіска</h3>
                  <p className={styles.featureText}>
                    Преміальна гідравліка на флагманських моделях для максимального комфорту на будь-якому дорожньому покритті.
                  </p>
                </div>
              </MetallicCard>
              <MetallicCard variant="silver">
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>📱</div>
                  <h3 className={styles.featureTitle}>NFC та додаток</h3>
                  <p className={styles.featureText}>
                    Розблокування через NFC, управління через мобільний додаток, антикрадіжний захист.
                  </p>
                </div>
              </MetallicCard>
              <MetallicCard variant="gold">
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>💧</div>
                  <h3 className={styles.featureTitle}>IPX5 водозахист</h3>
                  <p className={styles.featureText}>
                    Захищений від дощу та бруду. Їздіть у будь-яку погоду без хвилювань за електроніку.
                  </p>
                </div>
              </MetallicCard>
              <MetallicCard variant="silver">
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>🔋</div>
                  <h3 className={styles.featureTitle}>До 150 км запасу</h3>
                  <p className={styles.featureText}>
                    Флагманський Burn-E MAX забезпечує запас ходу до 150 км на одному заряді батареї.
                  </p>
                </div>
              </MetallicCard>
              <MetallicCard variant="blue">
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>🛡️</div>
                  <h3 className={styles.featureTitle}>Офіційна гарантія</h3>
                  <p className={styles.featureText}>
                    Гарантія від офіційного дистриб&apos;ютора Nami в Україні відповідно до умов виробника.
                  </p>
                </div>
              </MetallicCard>
              <MetallicCard variant="gold">
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>🤝</div>
                  <h3 className={styles.featureTitle}>Безкоштовна консультація</h3>
                  <p className={styles.featureText}>
                    Підберемо модель під ваш бюджет та стиль їзди і з&apos;єднаємо з офіційним дистриб&apos;ютором.
                  </p>
                </div>
              </MetallicCard>
            </div>
          </div>
        </section>

        {/* ===== Catalog by Series ===== */}
        <section id="catalog" className={styles.catalog}>
          <div className={styles.catalogHeader}>
            <MetallicText variant="silver" as="h2" className={styles.catalogTitle}>
              Каталог Nami
            </MetallicText>
            <p className={styles.catalogSubtitle}>
              Повна лінійка електросамокатів — від міських до флагманських
            </p>
          </div>
          {seriesInOrder.map((series) => {
            const seriesProducts = productsBySeries.get(series.id) || [];
            if (seriesProducts.length === 0) return null;

            return (
              <div key={series.id} id={series.id} className={styles.seriesSection}>
                <div className={styles.seriesHeader}>
                  {series.badge && <span className={styles.seriesBadge}>{series.badge}</span>}
                  <MetallicText variant="silver" as="h3" className={styles.seriesTitle}>
                    {series.name}
                  </MetallicText>
                  <p className={styles.seriesDescription}>{series.description}</p>
                </div>
                <div className={styles.productGrid}>
                  {seriesProducts.map((product) => (
                    <ProductTile
                      key={product.id}
                      product={productToTileData(product)}
                      purchaseModel="consultation"
                    />
                  ))}
                </div>
              </div>
            );
          })}

          <p className={styles.disclaimer}>
            Ціни орієнтовні та наведені для порівняння моделей. Фінальна вартість — у офіційного дистриб&apos;ютора.
          </p>
        </section>

        {/* ===== Callback Section ===== */}
        <section className={styles.callbackSection}>
          <div className={styles.sectionContainer}>
            <CallbackSection />
          </div>
        </section>

        {/* ===== Final CTA ===== */}
        <section className={styles.finalCta}>
          <div className={styles.sectionContainer}>
            <MetallicText variant="silver" as="h2" className={styles.ctaTitle}>
              Готові вибрати свій Nami?
            </MetallicText>
            <p className={styles.ctaText}>
              Ми безкоштовно підберемо ідеальну модель та з&apos;єднаємо вас з офіційним дистриб&apos;ютором
            </p>
            <div className={styles.ctaButtons}>
              <a href="#catalog" className={styles.ctaLink}>
                <MetallicButton variant="brandBg" size="lg">
                  Переглянути каталог
                </MetallicButton>
              </a>
              <a href="https://t.me/scootify_eco" target="_blank" rel="noopener noreferrer" className={styles.ctaLink}>
                <MetallicButton variant="silver" size="lg">
                  Написати в Telegram
                </MetallicButton>
              </a>
            </div>
            <div className={styles.trustRow}>
              <span className={styles.trustItem}>✓ Безкоштовна консультація</span>
              <span className={styles.trustItem}>✓ Офіційна гарантія</span>
              <span className={styles.trustItem}>✓ Доставка по Україні</span>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
