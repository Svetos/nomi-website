// Nomi website: mobile menu, dropdowns, language memory, reveal animations, gallery lightbox.
(function () {
  var doc = document.documentElement;
  var body = document.body;

  // Header shadow once the page scrolls.
  var header = document.querySelector('.site-header');
  var onScroll = function () { if (header) header.classList.toggle('scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu.
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = !body.classList.contains('nav-open');
      body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('.sr-only').textContent = open ? toggle.dataset.labelClose : toggle.dataset.labelOpen;
    });
  }

  // Dropdown groups (click/tap; hover is handled in CSS on desktop).
  var groups = Array.prototype.slice.call(document.querySelectorAll('.has-sub'));
  var closeAll = function (except) {
    groups.forEach(function (g) {
      if (g === except) return;
      g.classList.remove('open');
      g.querySelector('.sub-toggle').setAttribute('aria-expanded', 'false');
    });
  };
  groups.forEach(function (g) {
    var btn = g.querySelector('.sub-toggle');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = !g.classList.contains('open');
      closeAll(g);
      g.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-sub')) closeAll();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    closeAll();
    if (body.classList.contains('nav-open') && toggle) toggle.click();
  });

  // Remember the chosen language for the next visit to the root address.
  document.querySelectorAll('.lang-switch a').forEach(function (a) {
    a.addEventListener('click', function () {
      try { localStorage.setItem('nomi-lang', a.dataset.lang); } catch (e) {}
    });
  });
  try {
    var current = doc.getAttribute('lang');
    if (current) localStorage.setItem('nomi-lang', current);
  } catch (e) {}

  // Gentle reveal on scroll.
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Gallery lightbox.
  var box = document.querySelector('.lightbox');
  var thumbs = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
  if (box && thumbs.length && box.showModal) {
    var img = box.querySelector('img');
    var index = 0;
    var show = function (i) {
      index = (i + thumbs.length) % thumbs.length;
      img.src = thumbs[index].dataset.full;
      img.alt = thumbs[index].dataset.alt || '';
    };
    thumbs.forEach(function (t, i) {
      t.addEventListener('click', function () { show(i); box.showModal(); });
    });
    box.addEventListener('click', function (e) {
      var action = e.target.closest('[data-lb]');
      if (action) {
        var a = action.dataset.lb;
        if (a === 'close') box.close();
        if (a === 'prev') show(index - 1);
        if (a === 'next') show(index + 1);
      } else if (e.target === box) {
        box.close();
      }
    });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });
  }
})();
