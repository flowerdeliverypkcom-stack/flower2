'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BLOG_POSTS } from '@/data/blogs';
import { PRODUCTS } from '@/data/products';
import { getArticleSchema, getBreadcrumbSchema } from '@/utils/schema';
import ProductCard from '@/components/product/ProductCard';
import { Clock, Calendar, User, ArrowLeft, MessageCircle } from 'lucide-react';
import { WHATSAPP_BASE_URL, WHATSAPP_NUMBER } from '@/utils/whatsapp';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return notFound();
  }

  const articleSchema = getArticleSchema(post);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` }
  ]);

  const relatedProducts = PRODUCTS.filter((p) =>
    post.relatedProductSlugs.includes(p.slug)
  );

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumbs */}
      <nav className="text-xs text-gray-500 flex items-center gap-2">
        <Link href="/" className="hover:text-[#581825]">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-[#581825]">Blog</Link>
        <span>/</span>
        <span className="text-[#1E392A] font-semibold truncate max-w-xs">{post.title}</span>
      </nav>

      {/* Article Header */}
      <header className="space-y-4 text-center sm:text-left">
        <span className="text-xs uppercase tracking-widest bg-[#FDF0ED] text-[#581825] font-bold px-3 py-1 rounded-full inline-block border border-[#D4AF37]/30">
          {post.category}
        </span>

        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1E392A] leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 border-b border-[#D4AF37]/20 pb-4">
          <span className="flex items-center gap-1.5 font-semibold text-[#1E392A]">
            <User className="w-4 h-4 text-[#581825]" /> {post.author}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-gray-400" /> {post.publishedDate}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-gray-400" /> {post.readTime}
          </span>
        </div>
      </header>

      {/* Featured Image */}
      <div className="relative w-full h-[320px] sm:h-[450px] rounded-3xl overflow-hidden shadow-xl border border-[#D4AF37]/30">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Main Content Body */}
      <div
        className="prose prose-stone max-w-none text-gray-800 text-base leading-relaxed space-y-6 font-sans border-b border-[#D4AF37]/20 pb-8"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* WhatsApp CTA Card inside Article */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#1E392A] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-[#D4AF37]">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-serif font-bold text-xl text-[#D4AF37]">Order Fresh Flowers Now</h4>
          <p className="text-xs text-gray-300">Same-day delivery available across Lahore, Karachi, Islamabad & Pakistan</p>
        </div>
        <a
          href={WHATSAPP_BASE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3.5 px-6 rounded-full bg-[#25D366] text-white font-bold text-xs hover:bg-[#20bd5a] transition-all shadow-lg flex items-center gap-2 flex-shrink-0"
        >
          <MessageCircle className="w-4 h-4 fill-white" /> Order via WhatsApp ({WHATSAPP_NUMBER})
        </a>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-6">
          <h3 className="font-serif font-bold text-2xl text-[#1E392A]">Recommended Bouquets</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
