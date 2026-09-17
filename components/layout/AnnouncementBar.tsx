'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Phone, Video, ShieldCheck, ChevronRight } from 'lucide-react';
import { Instagram } from '@/components/icons/InstagramIcon';
import { WHATSAPP_BASE_URL, WHATSAPP_NUMBER, WHATSAPP_CHANNEL_URL, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '@/utils/whatsapp';

const ANNOUNCEMENTS = [
  {
    icon: Instagram,
    text: `Follow @${INSTAGRAM_HANDLE} on Instagram`,
    highlight: "Watch Live Bouquet Reels & Real Video Proofs",
    action: "Watch on Instagram",
    url: INSTAGRAM_URL,
  },
  {
    icon: Sparkles,
    text: "Join Our Official WhatsApp Channel",
    highlight: "Exclusive Flash Deals & Daily Fresh Flower Drops",
    action: "Follow Channel",
    url: WHATSAPP_CHANNEL_URL,
  },
  {
    icon: Video,
    text: "Live Video Preview Before Dispatch",
    highlight: "We send an HD WhatsApp video of your bouquet before delivery",
    action: "Order on WhatsApp",
    url: WHATSAPP_BASE_URL,
  },
  {
    icon: ShieldCheck,
    text: "Same-Day Chilled Express Delivery",
    highlight: "Lahore • Karachi • Islamabad • Rawalpindi (2-3 Hours)",
    action: "Explore Bouquets",
    url: "/red-rose-bouquets",
  }
];

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    try {
      const isDismissed = localStorage.getItem('fdpk_vip_bar_dismissed');
      if (isDismissed) setIsVisible(false);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      localStorage.setItem('fdpk_vip_bar_dismissed', 'true');
    } catch {
      // ignore
    }
  };

  const current = ANNOUNCEMENTS[currentIndex];
  const IconComponent = current.icon;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative z-50 bg-[#4A0E17] text-[#FAF7F2] border-b border-[#C5A880]/25 text-xs select-none"
        >
          <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
            {/* Left helper info */}
            <div className="hidden lg:flex items-center gap-2 text-[11px] text-[#C5A880] tracking-wider uppercase font-semibold">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
              <span>Bespoke Concierge Florist</span>
            </div>

            {/* Center: Animated Rotating Announcement */}
            <div className="flex-1 flex items-center justify-center min-h-[22px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 text-center text-[11px] sm:text-xs"
                >
                  <IconComponent className="w-3.5 h-3.5 text-[#C5A880] flex-shrink-0" />
                  <span className="font-semibold text-white/95">{current.text}</span>
                  <span className="hidden sm:inline text-[#C5A880]/90">• {current.highlight}</span>
                  <a
                    href={current.url}
                    target={current.url.startsWith('http') ? '_blank' : undefined}
                    rel={current.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-0.5 text-[#C5A880] hover:text-white font-bold ml-1 transition-colors underline underline-offset-2 decoration-[#C5A880]/50"
                  >
                    <span>{current.action}</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Instant WhatsApp Link & Dismiss */}
            <div className="flex items-center gap-3">
              <a
                href={WHATSAPP_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF7F2] text-[11px] font-medium border border-[#C5A880]/30 transition-all hover:scale-[1.02]"
              >
                <Phone className="w-3 h-3 text-[#25D366]" />
                <span className="tracking-tight">{WHATSAPP_NUMBER}</span>
              </a>

              <button
                onClick={handleDismiss}
                className="p-1 text-white/60 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                aria-label="Dismiss top announcement"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
