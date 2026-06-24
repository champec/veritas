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

  function slugifyBookName(name) {
    return String(name || '')
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function createTextElement(tagName, className, text) {
    var element = document.createElement(tagName);
    if (className) element.className = className;
    element.textContent = text;
    return element;
  }

  function renderParagraphs(target, paragraphs) {
    target.replaceChildren();
    paragraphs.forEach(function (paragraph) {
      target.appendChild(createTextElement('p', '', paragraph));
    });
  }

  function renderCards(target, items, options) {
    target.replaceChildren();
    items.forEach(function (item) {
      var card = document.createElement('article');
      card.className = options.cardClass;
      if (item.highlightsCurrentBook) card.classList.add('is-current-book');

      if (item.kind) {
        card.appendChild(createTextElement('p', 'evidence-kind', item.kind));
      }

      if (item.title) {
        card.appendChild(createTextElement('h3', '', item.title));
      }

      card.appendChild(createTextElement('p', '', item.point || item.text));
      target.appendChild(card);
    });
  }

  function setActiveBookTab(tabName) {
    document.querySelectorAll('[data-book-tab]').forEach(function (tab) {
      var isActive = tab.getAttribute('data-book-tab') === tabName;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });

    document.querySelectorAll('[data-book-panel]').forEach(function (panel) {
      var isActive = panel.getAttribute('data-book-panel') === tabName;
      panel.classList.toggle('is-active', isActive);
      panel.hidden = !isActive;
    });
  }

  function setupBookTabs() {
    document.querySelectorAll('[data-book-tab]').forEach(function (tab) {
      tab.addEventListener('click', function () {
        setActiveBookTab(tab.getAttribute('data-book-tab'));
      });
    });
  }

  function renderMissingBook(bookSlug) {
    var title = document.querySelector('[data-book-title]');
    var subtitle = document.querySelector('[data-book-subtitle]');
    if (title) title.textContent = 'Study not available yet';
    if (subtitle) subtitle.textContent = bookSlug ? 'No polished site entry exists yet for this book.' : 'Choose a book from the Book-by-Book page.';
  }

  function setupBookDetailPage() {
    var detailRoot = document.querySelector('[data-book-detail]');
    if (!detailRoot) return;

    setupBookTabs();

    var params = new URLSearchParams(window.location.search);
    var bookSlug = slugifyBookName(params.get('book'));

    fetch('../data/book-studies.json')
      .then(function (response) {
        if (!response.ok) throw new Error('Could not load book study data.');
        return response.json();
      })
      .then(function (data) {
        var book = data.books && data.books[bookSlug];
        if (!book) {
          renderMissingBook(bookSlug);
          return;
        }

        document.title = book.title + ' Study — Veritas';
        document.querySelector('[data-book-title]').textContent = book.title;
        document.querySelector('[data-book-subtitle]').textContent = book.subtitle;
        renderParagraphs(document.querySelector('[data-book-summary]'), book.summary || []);
        renderCards(document.querySelector('[data-book-evidence]'), book.evidence || [], { cardClass: 'evidence-card' });
        renderCards(document.querySelector('[data-book-lessons]'), book.lessons || [], { cardClass: 'lesson-card' });
        renderCards(document.querySelector('[data-book-principles]'), book.principles || [], { cardClass: 'principle-card' });
      })
      .catch(function () {
        renderMissingBook(bookSlug);
      });
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

    setupBookDetailPage();
  });
})();
