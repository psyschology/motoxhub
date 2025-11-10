import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// 1. Configure the client
export const client = createClient({
  // Find this in your sanity.json or sanity.cli.js
  projectId: '5c68vwae', 
  dataset: 'production',
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2024-05-01', // use a UTC date in YYYY-MM-DD format
})

// 2. Set up the image URL builder
const builder = imageUrlBuilder(client)
export function urlFor(source) {
  return builder.image(source)
}