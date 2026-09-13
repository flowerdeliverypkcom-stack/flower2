'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import WhatsAppOrderButton from '@/components/product/WhatsAppOrderButton';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingBag, Check, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [modalImgSrc, setModalImgSrc] = useState<string>('');

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const currentImg = product.images[activeImageIndex] || product.images[0] || FALLBACK_IMAGE;
  const displayImg = modalImgSrc || currentImg;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#FAFAFA] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#C5A880]/50 overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Close button - Fixed/Sticky top right */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="sticky top-3 right-3 sm:absolute sm:top-4 sm:right-4 ml-auto z-20 p-2 sm:p-2.5 rounded-full bg-white/90 hover:bg-[#8B1538] hover:text-white text-[#1F1F1F] transition-all shadow-lg border border-gray-200 flex items-center justify-center"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6 md:p-8 -mt-8 sm:mt-0">
            {/* Gallery */}
            <div className="space-y-3 sm:space-y-4">
              <div className="relative w-full h-[260px] xs:h-[300px] sm:h-[340px] md:h-[380px] rounded-2xl overflow-hidden border border-[#C5A880]/30 bg-white">
                <Image
                  src={displayImg}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  onError={() => setModalImgSrc(FALLBACK_IMAGE)}
                />
                {/* Brand Watermark Overlay Badge */}
                <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-bold font-serif tracking-wider shadow-md pointer-events-none flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  FlowerDeliveryPK.com
                </div>
                {product.discountPercentage > 0 && (
                  <span className="absolute top-3 left-3 bg-[#8B1538] text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        activeImageIndex === idx ? 'border-[#8B1538] scale-105 shadow-md' : 'border-transparent opacity-70'
                      }`}
                    >
                      <Image src={img} alt="" fill sizes="64px" className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#8B1538] font-bold">
                    {product.category}
                  </span>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center text-amber-500 text-xs font-bold gap-1">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-gray-400 font-normal">({product.reviewsCount} reviews)</span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-[#1F1F1F] mb-2 sm:mb-3">
                  {product.name}
                </h2>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                  {product.shortDescription}
                </p>

                {/* Pricing */}
                <div className="flex items-baseline gap-3 mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl font-bold text-[#8B1538]">
                    Rs. {(product.price * quantity).toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm sm:text-base text-gray-400 line-through">
                      Rs. {(product.originalPrice * quantity).toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Specs Pill List */}
                <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#C5A880]/20 space-y-2 text-xs text-gray-700 mb-4 sm:mb-6">
                  {product.flowerDetails?.stemCount && (
                    <div className="flex justify-between border-b pb-1.5 border-gray-100">
                      <span className="text-gray-500">Stem Count:</span>
                      <span className="font-semibold text-[#1F1F1F]">{product.flowerDetails.stemCount} Premium Stems</span>
                    </div>
                  )}
                  {product.flowerDetails?.wrapperColor && (
                    <div className="flex justify-between border-b pb-1.5 border-gray-100">
                      <span className="text-gray-500">Packaging:</span>
                      <span className="font-semibold text-[#1F1F1F]">{product.flowerDetails.wrapperColor}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Same-Day Delivery:</span>
                    <span className="font-semibold text-[#748B75] flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Available Across Pakistan
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                {/* Quantity selector */}
                <div className="flex items-center gap-3">
                  <span className="text-xs uppercase tracking-wider font-bold text-gray-500">Quantity:</span>
                  <div className="flex items-center bg-white border border-[#C5A880]/40 rounded-full p-1">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[#1F1F1F] hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 sm:w-10 text-center font-bold text-xs sm:text-sm text-[#1F1F1F]">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[#1F1F1F] hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      addToCart(product, quantity);
                      setQuickViewProduct(null);
                    }}
                    className="w-full py-3 sm:py-3.5 px-4 rounded-full bg-[#8B1538] text-white hover:bg-[#6e102c] font-bold text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>

                  <WhatsAppOrderButton
                    productName={product.name}
                    price={product.price}
                    quantity={quantity}
                    variant="full"
                    label="Order on WhatsApp"
                  />
                </div>

                <div className="text-center pt-1">
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={() => setQuickViewProduct(null)}
                    className="text-xs text-[#8B1538] font-semibold hover:underline"
                  >
                    View Full Product Details & Reviews →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
