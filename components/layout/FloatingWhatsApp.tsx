'use client';

import React, { useState } from 'react';
import { WHATSAPP_BASE_URL, WHATSAPP_NUMBER } from '@/utils/whatsapp';
import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[9990] flex items-center gap-2 pointer-events-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Luxury Expandable Tooltip on Desktop */}
      <AnimatePresence>
        {isHovered && (
          <motion.a
            href={WHATSAPP_BASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-stone-900/95 text-white backdrop-blur-md text-xs font-medium shadow-2xl border border-[#C5A880]/40 whitespace-nowrap"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
            </span>
            <span>Florist Online • <strong className="text-[#C5A880]">Instant Reply</strong></span>
          </motion.a>
        )}
      </AnimatePresence>

      {/* Main Luxury FAB Icon */}
      <a
        href={WHATSAPP_BASE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="relative p-3.5 sm:p-4 rounded-full bg-[#075E54] hover:bg-[#054c44] text-white transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center group ring-2 ring-[#C5A880]/30 hover:ring-[#C5A880]"
        aria-label={`Chat on WhatsApp ${WHATSAPP_NUMBER}`}
        title={`Order on WhatsApp ${WHATSAPP_NUMBER}`}
      >
        <MessageCircle className="w-6 h-6 sm:w-6.5 sm:h-6.5 fill-white group-hover:scale-110 transition-transform duration-300" />
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#25D366] rounded-full border-2 border-white animate-pulse" />
      </a>
    </div>
  );
}
