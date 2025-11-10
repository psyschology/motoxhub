// Import the client and image builder from sanity.js
import { client, urlFor } from './sanity.js';

// This function runs all our fetch functions
async function loadContent() {
  await fetchCategories();
  await fetchTestimonials();
  await fetchSiteSettings();
}

// 1. Fetch Categories
async function fetchCategories() {
  const query = `*[_type == "category"] | order(title asc) {
    title,
    description,
    image,
    "slug": slug.current
  }`;
  const categories = await client.fetch(query);
  renderCategories(categories);
}

// 2. Render Categories
function renderCategories(categories) {
  const grid = document.getElementById('categories-grid');
  if (!grid) return;

  categories.forEach((category, index) => {
    const categoryHtml = `
      <a href="${category.slug || '#'}.html" class="stagger-${index} from-right group relative flex flex-col gap-2 bg-highlight2" x-data x-anim-fade>
        <img class="absolute inset-0 z-0 h-full w-full object-cover" 
             src="${urlFor(category.image).width(640).height(640).auto('format').url()}" 
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
      </a>
    `;
    // Use insertAdjacentHTML to add the new element
    grid.insertAdjacentHTML('beforeend', categoryHtml);
  });
}

// 3. Fetch Testimonials
async function fetchTestimonials() {
  const query = `*[_type == "testimonial"] { authorName, quote }`;
  const testimonials = await client.fetch(query);
  renderTestimonials(testimonials);
}

// 4. Render Testimonials
function renderTestimonials(testimonials) {
  const slidesContainer = document.getElementById('testimonial-slides-container');
  if (!slidesContainer) return;

  testimonials.forEach(testimonial => {
    const testimonialHtml = `
      <div class="flex flex-none basis-full flex-col px-8">
        <div class="relative flex flex-grow flex-col items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="h-10 w-10 fill-current">
            <path d="M192 296c0 66.3-53.7 120-120 120H64 32l0-64H64h8c30.9 0 56-25.1 56-56v-8L0 288V96H192l0 96v96 8zm256 0c0 66.3-53.7 120-120 120h-8H288V352h32 8c30.9 0 56-25.1 56-56v-8l-128 0 0-192H448v96l0 96v8z" />
          </svg>
          <div class="max-w-md basis-24 whitespace-pre-line break-words text-center text-lg italic lg:basis-24 xl:text-xl">${testimonial.quote}</div>
          <div class="whitespace-pre-line break-words text-center font-semibold uppercase lg:text-lg">${testimonial.authorName}</div>
        </div>
      </div>
    `;
    slidesContainer.insertAdjacentHTML('beforeend', testimonialHtml);
  });

  // After adding slides, we need to re-initialize the Embla carousel
  // We find the Alpine component for the carousel and re-run its init
  const carouselWrapper = slidesContainer.closest('[x-data]');
  if (carouselWrapper && carouselWrapper._x_dataStack) {
    const embla = carouselWrapper.__x.components[0].embla;
    if (embla) {
      embla.reInit();
    }
  }
}

// 5. Fetch Site Settings
async function fetchSiteSettings() {
  const query = `*[_type == "siteSettings"][0] { address, phone, email }`;
  const settings = await client.fetch(query);
  if (settings) {
    renderFooter(settings);
  }
}

// 6. Render Footer
function renderFooter(settings) {
  const addressEl = document.getElementById('footer-address');
  const phoneEl = document.getElementById('footer-phone');
  const emailEl = document.getElementById('footer-email');

  if (addressEl && settings.address) {
    addressEl.textContent = settings.address;
  }
  if (phoneEl && settings.phone) {
    phoneEl.textContent = settings.phone;
    phoneEl.href = `tel:${settings.phone.replace(/\s/g, '')}`;
  }
  if (emailEl && settings.email) {
    emailEl.textContent = settings.email;
    emailEl.href = `mailto:${settings.email}`;
  }
}


// Wait for Alpine.js to be ready, then load our content
document.addEventListener('alpine:init', () => {
  loadContent();
});