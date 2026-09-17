'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Heart, 
  MessageCircle, 
  Sparkles, 
  ExternalLink, 
  Play, 
  CheckCircle2, 
  Users, 
  Video, 
  BellRing,
  ArrowRight
} from 'lucide-react';
import { Instagram } from '@/components/icons/InstagramIcon';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, WHATSAPP_CHANNEL_URL } from '@/utils/whatsapp';

interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  likes: string;
  comments: string;
  cityTag: string;
  isVideo?: boolean;
}

const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'ig-1',
    image: '/images/products/red_roses_bouquet.webp',
    caption: 'Fresh morning harvest of Ecuadorian red roses being hand-tied for a milestone anniversary in DHA Lahore. 🌹✨',
    likes: '1,420',
    comments: '48',
    cityTag: 'DHA Lahore',
    isVideo: true
  },
  {
    id: 'ig-2',
    image: '/images/banners/hero-slide-2.webp',
    caption: 'Signature cylindrical velvet keepsake box filled with 36 velvety roses. WhatsApp video recorded & dispatched! 🎁',
    likes: '980',
    comments: '32',
    cityTag: 'Gulberg Lahore',
    isVideo: false
  },
  {
    id: 'ig-3',
    image: '/images/products/cake_flower_combo.webp',
    caption: 'Belgian dark chocolate fudge cake paired with fresh red roses for a midnight birthday surprise in Islamabad F-7! 🎂🌸',
    likes: '2,150',
    comments: '89',
    cityTag: 'Islamabad F-7',
    isVideo: true
  },
  {
    id: 'ig-4',
    image: '/images/products/white_roses_studio.webp',
    caption: 'Pristine 20 white roses in soft cream wrap. The epitome of purity, grace, and heartfelt congratulations. 🕊️',
    likes: '840',
    comments: '19',
    cityTag: 'Clifton Karachi',
    isVideo: false
  },
  {
    id: 'ig-5',
    image: '/images/products/sunflower_roses.webp',
    caption: 'Golden jumbo sunflowers radiating warmth and joy across Karachi Clifton. Sourced fresh every single morning! 🌻☀️',
    likes: '1,120',
    comments: '41',
    cityTag: 'Karachi Delivery',
    isVideo: true
  },
  {
    id: 'ig-6',
    image: '/images/products/chocolate_flower_hamper.webp',
    caption: 'Ferrero Rocher sweet chocolate bouquet combined with crimson roses. Perfect gift for overseas senders! 🍫❤️',
    likes: '1,890',
    comments: '76',
    cityTag: 'Nationwide Express',
    isVideo: false
  }
];

