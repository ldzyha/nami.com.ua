import type { Product, ProductTileData } from '@/types/product';
import productsData from '@/../docs/nami-products.json';

const allProducts = productsData.products as Product[];
const products = allProducts.filter((p) => !p.hidden);

// Async wrappers (for Next.js async server components)
export async function getAllProductsAsync(): Promise<Product[]> { return products; }
export async function getProductBySlugAsync(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

// Sync versions
export function getAllProducts(): Product[] { return products; }
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
export function getAllProductSlugs(): string[] { return products.map((p) => p.slug); }
export async function getAllProductSlugsAsync(): Promise<string[]> {
  const allProds = await getAllProductsAsync();
  return allProds.map((p) => p.slug);
}

// Similar products: sorted by price proximity
export function getSimilarProducts(currentSlug: string, limit = 4): Product[] {
  const currentProduct = getProductBySlug(currentSlug);
  if (!currentProduct) return [];
  return products
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      const aDiff = Math.abs(a.priceUsdCents - currentProduct.priceUsdCents);
      const bDiff = Math.abs(b.priceUsdCents - currentProduct.priceUsdCents);
      return aDiff - bDiff;
    })
    .slice(0, limit);
}

// Convert to tile data (for grid cards)
export function productToTileData(product: Product): ProductTileData {
  const mainImage = product.images.find((img) => img.isMain) || product.images[0];
  const totalPower = product.specs?.motor?.count && product.specs?.motor?.powerPerMotor
    ? product.specs.motor.count * product.specs.motor.powerPerMotor
    : product.specs?.motor?.totalPower;
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    tagline: product.shortDescription,
    priceUsdCents: product.priceUsdCents,
    originalPriceUsdCents: product.originalPriceUsdCents,
    thumbnail: mainImage?.url || '/placeholder.webp',
    inStock: product.inStock,
    specs: {
      maxSpeed: product.specs?.performance?.maxSpeed,
      range: product.specs?.performance?.range,
      voltage: product.specs?.battery?.voltage,
      capacity: product.specs?.battery?.capacity,
      totalPower: totalPower,
    },
  };
}

// Search (name, brand, model, shortDescription)
export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return products.filter((p) =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.model.toLowerCase().includes(q) ||
    p.shortDescription?.toLowerCase().includes(q)
  );
}

// Group by series
export function getProductsBySeries(): Map<string, Product[]> {
  const map = new Map<string, Product[]>();
  for (const product of products) {
    const series = product.series || 'other';
    const list = map.get(series) || [];
    list.push(product);
    map.set(series, list);
  }
  return map;
}

// Series display config
export interface SeriesConfig {
  id: string;
  name: string;
  description: string;
  badge?: string;
}

const seriesConfigs: SeriesConfig[] = [
  { id: 'burn-e', name: 'Burn-E серія', description: 'Найспортивніші моделі лінійки. Карбонова колонка керма, гідравлічна підвіска KKE 165 мм та максимальна потужність для бездоріжжя та довгих подорожей.', badge: 'BURN-E' },
  { id: 'blast', name: 'Blast серія', description: 'Універсальний кросовер між містом та передмістям. Запатентована перевернута вилка, гідравлічна підвіска KKE 150 мм та до 100 км запасу ходу.', badge: 'BLAST' },
  { id: 'klima', name: 'Klima серія', description: 'Компактні та маневрені міські моделі. Гідравлічна підвіска, колеса 11 дюймів, NFC та поворотники — преміум для щоденних поїздок.', badge: 'KLIMA' },
  { id: 'stellar', name: 'Stellar серія', description: 'Найлегші та найдоступніші моделі Nami. Компактний формат, колеса 9 дюймів, складна конструкція — ідеально для міста та інтермодальності.', badge: 'STELLAR' },
];

export function getSeriesInOrder(): SeriesConfig[] { return seriesConfigs; }
export function getSeriesConfig(seriesId: string): SeriesConfig | undefined {
  return seriesConfigs.find((s) => s.id === seriesId);
}
