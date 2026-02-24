export interface ProductImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  isMain?: boolean;
}

export interface ProductSpecs {
  performance?: {
    maxSpeed?: number;
    maxSpeedLimited?: number;
    range?: number;
    maxIncline?: number;
    maxLoad?: number;
  };
  motor?: {
    count?: number;
    powerPerMotor?: number;
    totalPower?: number;
    type?: 'hub' | 'belt' | 'chain';
  };
  battery?: {
    voltage?: number;
    voltageMin?: number;
    capacity?: number;
    capacityMin?: number;
    wattHours?: number;
    cells?: string;
    chargeTime?: { min: number; max: number };
    chargerSpec?: string;
    waterRating?: 'IPX4' | 'IPX5' | 'IPX6' | 'IPX7';
  };
  physical?: {
    weight?: number;
    wheelSize?: number;
    wheelType?: 'pneumatic' | 'solid' | 'tubeless';
    foldable?: boolean;
    dimensions?: { length: number; width: number; height: number };
    foldedDimensions?: { length: number; width: number; height: number };
  };
  safety?: {
    waterRating?: 'IPX4' | 'IPX5' | 'IPX6' | 'IPX7';
    brakeType?: string;
    brakePistons?: number;
    suspensionFront?: 'none' | 'spring' | 'hydraulic';
    suspensionRear?: 'none' | 'spring' | 'hydraulic';
    suspensionAdjustable?: boolean;
  };
  features?: {
    display?: boolean;
    cruiseControl?: boolean;
    nfc?: boolean;
    app?: boolean;
    rgbLeds?: boolean;
    alarm?: boolean;
    alarmWithWheelLock?: boolean;
    regenerativeBrake?: boolean;
    turnSignals?: boolean;
    dualMotorMode?: boolean;
  };
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  stockCount?: number;
  specsOverride?: Partial<ProductSpecs>;
}

export interface ProductWarranty {
  months: number;
  batteryMonths?: number;
  conditions?: string;
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  brand: string;
  series?: string;
  model: string;
  shortDescription?: string;
  description?: string;
  categoryId: string;
  categoryIds?: string[];
  priceUsdCents: number;
  originalPriceUsdCents?: number;
  inStock: boolean;
  stockCount?: number;
  shippingDays: number;
  preorder?: boolean;
  hidden?: boolean;
  images: ProductImage[];
  videos?: string[];
  youtubeVideoId?: string;
  variants?: ProductVariant[];
  colors?: string[];
  colorImages?: Record<string, ProductImage[]>;
  specs?: ProductSpecs;
  warranty?: ProductWarranty;
  legalNotice?: string;
  relatedProducts?: string[];
  rating?: {
    average: number;
    count: number;
  };
}

export interface ProductTileData {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  priceUsdCents: number;
  originalPriceUsdCents?: number;
  thumbnail: string;
  hoverImage?: string;
  inStock?: boolean;
  specs?: {
    maxSpeed?: number;
    range?: number;
    voltage?: number;
    capacity?: number;
    totalPower?: number;
  };
}

export interface ProductVideo {
  id: string;
  type: 'youtube';
  thumbnail?: string;
  aspectRatio?: '16/9' | '9/16' | '4/3';
}

export const productVideos: Record<string, ProductVideo[]> = {
  'burn-e': [
    { id: 'wKsjiTfrD1o', type: 'youtube' },      // NAMI BURN-E Review — Electric Scooter Guide (EN)
  ],
  'burn-e-max': [
    { id: 'yoYfhevyPtI', type: 'youtube' },      // NAMI BURN-E 2 MAX REVIEW — Electric Scooter Guide (EN)
    { id: '-M6czG8cXzI', type: 'youtube' },       // BEST Electric Scooter: NAMI Burn-e 2 Review (EN)
  ],
  'blast': [
    { id: 'VBjoGNJlGrg', type: 'youtube' },      // Nami Blast Full Review — RIDE & GLIDE (EN)
    { id: 'JmuFAkJGJGo', type: 'youtube' },      // Nami Blast Review — WYRD RYDS (EN)
  ],
  'blast-max': [
    { id: 'bf4BmcJx5B8', type: 'youtube' },      // Nami Blast Max Review — Scoota Gang (EN)
    { id: 'gBJ3LdkxwMw', type: 'youtube' },      // Nami Blast Max Test Ride — Epic Cycles (EN)
  ],
  'klima': [
    { id: 'zO-xCCpHLrc', type: 'youtube' },      // Complete Nami Scooter Comparison Guide — RIDE & GLIDE (EN)
  ],
  'klima-max': [
    { id: 'zO-xCCpHLrc', type: 'youtube' },      // Complete Nami Scooter Comparison Guide — RIDE & GLIDE (EN)
  ],
  'klima-one': [
    { id: 'zO-xCCpHLrc', type: 'youtube' },      // Complete Nami Scooter Comparison Guide — RIDE & GLIDE (EN)
  ],
  'stellar': [
    { id: 'QRubJLoqSQA', type: 'youtube' },       // Nami Stellar Review — Electric Scooter Guide (EN)
  ],
  'super-stellar': [
    { id: '5dW1DSRWy-Q', type: 'youtube' },       // Nami Super Stellar Review — voromotors (EN)
    { id: 'IJws-GVNZb0', type: 'youtube' },       // Nami Super Stellar Review — ESG (EN)
  ],
};
