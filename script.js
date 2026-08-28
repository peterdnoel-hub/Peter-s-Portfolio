// Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Case Study Modal
const modal = document.getElementById('case-study-modal');
const caseStudyCards = document.querySelectorAll('.case-study-card');
const modalClose = document.querySelector('.modal-close');

// Case study data
const caseStudyData = {
    1: {
        category: 'Mobile App',
        title: 'E-Commerce Mobile Experience',
        description: 'Redesigned the mobile shopping experience to increase conversion rates and improve user satisfaction through intuitive navigation and streamlined checkout.',
        challenge: 'The existing mobile e-commerce app had a high cart abandonment rate of 68% and poor user ratings. Users found the checkout process confusing and the navigation cluttered, leading to frustration and lost sales.',
        research: 'I conducted user interviews with 15 frequent mobile shoppers and analyzed 500+ user session recordings. Key findings revealed that users abandoned carts due to: (1) Too many steps in checkout (7 steps), (2) Unclear shipping costs, (3) Difficult product comparison, and (4) Poor mobile navigation. Competitive analysis showed that successful apps had 3-step checkouts and clear visual hierarchy.',
        process: 'I created low-fidelity wireframes focusing on simplifying the checkout flow to 3 steps. I designed a bottom navigation bar for easier thumb reach and implemented a sticky cart summary. High-fidelity prototypes were tested with 20 users, resulting in 85% task completion rate (up from 45%). I iterated on the design based on feedback, particularly around shipping information visibility.',
        impact: 'After implementation, cart abandonment decreased by 42%, conversion rate increased by 28%, and user satisfaction scores improved from 2.8/5 to 4.3/5. The streamlined checkout process reduced average checkout time from 4.5 minutes to 2.1 minutes.'
    },
    2: {
        category: 'Web Platform',
        title: 'SaaS Dashboard Redesign',
        description: 'Transformed a complex data dashboard into an intuitive interface that helps users make better decisions faster with improved data visualization.',
        challenge: 'The SaaS platform\'s analytics dashboard was overwhelming users with too much information, leading to low feature adoption (only 23% of users accessed analytics). Users reported difficulty finding relevant metrics and understanding data relationships.',
        research: 'I conducted surveys with 200+ users and held 8 stakeholder interviews. User journey mapping revealed that users spent an average of 12 minutes trying to find specific metrics. Heatmap analysis showed that 60% of the dashboard was never clicked. Users wanted customizable views and better data visualization.',
        process: 'I restructured the information architecture using card-based layouts and progressive disclosure. I created a design system with consistent data visualization patterns. Key features included: (1) Customizable dashboard widgets, (2) Interactive charts with drill-down capabilities, (3) Smart filters and date ranges, (4) Export functionality. I built interactive prototypes in Figma and conducted usability testing with 12 users.',
        impact: 'Dashboard engagement increased by 156%, with 67% of users now regularly accessing analytics. Time to find specific metrics reduced from 12 minutes to 2.5 minutes. User satisfaction increased from 3.1/5 to 4.6/5. The redesign also reduced support tickets related to dashboard navigation by 73%.'
    },
    3: {
        category: 'Fintech',
        title: 'Banking App UX Enhancement',
        description: 'Improved trust and usability in a banking application through better security communication and simplified transaction flows.',
        challenge: 'The banking app had low user trust scores and high drop-off rates during money transfers. Users were concerned about security but found security features confusing. The transaction flow had 6 steps with unclear progress indicators.',
        research: 'I conducted 10 user interviews focusing on financial anxiety and trust. Research revealed that users wanted: (1) Clear security indicators, (2) Simplified transfer process, (3) Better error messages, (4) Transaction confirmation details. Security concerns were the #1 reason users abandoned transfers.',
        process: 'I redesigned the transaction flow with clear security badges and progress indicators. I implemented micro-interactions to provide feedback at each step. The new design included: (1) 3-step transfer process with clear labels, (2) Security indicators (SSL, encryption badges), (3) Transaction preview before confirmation, (4) Clear error messages with actionable solutions. I created high-fidelity prototypes and tested with 15 users.',
        impact: 'Transfer completion rate increased from 58% to 87%. User trust scores improved from 3.2/5 to 4.5/5. Support tickets related to failed transfers decreased by 65%. The simplified flow reduced average transfer time from 3.5 minutes to 1.8 minutes.'
    },
    4: {
        category: 'Healthcare',
        title: 'Telemedicine Platform',
        description: 'Designed a patient-friendly telemedicine platform that reduces anxiety and makes healthcare more accessible through thoughtful UX design.',
        challenge: 'The telemedicine platform had low patient adoption (only 18% of registered users completed appointments). Patients reported anxiety about video calls, difficulty scheduling, and confusion about the platform. Elderly users particularly struggled with the interface.',
        research: 'I conducted empathy interviews with 12 patients, including 4 elderly users. Key insights: (1) Patients wanted to see doctor profiles before booking, (2) Video call anxiety was high, (3) Scheduling was confusing with time zones, (4) Accessibility was poor for elderly users. I also interviewed 3 healthcare providers to understand their needs.',
        process: 'I designed a patient-centered interface with: (1) Clear doctor profiles with photos and specialties, (2) Pre-appointment preparation checklist, (3) Simplified scheduling with time zone handling, (4) Large touch targets and clear typography for accessibility, (5) Test call feature to reduce anxiety. I created personas for different patient types and designed for the most vulnerable users first. Prototypes were tested with 20 users including 8 elderly participants.',
        impact: 'Appointment completion rate increased from 18% to 72%. Patient satisfaction scores improved from 2.9/5 to 4.4/5. Elderly user adoption increased by 340%. Support calls decreased by 58%. The platform now serves 15,000+ patients monthly, up from 3,000.'
    }
};

// Open modal with case study data
caseStudyCards.forEach(card => {
    card.addEventListener('click', () => {
        const caseId = card.getAttribute('data-case');
        const data = caseStudyData[caseId];
        
        if (data) {
            // Update modal content
            document.querySelector('.case-study-header .case-study-category').textContent = data.category;
            document.querySelector('.case-study-detail-title').textContent = data.title;
            document.querySelector('.case-study-detail-description').textContent = data.description;
            
            const sections = document.querySelectorAll('.case-section');
            sections[0].querySelector('p').textContent = data.challenge;
            sections[1].querySelector('p').textContent = data.research;
            sections[2].querySelector('p').textContent = data.process;
            sections[3].querySelector('p').textContent = data.impact;
            
            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Form submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Show success message (you can customize this)
    alert('Thank you for your message! I\'ll get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.case-study-card, .skill-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Scroll to top functionality (optional enhancement)
let scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});






