'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import { SlidersHorizontal } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
}

export default function ProductGrid({
  products,
  title,
  subtitle,
  showFilters = true
}: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');

  const categories = ['All', 'Red Roses', 'White Roses', 'Pink Roses', 'Sunflowers', 'Mixed Flowers', 'Flower Boxes', 'Chocolate Bouquets', 'Gifts'];

  let filtered = selectedCategory === 'All'
    ? products
    : products.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  if (sortBy === 'price-low') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'bestsellers') {
    filtered = [...filtered].sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {(title || subtitle) && (
        <div className="text-center max-w-2xl mx-auto mb-10">
          {subtitle && (
            <span className="text-xs uppercase tracking-widest text-[#8B1538] font-bold block mb-2">
              {subtitle}
            </span>
          )}
          {title && (
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#1F1F1F]">
              {title}
            </h2>
          )}
          <div className="w-16 h-0.5 bg-[#C5A880] mx-auto mt-4" />
        </div>
      )}

      {showFilters && (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all flex-shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#8B1538] text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-[#FAFAFA] border border-[#C5A880]/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sorting dropdown */}
          <div className="flex items-center gap-2 self-end md:self-auto flex-shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-[#8B1538]" />
            <label htmlFor="sort-products-by" className="sr-only">
              Sort products by
            </label>
            <select
              id="sort-products-by"
              aria-label="Sort products by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-[#C5A880]/40 rounded-full px-4 py-2 text-xs font-bold text-[#1F1F1F] focus:outline-none focus:border-[#8B1538] cursor-pointer"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="bestsellers">Sort by: Best Sellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-300">
          <p className="font-serif text-lg text-gray-600">No flowers currently match this category filter.</p>
          <button
            onClick={() => setSelectedCategory('All')}
            className="mt-4 px-6 py-2 bg-[#8B1538] text-white text-xs font-bold rounded-full"
          >
            Show All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
