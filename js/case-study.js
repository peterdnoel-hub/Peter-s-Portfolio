/**
 * Case Study Page - Additional Animations
 */

// ========================================
// Case Study Specific Animations
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  initCaseStudyAnimations();
  initImageParallax();
  initProgressIndicator();
});

function initCaseStudyAnimations() {
  // Hero section animation sequence
  const heroTl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power3.out' } });
  
  heroTl.to('.cs-hero', {
    opacity: 1,
    y: 0,
    duration: 1,
  })
  .to('.cs-hero-image', {
    opacity: 1,
    y: 0,
  }, '-=0.5');

  // Sections - scroll triggered
  const sections = gsap.utils.toArray('.cs-section, .cs-full-image, .cs-nav');
  
  sections.forEach(section => {
    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    });
  });

  // Stats counter animation
  const stats = gsap.utils.toArray('.cs-stat-number, .cs-result-number');
  
  stats.forEach(stat => {
    const text = stat.textContent;
    const hasPercent = text.includes('%');
    const hasDollar = text.includes('$');
    const hasPlus = text.includes('+');
    const hasM = text.includes('M');
    
    // Extract numeric value
    let numericValue = parseFloat(text.replace(/[^0-9.]/g, ''));
    
    if (isNaN(numericValue)) return;
    
    // Set initial state
    stat.textContent = hasDollar ? '$0' : '0';
    if (hasPercent) stat.textContent += '%';
    if (hasPlus) stat.textContent += '+';
    if (hasM) stat.textContent = '$0M';
    
    ScrollTrigger.create({
      trigger: stat,
      start: 'top 85%',
      onEnter: () => {
        gsap.to({ value: 0 }, {
          value: numericValue,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function() {
            let displayValue = Math.round(this.targets()[0].value);
            if (numericValue < 10) {
              displayValue = this.targets()[0].value.toFixed(1);
            }
            
            let prefix = hasDollar ? '$' : '';
            let suffix = '';
            if (hasPercent) suffix = '%';
            if (hasPlus) suffix = '+';
            if (hasM) suffix = 'M';
            
            stat.textContent = prefix + displayValue + suffix;
          }
        });
      },
      once: true,
    });
  });
}

function initImageParallax() {
  // Subtle parallax on feature images
  const featureImages = gsap.utils.toArray('.cs-feature-image img');
  
  featureImages.forEach(img => {
    gsap.to(img, {
      scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
      y: -40,
      ease: 'none',
    });
  });
}

function initProgressIndicator() {
  // Optional: Reading progress indicator
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress';
  progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
  document.body.appendChild(progressBar);
  
  // Add styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    .reading-progress {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }
    .reading-progress-bar {
      height: 100%;
      background: var(--color-text-primary);
      width: 0%;
      transition: width 0.1s ease-out;
    }
  `;
  document.head.appendChild(style);
  
  // Update progress on scroll
  const bar = progressBar.querySelector('.reading-progress-bar');
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    bar.style.width = `${progress}%`;
  });
}

// ========================================
// Image Lightbox (Optional Enhancement)
// ========================================
function initLightbox() {
  const images = document.querySelectorAll('.cs-full-image img, .cs-feature-image img');
  
  images.forEach(img => {
    img.style.cursor = 'zoom-in';
    
    img.addEventListener('click', () => {
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `
        <div class="lightbox-backdrop"></div>
        <img src="${img.src}" alt="${img.alt}" class="lightbox-image">
        <button class="lightbox-close" aria-label="Close">×</button>
      `;
      
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';
      
      // Animate in
      gsap.from('.lightbox-backdrop', { opacity: 0, duration: 0.3 });
      gsap.from('.lightbox-image', { scale: 0.9, opacity: 0, duration: 0.3 });
      
      // Close handlers
      const close = () => {
        gsap.to(lightbox, {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            lightbox.remove();
            document.body.style.overflow = '';
          }
        });
      };
      
      lightbox.querySelector('.lightbox-backdrop').addEventListener('click', close);
      lightbox.querySelector('.lightbox-close').addEventListener('click', close);
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
      }, { once: true });
    });
  });
  
  // Add lightbox styles
  const style = document.createElement('style');
  style.textContent = `
    .lightbox {
      position: fixed;
      inset: 0;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .lightbox-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.9);
    }
    .lightbox-image {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
      object-fit: contain;
      border-radius: 8px;
    }
    .lightbox-close {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 48px;
      height: 48px;
      background: rgba(255, 255, 255, 0.1);
      border: none;
      border-radius: 50%;
      color: white;
      font-size: 32px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }
    .lightbox-close:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  `;
  document.head.appendChild(style);
}

// Uncomment to enable lightbox
// initLightbox();
