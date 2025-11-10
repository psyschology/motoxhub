// schemas/index.js
import blockContent from './blockContent'
import category from './category'
import product from './product'
import testimonial from './testimonial'
import page from './page'
import siteSettings from './siteSettings'

export const schemaTypes = [
  // Documents
  product,
  category,
  testimonial,
  page,
  siteSettings,

  // Helpers
  blockContent,
]