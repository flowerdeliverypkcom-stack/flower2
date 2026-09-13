import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/data/products';
import { CATEGORIES } from '@/data/categories';
import { OCCASIONS } from '@/data/occasions';
import { CITIES } from '@/data/cities';
import { BLOG_POSTS } from '@/data/blogs';

const BASE_URL = 'https://flowerdeliverypk.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/cart',
    '/checkout',
    '/wishlist',
    '/search',
    '/same-day-flower-delivery',
    '/blog',
    '/about',
    '/contact'
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8
  }));

  const productRoutes = PRODUCTS.map((product) => ({
    url: `${BASE_URL}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9
  }));

  const categoryRoutes = CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85
  }));

  const occasionRoutes = OCCASIONS.map((occ) => ({
    url: `${BASE_URL}/${occ.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85
  }));

  const cityRoutes = CITIES.map((city) => ({
    url: `${BASE_URL}/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85
  }));

  const blogRoutes = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7
  }));

  return [
    ...staticRoutes,
    ...productRoutes,
    ...categoryRoutes,
    ...occasionRoutes,
    ...cityRoutes,
    ...blogRoutes
  ];
}
