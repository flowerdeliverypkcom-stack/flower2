'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS } from '@/data/products';
import { CheckCircle2, X } from 'lucide-react';

const FAKE_CUSTOMERS = [
  { name: 'Ayesha Khan', city: 'Lahore' },
  { name: 'Hamza Farooq', city: 'Islamabad' },
  { name: 'Zainab Ahmed', city: 'Karachi' },
  { name: 'Usman Malik', city: 'Rawalpindi' },
  { name: 'Fatima Raza', city: 'Faisalabad' },
  { name: 'Bilal Tariq', city: 'Multan' },
  { name: 'Sana Sheikh', city: 'Sialkot' },
  { name: 'Ali Hassan', city: 'Gujranwala' },
  { name: 'Sara Siddiqui', city: 'Dubai, UAE' },
  { name: 'Tariq Mehmood', city: 'London, UK' },
  { name: 'Nida Chaudhry', city: 'New York, USA' },
  { name: 'Omer Shah', city: 'Peshawar' },
];

const TIME_AGOS = [
  'Just now',
  '1 min ago',
  '2 mins ago',
  '4 mins ago',
  '7 mins ago',
  '11 mins ago',
  '15 mins ago',
];

interface NotificationData {
  customerName: string;
  city: string;
  product: typeof PRODUCTS[0];
  timeAgo: string;
}

export default function SalesNotificationPopup() {
  const [currentNotification, setCurrentNotification] = useState<NotificationData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const triggerPopup = () => {
      const randomCustomer = FAKE_CUSTOMERS[Math.floor(Math.random() * FAKE_CUSTOMERS.length)];
      const randomProduct = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
      const randomTime = TIME_AGOS[Math.floor(Math.random() * TIME_AGOS.length)];

      setCurrentNotification({
        customerName: randomCustomer.name,
        city: randomCustomer.city,
        product: randomProduct,
        timeAgo: randomTime,
      });
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 5500);
    };

    const initialTimer = setTimeout(() => {
      triggerPopup();
    }, 7000);

    const interval = setInterval(() => {
      triggerPopup();
    }, 12000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed]);

  if (isDismissed || !currentNotification) return null;

  return (
    <div className="fixed bottom-20 left-3 sm:bottom-6 sm:left-6 z-[9980] max-w-[280px] xs:max-w-[310px] sm:max-w-[340px] pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="pointer-events-auto relative rounded-2xl p-3 sm:p-3.5 bg-[#8B1538] text-white border border-[#C5A880]/60 shadow-2xl flex items-center gap-3"
          >
            {/* Close button */}
            <button
              onClick={() => {
                setIsVisible(false);
                setIsDismissed(true);
              }}
              className="absolute -top-2 -right-2 p-1.5 rounded-full bg-[#6e102c] text-[#C5A880] hover:bg-black transition-colors shadow-md z-10 border border-[#C5A880]/40"
              title="Close notifications"
            >
              <X className="w-3 h-3" />
            </button>

            {/* Product Image Thumbnail */}
            <Link
              href={`/product/${currentNotification.product.slug}`}
              className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-[#C5A880]/40 flex-shrink-0 bg-[#6e102c] group shadow-inner"
            >
              <Image
                src={currentNotification.product.images[0]}
                alt={currentNotification.product.name}
                fill
                sizes="56px"
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </Link>

            {/* Notification Text Info */}
            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-[#C5A880] uppercase tracking-wider mb-0.5">
                <CheckCircle2 className="w-3 h-3 fill-[#C5A880] text-[#8B1538] flex-shrink-0" />
                <span className="truncate">Verified Order • {currentNotification.timeAgo}</span>
              </div>

              <p className="text-[11px] sm:text-xs text-gray-200 font-medium truncate">
                <span className="font-bold text-white">{currentNotification.customerName}</span> from{' '}
                <span className="font-bold text-[#C5A880]">{currentNotification.city}</span>
              </p>

              <Link
                href={`/product/${currentNotification.product.slug}`}
                className="block text-xs font-serif font-bold text-white hover:text-[#C5A880] truncate transition-colors"
              >
                Ordered {currentNotification.product.name}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