export default function InstagramFeed() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-14 sm:my-20">
      {/* Top Trust & Verification Banner */}
      <div className="bg-gradient-to-br from-[#FAF7F2] via-white to-pink-50/40 rounded-3xl p-6 sm:p-8 border border-[#C5A880]/30 shadow-lg mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Profile Badge & Trust Info */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            {/* Instagram Story Gradient Ring Avatar */}
            <a 
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative p-1 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-md hover:scale-105 transition-transform flex-shrink-0 group"
              title="View @flowerdeliverypk on Instagram"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-1 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-[#8B1538] to-[#4A0E17] flex flex-col items-center justify-center text-white text-center">
                  <Instagram className="w-6 h-6 sm:w-7 sm:h-7 text-[#C5A880]" />
                  <span className="text-[8px] font-serif font-bold uppercase tracking-tight mt-0.5">FD.PK</span>
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-5 h-5 bg-[#25D366] border-2 border-white rounded-full flex items-center justify-center" title="Active Dispatches">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              </span>
            </a>

            {/* Profile Meta & Proof */}
            <div className="space-y-1 sm:space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-xl sm:text-2xl font-bold text-[#1F1F1F] hover:text-[#8B1538] transition-colors flex items-center gap-1.5"
                >
                  @{INSTAGRAM_HANDLE}
                  <span title="Verified Florist" className="inline-flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-sky-500 fill-sky-500" />
                  </span>
                </a>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-pink-100/80 text-pink-800 text-[11px] font-bold border border-pink-200">
                  <Sparkles className="w-3 h-3 text-pink-600" />
                  Official Profile
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 max-w-xl leading-relaxed">
                Watch <strong className="text-[#8B1538]">real bouquet videos, preparation reels &amp; live dispatches</strong> across Lahore, Karachi &amp; Islamabad before your flowers ship!
              </p>

              {/* Trust Counters */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] sm:text-xs text-stone-500 font-medium">
                <span className="flex items-center gap-1 text-stone-800 font-bold">
                  <Users className="w-3.5 h-3.5 text-[#8B1538]" /> 15.4K+ Floral Family
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#25D366] font-bold">
                  <Video className="w-3.5 h-3.5" /> 100% Real Video Proofs
                </span>
                <span>•</span>
                <span className="text-stone-700">Daily Fresh Dispatches</span>
              </div>
            </div>
          </div>

          {/* Right: Dual CTAs (Instagram Profile + WhatsApp Channel) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
            {/* Instagram Follow Button */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-5 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow @{INSTAGRAM_HANDLE}</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* WhatsApp VIP Channel Button */}
            <a
              href={WHATSAPP_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-5 rounded-full bg-[#075E54] hover:bg-[#054c44] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 border border-emerald-400/30 group"
            >
              <BellRing className="w-4 h-4 text-[#25D366] animate-bounce" />
              <span>Join WhatsApp Channel</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Grid of 6 Posts with Real Profile Links & Hover Video Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {INSTAGRAM_POSTS.map((post) => (
          <a
            key={post.id}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-100 border border-[#C5A880]/30 shadow-xs hover:shadow-2xl transition-all duration-500 block"
            title={`View reel on Instagram @${INSTAGRAM_HANDLE}`}
          >
            <Image
              src={post.image}
              alt={`${post.cityTag} flower delivery on Instagram @${INSTAGRAM_HANDLE}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-95 contrast-105"
            />

            {/* City Tag Badge */}
            <span className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[9px] font-medium text-white/90">
              {post.cityTag}
            </span>

            {/* Video Play Badge */}
            {post.isVideo && (
              <span className="absolute top-2.5 right-2.5 z-10 w-6 h-6 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center shadow-md">
                <Play className="w-3 h-3 fill-white ml-0.5" />
              </span>
            )}

            {/* Hover Glassmorphism Overlay with Real Instagram Stats */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 text-white z-10">
              <div className="flex items-center justify-between text-xs text-white/90">
                <div className="flex items-center gap-1 font-bold">
                  <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1 font-bold">
                  <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
                  <span>{post.comments}</span>
                </div>
              </div>

              <div>
                <p className="text-[11px] line-clamp-3 text-stone-200 leading-snug mb-1.5">
                  {post.caption}
                </p>
                <span className="text-[10px] font-bold text-[#F3E5AB] flex items-center gap-1">
                  Watch on Instagram <ExternalLink className="w-2.5 h-2.5" />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Dual Channel Companion Strip (Instagram & WhatsApp) */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Instagram Trust Card */}
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 sm:p-5 rounded-2xl bg-white border border-[#C5A880]/30 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4 group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Instagram className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-sm text-[#1F1F1F]">Instagram Live Proofs</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 fill-sky-500" />
              </div>
              <p className="text-xs text-stone-500">
                Check daily customer reviews &amp; handcrafted bouquets at @{INSTAGRAM_HANDLE}
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-stone-100 group-hover:bg-[#8B1538] group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
            <ArrowRight className="w-4 h-4" />
          </div>
        </a>

        {/* WhatsApp VIP Channel Card */}
        <a
          href={WHATSAPP_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 sm:p-5 rounded-2xl bg-[#075E54]/5 border border-emerald-600/30 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4 group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#075E54] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <MessageCircle className="w-6 h-6 fill-[#25D366]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-sm text-[#075E54]">Official WhatsApp Channel</span>
                <span className="text-[10px] uppercase font-bold bg-[#25D366] text-white px-1.5 py-0.2 rounded-full">VIP</span>
              </div>
              <p className="text-xs text-stone-600">
                Join our channel for instant 20% flash sales &amp; seasonal flower alerts
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#075E54]/10 group-hover:bg-[#075E54] group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0 text-[#075E54]">
            <ArrowRight className="w-4 h-4" />
          </div>
        </a>
      </div>
    </section>
  );
}
