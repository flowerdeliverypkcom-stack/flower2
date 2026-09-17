import { BlogPost, Product } from '@/types';
import { INSTAGRAM_URL, WHATSAPP_CHANNEL_URL, WHATSAPP_BASE_URL } from '@/utils/whatsapp';

export const SITE_URL = 'https://flowerdeliverypk.com';
export const BRAND_NAME = 'FlowerDeliveryPK.com';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [
      INSTAGRAM_URL,
      WHATSAPP_CHANNEL_URL,
      WHATSAPP_BASE_URL
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+92-348-0735344',
      contactType: 'customer service',
      areaServed: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'PK'],
      availableLanguage: ['English', 'Urdu']
    }
  };
}

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Florist',
    name: BRAND_NAME,
    image: `${SITE_URL}/images/banners/hero-slide-1.webp`,
    '@id': SITE_URL,
    url: SITE_URL,
    sameAs: [INSTAGRAM_URL, WHATSAPP_CHANNEL_URL, WHATSAPP_BASE_URL],
    telephone: '+92-348-0735344',
    priceRange: 'PKR 1499 - 14999',
    areaServed: [
      { '@type': 'City', name: 'Lahore' },
      { '@type': 'City', name: 'Karachi' },
      { '@type': 'City', name: 'Islamabad' },
      { '@type': 'City', name: 'Rawalpindi' }
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lahore',
      addressRegion: 'Punjab',
      addressCountry: 'PK'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 31.5204,
      longitude: 74.3587
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59'
    }
  };
}

export function getProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.id,
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/product/${product.slug}`,
      priceCurrency: 'PKR',
      price: product.price,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: BRAND_NAME
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewsCount
    }
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`
    }))
  };
}

export function getArticleSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    image: post.featuredImage,
    datePublished: post.publishedDate,
    author: {
      '@type': 'Organization',
      name: post.author
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`
      }
    },
    description: post.metaDescription
  };
}
