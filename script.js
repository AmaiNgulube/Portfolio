// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Active navigation highlight based on scroll position
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Scroll-to-top button functionality
function handleScrollToTop() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      if (scrollTopBtn) scrollTopBtn.classList.add('show');
    } else {
      if (scrollTopBtn) scrollTopBtn.classList.remove('show');
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Intersection Observer for fade-in animations
function observeSections() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('section, .card, .item').forEach(el => {
    observer.observe(el);
  });
}

// Mobile menu toggle
function setupMobileMenu() {
  const nav = document.querySelector('nav');
  const header = document.querySelector('header');
  let menuOpen = false;

  // Create menu toggle button
  const menuToggle = document.createElement('button');
  menuToggle.className = 'menu-toggle';
  menuToggle.innerHTML = '☰';
  menuToggle.setAttribute('aria-label', 'Toggle menu');

  // Only show on mobile
  if (window.innerWidth < 768) {
    header.insertBefore(menuToggle, nav);
  }

  menuToggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    nav.classList.toggle('mobile-open', menuOpen);
    menuToggle.innerHTML = menuOpen ? '✕' : '☰';
  });

  // Close menu when a link is clicked
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      nav.classList.remove('mobile-open');
      menuToggle.innerHTML = '☰';
    });
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      menuOpen = false;
      nav.classList.remove('mobile-open');
      menuToggle.innerHTML = '☰';
      menuToggle.style.display = 'none';
    } else {
      menuToggle.style.display = 'block';
    }
  });
}

// Copy to clipboard functionality for contact info
function setupContactCopy() {
  const contactSections = document.querySelectorAll('#contact p');
  
  contactSections.forEach(p => {
    if (p.textContent.includes('@') || p.textContent.includes('+27')) {
      p.style.cursor = 'pointer';
      p.setAttribute('title', 'Click to copy');
      
      p.addEventListener('click', function() {
        const text = this.textContent.trim();
        navigator.clipboard.writeText(text).then(() => {
          const originalText = this.textContent;
          this.textContent = '✓ Copied!';
          setTimeout(() => {
            this.textContent = originalText;
          }, 2000);
        });
      });
    }
  });
}

// Create scroll-to-top button
function createScrollTopBtn() {
  const btn = document.createElement('button');
  btn.id = 'scrollTopBtn';
  btn.innerHTML = '↑';
  btn.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(btn);
}

// Initialize all functions on page load
document.addEventListener('DOMContentLoaded', () => {
  updateActiveNav();
  handleScrollToTop();
  observeSections();
  setupMobileMenu();
  setupContactCopy();
  createScrollTopBtn();
});

// Update active nav on scroll
window.addEventListener('scroll', updateActiveNav);