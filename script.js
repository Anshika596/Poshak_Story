/* ============================================================
   POSHAK STORY — Main JavaScript (Enhanced)
   ============================================================ */

/* ── CUSTOM CURSOR ──────────────────────────────────────────── */
(function () {
  var dot  = document.querySelector('.cursor');
  var ring = document.querySelector('.cursor-follower');
  if (!dot || !ring) return;
  var mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', function (e) {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = 'translate(calc(' + mx + 'px - 50%), calc(' + my + 'px - 50%))';
  });
  (function animateRing() {
    rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
    ring.style.transform = 'translate(calc(' + rx + 'px - 50%), calc(' + ry + 'px - 50%))';
    requestAnimationFrame(animateRing);
  })();
  function bindHover() {
    document.querySelectorAll('a, button, .filter-chip, .product-card, .action-btn, input, select, textarea').forEach(function (el) {
      if (el._ph) return; el._ph = true;
      el.addEventListener('mouseenter', function () { dot.classList.add('hovered'); ring.classList.add('hovered'); });
      el.addEventListener('mouseleave', function () { dot.classList.remove('hovered'); ring.classList.remove('hovered'); });
    });
  }
  bindHover(); setInterval(bindHover, 800);
  document.addEventListener('mousedown', function () { dot.classList.add('clicking'); ring.classList.add('clicking'); });
  document.addEventListener('mouseup',   function () { dot.classList.remove('clicking'); ring.classList.remove('clicking'); });
})();

/* ── CART ─────────────────────────────────────────────────── */
function getCart() {
  try { return JSON.parse(localStorage.getItem('poshak_cart')) || []; } catch(e) { return []; }
}
function saveCart(cart) {
  localStorage.setItem('poshak_cart', JSON.stringify(cart));
  updateCartCount();
}
function updateCartCount() {
  var n = getCart().length;
  document.querySelectorAll('.cart-count').forEach(function (el) {
    el.textContent = n || '';
    el.style.display = n > 0 ? 'flex' : 'none';
  });
}
function addToCart(name, price, btn) {
  var cart = getCart();
  cart.push({ name: name, price: price, id: Date.now() });
  saveCart(cart);
  showToast(name + ' added to cart!');
  if (btn) {
    btn.classList.add('added');
    btn.innerHTML = '&#10003; Added to Cart';
    setTimeout(function () {
      btn.classList.remove('added');
      btn.innerHTML = '&#128722; &nbsp;Add to Cart';
    }, 2200);
  }
}

/* ── ORDERS ─────────────────────────────────────────────────── */
function getOrders() {
  try { return JSON.parse(localStorage.getItem('poshak_orders')) || []; } catch(e) { return []; }
}
function saveOrders(orders) {
  localStorage.setItem('poshak_orders', JSON.stringify(orders));
}

/* ── TOAST ─────────────────────────────────────────────────── */
function showToast(msg, type) {
  var t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast'; t.className = 'toast';
    t.innerHTML = '<span class="toast-icon">&#128717;</span><div><strong id="toast-msg"></strong></div>';
    document.body.appendChild(t);
  }
  document.getElementById('toast-msg').textContent = msg;
  var colors = { error: '#c1121f', success: '#218838', info: '#c9a84c' };
  t.style.borderLeftColor = colors[type] || '#c9a84c';
  t.classList.add('show');
  clearTimeout(window._tt);
  window._tt = setTimeout(function () { t.classList.remove('show'); }, 3200);
}

/* ── SCROLL TOP ────────────────────────────────────────────── */
window.addEventListener('scroll', function () {
  var b = document.querySelector('.scroll-top');
  if (b) { b.classList.toggle('visible', window.scrollY > 400); }
});
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

/* ══════════════════════════════════════════════════════════════
   IMAGE ZOOM LIGHTBOX — Pixel-perfect, no quality loss
   Click product image → full-screen zoom overlay
   Click image again → toggle 2.4x zoom
   Scroll wheel → smooth scale from 1x–4x
   ESC or backdrop click → close
   ══════════════════════════════════════════════════════════════ */
