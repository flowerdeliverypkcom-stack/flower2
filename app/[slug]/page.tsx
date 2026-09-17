import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { OCCASIONS } from '@/data/occasions';
import { CITIES } from '@/data/cities';
import { WHATSAPP_BASE_URL, WHATSAPP_NUMBER } from '@/utils/whatsapp';
import ProductGrid from '@/components/product/ProductGrid';
import { MessageCircle, Sparkles, Truck, Video, ShieldCheck, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { getFAQSchema, getBreadcrumbSchema } from '@/utils/schema';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const categoryMatch = CATEGORIES.find((c) => c.slug === slug);
  const occasionMatch = OCCASIONS.find((o) => o.slug === slug);
  const cityMatch = CITIES.find((c) => c.slug === slug);

  if (cityMatch) {
    return {
      title: cityMatch.title,
      description: `${cityMatch.intro} Same-day chilled delivery in 2–3 hours with live WhatsApp video proof. Order on WhatsApp: 0348-0735344.`,
      alternates: {
        canonical: `https://flowerdeliverypk.com/${cityMatch.slug}`
      },
      openGraph: {
        title: cityMatch.title,
        description: cityMatch.intro,
        url: `https://flowerdeliverypk.com/${cityMatch.slug}`,
        images: [
          {
            url: cityMatch.bannerImage || '/images/banners/hero-slide-1.webp',
            width: 1200,
            height: 630,
            alt: cityMatch.title
          }
        ]
      }
    };
  }

  if (categoryMatch) {
    const title = categoryMatch.group === 'decor'
      ? `${categoryMatch.name} in Pakistan | Wedding & Event Florist - FlowerDeliveryPK`
      : `Fresh ${categoryMatch.name} Delivery in Pakistan | FlowerDeliveryPK`;
    const description = categoryMatch.group === 'decor'
      ? `${categoryMatch.description} Professional on-site floral setup in Lahore, Karachi & Islamabad. Book consultation on WhatsApp: 0348-0735344.`
      : `${categoryMatch.description} Same-day 2–3 hour delivery across Lahore, Karachi, Islamabad & nationwide with live WhatsApp video proof.`;
    return {
      title,
      description,
      alternates: {
        canonical: `https://flowerdeliverypk.com/${categoryMatch.slug}`
      },
      openGraph: {
        title,
        description,
        url: `https://flowerdeliverypk.com/${categoryMatch.slug}`,
        images: [
          {
            url: categoryMatch.image || '/images/banners/hero-slide-1.webp',
            width: 1200,
            height: 630,
            alt: categoryMatch.name
          }
        ]
      }
    };
  }

  if (occasionMatch) {
    const title = `${occasionMatch.title} | FlowerDeliveryPK`;
    const description = `${occasionMatch.description} Same-day express flower and gift delivery across Pakistan with live WhatsApp video preview.`;
    return {
      title,
      description,
      alternates: {
        canonical: `https://flowerdeliverypk.com/${occasionMatch.slug}`
      },
      openGraph: {
        title,
        description,
        url: `https://flowerdeliverypk.com/${occasionMatch.slug}`,
        images: [
          {
            url: occasionMatch.bannerImage || '/images/banners/hero-slide-1.webp',
            width: 1200,
            height: 630,
            alt: occasionMatch.title
          }
        ]
      }
    };
  }

  return {
    title: 'FlowerDeliveryPK.com — Online Flowers, Bouquets & Gifts Delivery in Pakistan'
  };
}

