export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  category: string;
  categorySlug: string;
  flowerTypes: string[]; // e.g. ["Red Roses", "Baby's Breath"]
  occasions: string[]; // e.g. ["Birthday", "Anniversary"]
  cities: string[]; // e.g. ["Lahore", "Karachi", "Islamabad", "All"]
  images: string[];
  flowerDetails: {
    stemCount?: number;
    wrapperColor?: string;
    fragrance?: string;
    lifespan?: string;
  };
  dimensions?: string;
  careInstructions?: string[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOption?: string;
}

export interface Review {
  id: string;
  userName: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  productName: string;
}

export interface Category {
  name: string;
  slug: string;
  group: 'flowers' | 'gifts' | 'cakes' | 'decor';
  description: string;
  image: string;
  itemCount: number;
}

export interface Occasion {
  name: string;
  slug: string;
  title: string;
  description: string;
  bannerImage: string;
  iconName: string;
  badge?: string;
}

export interface CityTargeting {
  name: string;
  slug: string;
  title: string;
  headline: string;
  intro: string;
  deliveryTime: string;
  deliveryPricing?: string;
  popularAreas: string[];
  bannerImage: string;
  faqs: { question: string; answer: string }[];
  uniqueContent?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  category: string;
  publishedDate: string;
  author: string;
  readTime: string;
  featuredImage: string;
  content: string;
  faqs?: { question: string; answer: string }[];
  tags: string[];
  relatedProductSlugs: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}
