import product from './sanity/schemas/product';
import blog from './sanity/schemas/blog';
import category from './sanity/schemas/category';

export const sanityConfig = {
  name: 'default',
  title: 'FlowerDeliveryPK Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'flowerdeliverypk',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [],
  schema: {
    types: [product, blog, category],
  },
};

export default sanityConfig;
