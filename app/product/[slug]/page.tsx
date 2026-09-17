import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PRODUCTS } from '@/data/products';
import { FAQS } from '@/data/faqs';
import { getProductSchema, getFAQSchema, getBreadcrumbSchema } from '@/utils/schema';
import ProductDetailClient from '@/components/product/ProductDetailClient';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found | FlowerDeliveryPK.com'
    };
  }

  const title = `${product.name} | Same-Day Flower Delivery Pakistan - FlowerDeliveryPK`;
  const description = `${product.shortDescription} Delivered same-day in Lahore, Karachi, Islamabad & nationwide with live WhatsApp video proof. Order on WhatsApp: 0348-0735344.`;
  const mainImage = product.images[0] || '/images/banners/hero-slide-1.webp';

  return {
    title,
    description,
    alternates: {
      canonical: `https://flowerdeliverypk.com/product/${product.slug}`
    },
    openGraph: {
      title,
      description,
      url: `https://flowerdeliverypk.com/product/${product.slug}`,
      images: [
        {
          url: mainImage,
          width: 1000,
          height: 1000,
          alt: `${product.name} fresh bouquet delivery Pakistan`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [mainImage]
    }
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return notFound();
  }

  const productSchema = getProductSchema(product);
  const relevantFaqs = FAQS.slice(0, 4);
  const faqSchema = getFAQSchema(relevantFaqs);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: product.category, url: `/${product.categorySlug}` },
    { name: product.name, url: `/product/${product.slug}` }
  ]);

  const relatedProducts = PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <ProductDetailClient
        product={product}
        relatedProducts={relatedProducts}
        faqs={relevantFaqs}
      />
    </>
  );
}
