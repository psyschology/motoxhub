// schemas/siteSettings.js
export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Use a singleton pattern
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'],
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Site Settings',
      readOnly: true,
    },
    {
      name: 'address',
      title: 'Address',
      type: 'string',
      description: 'e.g., 24, G. T Road...',
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      description: 'e.g., 82401 09598',
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'e.g., support@motoxhub.com',
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'platform', title: 'Platform', type: 'string', description: 'e.g., Facebook, Instagram'},
            {name: 'url', title: 'URL', type: 'url'},
          ],
        },
      ],
    },
  ],
}