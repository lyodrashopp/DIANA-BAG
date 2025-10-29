// Social Proof Popup System
const customers = [
  { name: "Vina", city: "Jakarta", avatar: "https://down-id.img.susercontent.com/file/b4fbec166b01f1dc3dea983fe4bc73c6_tn" },
  { name: "Dina", city: "Surabaya", avatar: "https://down-id.img.susercontent.com/file/d4109ddb5bcc7f9a8d0c06ad1c57164e_tn" },
  { name: "Kartika", city: "Bandung", avatar: "https://down-id.img.susercontent.com/file/6da0c02608253d878f90d88d972d08c8_tn" },
  { name: "Lestari", city: "Medan", avatar: "https://down-id.img.susercontent.com/file/id-11134233-8224u-mfvl1l8tqsjxe1_tn" },
  { name: "Putri", city: "Bekasi", avatar: "https://down-id.img.susercontent.com/file/097657d68214f67cf09b3caeae67e57b_tn" }
];

let popupInterval;
let hideTimeout;

function showSocialProofPopup() {
  const popup = document.getElementById('social-proof-popup');
  const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
  const minutesAgo = Math.floor(Math.random() * 15) + 1;
  
  document.getElementById('popup-text').textContent = `${randomCustomer.name} dari ${randomCustomer.city} baru saja memesan DIANA SLING BAG NEW 2025`;
  document.getElementById('popup-avatar').src = randomCustomer.avatar;
  
  popup.classList.remove('hidden');
  popup.classList.add('animate-slide-in-right');
  
  // Clear previous timeout
  if (hideTimeout) clearTimeout(hideTimeout);
  
  // Auto-hide after 5 seconds
  hideTimeout = setTimeout(() => {
    popup.classList.add('hidden');
  }, 5000);
  
  // Pause hide on hover
  popup.addEventListener('mouseenter', () => {
    if (hideTimeout) clearTimeout(hideTimeout);
  });
  
  popup.addEventListener('mouseleave', () => {
    hideTimeout = setTimeout(() => {
      popup.classList.add('hidden');
    }, 5000);
  });
}

function startSocialProofSystem() {
  // Show first popup immediately
  showSocialProofPopup();
  
  // Then show every 8 seconds
  popupInterval = setInterval(showSocialProofPopup, 8000);
}

// Testimonial Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('#testimonials-carousel > div > div');
const totalSlides = slides.length;
const slidesToShow = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;

function updateCarousel() {
  const offset = -currentSlide * (100 / slidesToShow);
  document.querySelector('#testimonials-carousel > div').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
  if (currentSlide < totalSlides - slidesToShow) {
    currentSlide++;
  } else {
    currentSlide = 0;
  }
  updateCarousel();
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
  } else {
    currentSlide = totalSlides - slidesToShow;
  }
  updateCarousel();
}

// Auto-scroll testimonials
let testimonialInterval = setInterval(nextSlide, 5000);

// Pause auto-scroll on hover
document.getElementById('testimonials-carousel').addEventListener('mouseenter', () => {
  clearInterval(testimonialInterval);
});

document.getElementById('testimonials-carousel').addEventListener('mouseleave', () => {
  testimonialInterval = setInterval(nextSlide, 5000);
});
// Lightbox Functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.getElementById('close-lightbox');

// Gallery images
document.querySelectorAll('.gallery-image').forEach(img => {
  img.addEventListener('click', function() {
    lightboxImg.src = this.src;
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
  });
});

// Testimonial images
document.querySelectorAll('.testimonial-image').forEach(img => {
  img.addEventListener('click', function() {
    lightboxImg.src = this.src;
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
  });
});

closeLightbox.addEventListener('click', () => {
  lightbox.classList.add('hidden');
  lightbox.classList.remove('flex');
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
  }
});
// Initialize
document.addEventListener('DOMContentLoaded', function() {
  // Start social proof system
  startSocialProofSystem();
  
  // Set up carousel navigation
  document.getElementById('next-testimonial').addEventListener('click', nextSlide);
  document.getElementById('prev-testimonial').addEventListener('click', prevSlide);
  
  // Update carousel on resize
  window.addEventListener('resize', () => {
    updateCarousel();
  });
  
  // Initialize carousel
  updateCarousel();
});
