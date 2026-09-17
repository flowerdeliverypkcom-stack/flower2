'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { OCCASIONS } from '@/data/occasions';
import { FAQS } from '@/data/faqs';
import { useCart } from '@/context/CartContext';
import HeroCarousel from '@/components/home/HeroCarousel';
import InstagramFeed from '@/components/home/InstagramFeed';
import ProductGrid from '@/components/product/ProductGrid';
import WhatsAppOrderButton from '@/components/product/WhatsAppOrderButton';
import OccasionReminder from '@/components/ui/OccasionReminder';
import { getFAQSchema } from '@/utils/schema';
import { Occasion } from '@/types';
import {
  Search,
  ChevronDown,
  ChevronUp,
  Star,
  Video,
  Cake,
  Heart,
  Sparkles,
  Gift,
  Flower2,
  ArrowRight,
} from 'lucide-react';

export default function HomePage() {
  const { setIsSearchOpen } = useCart();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller);
  const faqSchema = getFAQSchema(FAQS);

  const testimonials = [
    {
      name: 'Ayesha Khan',
      city: 'Lahore (DHA Phase 5)',
      rating: 5,
      comment: 'Beautiful red rose bouquet! Received a real-time WhatsApp video before delivery so I knew the flowers were 100% fresh. Delivered within 2.5 hours in Lahore.',
      product: 'Classic Red Rose Bouquet'
    },
    {
      name: 'Hamza Farooq',
      city: 'Dubai / Islamabad (F-7)',
      rating: 5,
      comment: 'Ordered flowers and cake for my wife’s birthday in Islamabad while I was travelling in Dubai. Paid via Wise, and the team was super helpful on WhatsApp!',
      product: 'Cake & Flowers Combo'
    },
    {
      name: 'Zainab Ahmed',
      city: 'Karachi (Clifton)',
      rating: 5,
      comment: 'The luxury velvet box arrangement was breathtaking. Stem freshness and fragrance were top quality. Highly recommended for anniversaries!',
      product: 'Luxury Flower Box'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 bg-[#FAFAFA]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ================= HERO CAROUSEL BANNER ================= */}
      <HeroCarousel />

      {/* ================= INTERACTIVE SEARCH BAR ================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div
          onClick={() => setIsSearchOpen(true)}
          className="cursor-pointer p-4 sm:p-6 rounded-3xl glass-panel border-2 border-[#C5A880]/40 shadow-xl hover:shadow-2xl transition-all flex items-center gap-4 bg-white/90 group"
        >
          <div className="p-3 rounded-2xl bg-[#8B1538] text-white group-hover:scale-110 transition-transform">
            <Search className="w-6 h-6" />
          </div>
          <div className="flex-grow">
            <p className="text-xs uppercase tracking-widest text-[#8B1538] font-bold">Search Catalog</p>
            <p className="text-stone-600 font-serif text-lg sm:text-xl">Search red roses, lilies, gift boxes, cakes...</p>
          </div>
          <button className="hidden sm:inline-flex px-6 py-2.5 rounded-full bg-[#8B1538] text-white font-bold text-xs group-hover:bg-[#6e102c] transition-colors">
            Search Now
          </button>
        </div>
      </section>

      {/* ================= REAL-TIME VIDEO DISPATCH GUARANTEE BANNER ================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#8B1538] via-[#70102b] to-[#8B1538] text-white border-2 border-[#C5A880]/60 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25D366]/20 text-[#25D366] text-xs font-bold uppercase tracking-wider">
              <Video className="w-4 h-4" /> Real-Time Video Dispatch Guarantee
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              See Your Exact Bouquet Video Before It Ships
            </h2>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
              We eliminate all ordering anxiety for local and overseas customers! As soon as our master florists arrange your bouquet, we record a live HD video of your actual flowers and send it directly to your WhatsApp before dispatch.
            </p>
          </div>
          <div className="flex-shrink-0">
            <WhatsAppOrderButton
              productName="Video Guaranteed Flower Order"
              price={2999}
              variant="hero"
              label="Order via WhatsApp"
            />
          </div>
        </div>
      </section>

      {/* ================= OCCASION REMINDER CARD ================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <OccasionReminder />
      </section>

      {/* ================= CATEGORIES SECTION ================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#8B1538] font-bold block mb-2">Explore Collections</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#1F1F1F]">Shop By Category</h2>
          <div className="w-16 h-0.5 bg-[#C5A880] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.slug} cat={cat} />
          ))}
        </div>
      </section>

      {/* ================= OCCASIONS SECTION ================= */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-[#FAF7F2]/60 to-white border-y border-[#C5A880]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-xs uppercase tracking-widest text-[#8B1538] font-bold block mb-2">Celebrations &amp; Moments</span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#1F1F1F]">Shop By Occasion</h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-xl mx-auto leading-relaxed">
              Find the perfect floral arrangement tailored for every memorable Pakistani celebration with same-day express delivery.
            </p>
            <div className="w-16 h-0.5 bg-[#C5A880] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
            {OCCASIONS.map((occ) => (
              <OccasionCard key={occ.slug} occ={occ} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= BEST SELLERS GRID ================= */}
      <ProductGrid
        products={bestSellers}
        title="Our Bestselling Bouquets"
        subtitle="Handpicked Customer Favorites"
        showFilters={true}
      />

      {/* ================= OVERSEAS & INTERNATIONAL SEO BLOCK ================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#C5A880]/40 shadow-lg space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#8B1538] font-bold block">Overseas Pakistanis</span>
            <h2 className="text-3xl font-serif font-bold text-[#1F1F1F]">Send Flowers & Gifts to Pakistan from Overseas</h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              Living in London, Dubai, New York, Toronto, or Riyadh? We make it seamless to send fresh red roses, chocolates, and bakery cakes to family back home in Pakistan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-center">
            <Link href="/send-flowers-to-pakistan-from-uk" className="p-5 rounded-2xl bg-[#FAFAFA] border border-[#C5A880]/30 hover:border-[#8B1538] shadow-sm transition-all">
              <span className="text-2xl block mb-1">🇬🇧</span>
              <h3 className="font-serif font-bold text-sm text-[#1F1F1F]">From United Kingdom</h3>
              <p className="text-[11px] text-gray-500">Wise / UK Bank Transfer / Remitly</p>
            </Link>

            <Link href="/gifts-to-pakistan-from-usa" className="p-5 rounded-2xl bg-[#FAFAFA] border border-[#C5A880]/30 hover:border-[#8B1538] shadow-sm transition-all">
              <span className="text-2xl block mb-1">🇺🇸</span>
              <h3 className="font-serif font-bold text-sm text-[#1F1F1F]">From United States</h3>
              <p className="text-[11px] text-gray-500">Wise / Remitly / USD Bank Transfer</p>
            </Link>

            <Link href="/send-flowers-to-pakistan-from-uae" className="p-5 rounded-2xl bg-[#FAFAFA] border border-[#C5A880]/30 hover:border-[#8B1538] shadow-sm transition-all">
              <span className="text-2xl block mb-1">🇦🇪</span>
              <h3 className="font-serif font-bold text-sm text-[#1F1F1F]">From UAE / Dubai</h3>
              <p className="text-[11px] text-gray-500">Wise / Exchange Transfer / Cards</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS / REVIEWS ================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#8B1538] font-bold block mb-2">Customer Experiences</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#1F1F1F]">What Our Customers Say</h2>
          <p className="text-xs text-stone-600 mt-1">Verified customer feedback & video proof reviews</p>
          <div className="w-16 h-0.5 bg-[#C5A880] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-[#C5A880]/30 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center text-amber-500 mb-3 gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 italic leading-relaxed mb-4">
                  &quot;{t.comment}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-sm text-[#1F1F1F]">{t.name}</h3>
                  <span className="text-xs text-stone-600 font-medium">{t.city}</span>
                </div>
                <span className="text-[10px] font-bold text-[#8B1538] bg-[#FAFAFA] px-2.5 py-1 rounded-full border border-[#C5A880]/20">
                  {t.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FAQ ACCORDION SECTION ================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#8B1538] font-bold block mb-2">Got Questions?</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#1F1F1F]">Frequently Asked Questions</h2>
          <div className="w-16 h-0.5 bg-[#C5A880] mx-auto mt-4" />
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#C5A880]/30 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full p-5 text-left font-serif font-bold text-base text-[#1F1F1F] flex items-center justify-between gap-4 hover:text-[#8B1538]"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#8B1538] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {/* Always rendered in DOM for Googlebot & SEO indexing */}
                <div
                  id={`faq-answer-${index}`}
                  className={`px-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 transition-all duration-200 ${
                    isOpen ? 'pb-5 pt-3 block' : 'hidden'
                  }`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= INSTAGRAM LIVE FEED & REELS ================= */}
      <InstagramFeed />

      {/* ================= ABOUT FLOWERDELIVERYPK SEO CONTENT BLOCK ================= */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#C5A880]/40 shadow-lg space-y-6">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#8B1538] font-bold block">
              Pakistan’s Premier Online Florist
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F1F1F]">
              About FlowerDeliveryPK.com — Fresh Flower &amp; Luxury Gift Delivery
            </h2>
            <div className="w-16 h-0.5 bg-[#C5A880] mb-6" />
          </div>

          <div className="text-stone-700 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              FlowerDeliveryPK.com is Pakistan&apos;s online destination for fresh flower bouquets, luxury gift boxes, and cake-and-flower combos, delivering same-day across Lahore, Karachi, Islamabad, Rawalpindi, and other major cities. Every order is hand-arranged by our florists on the day it ships — never pre-made or pulled from cold storage — and we send a live WhatsApp video of your exact bouquet before it leaves our studio, so you know exactly what you&apos;re getting before it&apos;s on its way.
            </p>
            <p>
              Whether you&apos;re sending red roses for an anniversary, a birthday cake-and-flower combo, or a corporate gift hamper, our collections cover every occasion: birthdays, anniversaries, Valentine&apos;s Day, Mother&apos;s Day, congratulations, and get-well-soon gifts. We also make it simple for overseas Pakistanis in the UK, US, and UAE to send flowers home, with support for international payment methods like Wise and Remitly alongside local cards and bank transfers.
            </p>
            <p>
              Orders can be placed directly through our website or confirmed instantly over WhatsApp, with our team available to help with custom requests, bulk orders, and same-day delivery timing. From Lahore&apos;s DHA and Gulberg to Karachi&apos;s Clifton and Islamabad&apos;s F-sectors, FlowerDeliveryPK.com brings fresh, farm-quality blooms to your doorstep — delivered with love, backed by a freshness guarantee.
            </p>
          </div>

          {/* City Quick Internal Links */}
          <div className="pt-4 border-t border-[#C5A880]/20 flex flex-wrap gap-3 items-center text-xs text-stone-600">
            <span className="font-semibold text-stone-800">Same-Day City Delivery:</span>
            <Link href="/flower-delivery-lahore" className="underline hover:text-[#8B1538]">Lahore Flower Delivery</Link>
            <span>•</span>
            <Link href="/flower-delivery-karachi" className="underline hover:text-[#8B1538]">Karachi Flower Delivery</Link>
            <span>•</span>
            <Link href="/flower-delivery-islamabad" className="underline hover:text-[#8B1538]">Islamabad Flower Delivery</Link>
            <span>•</span>
            <Link href="/flower-delivery-rawalpindi" className="underline hover:text-[#8B1538]">Rawalpindi Flower Delivery</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function CategoryCard({ cat }: { cat: { slug: string; name: string; image: string; itemCount: number } }) {
  const FALLBACK_IMAGE = '/images/banners/hero-slide-1.webp';
  const [imgSrc, setImgSrc] = useState(cat.image);

  return (
    <Link
      href={`/${cat.slug}`}
      className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-[#C5A880]/30 transition-all duration-500 h-64 flex flex-col justify-end p-5 text-white"
    >
      <Image
        src={imgSrc}
        alt={cat.name}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        className="object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 contrast-105"
        onError={() => setImgSrc(FALLBACK_IMAGE)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="relative z-10">
        <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-bold block mb-1">
          {cat.itemCount} Products
        </span>
        <h3 className="font-serif text-lg font-bold group-hover:text-[#C5A880] transition-colors">
          {cat.name}
        </h3>
      </div>
    </Link>
  );
}

const OCCASION_ICONS: Record<string, React.ElementType> = {
  Cake: Cake,
  Heart: Heart,
  Sparkles: Sparkles,
  Gift: Gift,
  Flower2: Flower2,
};

function OccasionCard({ occ }: { occ: Occasion }) {
  const FALLBACK_IMAGE = '/images/banners/hero-slide-1.webp';
  const [imgSrc, setImgSrc] = useState(occ.bannerImage);
  const IconComponent = OCCASION_ICONS[occ.iconName] || Sparkles;

  return (
    <Link
      href={`/${occ.slug}`}
      className="group relative h-64 sm:h-72 lg:h-80 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#C5A880]/30 shadow-md hover:shadow-2xl hover:border-[#8B1538] transition-all duration-500 flex flex-col justify-between p-4 sm:p-5 text-white block bg-stone-900"
    >
      {/* Background Floral Photography */}
      <Image
        src={imgSrc}
        alt={`${occ.name} Flowers Delivery Pakistan`}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
        className="object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 contrast-105"
        onError={() => setImgSrc(FALLBACK_IMAGE)}
      />

      {/* Luxury Multi-Stop Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20 group-hover:via-black/35 transition-all duration-300" />

      {/* Top Header: Unique Occasion Icon & Curated Badge */}
      <div className="relative z-10 flex items-center justify-between gap-1.5">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-md group-hover:bg-[#8B1538] group-hover:text-[#C5A880] group-hover:border-[#C5A880] transition-all flex-shrink-0">
          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-[#C5A880]" />
        </div>
        {occ.badge && (
          <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[9px] sm:text-[10px] font-bold text-[#F3E5AB] tracking-wide uppercase shadow-xs truncate max-w-[110px]">
            {occ.badge}
          </span>
        )}
      </div>

      {/* Bottom Content: Occasion Title, Hint, and Animated CTA */}
      <div className="relative z-10 space-y-1">
        <h3 className="font-serif text-base sm:text-lg lg:text-xl font-bold text-white group-hover:text-[#F3E5AB] transition-colors leading-tight">
          {occ.name}
        </h3>
        <p className="text-[10px] sm:text-[11px] text-stone-200 line-clamp-1 leading-snug opacity-90 group-hover:opacity-100 transition-opacity">
          {occ.description.split('.')[0]}
        </p>
        <div className="pt-1.5 flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#C5A880] group-hover:text-white transition-colors">
          <span>Shop Flowers</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
