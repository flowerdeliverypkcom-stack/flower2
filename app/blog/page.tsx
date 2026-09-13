'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS } from '@/data/blogs';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

export default function BlogIndexPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#581825] font-bold block">
          Floral Insights & Guides
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1E392A]">
          FlowerDeliveryPK Blog
        </h1>
        <p className="text-sm text-gray-600">
          Discover expert advice on choosing birthday roses, anniversary arrangements, rose color meanings, and sending gifts across Pakistan.
        </p>
        <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-4" />
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            className="group bg-white rounded-3xl overflow-hidden border border-[#D4AF37]/30 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative w-full h-52 overflow-hidden bg-gray-100">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#581825] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                  <span>{post.publishedDate}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                </div>

                <Link href={`/blog/${post.slug}`} className="block">
                  <h2 className="font-serif font-bold text-lg text-[#1E392A] group-hover:text-[#581825] transition-colors leading-snug">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {post.metaDescription}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#581825] hover:underline"
              >
                Read Full Article <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