function initImageZoom() {
  if (!document.getElementById('ps-lightbox')) {
    var lb = document.createElement('div');
    lb.id = 'ps-lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-label', 'Product zoom view');
    lb.innerHTML =
      '<div class="ps-lb-backdrop"></div>' +
      '<div class="ps-lb-inner">' +
        '<button class="ps-lb-close" title="Close (ESC)">&#10005;</button>' +
        '<div class="ps-lb-img-wrap">' +
          '<img class="ps-lb-img" src="" alt="Product zoom" draggable="false">' +
        '</div>' +
        '<div class="ps-lb-hint">Click image to zoom &bull; Scroll to adjust &bull; ESC to close</div>' +
      '</div>';
    document.body.appendChild(lb);

    var style = document.createElement('style');
    style.textContent = [
      '#ps-lightbox{display:none;position:fixed;inset:0;z-index:999990;align-items:center;justify-content:center;flex-direction:column;}',
      '#ps-lightbox.open{display:flex;animation:lbIn .22s ease;}',
      '@keyframes lbIn{from{opacity:0}to{opacity:1}}',
      '.ps-lb-backdrop{position:absolute;inset:0;background:rgba(8,3,0,.93);backdrop-filter:blur(8px);}',
      '.ps-lb-inner{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:14px;max-width:92vw;max-height:92vh;}',
      '.ps-lb-close{position:absolute;top:-46px;right:0;background:rgba(255,255,255,.1);border:1.5px solid rgba(255,255,255,.22);color:#fff;width:38px;height:38px;border-radius:50%;font-size:15px;display:flex;align-items:center;justify-content:center;transition:all .2s;cursor:pointer!important;z-index:2;}',
      '.ps-lb-close:hover{background:#c1121f;border-color:#c1121f;transform:scale(1.12);}',
      '.ps-lb-img-wrap{border-radius:14px;overflow:hidden;box-shadow:0 32px 90px rgba(0,0,0,.7);background:#1a1008;display:flex;align-items:center;justify-content:center;max-width:88vw;max-height:84vh;}',
      '.ps-lb-img{display:block;max-width:88vw;max-height:84vh;width:auto;height:auto;object-fit:contain;transition:transform .22s ease;transform-origin:center center;cursor:zoom-in!important;-ms-interpolation-mode:bicubic;image-rendering:high-quality;}',
      '.ps-lb-img.zoomed{cursor:zoom-out!important;}',
      '.ps-lb-hint{color:rgba(255,255,255,.45);font-size:11.5px;letter-spacing:.6px;font-family:"Jost",sans-serif;pointer-events:none;transition:opacity .3s;}',
      '.ps-lb-hint.hidden{opacity:0;}',
      /* Zoom badge on card hover */
      '.zoom-hint-badge{position:absolute;bottom:10px;right:10px;background:rgba(10,5,2,.6);color:rgba(255,255,255,.9);font-size:10.5px;padding:4px 9px;border-radius:5px;letter-spacing:.5px;opacity:0;transition:opacity .3s;pointer-events:none;display:flex;align-items:center;gap:5px;font-family:"Jost",sans-serif;}',
      '.product-card:hover .zoom-hint-badge{opacity:1;}',
      /* Make product images show zoom cursor */
      '.product-img-wrap img{cursor:zoom-in!important;}'
    ].join('');
    document.head.appendChild(style);

    /* Lightbox behaviour */
    var lbImg = lb.querySelector('.ps-lb-img');
    var hint  = lb.querySelector('.ps-lb-hint');
    var scale = 1, isZoomed = false;

    function closeLightbox() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
      lbImg.style.transform = 'scale(1)';
      scale = 1; isZoomed = false;
      lbImg.classList.remove('zoomed');
      hint.classList.remove('hidden');
    }
    lb.querySelector('.ps-lb-close').addEventListener('click', closeLightbox);
    lb.querySelector('.ps-lb-backdrop').addEventListener('click', closeLightbox);
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lb.classList.contains('open')) closeLightbox();
    });

    lbImg.addEventListener('click', function(e) {
      e.stopPropagation();
      if (!isZoomed) { scale = 2.5; isZoomed = true; lbImg.classList.add('zoomed'); hint.classList.add('hidden'); }
      else           { scale = 1;   isZoomed = false; lbImg.classList.remove('zoomed'); hint.classList.remove('hidden'); }
      lbImg.style.transform = 'scale(' + scale + ')';
    });

    lb.querySelector('.ps-lb-img-wrap').addEventListener('wheel', function(e) {
      e.preventDefault();
      scale = Math.min(4, Math.max(1, scale - e.deltaY * 0.004));
      isZoomed = scale > 1.02;
      lbImg.style.transform = 'scale(' + scale + ')';
      lbImg.classList.toggle('zoomed', isZoomed);
      hint.classList.toggle('hidden', isZoomed);
    }, { passive: false });
  }

  /* Bind images */
  var lb    = document.getElementById('ps-lightbox');
  var lbImg = lb.querySelector('.ps-lb-img');
  document.querySelectorAll('.product-img-wrap img').forEach(function(img) {
    if (img._zb) return; img._zb = true;
    img.addEventListener('click', function(e) {
      e.stopPropagation();
      lbImg.src = img.src; lbImg.alt = img.alt;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    var wrap = img.closest('.product-img-wrap');
    if (wrap && !wrap.querySelector('.zoom-hint-badge')) {
      var b = document.createElement('div');
      b.className = 'zoom-hint-badge';
      b.innerHTML = '&#128269; Zoom';
      wrap.appendChild(b);
    }
  });
}

/* ══════════════════════════════════════════════════════════════
   ACCOUNT DELETION
   ══════════════════════════════════════════════════════════════ */
function deleteAccount() {
  var user = null;
  try { user = JSON.parse(localStorage.getItem('ps_logged_user')); } catch(e) {}
  if (!user) { showToast('No account is currently logged in.', 'error'); return; }

  var confirmed = confirm(
    '\u26A0\uFE0F Delete Account?\n\n' +
    'This will permanently delete:\n' +
    '\u2022 Your account (' + (user.email || user.name) + ')\n' +
    '\u2022 Your cart & wishlist\n' +
    '\u2022 Your order history\n\n' +
    'This action CANNOT be undone. Continue?'
  );
  if (!confirmed) return;
  var double = confirm('Last chance! Are you absolutely sure you want to delete your account?');
  if (!double) return;

  var email = user.email || '';
  localStorage.removeItem('ps_logged_user');
  localStorage.removeItem('ps_cart_' + email);
  localStorage.removeItem('ps_wl_' + email);
  localStorage.removeItem('poshak_cart');
  localStorage.removeItem('poshak_orders');

  try {
    var users = JSON.parse(localStorage.getItem('ps_users')) || [];
    users = users.filter(function(u) { return u.email !== email; });
    localStorage.setItem('ps_users', JSON.stringify(users));
  } catch(e) {}

  showToast('Account deleted. We are sorry to see you go.', 'error');
  setTimeout(function() { window.location.href = 'index.html'; }, 2200);
}

/* ══════════════════════════════════════════════════════════════
   NEWSLETTER SUBSCRIPTION — sends thank-you email via mailto
   Replace with EmailJS / SendGrid in production
   ══════════════════════════════════════════════════════════════ */
function handleSubscription(email, name) {
  if (!email || !email.includes('@')) {
    showToast('Please enter a valid email address.', 'error'); return false;
  }
  /* Save subscriber */
  var subs = [];
  try { subs = JSON.parse(localStorage.getItem('poshak_subscribers')) || []; } catch(e) {}
  var already = subs.some(function(s) { return s.email === email; });
  if (already) { showToast('You are already subscribed!', 'info'); return false; }
  subs.push({ email: email, name: name || '', date: new Date().toISOString() });
  localStorage.setItem('poshak_subscribers', JSON.stringify(subs));

  showToast('Subscribed! Check your email for a welcome message.', 'success');

  /* Compose thank-you email */
  var subject = encodeURIComponent('Welcome to Poshak Story — Thank You for Subscribing!');
  var greeting = name ? ('Dear ' + name) : 'Dear Valued Customer';
  var body = encodeURIComponent(
    greeting + ',\n\n' +
    'Thank you for subscribing to Poshak Story — India\'s finest ethnic fashion destination!\n\n' +
    'As a subscriber, here is what you can look forward to:\n\n' +
    '\u2728 FESTIVE EDIT 2025 IS LIVE\n' +
    'Explore our stunning new collections:\n' +
    '  \u2022 Women: Lehengas, Sarees, Kurtis\n' +
    '  \u2022 Men: Kurtas, Sherwanis, Suits\n' +
    '  \u2022 Kids: Girls & Boys Ethnic Wear\n\n' +
    '\uD83C\uDF81 EXCLUSIVE SUBSCRIBER DISCOUNTS\n' +
    '  \u2022 FESTIVE30 \u2014 Flat 30% OFF\n' +
    '  \u2022 SAVE20 \u2014 Flat 20% OFF\n' +
    '  \u2022 POSHAK10 \u2014 Flat 10% OFF\n\n' +
    '\uD83D\uDE9A FREE SHIPPING above \u20B92,999 on all orders\n' +
    '\uD83D\uDD12 Secure & encrypted checkout\n' +
    '\uD83C\uDF1F Handcrafted with love in India\n\n' +
    '\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n' +
    '\uD83C\uDFEA VISIT US IN STORE\n' +
    'Shop 7, Sector 17\n' +
    'Chandigarh, Punjab\n' +
    'Mon\u2013Sat: 10:00 AM \u2013 8:00 PM\n' +
    'Sun: 11:00 AM \u2013 6:00 PM\n' +
    '\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n\n' +
    'We can\'t wait to dress you in the finest ethnic wear!\n\n' +
    'With love,\n' +
    'The Poshak Story Team\n' +
    'poshakstory.in | Shop 7, Sector 17, Chandigarh\n' +
    '\u00A9 2025 Poshak Story. All rights reserved.'
  );

  setTimeout(function() {
    window.location.href = 'mailto:' + encodeURIComponent(email) + '?subject=' + subject + '&body=' + body;
  }, 800);
  return true;
}

/* ══════════════════════════════════════════════════════════════
   doSubscribePage — called from footer subscribe forms on all
   product pages (uses the email input with id="subEmail")
   ══════════════════════════════════════════════════════════════ */
function doSubscribePage() {
  var inp = document.getElementById('subEmail');
  if (!inp) return;
  var email = inp.value.trim();
  if (!email || !email.includes('@')) {
    showToast('Please enter a valid email address.', 'error');
    inp.focus();
    return;
  }
  handleSubscription(email, '');
  inp.value = '';
}

/* ── INIT ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  updateCartCount();

  document.querySelectorAll('.filter-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      document.querySelectorAll('.filter-chip').forEach(function (c) { c.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.product-card').forEach(function (el) {
      el.style.opacity = '0'; el.style.transform = 'translateY(28px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
      obs.observe(el);
    });
  }

  initImageZoom();
  setTimeout(initImageZoom, 600);
});
