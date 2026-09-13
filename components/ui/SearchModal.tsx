'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, addToCart, setQuickViewProduct } = useCart();
  const [query, setQuery] = useState('');

  // Lock background scroll when modal opens
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isSearchOpen]);

  const filteredProducts = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.flowerTypes.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
          p.occasions.some((o) => o.toLowerCase().includes(query.toLowerCase()))
      )
    : PRODUCTS.slice(0, 6);

  const quickSearchTags = [
    'Red Roses',
    'Birthday Flowers',
    'Anniversary Flowers',
    'Sunflowers',
    'Flower Boxes',
    'Chocolate Bouquets',
    'Cakes',
    'Gift Baskets'
  ];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-16 md:pt-24 px-4 bg-black/60 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="w-full max-w-3xl bg-[#FAFAFA] rounded-3xl shadow-2xl border border-[#C5A880]/50 overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* Search Input Bar */}
            <div className="p-6 border-b border-[#C5A880]/20 flex items-center gap-4 bg-white">
              <Search className="w-6 h-6 text-[#8B1538]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search roses, birthday bouquets, flower boxes, cakes..."
                autoFocus
                className="w-full bg-transparent text-lg md:text-xl text-[#1F1F1F] placeholder-gray-400 focus:outline-none font-serif"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 text-[#8B1538] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Quick Suggestions Tags */}
            <div className="px-6 py-3 bg-[#FAFAFA] border-b border-[#C5A880]/20 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-xs uppercase tracking-wider text-[#8B1538] font-bold flex-shrink-0">Popular:</span>
              {quickSearchTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1 text-xs rounded-full bg-white border border-[#C5A880]/30 text-[#1F1F1F] hover:bg-[#8B1538] hover:text-white transition-all flex-shrink-0"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Results Grid */}
            <div className="p-6 overflow-y-auto flex-grow space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs uppercase tracking-widest text-gray-500 font-bold">
                  {query ? `Search Results (${filteredProducts.length})` : 'Popular Recommendations'}
                </h4>
                {filteredProducts.length > 0 && query && (
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="text-xs font-semibold text-[#8B1538] hover:underline flex items-center gap-1"
                  >
                    View All Results <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 font-serif text-lg">No flowers found matching &quot;{query}&quot;</p>
                  <p className="text-sm text-gray-400 mt-1">Try searching for &quot;Roses&quot;, &quot;Boxes&quot;, or &quot;Cakes&quot;</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 p-3 rounded-2xl bg-white border border-gray-100 hover:border-[#C5A880]/50 shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <span className="text-[10px] uppercase tracking-wider text-[#8B1538] font-bold">{product.category}</span>
                        <Link
                          href={`/product/${product.slug}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="block text-sm font-bold text-[#1F1F1F] hover:text-[#8B1538] truncate font-serif"
                        >
                          {product.name}
                        </Link>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-bold text-[#8B1538]">Rs. {product.price.toLocaleString()}</span>
                          {product.originalPrice > product.price && (
                            <span className="text-xs text-gray-400 line-through">Rs. {product.originalPrice.toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          addToCart(product, 1);
                          setIsSearchOpen(false);
                        }}
                        className="p-2.5 rounded-full bg-[#8B1538] text-white hover:bg-[#6e102c] transition-colors flex-shrink-0"
                        title="Add to Cart"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
