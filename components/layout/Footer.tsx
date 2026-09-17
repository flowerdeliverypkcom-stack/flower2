'use client';

import React from 'react';
import Link from 'next/link';
import { WHATSAPP_BASE_URL, WHATSAPP_NUMBER, WHATSAPP_CHANNEL_URL, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '@/utils/whatsapp';
import { MessageCircle, ShieldCheck, Truck, Sparkles, ExternalLink, Radio } from 'lucide-react';
import { Instagram } from '@/components/icons/InstagramIcon';
import OccasionReminder from '@/components/ui/OccasionReminder';

export default function Footer() {
  const vipChannelUrl = WHATSAPP_CHANNEL_URL;

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
              &quot;Flowers Delivered With Love Across Pakistan&quot;
            </p>
            <p className="text-xs text-stone-200 leading-relaxed">
              Pakistan&apos;s premier online florist for fresh roses, luxury gift hampers, bakery cakes, and wedding event decor with live WhatsApp video proof.
            </p>

            {/* Stay Connected Section & VIP Badge */}
            <div className="pt-2 space-y-2">
              <h3 className="font-serif text-xs font-bold text-[#F3E5AB] uppercase tracking-wider flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-[#25D366] animate-pulse" /> Live Order Hotline
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
                className="w-full inline-flex items-center justify-between gap-2 py-2 px-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-[#C5A880]/40 text-[#F3E5AB] hover:text-white text-xs font-bold transition-all shadow-sm group"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>VIP Channel (20% Off)</span>
                </div>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Official Instagram Profile Badge */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-between gap-2 py-2 px-3.5 rounded-full bg-gradient-to-r from-[#833ab4]/25 via-[#fd1d1d]/25 to-[#fcb045]/25 hover:from-[#833ab4]/40 hover:via-[#fd1d1d]/40 hover:to-[#fcb045]/40 border border-pink-300/40 text-pink-100 hover:text-white text-xs font-bold transition-all shadow-sm group"
              >
                <div className="flex items-center gap-2">
                  <Instagram className="w-3.5 h-3.5 text-pink-400 group-hover:scale-110 transition-transform" />
                  <span>@{INSTAGRAM_HANDLE}</span>
                </div>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Flowers & Jewelry */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold text-[#F3E5AB] uppercase tracking-wider">Flowers &amp; Jewelry</h3>
            <ul className="space-y-2 text-xs text-stone-200">
              <li><Link href="/red-rose-bouquets" className="hover:text-white transition-colors">Red Rose Bouquets</Link></li>
              <li><Link href="/white-rose-bouquets" className="hover:text-white transition-colors">White Rose Bouquets</Link></li>
              <li><Link href="/pink-rose-bouquets" className="hover:text-white transition-colors">Pink Rose Bouquets</Link></li>
              <li><Link href="/sunflower-bouquets" className="hover:text-white transition-colors">Sunflower Bouquets</Link></li>
              <li><Link href="/mixed-flower-bouquets" className="hover:text-white transition-colors">Mixed Floral Bouquets</Link></li>
              <li><Link href="/flower-boxes" className="hover:text-white transition-colors">Luxury Velvet Flower Boxes</Link></li>
              <li><Link href="/budget-bouquets" className="hover:text-white transition-colors">Budget-Friendly Bouquets</Link></li>
              <li><Link href="/floral-jewelry" className="hover:text-white transition-colors">Bridal Floral Gajray &amp; Jewelry</Link></li>
              <li><Link href="/imported-flowers" className="hover:text-white transition-colors">Imported Dutch Flowers</Link></li>
            </ul>
          </div>

          {/* Cakes, Gifts & Decor */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold text-[#F3E5AB] uppercase tracking-wider">Gifts &amp; Event Decor</h3>
            <ul className="space-y-2 text-xs text-stone-200">
              <li><Link href="/cake-and-flower-combos" className="hover:text-white transition-colors">Cakes &amp; Flowers Combos</Link></li>
              <li><Link href="/chocolate-bouquets" className="hover:text-white transition-colors">Ferrero Chocolate Bouquets</Link></li>
              <li><Link href="/gift-hampers" className="hover:text-white transition-colors">Luxury Gift Baskets &amp; Hampers</Link></li>
              <li><Link href="/balloons" className="hover:text-white transition-colors">Celebration Helium Balloons</Link></li>
              <li><Link href="/teddy-and-plushies" className="hover:text-white transition-colors">Teddy Bears &amp; Flowers</Link></li>
              <li><Link href="/candles-and-perfumes" className="hover:text-white transition-colors">Scented Candles &amp; Perfumes</Link></li>
              <li><Link href="/car-decoration" className="hover:text-white transition-colors">Wedding Car Decoration</Link></li>
              <li><Link href="/room-decoration" className="hover:text-white transition-colors">Bridal Room &amp; Masehri Decor</Link></li>
              <li><Link href="/wedding-decor" className="hover:text-white transition-colors">Wedding Stage &amp; Nikkah Decor</Link></li>
              <li><Link href="/party-event-decor" className="hover:text-white transition-colors">Birthday &amp; Party Decor</Link></li>
            </ul>
          </div>

          {/* Cities Across Pakistan */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold text-[#F3E5AB] uppercase tracking-wider">Delivery Cities</h3>
            <ul className="space-y-2 text-xs text-stone-200">
              <li><Link href="/flower-delivery-lahore" className="hover:text-white transition-colors">Flowers to Lahore (DHA/Gulberg)</Link></li>
              <li><Link href="/flower-delivery-karachi" className="hover:text-white transition-colors">Flowers to Karachi (Clifton/DHA)</Link></li>
              <li><Link href="/flower-delivery-islamabad" className="hover:text-white transition-colors">Flowers to Islamabad (F Sectors)</Link></li>
              <li><Link href="/flower-delivery-rawalpindi" className="hover:text-white transition-colors">Flowers to Rawalpindi (Bahria)</Link></li>
              <li><Link href="/flower-delivery-faisalabad" className="hover:text-white transition-colors">Flowers to Faisalabad</Link></li>
              <li><Link href="/flower-delivery-multan" className="hover:text-white transition-colors">Flowers to Multan</Link></li>
              <li><Link href="/flower-delivery-peshawar" className="hover:text-white transition-colors">Flowers to Peshawar</Link></li>
              <li><Link href="/flower-delivery-gujranwala" className="hover:text-white transition-colors">Flowers to Gujranwala</Link></li>
              <li><Link href="/flower-delivery-sialkot" className="hover:text-white transition-colors">Flowers to Sialkot (Cantt/Model)</Link></li>
              <li><Link href="/flower-delivery-pakistan-nationwide" className="hover:text-white transition-colors font-bold text-amber-200">Pakistan Nationwide Delivery</Link></li>
            </ul>
          </div>

          {/* Send From Overseas & Support */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold text-[#F3E5AB] uppercase tracking-wider">Send From Overseas</h3>
            <ul className="space-y-2 text-xs text-stone-200">
              <li><Link href="/send-flowers-to-pakistan-from-uk" className="hover:text-white transition-colors">Flowers from UK to Pakistan (£)</Link></li>
              <li><Link href="/send-flowers-to-pakistan-from-usa" className="hover:text-white transition-colors">Flowers from USA to Pakistan ($)</Link></li>
              <li><Link href="/send-flowers-to-pakistan-from-uae" className="hover:text-white transition-colors">Flowers from UAE to Pakistan (AED)</Link></li>
              <li><Link href="/flowers-to-usa-overseas" className="hover:text-white transition-colors">USA Flowers &amp; Worldwide Gifting</Link></li>
              <li><Link href="/same-day-flower-delivery" className="hover:text-white transition-colors">Same Day 2–3h Express</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Flower Guides &amp; Blog</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#C5A880]/20 text-center text-xs text-gray-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} FlowerDeliveryPK.com. All rights reserved. Flowers Delivered With Love.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-gray-300 text-xs">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-pink-300 transition-colors flex items-center gap-1">
              <Instagram className="w-3 h-3 text-pink-400" />
              <span>Instagram: @{INSTAGRAM_HANDLE}</span>
            </a>
            <span>•</span>
            <a href={WHATSAPP_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>WhatsApp Channel</span>
            </a>
            <span>•</span>
            <a href={WHATSAPP_BASE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              <span>Order Desk: {WHATSAPP_NUMBER}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
