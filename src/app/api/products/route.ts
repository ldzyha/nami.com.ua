import { NextResponse } from 'next/server';
import { getAllProductsAsync } from '@/lib/products';
import type { Product } from '@/types/product';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET() {
    const allProducts = await getAllProductsAsync();

    // Return simplified data for Telegram bot
    const simplified = allProducts.map((p: Product) => {
        const mainImage = p.images?.find((img) => img.isMain) || p.images?.[0];
        const imageUrl = mainImage?.url || `/products/nami/${p.slug}-main.webp`;

        return {
            name: p.model || p.name.replace('Nami ', ''),
            fullName: p.name,
            slug: p.slug,
            image: imageUrl,
            priceUsd: Math.round(p.priceUsdCents / 100),
            maxSpeed: p.specs?.performance?.maxSpeed || 0,
            range: p.specs?.performance?.range || 0,
            power: p.specs?.motor?.totalPower || 0,
            voltage: p.specs?.battery?.voltage || 0,
            battery: `${p.specs?.battery?.capacity || 0}Ah`,
            inStock: p.inStock,
            preorder: p.preorder || false,
        };
    });

    return NextResponse.json(simplified, {
        headers: {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    });
}
