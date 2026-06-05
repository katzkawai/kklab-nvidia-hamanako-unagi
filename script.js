(function () {
  'use strict';

  const header = document.querySelector('.header');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  const navList = document.querySelector('.nav-list');
  const navLinks = document.querySelectorAll('.nav-link:not(.cta-btn)');
  const fadeEls = document.querySelectorAll('.fade-in');

  // Header scroll effect
  let lastScrollY = window.scrollY;
  let ticking = false;

  function handleScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });

  handleScroll();

  // Mobile menu
  function initMobileMenu() {
    if (!navToggle || !nav || !navList) return;

    navToggle.addEventListener('click', function () {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      navToggle.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('active')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });
  }

  initMobileMenu();

  // Intersection Observer for fade-in
  function initFadeIn() {
    if (!('IntersectionObserver' in window)) {
      fadeEls.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  initFadeIn();
})();