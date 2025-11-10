// Import the client from your new file
import { sanityClient, urlFor } from './sanity-client.js';

// Wait for the main page content to be ready
document.addEventListener('DOMContentLoaded', () => {
  // Run our two functions to fetch content
  fetchCategories();
  fetchTestimonials();
});


/**
 * 1. Fetches Categories for the homepage grid
 */
async function fetchCategories() {
  // This is the ID we will add to index.html
  const grid = document.getElementById('category-grid'); 
  if (!grid) return;

  // This is the GROQ query to get all categories
  const query = `*[_type == "category"] | order(_createdAt asc) {
    title,
    description,
    "slug": slug.current,
    "imageUrl": image.asset->url 
  }`;

  try {
    const categories = await sanityClient.fetch(query);
    
    // Clear out the static "placeholder" content
    grid.innerHTML = ''; 
    
    // Loop through the fetched categories and build new HTML
    categories.forEach((category, index) => {
      const categoryEl = document.createElement('a');
      
      // These are the same classes and attributes from your original index.html
      categoryEl.href = `${category.slug}.html`; 
      categoryEl.className = `stagger-${index} from-right group relative flex flex-col gap-2 bg-highlight2`;
      categoryEl.setAttribute('x-data', '');
      categoryEl.setAttribute('x-anim-fade', '');
      
      // Use the dynamic data from Sanity
      categoryEl.innerHTML = `
        <img class="absolute inset-0 z-0 h-full w-full object-cover" 
             src="${category.imageUrl}?w=640&auto=format" 
             srcset="${category.imageUrl}?w=320&auto=format 320w, 
                     ${category.imageUrl}?w=480&auto=format 480w, 
                     ${category.imageUrl}?w=640&auto=format 640w"
             sizes="(min-width: 768px) 33vw, 100vw" alt="${category.title}" loading="lazy">
        
        <div class="relative flex min-h-[20rem] flex-grow flex-col p-5 lg:p-8 bg-overlay text-overlay-text">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-16 w-16 fill-highlight2-button">
            <rect x="8" y="32" height="400" width="400" class="fill-highlight2" />
            <path d="M448 32H0V480H448V32zM337 209L209 337l-17 17-17-17-64-64-17-17L128 222.1l17 17 47 47L303 175l17-17L353.9 192l-17 17z" />
          </svg>
          <div class="whitespace-pre-line break-words text-2xl font-semibold lg:text-3xl">${category.title}</div>
          <div class="basis-18 whitespace-pre-line break-words">${category.description}</div>
          <div class="absolute right-0 top-0 z-0 border-b-4 border-l-4 border-background p-2 transition-colors group-hover:bg-primary">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="h-10 w-10 fill-highlight2-button transition-colors group-hover:fill-primary-text">
              <path d="M320 96h32v32V352v32H288V352 205.3L86.6 406.6 64 429.3 18.7 384l22.6-22.6L242.7 160H96 64V96H96 320z" />
            </svg>
          </div>
        </div>
      `;
      // Add the new element to the grid
      grid.appendChild(categoryEl);
    });
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
}


/**
 * 2. Fetches Testimonials for the homepage slider
 */
async function fetchTestimonials() {
  // This is the ID we will add to the slider in index.html
  const slider = document.getElementById('testimonial-slider'); 
  if (!slider) return;

  // The GROQ query to get all testimonials
  const query = `*[_type == "testimonial"] {
    authorName,
    quote
  }`;

  try {
    const testimonials = await sanityClient.fetch(query);
    
    // Clear out the static testimonials
    slider.innerHTML = '';

    // Loop through and build new testimonial slides
    testimonials.forEach(testimonial => {
      const testimonialEl = document.createElement('div');
      testimonialEl.className = 'flex flex-none basis-full flex-col px-8';
      
      testimonialEl.innerHTML = `
        <div class="relative flex flex-grow flex-col items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-10 w-10 fill-current">
            <path d="M192 296c0 66.3-53.7 120-120 120H64 32l0-64H64h8c30.9 0 56-25.1 56-56v-8L0 288V96H192l0 96v96 8zm256 0c0 66.3-53.7 120-120 120h-8H288V352h32 8c30.9 0 56-25.1 56-56v-8l-128 0 0-192H448v96l0 96v8z" />
          </svg>
          <div class="max-w-md basis-24 whitespace-pre-line break-words text-center text-lg italic lg:basis-24 xl:text-xl">${testimonial.quote}</div>
          <div class="whitespace-pre-line break-words text-center font-semibold uppercase lg:text-lg">${testimonial.authorName}</div>
        </div>
      `;
      slider.appendChild(testimonialEl);
    });

    // Re-initialize the Embla carousel (from your script1.js)
    // We find the parent "viewport" element and re-run the Embla init
    const viewport = slider.closest('[x-ref="viewport"]');
    if (viewport && window.EmblaCarousel && window.Autoplay) {
        try {
            // Check if there's an existing embla instance and destroy it
            if (viewport.embla) {
                viewport.embla.destroy();
            }
            // Create a new instance
            const emblaApi = window.EmblaCarousel(viewport, { align: 'start', loop: true }, [window.Autoplay()]);
            viewport.embla = emblaApi; // Store the instance for later
        } catch(e) {
            console.error('Failed to re-initialize carousel:', e);
        }
    }

  } catch (error) {
    console.error('Failed to fetch testimonials:', error);
  }
}