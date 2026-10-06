/**
 * ============================================================================
 * AQUAFIX PLUMBING SERVICES - JAVASCRIPT
 * Flat 2D Vanilla JavaScript | Refined Architectural Plumbing
 * ============================================================================
 */

// ============================================================================
// 1. BUSINESS CONFIGURATION SETTINGS BLOCK
// Edit any detail here to automatically update across the entire website!
// ============================================================================
const BUSINESS_CONFIG = {
  name: "AquaFix Plumbing Services",
  shortName: "AquaFix",
  tagline: "Fast, reliable plumbing at your door.",
  location: "Main Bazaar, Dharamshala, Himachal Pradesh",
  phone: "+91 00000 00000",
  phoneRaw: "+910000000000",
  whatsapp: "+91 00000 00000",
  whatsappUrl: "https://wa.me/910000000000",
  email: "hello@yourbusiness.com",
  hours: "8 AM to 9 PM, all 7 days. 24/7 emergency service."
};

// ============================================================================
// 2. AUTOMATIC SETTINGS POPULATION
// Populates text content and links dynamically from BUSINESS_CONFIG
// ============================================================================
function applyBusinessSettings() {
  // Update Text Nodes
  document.querySelectorAll('[data-business="name"]').forEach(el => {
    el.textContent = BUSINESS_CONFIG.name;
  });

  document.querySelectorAll('[data-business="shortName"]').forEach(el => {
    el.textContent = BUSINESS_CONFIG.shortName;
  });

  document.querySelectorAll('[data-business="tagline"]').forEach(el => {
    if (el.classList.contains('hero-subtext')) {
      el.textContent = `${BUSINESS_CONFIG.tagline} Professional plumbing across Dharamshala with certified technicians and upfront pricing.`;
    } else {
      el.textContent = BUSINESS_CONFIG.tagline;
    }
  });

  document.querySelectorAll('[data-business="location"], [data-business="address"]').forEach(el => {
    el.textContent = BUSINESS_CONFIG.location;
  });

  document.querySelectorAll('[data-business="phone"]').forEach(el => {
    el.textContent = BUSINESS_CONFIG.phone;
  });

  document.querySelectorAll('[data-business="email"]').forEach(el => {
    el.textContent = BUSINESS_CONFIG.email;
  });

  document.querySelectorAll('[data-business="hours"]').forEach(el => {
    el.textContent = BUSINESS_CONFIG.hours;
  });

  // Update Link Attributes
  document.querySelectorAll('[data-business-link="phone"]').forEach(el => {
    el.setAttribute('href', `tel:${BUSINESS_CONFIG.phoneRaw}`);
  });

  document.querySelectorAll('[data-business-link="whatsapp"]').forEach(el => {
    el.setAttribute('href', BUSINESS_CONFIG.whatsappUrl);
  });

  document.querySelectorAll('[data-business-link="email"]').forEach(el => {
    el.setAttribute('href', `mailto:${BUSINESS_CONFIG.email}`);
  });

  // Dynamic copyright year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// ============================================================================
// 3. ANIMATED COUNT-UP FOR HIGHLIGHT NUMBERS (INTERSECTION OBSERVER)
// Respects prefers-reduced-motion
// ============================================================================
function initCountUp() {
  const statElements = document.querySelectorAll('[data-count]');
  if (!statElements.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetValue = parseFloat(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        
        if (prefersReducedMotion) {
          el.textContent = (decimals > 0 ? targetValue.toFixed(decimals) : Math.round(targetValue)) + suffix;
        } else {
          animateNumber(el, targetValue, decimals, suffix, 1500);
        }
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  statElements.forEach(el => observer.observe(el));
}

function animateNumber(element, target, decimals, suffix, duration) {
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Smooth ease-out cubic curve
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentVal = target * easeOut;
    
    element.textContent = (decimals > 0 ? currentVal.toFixed(decimals) : Math.round(currentVal)) + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = (decimals > 0 ? target.toFixed(decimals) : Math.round(target)) + suffix;
    }
  }
  requestAnimationFrame(update);
}

// ============================================================================
// 4. NAVBAR SCROLL BLUR / SOLID BACKGROUND EFFECT
// ============================================================================
function initNavbarScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ============================================================================
// 5. MOBILE NAVIGATION MENU (HAMBURGER)
// ============================================================================
function initMobileNavigation() {
  const hamburgerBtn = document.getElementById('hamburger-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-call-btn');

  if (!hamburgerBtn || !mobileMenu) return;

  function toggleMenu(isOpen) {
    hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    mobileMenu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    if (isOpen) {
      mobileMenu.classList.add('open');
    } else {
      mobileMenu.classList.remove('open');
    }
  }

  hamburgerBtn.addEventListener('click', () => {
    const isOpen = hamburgerBtn.getAttribute('aria-expanded') === 'true';
    toggleMenu(!isOpen);
  });

  // Close when clicking any nav link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMenu(false);
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (
      !mobileMenu.contains(e.target) &&
      !hamburgerBtn.contains(e.target) &&
      mobileMenu.classList.contains('open')
    ) {
      toggleMenu(false);
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      toggleMenu(false);
      hamburgerBtn.focus();
    }
  });
}

// ============================================================================
// 6. CONTACT ENQUIRY FORM HANDLER
// Validates inputs and shows "Thanks, we will call you soon" message
// ============================================================================
function initContactForm() {
  const form = document.getElementById('enquiry-form');
  const successBanner = document.getElementById('form-success-banner');
  const submitBtn = document.getElementById('submit-btn');

  if (!form || !successBanner) return;

  const nameInput = document.getElementById('form-name');
  const phoneInput = document.getElementById('form-phone');
  const problemInput = document.getElementById('form-problem');

  // Clear errors on typing
  [nameInput, phoneInput, problemInput].forEach(input => {
    if (!input) return;
    input.addEventListener('input', () => {
      input.closest('.form-group').classList.remove('has-error');
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Name
    if (!nameInput.value.trim()) {
      nameInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    } else {
      nameInput.closest('.form-group').classList.remove('has-error');
    }

    // Validate Phone (At least 8 digits)
    const phoneClean = phoneInput.value.replace(/[^0-9]/g, '');
    if (!phoneInput.value.trim() || phoneClean.length < 8) {
      phoneInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    } else {
      phoneInput.closest('.form-group').classList.remove('has-error');
    }

    // Validate Problem Description
    if (!problemInput.value.trim()) {
      problemInput.closest('.form-group').classList.add('has-error');
      isValid = false;
    } else {
      problemInput.closest('.form-group').classList.remove('has-error');
    }

    if (!isValid) return;

    // Show sending state
    submitBtn.disabled = true;
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending Enquiry...</span>';

    setTimeout(() => {
      // Reveal Success Banner
      successBanner.hidden = false;
      successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Reset form fields
      form.reset();

      // Reset button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
    }, 400);
  });
}

// ============================================================================
// 7. ACTIVE NAVIGATION ON SCROLL (SCROLLSPY)
// Updates active class in desktop navbar based on current scroll position
// ============================================================================
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], header[id="hero"]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  function updateActiveLink() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const headerOffset = 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerOffset;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
}

// ============================================================================
// 8. INITIALIZATION
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  applyBusinessSettings();
  initCountUp();
  initNavbarScroll();
  initMobileNavigation();
  initContactForm();
  initScrollSpy();
});
