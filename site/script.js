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

  function getSiteRootPrefix() {
    var path = window.location.pathname.replace(/\/$/, '/index.html');
    var parts = path.replace(/^\//, '').split('/');
    return parts.length > 1 ? '../'.repeat(parts.length - 1) : '';
  }

  function renderSiteChrome() {
    var root = getSiteRootPrefix();
    var header = document.querySelector('[data-site-header]');
    var footer = document.querySelector('[data-site-footer]');

    if (header) {
      header.outerHTML = '' +
        '<header class="site-header">' +
          '<div class="container">' +
            '<a href="' + root + 'index.html" class="site-logo">Veritas</a>' +
            '<nav class="site-nav" aria-label="Main navigation">' +
              '<a href="' + root + 'study/index.html" data-section="study">Study</a>' +
              '<a href="' + root + 'principles/index.html" data-section="principles">Principles</a>' +
              '<a href="' + root + 'essays/index.html" data-section="essays">Essays</a>' +
              '<a href="' + root + 'books/index.html" data-section="books">Books</a>' +
              '<a href="' + root + 'videos/index.html" data-section="videos">Videos</a>' +
              '<a href="' + root + 'events/index.html" data-section="events">Events</a>' +
              '<a href="' + root + 'about.html" data-section="about">About</a>' +
              '<span class="nav-spacer"></span>' +
            '</nav>' +
            '<button class="theme-toggle" aria-label="Switch to dark mode">' +
              '<svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="display:none"><path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm0-16a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V4a1 1 0 0 1 1-1zm9 8a1 1 0 0 1-1 1h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1zM4 12a1 1 0 0 1-1 1H2a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1zm14.95 5.364a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 1 1 1.414-1.414l.707.707zM6.757 7.05A1 1 0 0 1 5.343 5.636l.707-.707A1 1 0 1 1 7.464 6.34l-.707.707zm11.193 0-.707-.707a1 1 0 1 1 1.414-1.414l.707.707A1 1 0 0 1 17.95 7.05zM5.343 18.364 6.05 17.657a1 1 0 1 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414-1.414z"/></svg>' +
              '<svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/></svg>' +
            '</button>' +
            '<button class="nav-hamburger" aria-label="Open menu" aria-expanded="false">' +
              '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>' +
            '</button>' +
          '</div>' +
        '</header>';
    }

    if (footer) {
      footer.outerHTML = '' +
        '<footer class="site-footer">' +
          '<div class="container">' +
            '<span>© 2026 Veritas. All rights reserved.</span>' +
            '<nav class="footer-links" aria-label="Footer navigation">' +
              '<a href="' + root + 'about.html">About</a>' +
              '<a href="' + root + 'essays/index.html">Essays</a>' +
              '<a href="' + root + 'study/index.html">Study</a>' +
            '</nav>' +
          '</div>' +
        '</footer>';
    }
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

  function renderPrincipleCards(target, principlesById, contributions, rootPrefix) {
    target.replaceChildren();
    contributions.forEach(function (contribution) {
      var principle = principlesById && principlesById[contribution.id];
      if (!principle) return;

      var card = document.createElement('article');
      card.className = 'principle-card';

      var heading = document.createElement('h3');
      var titleLink = document.createElement('a');
      titleLink.href = (rootPrefix || '') + 'principles/index.html#' + contribution.id;
      titleLink.textContent = principle.title;
      heading.appendChild(titleLink);
      card.appendChild(heading);

      card.appendChild(createTextElement('p', 'principle-contribution', contribution.text));

      var readMore = document.createElement('a');
      readMore.href = (rootPrefix || '') + 'principles/index.html#' + contribution.id;
      readMore.className = 'principle-read-more';
      readMore.textContent = 'See all examples across Scripture →';
      card.appendChild(readMore);

      target.appendChild(card);
    });
  }

  function renderContextCards(target, items) {
    if (!target) return;
    target.replaceChildren();

    if (!items || !items.length) {
      target.appendChild(createTextElement('p', 'context-empty', 'No difficult passages have been worked through for this book yet. They will be added here as the study continues.'));
      return;
    }

    items.forEach(function (item) {
      var card = document.createElement('article');
      card.className = 'context-card';
      card.appendChild(createTextElement('h3', '', item.title));

      function addBlock(label, text) {
        if (!text) return;
        card.appendChild(createTextElement('p', 'context-label', label));
        if (Array.isArray(text)) {
          text.forEach(function (para) {
            card.appendChild(createTextElement('p', 'context-text', para));
          });
        } else {
          card.appendChild(createTextElement('p', 'context-text', text));
        }
      }

      addBlock('The surface problem', item.problem);
      addBlock('The proper context', item.context);
      addBlock('What this shows about God', item.shows);
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

  function setActiveArticleTab(tabName) {
    document.querySelectorAll('[data-article-tab]').forEach(function (tab) {
      var isActive = tab.getAttribute('data-article-tab') === tabName;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });

    document.querySelectorAll('[data-article-panel]').forEach(function (panel) {
      var isActive = panel.getAttribute('data-article-panel') === tabName;
      panel.classList.toggle('is-active', isActive);
      panel.hidden = !isActive;
    });
  }

  function setupArticleTabs() {
    document.querySelectorAll('[data-article-tab]').forEach(function (tab) {
      tab.addEventListener('click', function () {
        setActiveArticleTab(tab.getAttribute('data-article-tab'));
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
        renderPrincipleCards(document.querySelector('[data-book-principles]'), data.principles || {}, book.principles || [], getSiteRootPrefix());
        renderContextCards(document.querySelector('[data-book-context]'), book.context || []);

        var principlesLink = document.querySelector('[data-book-principles-link]');
        if (principlesLink) {
          principlesLink.href = getSiteRootPrefix() + 'principles/index.html?book=' + bookSlug;
        }
      })
      .catch(function () {
        renderMissingBook(bookSlug);
      });
  }

  function renderPrinciplesList(target, principles, books, focusSlug, rootPrefix) {
    target.replaceChildren();
    Object.keys(principles).forEach(function (id, index) {
      var principle = principles[id];

      var entry = document.createElement('details');
      entry.className = 'principle-entry';
      entry.id = id;

      var summary = document.createElement('summary');
      summary.className = 'principle-entry-summary';
      summary.appendChild(createTextElement('span', 'principle-entry-number', (index + 1) + '.'));
      summary.appendChild(createTextElement('span', 'principle-entry-title', principle.title));
      entry.appendChild(summary);

      var body = document.createElement('div');
      body.className = 'principle-entry-body';
      if (Array.isArray(principle.text)) {
        principle.text.forEach(function (para) {
          body.appendChild(createTextElement('p', 'principle-entry-text', para));
        });
      } else {
        body.appendChild(createTextElement('p', 'principle-entry-text', principle.text));
      }

      var appliesToFocus = false;

      if (principle.examples && principle.examples.length) {
        body.appendChild(createTextElement('p', 'principle-examples-label', 'Where this is seen in Scripture'));

        var list = document.createElement('ul');
        list.className = 'principle-examples';

        principle.examples.forEach(function (example) {
          var item = document.createElement('li');
          item.className = 'principle-example';

          var slug = slugifyBookName(example.book);
          var hasStudy = books && books[slug];

          if (hasStudy) {
            var anchor = document.createElement('a');
            anchor.href = (rootPrefix || '') + 'study/book.html?book=' + slug;
            anchor.className = 'principle-example-book';
            anchor.textContent = example.book;
            item.appendChild(anchor);
          } else {
            item.appendChild(createTextElement('span', 'principle-example-book', example.book));
          }

          item.appendChild(createTextElement('p', 'principle-example-text', example.text));

          if (focusSlug && slug === focusSlug) {
            item.classList.add('is-focus-book');
            appliesToFocus = true;
          }

          list.appendChild(item);
        });

        body.appendChild(list);
      }

      entry.appendChild(body);

      if (focusSlug && appliesToFocus) {
        entry.open = true;
        entry.classList.add('is-focus');
      }

      target.appendChild(entry);
    });
  }

  function setupPrinciplesPage() {
    var list = document.querySelector('[data-principles-list]');
    if (!list) return;

    var rootPrefix = getSiteRootPrefix();
    var params = new URLSearchParams(window.location.search);
    var focusSlug = slugifyBookName(params.get('book'));

    fetch('../data/book-studies.json')
      .then(function (response) {
        if (!response.ok) throw new Error('Could not load principles data.');
        return response.json();
      })
      .then(function (data) {
        renderPrinciplesList(list, data.principles || {}, data.books || {}, focusSlug, rootPrefix);

        var banner = document.querySelector('[data-principles-focus]');
        if (banner && focusSlug && data.books && data.books[focusSlug]) {
          banner.textContent = 'Highlighting the principles that ' + data.books[focusSlug].title + ' helps to demonstrate.';
          banner.hidden = false;
        }

        if (window.location.hash) {
          var target = document.getElementById(window.location.hash.slice(1));
          if (target && target.tagName === 'DETAILS') {
            target.open = true;
            target.scrollIntoView();
          }
        }
      })
      .catch(function () {
        list.replaceChildren();
        list.appendChild(createTextElement('p', '', 'The principles could not be loaded. Please try again later.'));
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderSiteChrome();

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
      var section = link.getAttribute('data-section');
      if ((section === 'about' && path.endsWith('/about.html')) || (section !== 'about' && path.indexOf('/' + section + '/') !== -1)) {
        link.setAttribute('aria-current', 'page');
      }
    });

    setupBookDetailPage();
    setupPrinciplesPage();
    setupArticleTabs();
  });
})();
