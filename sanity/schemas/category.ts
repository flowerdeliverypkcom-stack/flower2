import { defineField, defineType } from './product';

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Category Name',
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
      name: 'group',
      title: 'Category Group',
      type: 'string',
      options: {
        list: [
          { title: 'Flowers', value: 'flowers' },
          { title: 'Gifts', value: 'gifts' },
          { title: 'Cakes', value: 'cakes' },
        ],
      },
      initialValue: 'flowers',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Category Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});
