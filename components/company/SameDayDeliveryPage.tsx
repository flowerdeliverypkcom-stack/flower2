'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { CITIES } from '@/data/cities';
import { WHATSAPP_BASE_URL, WHATSAPP_NUMBER } from '@/utils/whatsapp';
import ProductGrid from '@/components/product/ProductGrid';
import { Clock, MessageCircle, Truck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function SameDayDeliveryPage() {
  const sameDayProducts = PRODUCTS.slice(0, 12);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#1E392A] text-white overflow-hidden text-center">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#581825] text-[#D4AF37] text-xs font-bold uppercase tracking-widest border border-[#D4AF37]/30">
            <Clock className="w-3.5 h-3.5" /> 3-Hour Express Service
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-white">
            Same-Day Flower Delivery in Pakistan
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Need urgent flower delivery in Lahore, Karachi, Islamabad, or Rawalpindi? Place your order before 5 PM PST for guaranteed same-day doorstep delivery.
          </p>

          <div className="pt-4 flex justify-center">
            <a
              href={WHATSAPP_BASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="py-4 px-8 rounded-full bg-[#25D366] text-white hover:bg-[#20bd5a] font-bold text-sm transition-all shadow-2xl flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-white" /> Express WhatsApp Order ({WHATSAPP_NUMBER})
            </a>
          </div>
        </div>
      </section>

      {/* How Same-Day Delivery Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#581825] font-bold block mb-1">Simple & Swift</span>
          <h2 className="text-3xl font-serif font-bold text-[#1E392A]">How Our 3-Hour Service Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white border border-[#D4AF37]/30 shadow-md text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#FDF0ED] text-[#581825] flex items-center justify-center font-bold text-xl mx-auto">
              1
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1E392A]">Select Bouquet & Add Details</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Choose your preferred red rose bouquet, flower box, or cake combo and enter recipient details.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-[#D4AF37]/30 shadow-md text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#FDF0ED] text-[#581825] flex items-center justify-center font-bold text-xl mx-auto">
              2
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1E392A]">Send via WhatsApp</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Click &quot;Order on WhatsApp&quot;. Our support manager verifies availability and sends payment instructions.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-[#D4AF37]/30 shadow-md text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#FDF0ED] text-[#581825] flex items-center justify-center font-bold text-xl mx-auto">
              3
            </div>
            <h3 className="font-serif font-bold text-lg text-[#1E392A]">Fresh Dispatch Within 3 Hours</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Stems are freshly cut, hand-wrapped, photo-previewed to you, and delivered to doorstep in 3 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Same-Day Products */}
      <ProductGrid
        products={sameDayProducts}
        title="Popular Same-Day Bouquets"
        subtitle="Ready for Instant Dispatch"
        showFilters={false}
      />

      {/* Available Cities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] p-8 sm:p-12 rounded-3xl border border-[#D4AF37]/30 shadow-sm space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="font-serif text-2xl font-bold text-[#1E392A]">Same-Day Delivery Coverage Cities</h3>
            <p className="text-xs text-gray-500 mt-1">Daily express courier vans operating across key Pakistani hubs</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}`}
                className="p-4 rounded-2xl bg-white border border-gray-200 text-center font-bold text-xs text-[#1E392A] hover:bg-[#581825] hover:text-white transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>📍 {city.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
