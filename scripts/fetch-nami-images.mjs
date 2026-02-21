#!/usr/bin/env node
/**
 * Fetch and optimize Nami Electric product images from nami-electric.com
 * Generates responsive WebP variants: lg (1200px), md (800px), sm (400px)
 */

import fs from 'fs/promises';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');
const OUTPUT_DIR = join(ROOT_DIR, 'public', 'products', 'nami');

const SIZES = { lg: 1200, md: 800, sm: 400 };
const WEBP_QUALITY = 85;

const products = [
  {
    slug: 'burn-e',
    sources: [
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/Groupe-de-masques-7@2x-1.png', name: 'burn-e-main' },
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/burn-e-2-min.png', name: 'burn-e-side' },
    ],
  },
  {
    slug: 'burn-e-max',
    sources: [
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/Groupe-de-masques-7@2x-6.png', name: 'burn-e-max-main' },
    ],
  },
  {
    slug: 'blast',
    sources: [
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/Groupe-de-masques-14@2x.png', name: 'blast-main' },
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/blast-1.png', name: 'blast-side' },
    ],
  },
  {
    slug: 'blast-max',
    sources: [
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/Groupe-de-masques-14@2x-1.png', name: 'blast-max-main' },
    ],
  },
  {
    slug: 'klima',
    sources: [
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/Groupe-de-masques-7@2x-2.png', name: 'klima-main' },
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/klima-2-min.png', name: 'klima-side' },
    ],
  },
  {
    slug: 'klima-max',
    sources: [
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/Groupe-de-masques-7@2x-5.png', name: 'klima-max-main' },
    ],
  },
  {
    slug: 'klima-one',
    sources: [
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/Groupe-de-masques-7@2x-4.png', name: 'klima-one-main' },
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/klima-one-1-min.png', name: 'klima-one-side' },
    ],
  },
  {
    slug: 'stellar',
    sources: [
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/Groupe-de-masques-7@2x-3.png', name: 'stellar-main' },
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/Stellar-1-min.png', name: 'stellar-side' },
    ],
  },
  {
    slug: 'super-stellar',
    sources: [
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/Groupe-de-masques-7@2x-7.png', name: 'super-stellar-main' },
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/super-stellar-1-min.png', name: 'super-stellar-side' },
    ],
  },
];

/**
 * Fetch image from URL with retries
 */
async function fetchImage(url, retries = 2) {
  console.log(`  Fetching: ${basename(url)}`);
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'image/*',
        },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return Buffer.from(await response.arrayBuffer());
    } catch (err) {
      if (attempt === retries) throw err;
      console.log(`  Retry ${attempt + 1}/${retries}...`);
      await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
    }
  }
}

/**
 * Process a single image buffer into 3 responsive WebP sizes
 */
async function processImage(buffer, outputDir, baseName) {
  const results = [];
  const metadata = await sharp(buffer).metadata();

  for (const [sizeName, maxWidth] of Object.entries(SIZES)) {
    const suffix = sizeName === 'lg' ? '' : `-${sizeName}`;
    const filename = `${baseName}${suffix}.webp`;
    const outputPath = join(outputDir, filename);

    let pipeline = sharp(buffer);
    if (metadata.width > maxWidth) {
      pipeline = pipeline.resize(maxWidth, null, { withoutEnlargement: true, fit: 'inside' });
    }
    await pipeline.webp({ quality: WEBP_QUALITY, effort: 6 }).toFile(outputPath);

    const stats = await fs.stat(outputPath);
    const sizeKB = (stats.size / 1024).toFixed(1);
    results.push({ filename, size: `${sizeKB}KB`, width: Math.min(metadata.width, maxWidth) });
    console.log(`    ${filename} (${sizeKB}KB, ${Math.min(metadata.width, maxWidth)}px)`);
  }

  return results;
}

/**
 * Process all images for a product
 */
async function processProduct(product) {
  console.log(`\n[${product.slug}]`);
  const productResults = [];

  for (const { url, name } of product.sources) {
    try {
      const buffer = await fetchImage(url);
      const variants = await processImage(buffer, OUTPUT_DIR, name);
      productResults.push({ source: url, name, variants });
    } catch (error) {
      console.error(`  FAIL ${name}: ${error.message}`);
      productResults.push({ source: url, name, error: error.message });
    }
  }

  return productResults;
}

/**
 * Main
 */
async function main() {
  console.log('='.repeat(55));
  console.log('Nami Electric — Responsive Image Fetcher & Optimizer');
  console.log('='.repeat(55));
  console.log(`Sizes: ${Object.entries(SIZES).map(([k, v]) => `${k}=${v}px`).join(', ')}`);
  console.log(`Quality: WebP ${WEBP_QUALITY}, effort 6`);

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  // Remove old *-alt.webp files (replaced by *-side.webp)
  const existing = await fs.readdir(OUTPUT_DIR);
  for (const f of existing) {
    if (f.endsWith('-alt.webp')) {
      await fs.unlink(join(OUTPUT_DIR, f));
      console.log(`  Removed old: ${f}`);
    }
  }

  const allResults = {};
  let totalImages = 0;
  let successCount = 0;
  let totalFiles = 0;

  for (const product of products) {
    const results = await processProduct(product);
    allResults[product.slug] = results;
    for (const r of results) {
      totalImages++;
      if (!r.error) {
        successCount++;
        totalFiles += r.variants.length;
      }
    }
  }

  console.log('\n' + '='.repeat(55));
  console.log(`Done: ${successCount}/${totalImages} source images fetched`);
  console.log(`Generated: ${totalFiles} responsive WebP files`);
  console.log('='.repeat(55));

  const logPath = join(ROOT_DIR, 'docs', 'nami-image-log.json');
  await fs.writeFile(logPath, JSON.stringify(allResults, null, 2));
  console.log(`Log: ${logPath}`);
}

main().catch(console.error);
