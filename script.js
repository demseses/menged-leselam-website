// script.js

// Wait for DOM to load
window.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.navbar');
    const headerHeight = header.offsetHeight;
  
    /* SMOOTH SCROLL WITH HEADER OFFSET */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      });
    });
  
    /* SCROLLSPY: HIGHLIGHT ACTIVE NAV LINKS */
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const spyOptions = { rootMargin: `-50% 0px -50% 0px`, threshold: 0 };
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove('active'));
          activeLink.classList.add('active');
        }
      });
    }, spyOptions);
    sections.forEach(section => spyObserver.observe(section));
  
    /* REVEAL ANIMATIONS ON SCROLL */
    const revealElements = document.querySelectorAll('[data-animate]');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const effect = el.getAttribute('data-animate');
          el.classList.add('animate__animated', `animate__${effect}`);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.2 });
    revealElements.forEach(el => revealObserver.observe(el));
  
    /* HAMBURGER MENU TOGGLE */
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
      hamburger.classList.toggle('open');
    });
  });
  