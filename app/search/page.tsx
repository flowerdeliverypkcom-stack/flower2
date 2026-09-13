'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import ProductGrid from '@/components/product/ProductGrid';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = query
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.flowerTypes.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
          p.occasions.some((o) => o.toLowerCase().includes(query.toLowerCase()))
      )
    : PRODUCTS;

  return (
    <div className="py-8">
      <ProductGrid
        products={results}
        title={query ? `Search Results for "${query}"` : 'All Products Catalog'}
        subtitle={`Found ${results.length} Products`}
        showFilters={true}
      />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center font-serif">Loading search results...</div>}>
      <SearchContent />
    </Suspense>
  );
}
