/**
 * Rocket Connect Case Study - Animations & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initSidebarNavigation();
  initTabs();
  if (typeof gsap === 'undefined') return;
  initRocketConnectAnimations();
});

// ========================================
// Page Animations
// ========================================
function initRocketConnectAnimations() {
  gsap.from('.rc-hero', {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power3.out',
  });

  gsap.from('.rc-hero-image', {
    scale: 1.04,
    opacity: 0,
    duration: 0.8,
    delay: 0.3,
    ease: 'power3.out',
  });

  // Sections - scroll triggered
  const sections = gsap.utils.toArray('.rc-section');
  
  sections.forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
    });
  });

  // Animate elements within sections
  const animateElements = [
    '.rc-detail-row',
    '.rc-impact-card',
    '.rc-method-item',
    '.rc-goals-list li',
    '.rc-step',
    '.rc-design-card',
  ];

  animateElements.forEach(selector => {
    const elements = gsap.utils.toArray(selector);
    elements.forEach((el, index) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: index * 0.1,
        ease: 'power2.out',
      });
    });
  });
}

// ========================================
// Sidebar Navigation
// ========================================
function initSidebarNavigation() {
  const navLinks = document.querySelectorAll('.rc-nav-link');
  const sections = document.querySelectorAll('.rc-section[id]');

  // Smooth scroll on click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      
      if (target) {
        if (typeof gsap !== 'undefined' && gsap.to) {
          gsap.to(window, {
            duration: 0.4,
            scrollTo: { y: target, offsetY: 100 },
            ease: 'power2.out',
            overwrite: 'auto',
          });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Active state on scroll
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

// ========================================
// Tabs
// ========================================
function initTabs() {
  const tabGroups = document.querySelectorAll('.rc-tabs');
  
  tabGroups.forEach(group => {
    const tabs = group.querySelectorAll('.rc-tab');
    const groupName = group.dataset.tabs;
    const panels = groupName
      ? document.querySelectorAll(`.rc-tab-panels[data-tabs="${groupName}"] .rc-tab-panel`)
      : [];
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('rc-tab--active'));
        tab.classList.add('rc-tab--active');

        const target = tab.dataset.tab;
        if (target && panels.length) {
          panels.forEach(panel => {
            const isActive = panel.dataset.panel === target;
            panel.classList.toggle('rc-tab-panel--active', isActive);
          });
        }
        
        if (typeof gsap !== 'undefined') {
          gsap.from(tab, {
            scale: 0.95,
            duration: 0.2,
            ease: 'power2.out',
          });
        }
      });
    });
  });
}

// ========================================
// Parallax on Mockups (Optional)
// ========================================
function initMockupParallax() {
  gsap.to('.rc-hero-image', {
    scrollTrigger: {
      trigger: '.rc-hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
    y: -30,
    ease: 'none',
  });
}

// Uncomment to enable parallax
// initMockupParallax();
