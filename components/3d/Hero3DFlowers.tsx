'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Video, Star, MessageCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_BASE_URL, WHATSAPP_NUMBER } from '@/utils/whatsapp';

const SHOWCASE_PRODUCTS = [
  {
    id: 'roses',
    name: 'Classic Red Rose Grandeur',
    subtitle: '24 Hand-Tied Fresh Ecuadorian Stems',
    price: 4499,
    originalPrice: 5499,
    rating: 4.9,
    tag: 'Bestseller',
    badge: 'Harvested Today',
    image: '/images/products/red_roses_bouquet.webp',
    alt: 'Luxury Red Rose Bouquet Delivery Lahore Karachi Islamabad',
    accentColor: '#8B1538',
    whatsappMessage: 'Hello FlowerDeliveryPK! I want to order the Classic Red Rose Grandeur (Rs. 4,499). Please confirm same-day delivery.',
  },
  {
    id: 'combo',
    name: 'Royal Celebration Combo',
    subtitle: 'Belgian Chocolate Cake + Fresh Roses',
    price: 5999,
    originalPrice: 6999,
    rating: 5.0,
    tag: 'Celebration VIP',
    badge: 'Fresh Bakery Pair',
    image: '/images/products/cake_flower_combo.webp',
    alt: 'Birthday Cake and Flowers Combo Pakistan Delivery',
    accentColor: '#70102b',
    whatsappMessage: 'Hello FlowerDeliveryPK! I want to order the Royal Celebration Combo (Rs. 5,999). Please confirm availability.',
  },
  {
    id: 'hamper',
    name: 'Midnight Velvet Hamper',
    subtitle: 'Ferrero Rocher & Crimson Rose Box',
    price: 6499,
    originalPrice: 7499,
    rating: 4.9,
    tag: 'Luxury Box',
    badge: 'Velvet Keepsake',
    image: '/images/products/chocolate_flower_hamper.webp',
    alt: 'Luxury Chocolate Flower Box Pakistan',
    accentColor: '#581825',
    whatsappMessage: 'Hello FlowerDeliveryPK! I want to order the Midnight Velvet Hamper (Rs. 6,499). Please share delivery times.',
  },
  {
    id: 'sunflower',
    name: 'Golden Sunflower & Roses',
    subtitle: 'Artisan Dutch Stems & Eucalyptus',
    price: 3899,
    originalPrice: 4499,
    rating: 4.8,
    tag: 'Trending',
    badge: 'Radiant Blooms',
    image: '/images/products/sunflower_roses.webp',
    alt: 'Sunflower and Rose Bouquet Delivery Pakistan',
    accentColor: '#92400e',
    whatsappMessage: 'Hello FlowerDeliveryPK! I want to order the Golden Sunflower & Roses (Rs. 3,899). Please confirm same-day dispatch.',
  },
];

