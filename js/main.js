/* ═══════════════════════════════════════════════════
   Oluwakayode Onasanya — Portfolio
   js/main.js
   Developer: Portfolio Project 2026
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ──────────────────────────────────────────────
     1. CUSTOM CURSOR
  ────────────────────────────────────────────── */
  const cursor    = document.getElementById('cursor');
  const ring      = document.getElementById('cursorRing');

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    // Dot follows instantly
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';

    // Ring follows with lag
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Expand on interactive elements
  const interactiveEls = document.querySelectorAll(
    'a, button, .about-card, .skill-card, .interest-card, .edu-card, .exp-item'
  );
  interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('expand');
      ring.classList.add('expand');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('expand');
      ring.classList.remove('expand');
    });
  });


  /* ──────────────────────────────────────────────
     2. SCROLL REVEAL
  ────────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 90);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold:  0.08,
    rootMargin: '0px 0px -50px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ──────────────────────────────────────────────
     3. NAVBAR — SHRINK ON SCROLL
  ────────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.style.padding     = '0.9rem 5rem';
      navbar.style.borderBottomColor = 'rgba(255,255,255,0.1)';
    } else {
      navbar.style.padding     = '1.6rem 5rem';
      navbar.style.borderBottomColor = 'rgba(255,255,255,0.06)';
    }
  }, { passive: true });


  /* ──────────────────────────────────────────────
     4. NAVBAR — ACTIVE LINK HIGHLIGHT
  ────────────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 250) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href').replace('#', '');
      link.style.color = (href === current) ? '#f0ede8' : '';
    });
  }, { passive: true });


  /* ──────────────────────────────────────────────
     5. MOBILE MENU
  ────────────────────────────────────────────── */
  const mobileMenu  = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  window.openMobile = function () {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeMobile = function () {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  mobileClose.addEventListener('click', closeMobile);

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobile();
  });


  /* ──────────────────────────────────────────────
     6. SCROLL TO TOP BUTTON
  ────────────────────────────────────────────── */
  const scrollTopBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  // Expand cursor on hover
  scrollTopBtn.addEventListener('mouseenter', () => {
    cursor.classList.add('expand');
    ring.classList.add('expand');
  });
  scrollTopBtn.addEventListener('mouseleave', () => {
    cursor.classList.remove('expand');
    ring.classList.remove('expand');
  });

});
