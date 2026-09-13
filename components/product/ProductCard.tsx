'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import WhatsAppOrderButton from './WhatsAppOrderButton';
import TiltCard from '@/components/ui/TiltCard';
import { Heart, Star, Eye, ShoppingBag } from 'lucide-react';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useCart();
  const isWishlisted = isInWishlist(product.id);
  const [imgSrc, setImgSrc] = useState(product.images[0] || FALLBACK_IMAGE);

  return (
    <TiltCard maxTilt={8} className="h-full">
      <div className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#C5A880]/30 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between h-full">
        {/* Top Badges & Actions */}
        <div className="relative w-full aspect-[4/4] overflow-hidden bg-[#FAFAFA]">
          <Image
            src={imgSrc}
            alt={`${product.name} fresh flower delivery in Pakistan`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
            onError={() => setImgSrc(FALLBACK_IMAGE)}
          />

          {/* Overlay Gradient on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Brand Watermark Overlay Badge */}
          <div className="absolute bottom-2 left-2 z-10 px-2 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-[9px] sm:text-[10px] font-bold font-serif tracking-wider shadow-md pointer-events-none flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
            FlowerDeliveryPK.com
          </div>

          {/* Discount Badge */}
          {product.discountPercentage > 0 && (
            <span className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-[#8B1538] text-white text-[9px] sm:text-[11px] font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase tracking-wider shadow-md">
              {product.discountPercentage}% OFF
            </span>
          )}

          {/* Best Seller / New Badge */}
          {product.isBestSeller && (
            <span className="absolute top-2 right-10 sm:top-3 sm:right-12 z-10 bg-[#C5A880] text-[#3D0C18] text-[8px] sm:text-[10px] font-black px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full uppercase tracking-wider shadow-md">
              Best Seller
            </span>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            className={`absolute top-2 right-2 sm:top-3 sm:right-3 z-10 p-1.5 sm:p-2.5 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 ${
              isWishlisted
                ? 'bg-[#8B1538] text-white scale-110'
                : 'bg-white/80 text-gray-700 hover:bg-[#8B1538] hover:text-white'
            }`}
            title="Add to Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-white' : ''}`} />
          </button>

          {/* Quick View Button on Hover */}
          <div className="absolute inset-x-2 sm:inset-x-4 bottom-2 sm:bottom-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={() => setQuickViewProduct(product)}
              className="flex-1 py-2 sm:py-2.5 bg-white/90 backdrop-blur-md text-[#8B1538] font-bold text-[10px] sm:text-xs rounded-full hover:bg-[#8B1538] hover:text-white transition-colors flex items-center justify-center gap-1 sm:gap-1.5 shadow-lg"
            >
              <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Quick View
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-3 sm:p-5 flex flex-col flex-grow justify-between bg-white">
          <div>
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-[10px] sm:text-xs mb-1">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-[#8B1538] truncate max-w-[60%]">
                {product.category}
              </span>
              <div className="flex items-center gap-0.5 sm:gap-1 text-amber-500 font-bold text-[10px] sm:text-xs">
                <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-stone-600 font-medium text-[9px] sm:text-xs">({product.reviewsCount})</span>
              </div>
            </div>

            {/* Product Title */}
            <Link href={`/product/${product.slug}`} className="block group-hover:text-[#8B1538] transition-colors">
              <h3 className="font-serif text-xs sm:text-lg font-bold text-[#1F1F1F] group-hover:text-[#8B1538] line-clamp-1 mb-1 leading-snug">
                {product.name}
              </h3>
            </Link>

            {/* Short Description */}
            <p className="text-[11px] sm:text-xs text-gray-500 line-clamp-1 sm:line-clamp-2 leading-relaxed mb-2 sm:mb-3">
              {product.shortDescription}
            </p>
          </div>

          <div>
            {/* Price section */}
            <div className="flex items-baseline gap-1.5 sm:gap-2 mb-2 sm:mb-4">
              <span className="text-sm sm:text-xl font-bold text-[#8B1538]">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-[10px] sm:text-xs text-stone-600 line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Bottom Action Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
              <button
                onClick={() => addToCart(product, 1)}
                className="w-full py-2 sm:py-2.5 px-2 rounded-full bg-[#8B1538] hover:bg-[#6e102c] text-white font-bold text-[10px] sm:text-xs transition-all shadow-md flex items-center justify-center gap-1"
              >
                <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> <span className="hidden xs:inline sm:inline">Add to Cart</span><span className="xs:hidden sm:hidden">Add</span>
              </button>

              <WhatsAppOrderButton
                productName={product.name}
                price={product.price}
                variant="compact"
                label="WhatsApp"
              />
            </div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}
