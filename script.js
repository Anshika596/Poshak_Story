/* ============================================================
   POSHAK STORY — Main JavaScript
   ============================================================ */

/* ── CUSTOM CURSOR ──────────────────────────────────────────── */
(function () {
  var dot  = document.querySelector('.cursor');
  var ring = document.querySelector('.cursor-follower');
  if (!dot || !ring) return;

  var mx = 0, my = 0, rx = 0, ry = 0;

  /* Move dot instantly */
  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = 'translate(calc(' + mx + 'px - 50%), calc(' + my + 'px - 50%))';
  });

  /* Ring follows with smooth animation */
  (function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = 'translate(calc(' + rx + 'px - 50%), calc(' + ry + 'px - 50%))';
    requestAnimationFrame(animateRing);
  })();

  /* Hover states - bind to interactive elements */
  function bindHover() {
    document.querySelectorAll('a, button, .filter-chip, .product-card, .action-btn, input, select, textarea').forEach(function (el) {
      if (el._ph) return;
      el._ph = true;
      el.addEventListener('mouseenter', function () { dot.classList.add('hovered'); ring.classList.add('hovered'); });
      el.addEventListener('mouseleave', function () { dot.classList.remove('hovered'); ring.classList.remove('hovered'); });
    });
  }
  bindHover();
  setInterval(bindHover, 800);

  /* Click state */
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
    btn.innerHTML = '✓ Added to Cart';
    setTimeout(function () {
      btn.classList.remove('added');
      btn.innerHTML = '🛒 &nbsp;Add to Cart';
    }, 2200);
  }
}

/* ── TOAST ─────────────────────────────────────────────────── */
function showToast(msg) {
  var t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast'; t.className = 'toast';
    t.innerHTML = '<span class="toast-icon">🛍️</span><div><strong id="toast-msg"></strong></div>';
    document.body.appendChild(t);
  }
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('show');
  clearTimeout(window._tt);
  window._tt = setTimeout(function () { t.classList.remove('show'); }, 3000);
}

/* ── SCROLL TOP ────────────────────────────────────────────── */
window.addEventListener('scroll', function () {
  var b = document.querySelector('.scroll-top');
  if (b) { b.classList.toggle('visible', window.scrollY > 400); }
});
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

/* ── INIT ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  updateCartCount();

  /* Filter chips */
  document.querySelectorAll('.filter-chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      document.querySelectorAll('.filter-chip').forEach(function (c) { c.classList.remove('active'); });
      this.classList.add('active');
    });
  });

  /* Scroll reveal for product cards */
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
});
