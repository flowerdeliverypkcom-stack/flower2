import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BLOG_POSTS } from '@/data/blogs';
import { PRODUCTS } from '@/data/products';
import { getArticleSchema, getBreadcrumbSchema } from '@/utils/schema';
import ProductCard from '@/components/product/ProductCard';
import { Clock, Calendar, User, MessageCircle, ArrowRight } from 'lucide-react';
import { WHATSAPP_BASE_URL, WHATSAPP_NUMBER } from '@/utils/whatsapp';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Article Not Found | FlowerDeliveryPK.com'
    };
  }

  const title = `${post.title} | FlowerDeliveryPK`;
  const description = post.metaDescription;

  return {
    title,
    description,
    alternates: {
      canonical: `https://flowerdeliverypk.com/blog/${post.slug}`
    },
    openGraph: {
      title,
      description,
      url: `https://flowerdeliverypk.com/blog/${post.slug}`,
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [post.featuredImage]
    }
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
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

  const categoryCtas: Record<string, { label: string; href: string }> = {
    'best-flowers-birthday-lahore-guide': { label: 'Shop Birthday Flowers Collection', href: '/birthday-flowers' },
    'send-flowers-to-pakistan-from-uk-usa-uae': { label: 'Shop Fresh Flowers for Pakistan', href: '/red-rose-bouquets' },
    'red-roses-vs-mixed-bouquets-anniversary': { label: 'Shop Anniversary Flowers Collection', href: '/anniversary-flowers' },
    'same-day-flower-delivery-karachi-areas-guide': { label: 'Order Karachi Flower Delivery', href: '/flower-delivery-karachi' },
    'top-cake-flower-combos-birthday-islamabad': { label: 'Shop Cakes & Flowers Combos', href: '/cake-and-flower-combos' },
  };
  const cta = categoryCtas[post.slug];

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
      <nav className="text-xs text-stone-500 flex items-center gap-2">
        <Link href="/" className="hover:text-[#8B1538]">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-[#8B1538]">Blog</Link>
        <span>/</span>
        <span className="text-[#1F1F1F] font-semibold truncate max-w-xs">{post.title}</span>
      </nav>

      {/* Article Header */}
      <header className="space-y-4 text-center sm:text-left">
        <span className="text-xs uppercase tracking-widest bg-[#FAF7F2] text-[#8B1538] font-bold px-3 py-1 rounded-full inline-block border border-[#C5A880]/30">
          {post.category}
        </span>

        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#1F1F1F] leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 border-b border-[#C5A880]/20 pb-4">
          <span className="flex items-center gap-1.5 font-semibold text-[#1F1F1F]">
            <User className="w-4 h-4 text-[#8B1538]" /> {post.author}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-stone-400" /> {post.publishedDate}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-stone-400" /> {post.readTime}
          </span>
        </div>
      </header>

      {/* Featured Image */}
      <div className="relative w-full h-[320px] sm:h-[450px] rounded-3xl overflow-hidden shadow-xl border border-[#C5A880]/30">
        <Image
          src={post.featuredImage}
          alt={post.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 800px"
          className="object-cover"
        />
      </div>

      {/* Main Content Body */}
      <div
        className="prose prose-stone max-w-none text-stone-800 text-base leading-relaxed space-y-6 font-sans border-b border-[#C5A880]/30 pb-8"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Internal Link CTA to Related Category */}
      {cta && (
        <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#C5A880]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-[#8B1538] font-bold">Recommended Collection</p>
            <h4 className="font-serif font-bold text-lg text-[#1F1F1F]">Ready to surprise someone special?</h4>
          </div>
          <Link
            href={cta.href}
            className="py-3 px-6 rounded-full bg-[#8B1538] hover:bg-[#6e102c] text-white font-semibold text-xs shadow-md transition-all flex items-center gap-2 flex-shrink-0"
          >
            <span>{cta.label}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* WhatsApp CTA Card inside Article */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#8B1538] via-[#70102b] to-[#8B1538] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-[#C5A880]/50">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-serif font-bold text-xl text-[#FAF7F2]">Order Fresh Flowers Now</h4>
          <p className="text-xs text-gray-200">Same-day delivery available across Lahore, Karachi, Islamabad &amp; Pakistan</p>
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
          <h3 className="font-serif font-bold text-2xl text-[#1F1F1F]">Recommended Bouquets</h3>
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
