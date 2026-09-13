'use client';

import React from 'react';
import Link from 'next/link';
import { WHATSAPP_BASE_URL, WHATSAPP_NUMBER } from '@/utils/whatsapp';
import { MessageCircle, ShieldCheck, Truck, Sparkles, ExternalLink, Radio } from 'lucide-react';
import OccasionReminder from '@/components/ui/OccasionReminder';

export default function Footer() {
  const vipChannelUrl =
    process.env.NEXT_PUBLIC_WHATSAPP_VIP_CHANNEL ||
    'https://whatsapp.com/channel/0029Va9FlowerDeliveryPKVIP';

  return (
    <footer className="bg-[#8B1538] text-[#FAFAFA] pt-16 pb-8 border-t-2 border-[#C5A880]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Occasion Reminder Embedded Banner */}
        <div className="mb-16">
          <OccasionReminder />
        </div>

        {/* Top Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-[#C5A880]/30 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#6e102c] text-[#C5A880] flex items-center justify-center mb-3 shadow-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <p className="font-serif font-bold text-sm text-white">Fresh Flowers</p>
            <p className="text-xs text-stone-200 mt-1">Farm fresh roses & blooms</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#6e102c] text-[#C5A880] flex items-center justify-center mb-3 shadow-lg">
              <Truck className="w-6 h-6" />
            </div>
            <p className="font-serif font-bold text-sm text-white">Same-Day Delivery</p>
            <p className="text-xs text-stone-200 mt-1">Express 2-3 hour service</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#6e102c] text-[#C5A880] flex items-center justify-center mb-3 shadow-lg">
              <MessageCircle className="w-6 h-6 text-[#25D366]" />
            </div>
            <p className="font-serif font-bold text-sm text-white">WhatsApp Ordering</p>
            <p className="text-xs text-stone-200 mt-1">Instant support 24/7</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#6e102c] text-[#C5A880] flex items-center justify-center mb-3 shadow-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <p className="font-serif font-bold text-sm text-white">Trusted Quality</p>
            <p className="text-xs text-stone-200 mt-1">100% Satisfaction guarantee</p>
          </div>
        </div>

        {/* Main Navigation Links Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12">
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                FlowerDelivery<span className="text-[#C5A880]">PK</span>
              </span>
            </Link>
            <p className="text-xs text-stone-200 leading-relaxed font-serif italic">
              &quot;Flowers Delivered With Love&quot;
            </p>
            <p className="text-xs text-stone-200 leading-relaxed">
              Pakistan&apos;s premier online luxury flower, bouquet & gift delivery service serving Lahore, Karachi, Islamabad, and nationwide.
            </p>

            {/* Stay Connected Section & VIP Badge */}
            <div className="pt-2 space-y-2">
              <h3 className="font-serif text-xs font-bold text-[#F3E5AB] uppercase tracking-wider flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-[#25D366] animate-pulse" /> Stay Connected
              </h3>

              <a
                href={WHATSAPP_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#25D366] text-white text-xs font-bold hover:bg-[#20bd5a] transition-all shadow-lg"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp: {WHATSAPP_NUMBER}</span>
              </a>

              {/* Official WhatsApp VIP Channel Badge */}
              <a
                href={vipChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-full bg-white/10 hover:bg-white/20 border border-[#C5A880]/40 text-[#F3E5AB] hover:text-white text-xs font-bold transition-all shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Join VIP Channel (20% Flash Deals)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold text-[#F3E5AB] uppercase tracking-wider">Shop</h3>
            <ul className="space-y-2 text-xs text-stone-200">
              <li><Link href="/red-rose-bouquets" className="hover:text-white transition-colors">Red Roses</Link></li>
              <li><Link href="/mixed-flower-bouquets" className="hover:text-white transition-colors">Mixed Bouquets</Link></li>
              <li><Link href="/flower-boxes" className="hover:text-white transition-colors">Luxury Flower Boxes</Link></li>
              <li><Link href="/imported-flowers" className="hover:text-white transition-colors">Imported Dutch Flowers</Link></li>
              <li><Link href="/same-day-flower-delivery" className="hover:text-white transition-colors">Same Day Delivery</Link></li>
            </ul>
          </div>

          {/* Gifts */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold text-[#F3E5AB] uppercase tracking-wider">Gifts & Combos</h3>
            <ul className="space-y-2 text-xs text-stone-200">
              <li><Link href="/gift-boxes" className="hover:text-white transition-colors">Gift Boxes & Baskets</Link></li>
              <li><Link href="/chocolate-bouquets" className="hover:text-white transition-colors">Chocolate Bouquets</Link></li>
              <li><Link href="/cake-and-flower-combos" className="hover:text-white transition-colors">Cakes & Flowers</Link></li>
              <li><Link href="/gift-boxes" className="hover:text-white transition-colors">Teddy & Flowers</Link></li>
            </ul>
          </div>

          {/* Occasions */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold text-[#F3E5AB] uppercase tracking-wider">Occasions</h3>
            <ul className="space-y-2 text-xs text-stone-200">
              <li><Link href="/birthday-flowers" className="hover:text-white transition-colors">Birthday Flowers</Link></li>
              <li><Link href="/anniversary-flowers" className="hover:text-white transition-colors">Anniversary Flowers</Link></li>
              <li><Link href="/valentine-flowers" className="hover:text-white transition-colors">Valentine&apos;s Day</Link></li>
              <li><Link href="/wedding-flowers" className="hover:text-white transition-colors">Wedding Flowers</Link></li>
              <li><Link href="/congratulations-flowers" className="hover:text-white transition-colors">Congratulations</Link></li>
            </ul>
          </div>

          {/* Cities & Support */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold text-[#F3E5AB] uppercase tracking-wider">Cities & Support</h3>
            <ul className="space-y-2 text-xs text-stone-200">
              <li><Link href="/flower-delivery-lahore" className="hover:text-white transition-colors">Lahore Flower Delivery</Link></li>
              <li><Link href="/flower-delivery-karachi" className="hover:text-white transition-colors">Karachi Flower Delivery</Link></li>
              <li><Link href="/flower-delivery-islamabad" className="hover:text-white transition-colors">Islamabad Delivery</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About FlowerDeliveryPK</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#C5A880]/20 text-center text-xs text-gray-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} FlowerDeliveryPK.com. All rights reserved. Flowers Delivered With Love.</p>
          <div className="flex gap-4 text-gray-300 text-xs">
            <span>Fresh Flowers</span>
            <span>•</span>
            <span>Same-Day Delivery</span>
            <span>•</span>
            <span>WhatsApp Order: 0320-0411680</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
