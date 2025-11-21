// main.js (updated)
// ---------------------------
// Unified Navbar, Dark Mode, Offer Tag, Carousel, Feature Modal
// ---------------------------

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Helpers ----------
  const qs = (sel, ctx = document) => ctx.querySelector(sel);
  const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // ---------- NAVBAR: Hamburger + Active Link ----------
  const hamburger = qs('#hamburger');
  // navLinks may be an UL with id navLinks or a .nav-center ul
  const navList = qs('#navLinks') || qs('.nav-center ul') || qs('.nav-links');

  if (hamburger && navList) {
    hamburger.addEventListener('click', () => {
      navList.classList.toggle('show');
      // animate hamburger (optional): toggle a class for CSS animation
      hamburger.classList.toggle('open');
    });

    // Close mobile menu when clicking any link inside
    navList.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        navList.classList.remove('show');
      }
    });
  }

  // Set active nav link based on current page
  (function setActiveNavLink() {
    const links = qsa('a.nav-btn, .nav-links a, #navLinks a');
    const path = location.pathname.split('/').pop() || 'index.html';
    links.forEach(a => {
      // remove previous active classes
      a.classList.remove('active');
      const href = a.getAttribute('href') || '';
      if (href === path || (href === 'index.html' && path === '')) {
        a.classList.add('active');
      }
    });
  })();

  // ---------- DARK MODE (persisted) ----------
  const dmToggle = qs('#darkModeToggle');
  const body = document.body;

  function applyDarkClass(dark) {
    // support both 'dark' (new) and 'dark-mode' (old) classes for compatibility
    if (dark) {
      body.classList.add('dark');
      body.classList.add('dark-mode');
      if (dmToggle) dmToggle.textContent = '☀️';
    } else {
      body.classList.remove('dark');
      body.classList.remove('dark-mode');
      if (dmToggle) dmToggle.textContent = '🌙';
    }
  }

  // Load saved theme
  const savedTheme = localStorage.getItem('lbv-theme');
  if (savedTheme === 'dark') applyDarkClass(true);
  else applyDarkClass(false);

  if (dmToggle) {
    dmToggle.addEventListener('click', () => {
      const isDark = body.classList.contains('dark') || body.classList.contains('dark-mode');
      applyDarkClass(!isDark);
      localStorage.setItem('lbv-theme', !isDark ? 'dark' : 'light');
    });
  }

  // ---------- OFFER TAG (Compact + Animated + Tooltip) ----------
  // expects: <div id="offerTag"><span id="timer">...</span></div>
  const offerTag = qs('#offerTag');
  const offerTimerEl = qs('#timer');

  // Set your actual offer end time here (UTC or local)
  // Example: 2 days from now (for demo), replace with real end datetime if needed
  const offerEndDate = new Date();
  offerEndDate.setDate(offerEndDate.getDate() + 2);

  let offerInterval = null;

  function formatCountdown(diffMs) {
    if (diffMs <= 0) return '00:00:00';
    const total = Math.floor(diffMs / 1000);
    const hrs = Math.floor(total / 3600);
    const mins = Math.floor((total % 3600) / 60);
    const secs = total % 60;
    return `${String(hrs).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
  }

  function updateOfferTimer() {
    if (!offerTimerEl) return;
    const now = new Date();
    const diff = offerEndDate - now;
    if (diff <= 0) {
      offerTimerEl.textContent = 'Offer Ended';
      clearInterval(offerInterval);
      return;
    }
    offerTimerEl.textContent = formatCountdown(diff);
  }

  if (offerTimerEl) {
    updateOfferTimer();
    offerInterval = setInterval(updateOfferTimer, 1000);
  }

  // Tooltip / details when clicking offerTag
  // We'll create a lightweight tooltip/modal when clicked
  let offerDetailEl = null;
  function createOfferDetail() {
    if (offerDetailEl) return;
    offerDetailEl = document.createElement('div');
    offerDetailEl.id = 'offerDetail';
    offerDetailEl.style.position = 'fixed';
    offerDetailEl.style.right = '18px';
    offerDetailEl.style.top = '70px';
    offerDetailEl.style.background = body.classList.contains('dark') ? '#222' : '#fff';
    offerDetailEl.style.color = body.classList.contains('dark') ? '#fff' : '#222';
    offerDetailEl.style.border = '1px solid rgba(0,0,0,0.08)';
    offerDetailEl.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
    offerDetailEl.style.borderRadius = '10px';
    offerDetailEl.style.padding = '12px 14px';
    offerDetailEl.style.zIndex = 1500;
    offerDetailEl.style.minWidth = '220px';
    offerDetailEl.innerHTML = `
      <strong>Today's Special</strong>
      <p style="margin:8px 0 0; font-size:14px;">20% off on Margherita & Pepperoni Pizzas. Valid for dine-in & takeaway.</p>
      <small style="opacity:0.8; display:block; margin-top:8px;">Click outside to close</small>
    `;
    document.body.appendChild(offerDetailEl);
    // close when clicking outside
    setTimeout(() => {
      document.addEventListener('click', offerOutsideClick);
    }, 0);
  }
  function offerOutsideClick(e) {
    if (!offerDetailEl) return;
    if (!offerDetailEl.contains(e.target) && !offerTag.contains(e.target)) {
      offerDetailEl.remove();
      offerDetailEl = null;
      document.removeEventListener('click', offerOutsideClick);
    }
  }

  if (offerTag) {
    offerTag.addEventListener('click', (e) => {
      e.stopPropagation();
      if (offerDetailEl) {
        offerDetailEl.remove();
        offerDetailEl = null;
        document.removeEventListener('click', offerOutsideClick);
      } else {
        createOfferDetail();
      }
    });
  }

  // Update offerDetail theme on theme change
  function refreshOfferDetailTheme() {
    if (!offerDetailEl) return;
    offerDetailEl.style.background = body.classList.contains('dark') ? '#222' : '#fff';
    offerDetailEl.style.color = body.classList.contains('dark') ? '#fff' : '#222';
  }
  // hook theme changes
  const themeObserver = new MutationObserver(refreshOfferDetailTheme);
  themeObserver.observe(body, { attributes: true, attributeFilter: ['class'] });

  // ---------- FEATURED DISHES CAROUSEL (featured || chefRecommended) ----------
  (function renderFeaturedCarousel() {
    const carousel = qs('#homeCarousel');
    if (!carousel) return;

    fetch('json/menu.json')
      .then(res => res.json())
      .then(data => {
        const items = Array.isArray(data.menuItems) ? data.menuItems : [];
        const featured = items.filter(it => it.featured || it.chefRecommended);

        // if none, fallback to first few items
        const toRender = featured.length ? featured : items.slice(0, 6);

        toRender.forEach(item => {
          const figure = document.createElement('figure');
          figure.className = 'carousel-card';
          const badges = [];
          if (item.chefRecommended) badges.push('<span class="badge chef-badge">Chef\'s Rec</span>');
          if (item.dishOfTheDay) badges.push('<span class="badge dish-badge">Dish of the Day</span>');
          if (item.special && item.offer) badges.push(`<span class="badge offer-badge">${item.offer}</span>`);

          figure.innerHTML = `
            <div class="carousel-img-wrap">
              <img src="${item.image}" alt="${item.name}">
              ${badges.join(' ')}
            </div>
            <figcaption>${item.name} — ${item.price}</figcaption>
          `;
          carousel.appendChild(figure);
        });

        // clone for smooth scroll only if enough children
        if (carousel.children.length > 1) {
          const clones = Array.from(carousel.children).map(f => f.cloneNode(true));
          clones.forEach(c => carousel.appendChild(c));
        }

        // Auto-scroll logic
        let pos = 0;
        const step = 0.4;
        function autoScroll() {
          // prevent extremely fast scroll if width is small
          pos += step;
          if (pos >= carousel.scrollWidth / 2) pos = 0;
          carousel.scrollLeft = pos;
        }
        const scI = setInterval(autoScroll, 25);
        // stop interval if user interacts
        carousel.addEventListener('wheel', () => clearInterval(scI), { passive: true });
      })
      .catch(err => console.error('Error loading featured dishes:', err));
  })();

  // ---------- FEATURES (dynamic rendering) ----------
  (function renderFeatures() {
    const featureList = qs('#featureList');
    if (!featureList) return;

    fetch('json/features.json')
      .then(res => res.json())
      .then(data => {
        const arr = Array.isArray(data.features) ? data.features : [];
        arr.forEach(feature => {
          const li = document.createElement('li');
          li.className = 'feature-item';
          li.innerHTML = `
            <img src="${feature.image}" alt="${feature.name}" style="width:100%; border-radius:8px; display:block; margin-bottom:10px;">
            <h4>${feature.name}</h4>
            <p style="opacity:0.85;">${feature.description}</p>
          `;

          // click -> open modal
          li.addEventListener('click', () => openFeatureModal(feature));
          featureList.appendChild(li);
        });
      })
      .catch(err => console.error('Error loading features:', err));
  })();

  // ---------- FEATURE MODAL (improved) ----------
  const featureModal = qs('#featureModal');
  const modalImg = qs('#modalImage');
  const modalTitle = qs('#modalTitle');
  const modalDesc = qs('#modalDesc');
  const modalCloseBtn = qs('.feature-modal .close') || qs('.modal-content .close');

  function openFeatureModal(feature) {
    if (!featureModal) return;
    if (modalImg) modalImg.src = feature.image || '';
    if (modalTitle) modalTitle.textContent = feature.name || '';
    if (modalDesc) modalDesc.textContent = feature.description || '';
    featureModal.classList.add('active');
    featureModal.setAttribute('aria-hidden', 'false');
    // focus to close button for accessibility
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  function closeFeatureModal() {
    if (!featureModal) return;
    featureModal.classList.remove('active');
    featureModal.setAttribute('aria-hidden', 'true');
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeFeatureModal);
  // click outside to close
  if (featureModal) {
    featureModal.addEventListener('click', (e) => {
      if (e.target === featureModal) closeFeatureModal();
    });
  }
  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeFeatureModal();
    }
  });

  // ---------- SAFETY: ensure other existing code won't throw errors ----------
  // (This is a placeholder to hook other scripts if needed)
  window.LBV = window.LBV || {};
  window.LBV.refreshOfferDetailTheme = refreshOfferDetailTheme;

  // Done
  console.log('main.js loaded: navbar, dark-mode, offer-tag, carousel, and feature modal initialized.');
});
