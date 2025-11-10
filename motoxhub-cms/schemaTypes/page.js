// schemas/page.js
export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    },
    {
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
    },
    {
      name: 'heroBackgroundVideo',
      title: 'Hero Background Video URL',
      type: 'url',
      description: 'e.g., the YouTube link from about.html',
    },
    {
      name: 'heroBackgroundImage',
      title: 'Hero Background Image',
      type: 'image',
      description: 'Use this if there is no video',
    },
    {
      name: 'contentBlocks',
      title: 'Content Blocks',
      type: 'array',
      description: 'The main content sections of the page',
      of: [
        {
          type: 'object',
          name: 'contentBlock',
          title: 'Content Block',
          fields: [
            {name: 'title', title: 'Title', type: 'string', description: 'e.g., "For Bike Lovers"'},
            {name: 'body', title: 'Body', type: 'blockContent'},
            {name: 'image', title: 'Image', type: 'image'},
            {name: 'videoUrl', title: 'Video URL', type: 'url', description: 'e.g., the YouTube embed'},
          ],
        },
      ],
    },
  ],
}