export default async function GenericLandingPage({ params }: PageProps) {
  const { slug } = await params;

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
  let bannerImage = '/images/banners/hero-slide-1.webp';
  let relevantProducts = PRODUCTS;
  let faqs: { question: string; answer: string }[] = [];

  if (categoryMatch) {
    h1Title = categoryMatch.group === 'decor' 
      ? `${categoryMatch.name} Services in Pakistan` 
      : `Fresh ${categoryMatch.name} Delivery in Pakistan`;
    introText = categoryMatch.description;
    bannerImage = categoryMatch.image;
    relevantProducts = PRODUCTS.filter(
      (p) => p.categorySlug === categoryMatch.slug || p.category.toLowerCase().includes(categoryMatch.name.toLowerCase())
    );
    if (categoryMatch.group === 'decor') {
      faqs = [
        {
          question: `How far in advance should I book ${categoryMatch.name}?`,
          answer: `We recommend booking at least 24 to 48 hours in advance for car, room, and wedding stage decor. Same-day emergency decor bookings are accepted based on master florist availability via WhatsApp at 0348-0735344.`
        },
        {
          question: `Do you provide on-site decoration at our home or venue?`,
          answer: `Yes! Our professional floral styling team arrives with all fresh flowers, tools, and lighting directly at your venue or home in Lahore, Karachi, and Islamabad.`
        },
        {
          question: `Can I customize the color palette and flower types?`,
          answer: `Absolutely! You can choose crimson red roses, pastel pinks, lilies, baby's breath, and personalized ribbon fabrics according to your event theme.`
        }
      ];
    } else {
      faqs = [
        {
          question: `Are your ${categoryMatch.name} fresh?`,
          answer: `Yes! All ${categoryMatch.name} stems are handpicked fresh daily from gardens, arranged by master florists, and dispatched with live WhatsApp video proof.`
        },
        {
          question: `Can I get same-day delivery for ${categoryMatch.name}?`,
          answer: `Yes, same-day 2 to 3-hour chilled delivery is available for orders placed before 5:00 PM across Lahore, Karachi, Islamabad and major cities.`
        },
        {
          question: `Can I add a custom card note with my order?`,
          answer: `Yes, a luxury greeting card with your personalized handwritten message is included complimentary with every order.`
        }
      ];
    }
  } else if (occasionMatch) {
    h1Title = occasionMatch.title;
    introText = occasionMatch.description;
    bannerImage = occasionMatch.bannerImage;
    relevantProducts = PRODUCTS.filter((p) =>
      p.occasions.some((o) => o.toLowerCase().includes(occasionMatch.name.toLowerCase()))
    );
    faqs = [
      {
        question: `What are the best flowers for ${occasionMatch.name}?`,
        answer: `Red roses, pink lilies, velvet keepsake hatboxes, and cake-flower combos are customer top picks for ${occasionMatch.name}.`
      },
      {
        question: `Can I add a custom card note for ${occasionMatch.name}?`,
        answer: `Yes, free personalized handwritten note cards with your custom message are included with every flower order.`
      }
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

  const faqSchema = getFAQSchema(faqs);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: h1Title, url: `/${slug}` }
  ]);

  return (
    <div className="space-y-12 pb-16 bg-[#FAFAFA]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Banner Section */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#8B1538] via-[#70102b] to-[#8B1538] text-white overflow-hidden">
        <Image
          src={bannerImage}
          alt={h1Title}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#8B1538] via-[#8B1538]/75 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 text-[#8B1538] text-xs font-bold uppercase tracking-widest border border-[#C5A880]/50 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" /> FlowerDeliveryPK.com
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
            {h1Title}
          </h1>

          <p className="text-sm sm:text-base text-gray-100 max-w-2xl mx-auto leading-relaxed">
            {introText}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`${WHATSAPP_BASE_URL}?text=${encodeURIComponent(`Hi FlowerDeliveryPK! I would like to place an order from ${h1Title}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 px-8 rounded-full bg-[#25D366] text-white hover:bg-[#1faa53] font-bold text-xs transition-all shadow-xl flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" /> Order on WhatsApp ({WHATSAPP_NUMBER})
            </a>
          </div>
        </div>
      </section>

      {/* City Popular Areas & Delivery Timing Bar (If City Page) */}
      {cityMatch && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Timing & Pricing Pill */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#C5A880]/40 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#8B1538]/10 text-[#8B1538]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-stone-500 font-bold">Delivery Speed</p>
                <p className="font-serif font-bold text-sm text-[#1F1F1F]">{cityMatch.deliveryTime}</p>
              </div>
            </div>

            {cityMatch.deliveryPricing && (
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-stone-500 font-bold">Delivery Pricing</p>
                  <p className="font-serif font-bold text-sm text-emerald-800">{cityMatch.deliveryPricing}</p>
                </div>
              </div>
            )}
          </div>

          {/* Popular Neighborhoods Bar */}
          <div className="p-6 rounded-3xl bg-white border border-[#C5A880]/30 shadow-md">
            <h3 className="font-serif font-bold text-sm text-[#8B1538] uppercase tracking-wider mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {cityMatch.slug.startsWith('send-flowers-to-pakistan-') || cityMatch.slug === 'flowers-to-usa-overseas'
                ? `Major Overseas Hubs & Supported Sending Regions (${cityMatch.name}):`
                : `Express Delivery Neighborhoods & Sectors in ${cityMatch.name}:`}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cityMatch.popularAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-full bg-[#FAF7F2] text-xs font-medium text-stone-700 border border-[#C5A880]/30 hover:border-[#8B1538] transition-colors"
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
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#C5A880]/40 grid grid-cols-1 md:grid-cols-3 gap-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-[#8B1538] text-white flex-shrink-0">
              <Sparkles className="w-6 h-6 text-[#C5A880]" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-[#1F1F1F] mb-1">Hand-Selected Freshness</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Stems are trimmed and hand-arranged by master florists with flower food added for long vase vitality.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-[#8B1538] text-white flex-shrink-0">
              <Truck className="w-6 h-6 text-[#C5A880]" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-[#1F1F1F] mb-1">Same-Day Express Dispatch</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Delivered in temperature-controlled chilled vans to safeguard delicate petal freshness and scent.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-[#8B1538] text-white flex-shrink-0">
              <Video className="w-6 h-6 text-[#25D366]" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-[#1F1F1F] mb-1">WhatsApp Video Confirmation</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                We record a live HD video preview of your exact bouquet before dispatch for complete peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Unique City SEO Paragraph (Part 3 Requirement) */}
      {cityMatch?.uniqueContent && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#C5A880]/40 shadow-sm space-y-4">
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#1F1F1F]">
              Same-Day Fresh Flower Delivery in {cityMatch.name} — FlowerDeliveryPK
            </h2>
            <div className="w-12 h-0.5 bg-[#C5A880]" />
            <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
              {cityMatch.uniqueContent}
            </p>
          </div>
        </section>
      )}

      {/* FAQs Section (All answers in DOM for crawlers) */}
      {faqs.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-serif font-bold text-[#1F1F1F] text-center mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-5 bg-white rounded-2xl border border-[#C5A880]/30 shadow-xs space-y-2">
                <h3 className="font-serif font-bold text-base text-[#1F1F1F]">{faq.question}</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
