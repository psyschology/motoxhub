// schemas/testimonial.js
export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      description: 'e.g., "Jon D."',
    },
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
      description: 'e.g., "I couldn\'t be happier with the products..."',
    },
  ],
  preview: {
    select: {
      title: 'authorName',
      subtitle: 'quote',
    },
  },
}