export default function Hero3DFlowers() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const activeProduct = SHOWCASE_PRODUCTS[selectedIndex];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rX = -(mouseY / (rect.height / 2)) * 8;
    const rY = (mouseX / (rect.width / 2)) * 8;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || WHATSAPP_NUMBER).replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(activeProduct.whatsappMessage);
    window.open(`https://wa.me/${cleanNumber}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center">
      {/* 3D Parallax Main Showcase Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-[430px] sm:h-[480px] md:h-[500px] perspective-1000 cursor-pointer select-none"
      >
        <motion.div
          animate={{
            rotateX: rotateX,
            rotateY: rotateY,
            scale: isHovered ? 1.015 : 1,
          }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          className="relative w-full h-full transform-style-3d rounded-3xl overflow-hidden shadow-2xl border border-[#C5A880]/40 bg-gradient-to-b from-[#2B0912] via-[#1E070D] to-[#120307]"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-radial from-[#8B1538]/30 via-transparent to-transparent pointer-events-none" />

          {/* Animated Product Photography */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              <Image
                src={activeProduct.image}
                alt={activeProduct.alt}
                fill
                priority
                className="object-cover object-center filter brightness-[0.98] contrast-[1.04]"
                sizes="(max-width: 768px) 100vw, 550px"
              />
              {/* Refined Luxury Vignette / Bottom Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/20 pointer-events-none" />
            </motion.div>
          </AnimatePresence>

          {/* Top Left Badge: Live WhatsApp Video Guarantee */}
          <motion.div
            animate={{
              translateZ: isHovered ? 35 : 18,
              x: rotateY * 1.2,
              y: -rotateX * 1.2,
            }}
            className="absolute top-4 left-4 sm:top-5 sm:left-5 backdrop-blur-md bg-black/60 text-white text-[11px] font-medium px-3 py-1.5 rounded-full border border-white/20 shadow-lg flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
            </span>
            <Video className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Live Video Sent Before Dispatch</span>
          </motion.div>

          {/* Top Right Badge: Freshness */}
          <motion.div
            animate={{
              translateZ: isHovered ? 35 : 18,
              x: rotateY * 1.2,
              y: -rotateX * 1.2,
            }}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 backdrop-blur-md bg-[#8B1538]/85 text-white text-[10px] sm:text-[11px] font-semibold px-3 py-1.5 rounded-full border border-[#C5A880]/50 shadow-lg flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-[#C5A880]" />
            <span>{activeProduct.badge}</span>
          </motion.div>

          {/* Floating Rating Pill */}
          <motion.div
            animate={{
              translateZ: isHovered ? 45 : 22,
              x: rotateY * 1.5,
              y: -rotateX * 1.5,
            }}
            className="hidden xs:flex absolute top-16 right-4 sm:right-5 backdrop-blur-md bg-stone-900/80 text-white text-[10px] font-medium px-2.5 py-1 rounded-full border border-[#C5A880]/30 shadow-md items-center gap-1"
          >
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="font-bold text-amber-300">{activeProduct.rating}</span>
            <span className="text-stone-300 text-[9px]">• 1,850+ Verified Deliveries</span>
          </motion.div>

          {/* Bottom Floating Card: Masterpiece Details & WhatsApp Trigger */}
          <motion.div
            animate={{
              translateZ: isHovered ? 40 : 20,
              x: rotateY * 1.5,
              y: -rotateX * 1.5,
            }}
            className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 p-3.5 sm:p-4 rounded-2xl bg-stone-950/85 backdrop-blur-xl border border-[#C5A880]/40 shadow-2xl text-white"
          >
            <div className="flex items-center justify-between gap-3">
              {/* Product Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="px-2 py-0.5 rounded-full bg-[#8B1538] text-[#FAF7F2] text-[9px] sm:text-[10px] uppercase font-bold tracking-wider border border-[#C5A880]/40">
                    {activeProduct.tag}
                  </span>
                  <span className="text-[10px] text-stone-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    In Stock Today
                  </span>
                </div>
                <p className="font-serif font-bold text-sm sm:text-base text-white truncate tracking-tight">
                  {activeProduct.name}
                </p>
                <p className="text-[11px] text-stone-300 truncate">
                  {activeProduct.subtitle}
                </p>
              </div>

              {/* Price & 1-Click Order Button */}
              <div className="flex flex-col items-end flex-shrink-0">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[10px] sm:text-xs text-stone-300 line-through">
                    Rs. {activeProduct.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-sm sm:text-lg font-serif font-bold text-[#E5C378]">
                    Rs. {activeProduct.price.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={handleWhatsAppOrder}
                  type="button"
                  className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#075E54] hover:bg-[#054c44] text-white text-[11px] font-semibold transition-all shadow-md hover:scale-105 active:scale-95 border border-emerald-400/30 cursor-pointer"
                  title="Order this bouquet directly on WhatsApp"
                >
                  <MessageCircle className="w-3 h-3 fill-white" />
                  <span>Order on WhatsApp</span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-200" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Interactive Bouquet Thumbnails Switcher */}
      <div className="w-full mt-4 flex items-center justify-center gap-2 sm:gap-3 px-2">
        {SHOWCASE_PRODUCTS.map((item, idx) => {
          const isSelected = selectedIndex === idx;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedIndex(idx)}
              className={`group relative flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-2xl transition-all duration-300 text-left cursor-pointer border ${
                isSelected
                  ? 'bg-white shadow-md border-[#8B1538] ring-2 ring-[#8B1538]/20 scale-105'
                  : 'bg-white/70 hover:bg-white border-[#C5A880]/30 hover:border-[#8B1538]/50'
              }`}
            >
              {/* Mini Thumbnail */}
              <div className="relative w-8 h-8 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100 border border-[#C5A880]/20">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              </div>

              {/* Title & Price */}
              <div className="hidden sm:block min-w-0 pr-1">
                <p className={`text-[11px] font-bold truncate leading-tight ${isSelected ? 'text-[#8B1538]' : 'text-stone-700'}`}>
                  {item.name.split(' ')[0]} {item.name.split(' ')[1]}
                </p>
                <p className="text-[10px] text-stone-500 font-semibold">
                  Rs. {item.price.toLocaleString()}
                </p>
              </div>

              {/* Selected indicator dot */}
              {isSelected && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#8B1538] border-2 border-white" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
