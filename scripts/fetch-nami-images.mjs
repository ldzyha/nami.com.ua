#!/usr/bin/env node
/**
 * Fetch and optimize Nami Electric product images from nami-electric.com
 * Converts to WebP, optimizes with sharp, and saves to public/products/nami/
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT_DIR, 'public', 'products', 'nami');

// All 9 Nami products with their image URLs from nami-electric.com
const products = [
  {
    slug: 'burn-e',
    sources: [
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/Groupe-de-masques-7@2x-1.png', name: 'main' },
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/burn-e-2-min.png', name: 'alt' },
    ],
  },
  {
    slug: 'burn-e-max',
    sources: [
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/Groupe-de-masques-7@2x-6.png', name: 'main' },
    ],
  },
  {
    slug: 'blast',
    sources: [
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/Groupe-de-masques-14@2x.png', name: 'main' },
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/blast-1.png', name: 'alt' },
    ],
  },
  {
    slug: 'blast-max',
    sources: [
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/Groupe-de-masques-14@2x-1.png', name: 'main' },
    ],
  },
  {
    slug: 'klima',
    sources: [
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/Groupe-de-masques-7@2x-2.png', name: 'main' },
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/klima-2-min.png', name: 'alt' },
    ],
  },
  {
    slug: 'klima-max',
    sources: [
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/Groupe-de-masques-7@2x-5.png', name: 'main' },
    ],
  },
  {
    slug: 'klima-one',
    sources: [
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/Groupe-de-masques-7@2x-4.png', name: 'main' },
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/klima-one-1-min.png', name: 'alt' },
    ],
  },
  {
    slug: 'stellar',
    sources: [
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/Groupe-de-masques-7@2x-3.png', name: 'main' },
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/Stellar-1-min.png', name: 'alt' },
    ],
  },
  {
    slug: 'super-stellar',
    sources: [
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/Groupe-de-masques-7@2x-7.png', name: 'main' },
      { url: 'https://nami-electric.com/wp-content/uploads/2025/07/super-stellar-1-min.png', name: 'alt' },
    ],
  },
];

/**
 * Fetch image from URL
 */
async function fetchImage(url) {
  console.log(`  Fetching: ${path.basename(url)}`);
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': 'image/*',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

/**
 * Process and save image as WebP (same settings as hiley.com.ua)
 */
async function processImage(buffer, outputPath) {
  await sharp(buffer)
    .resize(1200, 1200, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({
      quality: 85,
      effort: 6,
    })
    .toFile(outputPath);

  const stats = await fs.stat(outputPath);
  return stats.size;
}

/**
 * Process all images for a product
 */
async function processProduct(product) {
  console.log(`\n[${product.slug}]`);

  const results = [];

  for (const { url, name } of product.sources) {
    try {
      const buffer = await fetchImage(url);
      const outputPath = path.join(OUTPUT_DIR, `${product.slug}-${name}.webp`);
      const size = await processImage(buffer, outputPath);

      results.push({
        source: url,
        target: `/products/nami/${product.slug}-${name}.webp`,
        size: `${(size / 1024).toFixed(1)}KB`,
      });

      console.log(`  ✓ ${product.slug}-${name}.webp (${(size / 1024).toFixed(1)}KB)`);
    } catch (error) {
      console.error(`  ✗ ${name}: ${error.message}`);
      results.push({
        source: url,
        error: error.message,
      });
    }
  }

  return results;
}

/**
 * Main function
 */
async function main() {
  console.log('='.repeat(50));
  console.log('Nami Electric Product Image Fetcher & Optimizer');
  console.log('='.repeat(50));

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const allResults = {};
  let totalImages = 0;
  let successCount = 0;

  for (const product of products) {
    const results = await processProduct(product);
    allResults[product.slug] = results;
    totalImages += results.length;
    successCount += results.filter(r => !r.error).length;
  }

  console.log('\n' + '='.repeat(50));
  console.log(`Done: ${successCount}/${totalImages} images`);
  console.log('='.repeat(50));

  const logPath = path.join(ROOT_DIR, 'docs', 'nami-image-log.json');
  await fs.writeFile(logPath, JSON.stringify(allResults, null, 2));
  console.log(`Log: ${logPath}`);
}

main().catch(console.error);
