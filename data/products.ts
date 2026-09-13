import { Product } from '@/types';

export const PRODUCTS: Product[] = [
  {
    id: 'fb-1',
    slug: 'classic-24-red-rose-bouquet',
    name: '24 Red Roses Classic Bouquet',
    shortDescription: '24 Hand-picked farm-fresh premium red roses wrapped in luxurious matte paper.',
    description: 'Express your deepest emotions with our flagship 24 Red Roses Classic Bouquet. Composed of 24 velvety red roses locally cultivated in fresh fields, wrapped in signature matte ivory paper with gold ribbon detailing. Perfect for romantic gestures, birthdays, and anniversaries across Pakistan.',
    price: 3999,
    originalPrice: 4999,
    discountPercentage: 20,
    rating: 4.9,
    reviewsCount: 142,
    isBestSeller: true,
    isFeatured: true,
    category: 'Red Roses',
    categorySlug: 'red-rose-bouquets',
    flowerTypes: ['Red Roses', 'Gypsophila'],
    occasions: ['Anniversary', 'Valentine\'s Day', 'Romantic', 'Birthday'],
    cities: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar'],
    images: [
      '/images/products/red_roses_bouquet.webp',
      'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=500&q=75',
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=500&q=75'
    ],
    flowerDetails: {
      stemCount: 24,
      wrapperColor: 'Matte Ivory & Gold Ribbon',
      fragrance: 'Rich Sweet Floral',
      lifespan: '5-7 Days with Proper Care'
    },
    dimensions: 'H: 55cm x W: 40cm',
    careInstructions: [
      'Trim stems at a 45-degree angle before placing in fresh water.',
      'Keep away from direct sunlight.',
      'Change flower water every 2 days.'
    ],
    inStock: true
  },
  {
    id: 'fb-2',
    slug: '50-red-roses-grand-bouquet',
    name: '50 Red Roses Grand Bouquet',
    shortDescription: '50 Premium long-stem red roses arranged in a cascading luxury bouquet.',
    description: 'An opulent display of 50 premium red roses carefully selected for stem strength and vibrant color. Artfully arranged in cascading layers with eucalyptus greens and wrapped in deep burgundy tissue paper.',
    price: 7499,
    originalPrice: 8999,
    discountPercentage: 17,
    rating: 5.0,
    reviewsCount: 118,
    isBestSeller: true,
    isFeatured: true,
    category: 'Red Roses',
    categorySlug: 'red-rose-bouquets',
    flowerTypes: ['Red Roses', 'Eucalyptus'],
    occasions: ['Anniversary', 'Wedding', 'Valentine\'s Day'],
    cities: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Multan', 'Faisalabad'],
    images: [
      'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1000&q=80'
    ],
    flowerDetails: {
      stemCount: 50,
      wrapperColor: 'Deep Burgundy Velvet Paper',
      fragrance: 'Intense Natural Rose',
      lifespan: '6-8 Days'
    },
    dimensions: 'H: 70cm x W: 50cm',
    careInstructions: ['Place in clean vase filled with cold water.'],
    inStock: true
  },
  {
    id: 'fb-3',
    slug: '100-red-roses-royal-bouquet',
    name: '100 Red Roses Royal Bouquet',
    shortDescription: '100 Long stem red roses for unmatched majesty and grand celebrations.',
    description: 'The pinnacle of luxury flower delivery in Pakistan. 100 hand-selected 70cm long stem red roses standing in magnificent grandeur. Designed for milestone anniversaries, grand proposals, and wedding celebrations.',
    price: 13999,
    originalPrice: 16999,
    discountPercentage: 18,
    rating: 5.0,
    reviewsCount: 95,
    isBestSeller: true,
    isFeatured: true,
    category: 'Red Roses',
    categorySlug: 'red-rose-bouquets',
    flowerTypes: ['Red Roses'],
    occasions: ['Anniversary', 'Wedding', 'Valentine\'s Day', 'Romantic'],
    cities: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Multan', 'Faisalabad'],
    images: [
      '/images/products/red_roses_bouquet.webp',
      'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=500&q=75'
    ],
    flowerDetails: {
      stemCount: 100,
      wrapperColor: 'Royal Black & Gold Foil Ribbon',
      fragrance: 'Deep Fragrant Rose',
      lifespan: '7-9 Days'
    },
    dimensions: 'H: 80cm x W: 65cm',
    inStock: true
  },
  {
    id: 'fb-4',
    slug: 'white-rose-elegance-20-stems',
    name: 'White Rose Elegance (20 Stems)',
    shortDescription: 'Pristine 20 white roses symbolising purity, peace and timeless affection.',
    description: 'Clean, elegant and understated. 20 spotless white roses nestled among lush Italian ruscus leaves. Wrapped in soft cream paper, this bouquet brings serenity and grace to any occasion.',
    price: 4499,
    originalPrice: 5499,
    discountPercentage: 18,
    rating: 4.8,
    reviewsCount: 84,
    isBestSeller: false,
    isFeatured: true,
    category: 'White Roses',
    categorySlug: 'white-rose-bouquets',
    flowerTypes: ['White Roses', 'Italian Ruscus'],
    occasions: ['Wedding', 'Congratulations', 'Get Well Soon', 'Thank You'],
    cities: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Peshawar', 'Sialkot'],
    images: [
      '/images/products/white_roses_studio.webp',
      'https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=500&q=75',
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=500&q=75'
    ],
    flowerDetails: {
      stemCount: 20,
      wrapperColor: 'Cream Soft Silk Ribbon',
      fragrance: 'Delicate Fresh',
      lifespan: '5-7 Days'
    },
    dimensions: 'H: 50cm x W: 35cm',
    inStock: true
  },
  {
    id: 'fb-5',
    slug: 'pink-rose-gypsophila-bouquet',
    name: 'Pink Rose & Gypsophila Bouquet',
    shortDescription: 'Sweet blush pink roses paired with white baby’s breath for a gentle touch.',
    description: 'A delicate masterpiece featuring 24 soft pink roses enveloped in white gypsophila and wrapped in blush pink embossed wrapping. Ideal for birthdays, romantic surprises, and Mother’s Day celebrations.',
    price: 4299,
    originalPrice: 5299,
    discountPercentage: 19,
    rating: 4.9,
    reviewsCount: 106,
    isBestSeller: true,
    isFeatured: true,
    category: 'Pink Roses',
    categorySlug: 'pink-rose-bouquets',
    flowerTypes: ['Pink Roses', 'Gypsophila'],
    occasions: ['Birthday', 'Mother\'s Day', 'I\'m Sorry', 'Thank You'],
    cities: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad'],
    images: [
      '/images/products/pink_roses_studio.webp',
      'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=500&q=75',
      'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=500&q=75'
    ],
    flowerDetails: {
      stemCount: 24,
      wrapperColor: 'Blush Pink Satin',
      fragrance: 'Sweet Romantic',
      lifespan: '5-6 Days'
    },
    dimensions: 'H: 50cm x W: 40cm',
    inStock: true
  },
  {
    id: 'fb-6',
    slug: 'jumbo-sunflower-bouquet',
    name: 'Jumbo Sunflower Bouquet',
    shortDescription: 'Vibrant golden sunflowers radiating joy, happiness and warm wishes.',
    description: 'Brighten anyone\'s day in Pakistan with 7 jumbo golden sunflowers accented with yellow solidago and greenery. Wrapped in rustic kraft paper tied with jute twine.',
    price: 3499,
    originalPrice: 4299,
    discountPercentage: 18,
    rating: 4.8,
    reviewsCount: 79,
    isBestSeller: true,
    isFeatured: false,
    category: 'Sunflowers',
    categorySlug: 'sunflower-bouquets',
    flowerTypes: ['Sunflowers', 'Solidago', 'Eucalyptus'],
    occasions: ['Graduation', 'Get Well Soon', 'Congratulations', 'Birthday'],
    cities: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Multan', 'Gujranwala'],
    images: [
      '/images/products/sunflower_roses.webp',
      'https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=500&q=75'
    ],
    flowerDetails: {
      stemCount: 7,
      wrapperColor: 'Eco Kraft & Jute Twine',
      fragrance: 'Earthy Warm',
      lifespan: '7-10 Days'
    },
    dimensions: 'H: 60cm x W: 45cm',
    inStock: true
  },
  {
    id: 'fb-7',
    slug: 'ferrero-rocher-red-roses-bouquet',
    name: 'Ferrero Rocher & Red Roses Bouquet',
    shortDescription: '16 Ferrero Rocher chocolates interwoven with 12 fresh red roses.',
    description: 'The ultimate sweet indulgence! Premium imported Ferrero Rocher pralines on stems combined with lush fresh red roses wrapped in gold foil paper.',
    price: 5499,
    originalPrice: 6499,
    discountPercentage: 15,
    rating: 4.9,
    reviewsCount: 195,
    isBestSeller: true,
    isFeatured: true,
    category: 'Chocolate Bouquets',
    categorySlug: 'chocolate-bouquets',
    flowerTypes: ['Red Roses'],
    occasions: ['Birthday', 'Anniversary', 'Valentine\'s Day', 'Congratulations'],
    cities: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan'],
    images: [
      '/images/products/chocolate_flower_hamper.webp'
    ],
    flowerDetails: {
      stemCount: 12,
      wrapperColor: 'Champagne Gold Foil',
      fragrance: 'Chocolate & Floral',
      lifespan: '4-6 Days'
    },
    dimensions: 'H: 50cm x W: 38cm',
    inStock: true
  },
  {
    id: 'fb-8',
    slug: 'chocolate-fudge-cake-18-red-roses-combo',
    name: 'Chocolate Fudge Cake & 18 Red Roses Combo',
    shortDescription: '2 lbs Dark Belgian Chocolate Fudge Cake paired with 18 fresh red roses.',
    description: 'Double the celebration! Includes a delicious 2 lbs premium Belgian dark chocolate fudge cake from top local bakery and 18 red roses bouquet.',
    price: 7499,
    originalPrice: 8999,
    discountPercentage: 16,
    rating: 4.9,
    reviewsCount: 164,
    isBestSeller: true,
    isFeatured: true,
    category: 'Cakes & Chocolates',
    categorySlug: 'cake-and-flower-combos',
    flowerTypes: ['Red Roses'],
    occasions: ['Birthday', 'Anniversary', 'Congratulations'],
    cities: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan'],
    images: [
      '/images/products/cake_flower_combo.webp'
    ],
    flowerDetails: {
      stemCount: 18,
      wrapperColor: 'Burgundy & Gold Paper',
      fragrance: 'Fresh Roses & Bakery Cake',
      lifespan: '5-7 Days'
    },
    dimensions: 'H: 50cm x W: 35cm',
    inStock: true
  },
  {
    id: 'fb-9',
    slug: 'plush-teddy-bear-pink-roses-combo',
    name: 'Plush Teddy Bear & Pink Roses Combo',
    shortDescription: '12-inch cute plush teddy bear with 12 blush pink roses bouquet.',
    description: 'Adorable gifting combo featuring an ultra-soft premium plush teddy bear holding a bouquet of 12 blush pink roses wrapped in satin pink paper.',
    price: 4999,
    originalPrice: 5999,
    discountPercentage: 16,
    rating: 4.8,
    reviewsCount: 88,
    isBestSeller: false,
    isFeatured: true,
    category: 'Gifts',
    categorySlug: 'gift-boxes',
    flowerTypes: ['Pink Roses'],
    occasions: ['Birthday', 'Valentine\'s Day', 'Get Well Soon'],
    cities: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Multan'],
    images: [
      'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1000&q=80'
    ],
    flowerDetails: {
      stemCount: 12,
      wrapperColor: 'Pink Satin',
      fragrance: 'Gentle Pink Rose',
      lifespan: '5-6 Days'
    },
    dimensions: 'H: 45cm x W: 35cm',
    inStock: true
  },
  {
    id: 'fb-10',
    slug: 'cylindrical-velvet-flower-box-36-roses',
    name: 'Cylindrical Velvet Flower Box (36 Roses)',
    shortDescription: 'Signature cylindrical velvet gift box overflowing with 36 red & pink roses.',
    description: 'Our benchmark luxury gift. Premium rigid round hatbox filled with dense red and pink roses, lined with floral foam for prolonged freshness without vase requirements.',
    price: 6999,
    originalPrice: 8499,
    discountPercentage: 17,
    rating: 5.0,
    reviewsCount: 156,
    isBestSeller: true,
    isFeatured: true,
    category: 'Flower Boxes',
    categorySlug: 'flower-boxes',
    flowerTypes: ['Red Roses', 'Pink Roses'],
    occasions: ['Anniversary', 'Birthday', 'Valentine\'s Day', 'Engagement'],
    cities: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Multan', 'Faisalabad', 'Peshawar'],
    images: [
      'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80'
    ],
    flowerDetails: {
      stemCount: 36,
      wrapperColor: 'Embossed Black Hatbox',
      fragrance: 'Rich Rose',
      lifespan: '6-9 Days'
    },
    dimensions: 'H: 30cm x Dia: 28cm',
    inStock: true
  },
  {
    id: 'fb-11',
    slug: 'heart-shape-red-roses-anniversary-box',
    name: 'Heart Shape Red Roses Anniversary Box',
    shortDescription: 'Heart-shaped luxury box filled with 30 deep crimson red roses.',
    description: 'Express timeless commitment with a stunning heart-shaped arrangement of 30 velvety red roses lined in black luxury finish.',
    price: 6499,
    originalPrice: 7999,
    discountPercentage: 18,
    rating: 5.0,
    reviewsCount: 122,
    isBestSeller: true,
    isFeatured: true,
    category: 'Flower Boxes',
    categorySlug: 'flower-boxes',
    flowerTypes: ['Red Roses'],
    occasions: ['Anniversary', 'Valentine\'s Day', 'Wedding'],
    cities: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan'],
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80'
    ],
    flowerDetails: {
      stemCount: 30,
      wrapperColor: 'Heart-shaped Matte Box',
      fragrance: 'Sweet Romantic',
      lifespan: '6-8 Days'
    },
    dimensions: 'H: 20cm x W: 32cm',
    inStock: true
  },
  {
    id: 'fb-12',
    slug: 'babys-breath-cloud-bouquet',
    name: 'Baby\'s Breath Cloud Bouquet',
    shortDescription: 'Ethereal cloud of pure white gypsophila wrapped in translucent korean paper.',
    description: 'Minimalist perfection! A huge, ethereal cloud of fresh white baby’s breath (gypsophila) wrapped in modern translucent Korean floral paper.',
    price: 2999,
    originalPrice: 3899,
    discountPercentage: 23,
    rating: 4.9,
    reviewsCount: 94,
    isBestSeller: true,
    isFeatured: false,
    category: 'Mixed Flowers',
    categorySlug: 'mixed-flower-bouquets',
    flowerTypes: ['Gypsophila'],
    occasions: ['Birthday', 'Graduation', 'Thank You', 'I\'m Sorry'],
    cities: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Gujranwala', 'Sialkot'],
    images: [
      'https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=1000&q=80'
    ],
    flowerDetails: {
      stemCount: 15,
      wrapperColor: 'Korean Frosted Translucent',
      fragrance: 'Light Herbal',
      lifespan: '8-12 Days (Dries beautifully)'
    },
    dimensions: 'H: 50cm x W: 45cm',
    inStock: true
  },
  {
    id: 'fb-13',
    slug: 'imported-dutch-hydrangea-calla-lilies',
    name: 'Imported Dutch Hydrangea & Calla Lilies',
    shortDescription: 'Exotic Dutch hydrangeas, purple calla lilies, and spray roses.',
    description: 'An exclusive arrangement crafted from fresh weekly air-freighted Dutch hydrangeas, purple calla lilies, and pastel spray roses.',
    price: 8999,
    originalPrice: 10999,
    discountPercentage: 18,
    rating: 5.0,
    reviewsCount: 48,
    isBestSeller: false,
    isFeatured: true,
    category: 'Imported Flowers',
    categorySlug: 'imported-flowers',
    flowerTypes: ['Hydrangea', 'Calla Lily', 'Spray Rose'],
    occasions: ['Anniversary', 'Wedding', 'Congratulations'],
    cities: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi'],
    images: [
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1000&q=80'
    ],
    flowerDetails: {
      stemCount: 18,
      wrapperColor: 'Champagne Silk Paper',
      fragrance: 'Subtle Exotic',
      lifespan: '5-7 Days'
    },
    dimensions: 'H: 60cm x W: 50cm',
    inStock: true
  },
  {
    id: 'fb-14',
    slug: 'single-long-stem-red-rose-sleeve',
    name: 'Single Long Stem Red Rose Sleeve',
    shortDescription: 'One long-stem premium red rose presented in a clear gift sleeve.',
    description: 'A simple yet powerful gesture. 1 choice long-stem red rose inside a clear acrylic gift sleeve with ribbon.',
    price: 1299,
    originalPrice: 1699,
    discountPercentage: 23,
    rating: 4.7,
    reviewsCount: 110,
    isBestSeller: false,
    isFeatured: false,
    category: 'Red Roses',
    categorySlug: 'red-rose-bouquets',
    flowerTypes: ['Red Rose'],
    occasions: ['Valentine\'s Day', 'I\'m Sorry', 'Thank You'],
    cities: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Gujranwala', 'Sialkot'],
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80'
    ],
    flowerDetails: {
      stemCount: 1,
      wrapperColor: 'Clear Acrylic & Ribbon',
      fragrance: 'Classic Rose',
      lifespan: '5-7 Days'
    },
    dimensions: 'H: 50cm x W: 10cm',
    inStock: true
  },
  {
    id: 'fb-15',
    slug: 'graduation-sunflower-statice-bouquet',
    name: 'Graduation Sunflower & Statice Bouquet',
    shortDescription: 'Vibrant yellow sunflowers and purple statice with congrats ribbon.',
    description: 'Celebrate academic milestone success! Bright sunflowers, purple statice, and white spray roses with a personalized congratulatory ribbon.',
    price: 3899,
    originalPrice: 4799,
    discountPercentage: 18,
    rating: 4.9,
    reviewsCount: 72,
    isBestSeller: false,
    isFeatured: false,
    category: 'Sunflowers',
    categorySlug: 'sunflower-bouquets',
    flowerTypes: ['Sunflowers', 'Statice', 'Spray Roses'],
    occasions: ['Graduation', 'Congratulations'],
    cities: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Peshawar'],
    images: [
      'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=1000&q=80'
    ],
    flowerDetails: {
      stemCount: 16,
      wrapperColor: 'Navy Blue & Gold Ribbon',
      fragrance: 'Fresh Warm',
      lifespan: '6-8 Days'
    },
    dimensions: 'H: 55cm x W: 40cm',
    inStock: true
  },
  {
    id: 'fb-16',
    slug: 'mothers-day-pink-carnations-roses-bouquet',
    name: 'Mother\'s Day Pink Carnations & Roses',
    shortDescription: 'Special arrangement of pink carnations, roses, and baby’s breath.',
    description: 'Carnations symbolise a mother\'s unyielding love. Combined with pink roses, soft greens, and a heart gift tag.',
    price: 4799,
    originalPrice: 5799,
    discountPercentage: 17,
    rating: 5.0,
    reviewsCount: 135,
    isBestSeller: true,
    isFeatured: false,
    category: 'Mixed Flowers',
    categorySlug: 'mixed-flower-bouquets',
    flowerTypes: ['Carnations', 'Pink Roses', 'Gypsophila'],
    occasions: ['Mother\'s Day', 'Birthday', 'Thank You'],
    cities: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Multan', 'Faisalabad', 'Peshawar', 'Sialkot'],
    images: [
      'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=1000&q=80'
    ],
    flowerDetails: {
      stemCount: 24,
      wrapperColor: 'Blush Pink & Rose Gold',
      fragrance: 'Gentle Sweet',
      lifespan: '6-8 Days'
    },
    dimensions: 'H: 52cm x W: 38cm',
    inStock: true
  },
  {
    id: 'fb-17',
    slug: 'lals-chocolate-mixed-flowers-luxury-basket',
    name: 'Lals Chocolate & Mixed Flowers Basket',
    shortDescription: 'Deluxe wooden crate with flowers, imported chocolates & fragrance.',
    description: 'A lavish gift experience containing fresh flower bouquet, 200g Lindt & Ferrero chocolates, gourmet mixed dry fruits, and an aromatic room fragrance.',
    price: 10999,
    originalPrice: 12999,
    discountPercentage: 15,
    rating: 5.0,
    reviewsCount: 56,
    isBestSeller: false,
    isFeatured: true,
    category: 'Gifts',
    categorySlug: 'gift-boxes',
    flowerTypes: ['Red Roses', 'Lilies'],
    occasions: ['Eid', 'Wedding', 'Anniversary', 'Father\'s Day', 'Mother\'s Day'],
    cities: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad'],
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1000&q=80'
    ],
    flowerDetails: {
      stemCount: 15,
      wrapperColor: 'Handcrafted Wooden Crate',
      fragrance: 'Rich Floral & Chocolate',
      lifespan: '5-7 Days'
    },
    dimensions: 'H: 45cm x W: 40cm',
    inStock: true
  },
  {
    id: 'fb-18',
    slug: 'midnight-birthday-surprise-cake-flowers',
    name: 'Midnight Birthday Surprise Cake & Flowers',
    shortDescription: '2 lbs Belgian Fudge Cake + 24 Red Roses + Midnight Delivery.',
    description: 'The ultimate midnight birthday surprise delivered right at 12:00 AM! 2 lbs dark Belgian chocolate fudge cake with 24 fresh red roses.',
    price: 8499,
    originalPrice: 9999,
    discountPercentage: 15,
    rating: 5.0,
    reviewsCount: 178,
    isBestSeller: true,
    isFeatured: true,
    category: 'Cakes & Chocolates',
    categorySlug: 'cake-and-flower-combos',
    flowerTypes: ['Red Roses'],
    occasions: ['Birthday'],
    cities: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan'],
    images: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=80'
    ],
    flowerDetails: {
      stemCount: 24,
      wrapperColor: 'Midnight Black & Gold',
      fragrance: 'Fresh Rose & Rich Fudge Cake',
      lifespan: '5-7 Days'
    },
    dimensions: 'H: 50cm x W: 40cm',
    inStock: true
  },
  {
    id: 'fb-19',
    slug: 'mixed-pastel-asiatic-lilies-roses-bouquet',
    name: 'Mixed Pastel Asiatic Lilies & Roses',
    shortDescription: 'Soft pastel Asiatic pink lilies, peach roses, and purple statice.',
    description: 'An artistic floral symphony of pink Asiatic lilies, crimson roses, white carnations and hypericum berries. Perfect for grand celebratory occasions.',
    price: 4999,
    originalPrice: 5999,
    discountPercentage: 16,
    rating: 4.9,
    reviewsCount: 104,
    isBestSeller: false,
    isFeatured: true,
    category: 'Mixed Flowers',
    categorySlug: 'mixed-flower-bouquets',
    flowerTypes: ['Lilies', 'Roses', 'Carnations'],
    occasions: ['Birthday', 'Anniversary', 'Congratulations'],
    cities: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Multan', 'Faisalabad'],
    images: [
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1000&q=80'
    ],
    flowerDetails: {
      stemCount: 25,
      wrapperColor: 'Pastel Lilac Satin',
      fragrance: 'Rich Multi-floral',
      lifespan: '6-8 Days'
    },
    dimensions: 'H: 60cm x W: 45cm',
    inStock: true
  },
  {
    id: 'fb-20',
    slug: 'bridal-handheld-white-rose-bouquet',
    name: 'Bridal Handheld White Rose Bouquet',
    shortDescription: 'Grand bridal bouquet of avalanche white roses and silver dollar eucalyptus.',
    description: 'Handcrafted luxury wedding bouquet with cascading avalanche white roses, white ranunculus, and silver dollar eucalyptus tied with silk trailing ribbon.',
    price: 11499,
    originalPrice: 13999,
    discountPercentage: 17,
    rating: 5.0,
    reviewsCount: 52,
    isBestSeller: false,
    isFeatured: true,
    category: 'White Roses',
    categorySlug: 'white-rose-bouquets',
    flowerTypes: ['White Roses', 'Ranunculus', 'Eucalyptus'],
    occasions: ['Wedding', 'Engagement'],
    cities: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad'],
    images: [
      'https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=1000&q=80'
    ],
    flowerDetails: {
      stemCount: 36,
      wrapperColor: 'Silk Trailing Ribbon Wrap',
      fragrance: 'Sophisticated Fresh',
      lifespan: '6-8 Days'
    },
    dimensions: 'H: 60cm x W: 45cm',
    inStock: true
  }
];
