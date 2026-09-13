'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { OCCASIONS } from '@/data/occasions';
import { CITIES } from '@/data/cities';
import { WHATSAPP_BASE_URL, WHATSAPP_NUMBER } from '@/utils/whatsapp';
import ProductGrid from '@/components/product/ProductGrid';
import { MessageCircle, Sparkles, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { getFAQSchema, getBreadcrumbSchema } from '@/utils/schema';

export default function GenericLandingPage() {
  const params = useParams();
  const slug = params?.slug as string;

  // 1. Check if slug matches a Category
  const categoryMatch = CATEGORIES.find((c) => c.slug === slug);
  // 2. Check if slug matches an Occasion
  const occasionMatch = OCCASIONS.find((o) => o.slug === slug);
  // 3. Check if slug matches a City
  const cityMatch = CITIES.find((c) => c.slug === slug);

  if (!categoryMatch && !occasionMatch && !cityMatch) {
    return notFound();
  }

  // Determine Page Type & Content Details
  let h1Title = '';
  let introText = '';
  let bannerImage = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80';
  let relevantProducts = PRODUCTS;
  let faqs: { question: string; answer: string }[] = [];

  if (categoryMatch) {
    h1Title = `Fresh ${categoryMatch.name} Delivery in Pakistan`;
    introText = categoryMatch.description;
    bannerImage = categoryMatch.image;
    relevantProducts = PRODUCTS.filter(
      (p) => p.categorySlug === categoryMatch.slug || p.category.toLowerCase().includes(categoryMatch.name.toLowerCase())
    );
    faqs = [
      { question: `Are your ${categoryMatch.name} fresh?`, answer: `Yes! All ${categoryMatch.name} stems are handpicked fresh daily from gardens and wrapped in luxury paper.` },
      { question: `Can I get same-day delivery for ${categoryMatch.name}?`, answer: `Yes, same-day 3-hour delivery is available for orders placed before 5 PM across Pakistan.` }
    ];
  } else if (occasionMatch) {
    h1Title = occasionMatch.title;
    introText = occasionMatch.description;
    bannerImage = occasionMatch.bannerImage;
    relevantProducts = PRODUCTS.filter((p) =>
      p.occasions.some((o) => o.toLowerCase().includes(occasionMatch.name.toLowerCase()))
    );
    faqs = [
      { question: `What are the best flowers for ${occasionMatch.name}?`, answer: `Red roses, pink lilies, and luxury hatboxes are top picks for ${occasionMatch.name}.` },
      { question: `Can I add a custom card note for ${occasionMatch.name}?`, answer: `Yes, free personalized handwritten note cards are included with every order.` }
    ];
  } else if (cityMatch) {
    h1Title = cityMatch.title;
    introText = cityMatch.intro;
    bannerImage = cityMatch.bannerImage;
    relevantProducts = PRODUCTS.filter((p) =>
      p.cities.includes(cityMatch.name) || p.cities.includes('All')
    );
    faqs = cityMatch.faqs;
  }

  const [heroImgSrc, setHeroImgSrc] = React.useState<string>('');
  const FALLBACK_HERO = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80';

  const faqSchema = getFAQSchema(faqs);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: h1Title, url: `/${slug}` }
  ]);

  return (
    <div className="space-y-12 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Banner Section */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#1E392A] text-white overflow-hidden">
        <Image
          src={heroImgSrc || bannerImage || FALLBACK_HERO}
          alt={h1Title}
          fill
          priority
          className="object-cover opacity-20 filter contrast-125"
          onError={() => setHeroImgSrc(FALLBACK_HERO)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E392A] via-[#1E392A]/80 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#581825] text-[#D4AF37] text-xs font-bold uppercase tracking-widest border border-[#D4AF37]/30">
            <Sparkles className="w-3.5 h-3.5" /> FlowerDeliveryPK.com
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
            {h1Title}
          </h1>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {introText}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href={WHATSAPP_BASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-8 rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] font-bold text-xs transition-all shadow-xl flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" /> Order on WhatsApp ({WHATSAPP_NUMBER})
            </a>
          </div>
        </div>
      </section>

      {/* City Popular Areas Pill Bar (If City Page) */}
      {cityMatch && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 rounded-3xl bg-white border border-[#D4AF37]/30 shadow-md">
            <h3 className="font-serif font-bold text-sm text-[#1E392A] uppercase tracking-wider mb-3">
              Popular Express Delivery Neighborhoods in {cityMatch.name}:
            </h3>
            <div className="flex flex-wrap gap-2">
              {cityMatch.popularAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-full bg-[#FAF7F2] text-xs font-medium text-gray-700 border border-gray-200"
                >
                  📍 {area}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <ProductGrid
        products={relevantProducts}
        title="Featured Selection"
        subtitle="Fresh Stems Sourced Daily"
        showFilters={true}
      />

      {/* Delivery Process & Trust */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FDF0ED] border border-[#D4AF37]/30 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-[#581825] text-[#D4AF37] flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-[#1E392A] mb-1">Hand-Selected Freshness</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Stems are trimmed and arranged by master florists with flower food added for long vase life.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-[#581825] text-[#D4AF37] flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-[#1E392A] mb-1">Same-Day Express Dispatch</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Delivered in temperature-controlled vans to maintain optimal stem beauty and fresh scent.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-[#581825] text-[#D4AF37] flex-shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-[#1E392A] mb-1">WhatsApp Photo Confirmation</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                We send a photo preview of your exact bouquet before dispatch for complete peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      {faqs.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif font-bold text-[#1E392A] text-center mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-5 bg-white rounded-2xl border border-[#D4AF37]/30 shadow-sm space-y-2">
                <h4 className="font-serif font-bold text-base text-[#1E392A]">{faq.question}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
