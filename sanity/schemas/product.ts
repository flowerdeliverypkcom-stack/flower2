export interface SanityField {
  name: string;
  title: string;
  type: string;
  options?: Record<string, unknown>;
  validation?: (Rule: any) => any;
  to?: { type: string }[];
  of?: any[];
  rows?: number;
  initialValue?: any;
  fields?: SanityField[];
}

export function defineType<T extends Record<string, any>>(type: T): T {
  return type;
}

export function defineField<T extends SanityField>(field: T): T {
  return field;
}

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (PKR)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0),
    }),
    defineField({
      name: 'originalPrice',
      title: 'Original Price (PKR)',
      type: 'number',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'text',
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule: any) => Rule.required().min(1),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'flowerTypes',
      title: 'Flower Types',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: ['Red Roses', 'Lilies', 'Tulips', 'Carnations', 'Mix Flowers', 'Orchids', 'Sunflowers'],
      },
    }),
    defineField({
      name: 'occasions',
      title: 'Occasions',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'Birthday',
          'Anniversary',
          'Love & Romance',
          'Congratulation',
          "Mother's Day",
          'Valentine',
          'Get Well Soon',
        ],
      },
    }),
    defineField({
      name: 'cities',
      title: 'Available Cities',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'All'],
      },
    }),
    defineField({
      name: 'flowerDetails',
      title: 'Flower Specifications',
      type: 'object',
      fields: [
        defineField({ name: 'stemCount', title: 'Stem Count', type: 'number' }),
        defineField({ name: 'wrapperColor', title: 'Wrapper Color', type: 'string' }),
        defineField({ name: 'fragrance', title: 'Fragrance Level', type: 'string' }),
        defineField({ name: 'lifespan', title: 'Vase Lifespan', type: 'string' }),
      ],
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'isBestSeller',
      title: 'Best Seller Badge',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'seo',
      title: 'SEO Meta Tags',
      type: 'object',
      fields: [
        defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
        defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 }),
      ],
    }),
  ],
});
