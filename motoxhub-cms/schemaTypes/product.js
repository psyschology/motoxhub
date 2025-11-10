// schemas/product.js
export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'options',
      title: 'Product Options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', title: 'Option Name', type: 'string', description: 'e.g., Color, Size, Style'},
            {
              name: 'values',
              title: 'Option Values',
              type: 'array',
              of: [{type: 'string'}],
              description: 'e.g., Red, Blue, Black',
            },
          ],
        },
      ],
      description: 'For things like colors, sizes, or configurations (like the "Cable configuration" on oilandlubricants.html)',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category.title',
      media: 'mainImage',
    },
  },
}