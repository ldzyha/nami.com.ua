import { Metadata } from 'next';
import Image from 'next/image';
import { MetallicText, ProductTile, Icon } from '@/components/ui';
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
  description: 'Nami електросамокати — повна лінійка від Stellar до Burn-E MAX. Потужність до 8400W, гідравлічна підвіска, IPX5. Запас ходу до 150 км. Доставка по Україні.',
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
        {/* Hero */}
        <section className={styles.hero}>
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
              Орієнтовні ціни в USD.
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
              <a href="#catalog" className="btn-primary">Переглянути каталог</a>
              <a href="https://t.me/scootify_eco" target="_blank" rel="noopener noreferrer" className={styles.heroSecondary}>
                <Icon name="telegram" size="sm" />
                Консультація в Telegram
              </a>
            </div>
          </div>
        </section>

        {/* Catalog by Series */}
        <section id="catalog" className={styles.catalog}>
          {seriesInOrder.map((series) => {
            const seriesProducts = productsBySeries.get(series.id) || [];
            if (seriesProducts.length === 0) return null;

            return (
              <div key={series.id} id={series.id} className={styles.seriesSection}>
                <div className={styles.seriesHeader}>
                  {series.badge && <span className={styles.seriesBadge}>{series.badge}</span>}
                  <MetallicText variant="silver" as="h2" className={styles.seriesTitle}>
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

          <p style={{ textAlign: 'center', color: 'var(--foreground-muted)', fontSize: '13px', marginTop: '2rem' }}>
            Ціни орієнтовні. Остаточна вартість визначається після консультації з дистриб&apos;ютором.
          </p>

        </section>
      </div>
    </>
  );
}
