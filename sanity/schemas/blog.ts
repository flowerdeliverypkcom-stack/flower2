import { defineField, defineType } from './product';

export default defineType({
  name: 'blog',
  title: 'SEO Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      initialValue: 'FlowerDeliveryPK Master Florist',
    }),
    defineField({
      name: 'category',
      title: 'Blog Category',
      type: 'string',
      options: {
        list: ['Flower Advice', 'Gifting Guides', 'Occasion Ideas', 'International Shipping'],
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Featured Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description (SEO)',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required().max(160),
    }),
    defineField({
      name: 'readTime',
      title: 'Estimated Read Time (e.g. 5 min read)',
      type: 'string',
      initialValue: '4 min read',
    }),
    defineField({
      name: 'body',
      title: 'Article Content Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'SEO Target Keywords / Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'relatedProducts',
      title: 'Featured Products in Post',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    }),
  ],
});
