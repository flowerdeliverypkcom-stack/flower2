'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import { Heart, ArrowLeft } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist } = useCart();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  if (wishlistedProducts.length === 0) {
    return (
      <div className="py-20 px-4 max-w-2xl mx-auto text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#FDF0ED] text-[#581825] flex items-center justify-center mx-auto text-3xl shadow-md border border-[#D4AF37]/30">
          <Heart className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-[#1E392A]">Your Wishlist is Empty</h1>
        <p className="text-gray-500 text-sm">
          Save your favorite red rose bouquets, flower boxes, and gift items to view them here anytime.
        </p>
        <Link
          href="/red-rose-bouquets"
          className="inline-flex items-center gap-2 py-3 px-8 rounded-full bg-[#1E392A] text-white font-bold text-xs hover:bg-[#14291E] transition-all shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" /> Explore Flower Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div className="border-b border-[#D4AF37]/30 pb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1E392A]">My Wishlist</h1>
          <p className="text-xs text-gray-500 mt-1">Saved bouquets and gifts ({wishlistedProducts.length} items)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
