// Import the two libraries you just installed
import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Configure the client
export const sanityClient = createClient({
  // 1. Find this in your sanity.json or sanity.cli.js file
  projectId: '5c68vwae', 
  dataset: 'production',
  apiVersion: '2024-05-01', // Use a recent API version
  useCdn: true, // `false` if you want to ensure fresh data on every load
})

// Helper function for getting image URLs from Sanity
const builder = imageUrlBuilder(sanityClient)
export function urlFor(source) {
  return builder.image(source)
}