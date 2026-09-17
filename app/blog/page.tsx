import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BLOG_POSTS } from '@/data/blogs';
import { Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Flower & Gift Gifting Guides & Blog | FlowerDeliveryPK',
  description: 'Read expert Pakistani floristry guides: birthday flowers in Lahore, sending gifts from UK/USA/UAE, rose colors meanings, and cake delivery advice.',
  alternates: {
    canonical: 'https://flowerdeliverypk.com/blog'
  },
  openGraph: {
    title: 'FlowerDeliveryPK Blog — Floristry & Gifting Guides',
    description: 'Expert tips on choosing flowers, cakes, and gifts delivered same-day across Pakistan.',
    url: 'https://flowerdeliverypk.com/blog',
    images: ['/images/banners/hero-slide-1.webp']
  }
};

export default function BlogIndexPage() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 bg-[#FAFAFA]">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#8B1538] font-bold block">
          Floral Insights &amp; Guides
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1F1F1F]">
          FlowerDeliveryPK Blog
        </h1>
        <p className="text-sm text-stone-600">
          Discover expert advice on choosing birthday roses, anniversary arrangements, overseas gifting from the UK &amp; US, and same-day delivery across Pakistan.
        </p>
        <div className="w-16 h-0.5 bg-[#C5A880] mx-auto mt-4" />
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            className="group bg-white rounded-3xl overflow-hidden border border-[#C5A880]/30 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative w-full h-52 overflow-hidden bg-stone-100">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#8B1538] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  {post.category}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-stone-400 font-medium">
                  <span>{post.publishedDate}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {post.readTime}
                  </span>
                </div>

                <Link href={`/blog/${post.slug}`} className="block">
                  <h2 className="font-serif font-bold text-lg text-[#1F1F1F] group-hover:text-[#8B1538] transition-colors leading-snug">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {post.metaDescription}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B1538] hover:underline"
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
