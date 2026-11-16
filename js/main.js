/* ==========================================================================
   INF2501 Portfolio — Core Interactions (js/main.js)
   Handles: Mobile Nav, Dropdown Toggle, Active URL Highlight,
            Copy-to-Clipboard (.copy-btn), Image Lightbox (.figure-card img)
   ========================================================================== */

(function () {
  'use strict';

  function getCurrentPageName() {
    var path = window.location.pathname || '';
    var file = path.split('/').pop();
    if (!file || file === '/') return 'index.html';
    return file.toLowerCase();
  }

  /* 1. Active Menu Highlighting */
  function initActiveNav() {
    var currentFile = getCurrentPageName();
    var navLinks = document.querySelectorAll('.site-nav a[href]');
    var isExercisePage = /^bai[1-6]\.html$/.test(currentFile);

    navLinks.forEach(function (link) {
      var href = (link.getAttribute('href') || '').split('#')[0].split('?')[0].toLowerCase();
      if (!href) return;
      if (href === currentFile) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });

    if (isExercisePage) {
      var projectsLink = document.querySelector('.nav-dropdown > .nav-link[href*="projects.html"]');
      if (projectsLink) {
        projectsLink.classList.add('active');
      }
    }
  }

  /* 2. Mobile Menu (#navToggle) & Dropdown (.dropdown-toggle) */
  function initNavigation() {
    var navToggle = document.getElementById('navToggle');
    var siteNav = document.getElementById('siteNav');
    var dropdowns = document.querySelectorAll('.nav-dropdown');

    function closeAllDropdowns() {
      dropdowns.forEach(function (dd) {
        dd.classList.remove('open');
        var btn = dd.querySelector('.dropdown-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }

    if (navToggle && siteNav) {
      navToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = siteNav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }

    dropdowns.forEach(function (dd) {
      var toggleBtn = dd.querySelector('.dropdown-toggle');
      if (!toggleBtn) return;

      toggleBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var willOpen = !dd.classList.contains('open');
        closeAllDropdowns();
        if (willOpen) {
          dd.classList.add('open');
          toggleBtn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-dropdown')) {
        closeAllDropdowns();
      }
      if (siteNav && navToggle && !e.target.closest('.site-nav') && !e.target.closest('#navToggle')) {
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeAllDropdowns();
        if (siteNav && navToggle) {
          siteNav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  /* 3. Copy-to-Clipboard (.copy-btn) */
  function fallbackCopy(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    var ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (err) {
      ok = false;
    }
    document.body.removeChild(textarea);
    return ok;
  }

  function extractCopyText(btn) {
    var targetSelector = btn.getAttribute('data-copy-target');
    if (targetSelector) {
      var targetEl = document.querySelector(targetSelector);
      if (targetEl) return targetEl.innerText.trim();
    }
    var rawText = btn.getAttribute('data-copy-text');
    if (rawText) return rawText;

    var container = btn.closest('.code-block, .prompt-box, .copy-container');
    if (container) {
      var pre = container.querySelector('pre, code');
      if (pre) return pre.innerText.trim();
      var clone = container.cloneNode(true);
      clone.querySelectorAll('.copy-btn').forEach(function (b) { b.remove(); });
      return clone.innerText.trim();
    }
    return '';
  }

  function initCopyButtons() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.copy-btn');
      if (!btn) return;

      var text = extractCopyText(btn);
      if (!text) return;

      var originalLabel = btn.getAttribute('data-original-label') || btn.textContent;
      btn.setAttribute('data-original-label', originalLabel);

      function showCopied() {
        btn.textContent = 'Đã sao chép ✓';
        btn.classList.add('copied');
        window.setTimeout(function () {
          btn.textContent = originalLabel;
          btn.classList.remove('copied');
        }, 1800);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(showCopied).catch(function () {
          if (fallbackCopy(text)) showCopied();
        });
      } else {
        if (fallbackCopy(text)) showCopied();
      }
    });
  }

  /* 4. Lightbox for .figure-card img */
  function initLightbox() {
    var modal = document.querySelector('.lightbox-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'lightbox-modal';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-label', 'Xem ảnh phóng to');
      modal.innerHTML =
        '<div class="lightbox-content">' +
        '  <button type="button" class="lightbox-close" aria-label="Đóng ảnh">&times;</button>' +
        '  <img src="" alt="" />' +
        '  <div class="lightbox-caption"></div>' +
        '</div>';
      document.body.appendChild(modal);
    }

    var modalImg = modal.querySelector('img');
    var modalCaption = modal.querySelector('.lightbox-caption');
    var closeBtn = modal.querySelector('.lightbox-close');

    function closeLightbox() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }

    function openLightbox(src, alt, caption) {
      if (!src) return;
      modalImg.src = src;
      modalImg.alt = alt || caption || 'Ảnh minh họa phóng to';
      modalCaption.textContent = caption || alt || '';
      modalCaption.style.display = modalCaption.textContent ? 'block' : 'none';
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    document.addEventListener('click', function (e) {
      var img = e.target.closest('.figure-card img, img[data-lightbox]');
      if (!img) return;
      var figure = img.closest('.figure-card');
      var capEl = figure ? figure.querySelector('.figure-caption, figcaption') : null;
      var capText = capEl ? capEl.innerText.trim() : img.getAttribute('alt') || '';
      openLightbox(img.currentSrc || img.getAttribute('src'), img.getAttribute('alt'), capText);
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeLightbox);
    }

    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initActiveNav();
    initNavigation();
    initCopyButtons();
    initLightbox();
  });
})();
