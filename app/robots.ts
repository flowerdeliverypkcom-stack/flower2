import { MetadataRoute } from 'next';
import { SITE_URL } from '@/utils/schema';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/cart', '/checkout', '/wishlist', '/search']
    },
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}
