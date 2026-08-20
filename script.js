/* ==========================================================================
   Prashanth Paul — Portfolio JS
   ========================================================================== */

(function () {
    'use strict';

    // --- Fresh-visit scroll reset ---
    // If the URL has #portfolio but the visitor is NOT coming back from a
    // sub-page (i.e. it's a direct/external link), strip the hash and show
    // the hero section instead of jumping straight to the portfolio grid.
    if (window.location.hash === '#portfolio') {
        var referrer = document.referrer;
        var fromSubPage = referrer && referrer.indexOf('/my-portfolio/portfolio/') !== -1;
        if (!fromSubPage) {
            history.replaceState(null, null, window.location.pathname);
            window.scrollTo(0, 0);
        }
    }

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme');

    // Apply saved theme on load
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';

        if (next === 'dark') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', next);
        }

        localStorage.setItem('theme', next);
    });

    // --- Scroll Reveal ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );
    revealElements.forEach((el) => revealObserver.observe(el));

    // --- Nav background on scroll ---
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
    });

    // --- Mobile menu toggle ---
    const toggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.getElementById('mobileMenu');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        mobileMenu.classList.toggle('open');
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            mobileMenu.classList.remove('open');
        });
    });

    // --- Smooth scroll for all anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
})();
