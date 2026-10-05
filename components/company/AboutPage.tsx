'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WHATSAPP_BASE_URL, WHATSAPP_NUMBER, WHATSAPP_CHANNEL_URL, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '@/utils/whatsapp';
import { MessageCircle, Heart, Sparkles, ShieldCheck, Truck, Globe } from 'lucide-react';
import { Instagram } from '@/components/icons/InstagramIcon';

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#1E392A] text-white text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold block">
            About FlowerDeliveryPK.com
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">
            Flowers Delivered With Love Across Pakistan
          </h1>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Crafting memorable floral moments, luxury rose boxes, and gift celebrations since day one.
          </p>
        </div>
      </section>

      {/* Story & Mission */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-xl border-2 border-[#D4AF37]/30">
            <Image
              src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80"
              alt="FlowerDeliveryPK luxury rose bouquet"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6 text-gray-700 leading-relaxed text-sm">
            <span className="text-xs uppercase tracking-widest text-[#581825] font-bold block">Our Mission</span>
            <h2 className="text-3xl font-serif font-bold text-[#1E392A]">
              Connecting Heartbeats Through Fresh Blooms
            </h2>

            <p>
              FlowerDeliveryPK.com was built with a simple yet powerful mission: to make luxury flower gifting seamless, reliable, and deeply meaningful for families in Pakistan and loved ones living overseas.
            </p>

            <p>
              Whether it is a surprise birthday bouquet in Lahore, an anniversary declaration of 50 red roses in Karachi, or a celebratory cake combo delivered to Islamabad, our team ensures that every stem is sourced fresh, hand-wrapped with precision, and delivered with genuine care.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-[#D4AF37]/20 text-xs font-bold text-[#1E392A]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#581825]" /> 100% Farm Fresh Stems
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#581825]" /> 3-Hour Express Dispatch
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#581825]" /> Overseas Ordering Friendly
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#25D366]" /> Live Photo Preview
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FDF0ED] border border-[#D4AF37]/40 shadow-md space-y-6">
          <h3 className="font-serif text-2xl font-bold text-[#1E392A]">Have Questions or Special Custom Orders?</h3>
          <p className="text-xs text-gray-600 max-w-lg mx-auto">
            Contact our floral design concierge team on WhatsApp for custom flower box arrangements, wedding stage decor, or corporate gift hampers.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={WHATSAPP_BASE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-[#25D366] text-white font-bold text-xs hover:bg-[#20bd5a] transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white" /> Chat on WhatsApp ({WHATSAPP_NUMBER})
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-bold text-xs hover:opacity-95 transition-all shadow-md"
            >
              <Instagram className="w-4 h-4" /> Instagram @{INSTAGRAM_HANDLE}
            </a>
            <a
              href={WHATSAPP_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-3 px-6 rounded-full bg-[#075E54] text-white font-bold text-xs hover:bg-[#054c44] transition-all shadow-md border border-emerald-400/30"
            >
              <Sparkles className="w-4 h-4 text-[#25D366]" /> Join VIP Channel
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
