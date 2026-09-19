import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import product from './sanity/schemas/product';
import blog from './sanity/schemas/blog';
import category from './sanity/schemas/category';

export const sanityConfig = defineConfig({
  basePath: '/studio',
  name: 'default',
  title: 'FlowerDeliveryPK Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'am64tc6i',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool()],
  schema: {
    types: [product, blog, category],
  },
});

export default sanityConfig;
