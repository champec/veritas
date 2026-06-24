/* ============================================================
   Veritas — script.js
   ============================================================ */

(function () {
  'use strict';

  // --- Theme toggle ----------------------------------------
  const STORAGE_KEY = 'veritas-theme';

  function getPreferred() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.querySelector('.icon-sun').style.display  = theme === 'dark'  ? 'block' : 'none';
      btn.querySelector('.icon-moon').style.display = theme === 'light' ? 'block' : 'none';
    });
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Apply saved / preferred theme immediately
    applyTheme(getPreferred());

    // Wire up every toggle button on the page
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.addEventListener('click', toggleTheme);
    });

    // Mobile nav (simple show/hide)
    var hamburger = document.querySelector('.nav-hamburger');
    var nav = document.querySelector('.site-nav');
    if (hamburger && nav) {
      hamburger.addEventListener('click', function () {
        var open = nav.classList.toggle('nav-open');
        hamburger.setAttribute('aria-expanded', String(open));
      });
    }

    // Mark current page link active
    var path = window.location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('.site-nav a').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;
      // Normalise: strip trailing slash
      var normHref = href.replace(/\/$/, '') || '/';
      if (normHref === path || (normHref !== '' && path.startsWith(normHref))) {
        link.setAttribute('aria-current', 'page');
      }
    });
  });
})();
