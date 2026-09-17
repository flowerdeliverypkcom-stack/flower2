'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import WhatsAppOrderButton from '@/components/product/WhatsAppOrderButton';
import ProductCard from '@/components/product/ProductCard';
import {
  Star,
  ShoppingBag,
  Video,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Minus,
  Plus,
  Heart,
  ExternalLink,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { Instagram } from '@/components/icons/InstagramIcon';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, WHATSAPP_CHANNEL_URL } from '@/utils/whatsapp';

const FALLBACK_IMAGE = '/images/products/placeholder-bouquet.webp';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
  faqs: { question: string; answer: string }[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
  faqs
}: ProductDetailClientProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [mainImgSrc, setMainImgSrc] = useState<string>('');

  const currentImage = product.images[selectedImageIndex] || product.images[0] || FALLBACK_IMAGE;
  const activeImage = mainImgSrc || currentImage;
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Breadcrumbs */}
      <nav className="text-xs text-stone-500 flex items-center gap-2">
        <Link href="/" className="hover:text-[#8B1538]">Home</Link>
        <span>/</span>
        <Link href={`/${product.categorySlug}`} className="hover:text-[#8B1538]">{product.category}</Link>
        <span>/</span>
        <span className="text-[#1F1F1F] font-semibold">{product.name}</span>
      </nav>

      {/* Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left: Gallery */}
        <div className="space-y-4">
          <div className="relative w-full h-[320px] xs:h-[380px] sm:h-[480px] rounded-3xl overflow-hidden border-2 border-[#C5A880]/30 shadow-xl bg-white group">
            <Image
              src={activeImage}
              alt={`${product.name} fresh flower delivery Lahore Karachi Islamabad Pakistan`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              onError={() => setMainImgSrc(FALLBACK_IMAGE)}
            />
            {/* Brand Watermark Overlay Badge */}
            <div className="absolute bottom-4 left-4 z-10 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-bold font-serif tracking-wider shadow-lg pointer-events-none flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              FlowerDeliveryPK.com
            </div>
            {product.discountPercentage > 0 && (
              <span className="absolute top-4 left-4 bg-[#8B1538] text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                {product.discountPercentage}% OFF
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Add to Wishlist"
              className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md shadow-lg transition-all ${
                isWishlisted ? 'bg-[#8B1538] text-white' : 'bg-white/80 text-gray-700 hover:bg-[#8B1538] hover:text-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Gallery Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImageIndex(idx);
                    setMainImgSrc(img);
                  }}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImageIndex === idx
                      ? 'border-[#8B1538] scale-105 shadow-md'
                      : 'border-gray-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info & Actions */}
        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8B1538] font-bold block mb-2">
              {product.category}
            </span>

            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-[#1F1F1F] mb-3">
              {product.name}
            </h1>

            {/* Rating & Stock */}
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600 mb-4">
              <div className="flex items-center text-amber-500 font-bold gap-1">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating}</span>
              </div>
              <span>•</span>
              <span className="text-gray-500">{product.reviewsCount} customer reviews</span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> In Stock &amp; Fresh Today
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-3xl sm:text-4xl font-serif font-bold text-[#8B1538]">
                Rs. {(product.price * quantity).toLocaleString()}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-lg sm:text-xl text-gray-400 line-through">
                  Rs. {(product.originalPrice * quantity).toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed border-t border-b border-[#C5A880]/20 py-4 mb-6">
              {product.description}
            </p>
          </div>

          {/* Specifications Panel */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#C5A880]/30 shadow-sm space-y-3">
            <h3 className="font-serif font-bold text-xs sm:text-sm text-[#1F1F1F] uppercase tracking-wider border-b pb-2">
              Flower Details &amp; Specifications
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs text-stone-600">
              {product.flowerDetails?.stemCount && (
                <div>
                  <span className="text-stone-400 block">Stem Count:</span>
                  <span className="font-semibold text-[#1F1F1F]">{product.flowerDetails.stemCount} Stems</span>
                </div>
              )}
              {product.flowerDetails?.wrapperColor && (
                <div>
                  <span className="text-stone-400 block">Wrapper Style:</span>
                  <span className="font-semibold text-[#1F1F1F]">{product.flowerDetails.wrapperColor}</span>
                </div>
              )}
              {product.flowerDetails?.fragrance && (
                <div>
                  <span className="text-stone-400 block">Fragrance:</span>
                  <span className="font-semibold text-[#1F1F1F]">{product.flowerDetails.fragrance}</span>
                </div>
              )}
              {product.flowerDetails?.lifespan && (
                <div>
                  <span className="text-stone-400 block">Vase Life:</span>
                  <span className="font-semibold text-[#1F1F1F]">{product.flowerDetails.lifespan}</span>
                </div>
              )}
            </div>
          </div>

          {/* Video Dispatch Banner */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#C5A880]/40 flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#8B1538] text-[#C5A880] flex-shrink-0">
              <Video className="w-5 h-5 text-[#25D366]" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-[#1F1F1F] block">100% Live Video Dispatch Guarantee</span>
              <span className="text-stone-600">We send an HD WhatsApp video of your exact prepared bouquet before delivery.</span>
            </div>
          </div>

          {/* Quantity Selector & Action CTAs */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs uppercase tracking-wider font-bold text-stone-500">Quantity:</span>
              <div className="flex items-center bg-white border border-[#C5A880]/40 rounded-full p-1.5 shadow-sm">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#1F1F1F] hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-base text-[#1F1F1F]">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#1F1F1F] hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => addToCart(product, quantity)}
                className="w-full py-4 px-6 rounded-full bg-[#8B1538] text-white hover:bg-[#6e102c] font-bold text-sm transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" /> Add to Cart
              </button>

              <WhatsAppOrderButton
                productName={product.name}
                price={product.price}
                quantity={quantity}
                variant="full"
              />
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-6 border-t border-gray-200 grid grid-cols-3 gap-2 text-center text-xs text-stone-600">
            <div className="flex flex-col items-center">
              <Truck className="w-5 h-5 text-[#8B1538] mb-1" />
              <span>Same-Day 2–3h Delivery</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-5 h-5 text-[#8B1538] mb-1" />
              <span>100% Fresh Stems</span>
            </div>
            <div className="flex flex-col items-center">
              <Video className="w-5 h-5 text-[#25D366] mb-1" />
              <span>WhatsApp Video Proof</span>
            </div>
          </div>

          {/* Social Trust Reassurance Banner: Instagram & WhatsApp VIP Channel */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-50/70 via-white to-emerald-50/70 border border-[#C5A880]/35 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1F1F1F]">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Real-Time Dispatches &amp; VIP Community</span>
              </div>
              <p className="text-[11px] text-stone-600 leading-snug">
                Watch bouquets arranged live on <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-[#8B1538] hover:underline">@{INSTAGRAM_HANDLE}</a> or join our <a href={WHATSAPP_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-[#075E54] hover:underline">WhatsApp Channel</a> for 20% off alerts.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#833ab4] via-[#dc2743] to-[#f09433] text-white text-[10px] font-bold flex items-center gap-1 hover:opacity-95 shadow-xs transition-opacity"
              >
                <Instagram className="w-3 h-3" />
                <span>Instagram</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
              <a
                href={WHATSAPP_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-[#075E54] text-white text-[10px] font-bold flex items-center gap-1 hover:bg-[#054c44] shadow-xs transition-colors"
              >
                <MessageCircle className="w-3 h-3 fill-[#25D366]" />
                <span>Channel</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mandatory FAQs on Product Detail */}
      <section className="bg-white rounded-3xl p-8 border border-[#C5A880]/30 shadow-md space-y-6">
        <h3 className="text-2xl font-serif font-bold text-[#1F1F1F]">Frequently Asked Questions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#C5A880]/20 space-y-2">
              <h4 className="font-serif font-bold text-sm text-[#1F1F1F]">{faq.question}</h4>
              <p className="text-xs text-stone-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#8B1538] font-bold block mb-1">Pairs Beautifully With</span>
            <h2 className="text-3xl font-serif font-bold text-[#1F1F1F]">Related Bouquets &amp; Gifts</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
