'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { OCCASIONS } from '@/data/occasions';
import { FAQS } from '@/data/faqs';
import { useCart } from '@/context/CartContext';
import Hero3DFlowers from '@/components/3d/Hero3DFlowers';
import ProductGrid from '@/components/product/ProductGrid';
import MagneticButton from '@/components/ui/MagneticButton';
import WhatsAppOrderButton from '@/components/product/WhatsAppOrderButton';
import OccasionReminder from '@/components/ui/OccasionReminder';
import { getFAQSchema } from '@/utils/schema';
import {
  Search,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Star,
  Flower2,
  Video,
  Truck,
  ShieldCheck,
  Globe2,
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

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-6 sm:pt-10 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden min-h-[580px] sm:min-h-[640px] lg:min-h-[560px]">
        {/* Ambient Warm Backlights */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-200/25 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-100/35 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left Column: Headlines, Value Prop & CTA */}
          <div className="space-y-6 text-center lg:text-left z-10">
            {/* Top Luxury Atelier Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#C5A880]/50 text-xs font-semibold tracking-wide shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A880]"></span>
              </span>
              <span className="text-[#8B1538] font-bold uppercase tracking-wider text-[11px]">
                Pakistan&apos;s Premier Luxury Florist
              </span>
              <span className="hidden sm:inline text-stone-300">•</span>
              <span className="hidden sm:inline text-stone-500 font-normal">Est. 2024</span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-[#1F1F1F] leading-[1.14]">
              Fresh Luxury Blooms &amp;{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B1538] via-[#a81c45] to-[#70102b] italic font-normal">
                Curated Gifts
              </span>
              <span className="block text-xl sm:text-2xl lg:text-3xl text-stone-700 font-normal mt-2">
                Delivered Same-Day in <strong className="font-serif font-bold text-[#8B1538]">2–3 Hours</strong>
              </span>
            </h1>

            {/* Subtitle / Value Proposition */}
            <p className="text-sm sm:text-base lg:text-lg text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Order farm-fresh Ecuadorian roses, velvet keepsake boxes &amp; artisan cakes across Lahore, Karachi, Islamabad &amp; nationwide. Every bouquet comes with a <strong className="text-stone-900 font-semibold">live WhatsApp HD video preview</strong> sent before dispatch!
            </p>

            {/* City Delivery Availability Tags */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-0.5">
              <span className="text-xs font-semibold text-stone-700 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#8B1538]" /> Same-Day Chilled Delivery:
              </span>
              {[
                { name: 'Lahore', href: '/flower-delivery-lahore' },
                { name: 'Karachi', href: '/flower-delivery-karachi' },
                { name: 'Islamabad', href: '/flower-delivery-islamabad' },
                { name: 'Rawalpindi', href: '/flower-delivery-rawalpindi' },
              ].map((city) => (
                <Link
                  key={city.name}
                  href={city.href}
                  className="px-2.5 py-0.5 rounded-full bg-white hover:bg-[#8B1538] text-stone-700 hover:text-white border border-[#C5A880]/30 hover:border-[#8B1538] transition-all text-xs font-medium shadow-xs"
                >
                  {city.name}
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <MagneticButton href="/red-rose-bouquets" className="w-full sm:w-auto">
                <span className="w-full sm:w-auto py-3.5 sm:py-4 px-7 rounded-full bg-[#8B1538] hover:bg-[#6e102c] text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group">
                  <Flower2 className="w-4 h-4 text-[#C5A880]" />
                  <span>Explore Bouquets</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </MagneticButton>

              <WhatsAppOrderButton
                productName="Fresh Rose Bouquet & Gift Order"
                price={4499}
                variant="hero"
                label="WhatsApp VIP Concierge"
              />
            </div>

            {/* Trust Matrix: 4 Sleek Glassmorphic Micro-Cards */}
            <div className="pt-6 border-t border-[#C5A880]/30 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="p-3 rounded-2xl bg-white/85 border border-[#C5A880]/30 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1.5 mb-1 text-emerald-800 font-serif font-bold text-xs sm:text-sm">
                  <Video className="w-4 h-4 text-[#25D366] flex-shrink-0" />
                  <span>Live Video Proof</span>
                </div>
                <p className="text-[11px] text-stone-500 leading-tight">Sent to WhatsApp before dispatch</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/85 border border-[#C5A880]/30 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1.5 mb-1 text-[#8B1538] font-serif font-bold text-xs sm:text-sm">
                  <Truck className="w-4 h-4 text-[#8B1538] flex-shrink-0" />
                  <span>2–3h Express</span>
                </div>
                <p className="text-[11px] text-stone-500 leading-tight">Same-day chilled van delivery</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/85 border border-[#C5A880]/30 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1.5 mb-1 text-amber-800 font-serif font-bold text-xs sm:text-sm">
                  <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>100% Fresh Stems</span>
                </div>
                <p className="text-[11px] text-stone-500 leading-tight">Hand-cut Grade-A farm roses</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/85 border border-[#C5A880]/30 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1.5 mb-1 text-blue-900 font-serif font-bold text-xs sm:text-sm">
                  <Globe2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Worldwide Pay</span>
                </div>
                <p className="text-[11px] text-stone-500 leading-tight">UK, US, UAE cards, Wise & Remitly</p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Mouse Parallax & Interactive Showcase */}
          <div className="relative flex justify-center w-full min-h-[430px] sm:min-h-[480px] md:min-h-[500px]">
            <Hero3DFlowers />
          </div>
        </div>
      </section>

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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-[#C5A880]/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-[#8B1538] font-bold block mb-2">Celebrations & Moments</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#1F1F1F]">Shop By Occasion</h2>
            <p className="text-sm text-gray-600 mt-2">Find the perfect floral arrangement tailored for every memorable Pakistani celebration.</p>
            <div className="w-16 h-0.5 bg-[#C5A880] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {OCCASIONS.map((occ) => (
              <Link
                key={occ.slug}
                href={`/${occ.slug}`}
                className="p-5 rounded-2xl bg-[#FAFAFA] border border-[#C5A880]/30 shadow-sm hover:shadow-xl hover:border-[#8B1538] hover:-translate-y-1 transition-all text-center flex flex-col items-center justify-center group"
              >
                <div className="w-12 h-12 rounded-full bg-white text-[#8B1538] group-hover:bg-[#8B1538] group-hover:text-[#C5A880] flex items-center justify-center text-xl mb-3 transition-colors shadow-sm">
                  🌸
                </div>
                <h3 className="font-serif font-bold text-sm text-[#1F1F1F] group-hover:text-[#8B1538]">
                  {occ.name}
                </h3>
                <span className="text-[11px] text-[#8B1538] font-bold mt-1">View Flowers →</span>
              </Link>
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
                  className="w-full p-5 text-left font-serif font-bold text-base text-[#1F1F1F] flex items-center justify-between gap-4 hover:text-[#8B1538]"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#8B1538] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function CategoryCard({ cat }: { cat: { slug: string; name: string; image: string; itemCount: number } }) {
  const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=360&q=70';
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
