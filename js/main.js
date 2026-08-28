/**
 * Portfolio - Animation & Interaction Controller
 * Using GSAP for smooth, professional animations
 */

const hasGsap = typeof gsap !== 'undefined';
if (hasGsap && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ========================================
// Configuration
// ========================================
const CONFIG = {
  animation: {
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.15,
  },
  scroll: {
    start: 'top 85%',
    toggleActions: 'play none none none',
  },
};

// ========================================
// Initialize on DOM Ready
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  initImageLoading();
  initNavigation();
  initMobileNav();
  if (!hasGsap) return;
  initHeroAnimations();
  initScrollAnimations();
  initHoverEffects();
});

// ========================================
// Image Loading with Skeleton State
// ========================================
function initImageLoading() {
  const images = document.querySelectorAll('.mockup');

  images.forEach(img => {
    const markLoaded = () => img.classList.add('loaded');
    if (img.complete && img.naturalWidth > 0) {
      markLoaded();
    } else {
      img.addEventListener('load', markLoaded);
      img.addEventListener('error', () => {
        img.classList.add('is-error');
      });
    }
  });
}

// ========================================
// Hero Section Animations
// ========================================
function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { duration: CONFIG.animation.duration, ease: CONFIG.animation.ease } });

  tl.from('.hero-title', {
    opacity: 0,
    y: 30,
    duration: 1,
  })
  .from('.hero-subtitle', {
    opacity: 0,
    y: 30,
  }, '-=0.6')
  .from('.hero-meta', {
    opacity: 0,
    y: 30,
  }, '-=0.5');
}

// ========================================
// Scroll-Triggered Animations
// ========================================
function initScrollAnimations() {
  // Case study cards - staggered reveal
  const caseStudyCards = gsap.utils.toArray('[data-animate="fade-up"]');
  
  caseStudyCards.forEach((card, index) => {
    gsap.to(card, {
      scrollTrigger: {
        trigger: card,
        start: CONFIG.scroll.start,
        toggleActions: CONFIG.scroll.toggleActions,
      },
      opacity: 1,
      y: 0,
      duration: CONFIG.animation.duration,
      delay: (index % 2) * 0.2, // Stagger left/right columns
      ease: CONFIG.animation.ease,
    });
  });

  // Footer animation
  gsap.from('.footer-content', {
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 90%',
    },
    opacity: 0,
    y: 40,
    duration: CONFIG.animation.duration,
    ease: CONFIG.animation.ease,
  });
}

// ========================================
// Navigation
// ========================================
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const currentPath = window.location.pathname;

  navLinks.forEach(link => {
    // Set active state based on current URL
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }

    // Smooth scroll for anchor links
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          if (hasGsap && gsap.to) {
            gsap.to(window, {
              duration: 1,
              scrollTo: { y: target, offsetY: 100 },
              ease: 'power3.inOut',
            });
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    });
  });
}

// ========================================
// Mobile / tablet hamburger
// ========================================
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-pill');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  nav.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) setOpen(false);
  });
}

// ========================================
// Hover Effects
// ========================================
function initHoverEffects() {
  // Case study card hover - subtle lift effect
  const cards = document.querySelectorAll('.case-study-card');
  
  cards.forEach(card => {
    const image = card.querySelector('.case-study-image');
    if (!image) return;
    
    card.addEventListener('mouseenter', () => {
      gsap.to(image, {
        scale: 1.02,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(image, {
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    });
  });

  // Button magnetic effect
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        scale: 1.02,
        duration: 0.2,
        ease: 'power2.out',
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
      });
    });
  });
}

// ========================================
// Utility: Parallax Effect (Optional)
// ========================================
function initParallax() {
  const mockups = gsap.utils.toArray('.mockup');
  
  mockups.forEach(mockup => {
    gsap.to(mockup, {
      scrollTrigger: {
        trigger: mockup.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      y: -30,
      ease: 'none',
    });
  });
}

// ========================================
// Utility: Preloader (Optional - uncomment if needed)
// ========================================
/*
function initPreloader() {
  const preloader = document.querySelector('.preloader');
  
  window.addEventListener('load', () => {
    gsap.to(preloader, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        preloader.style.display = 'none';
        initHeroAnimations();
      },
    });
  });
}
*/

// ========================================
// Utility: Smooth Scroll Lenis (Optional upgrade)
// ========================================
/*
// If you want butter-smooth scrolling, install Lenis:
// npm install @studio-freight/lenis

import Lenis from '@studio-freight/lenis';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
*/
