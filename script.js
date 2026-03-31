/* ============================================================
   POSHAK STORY — Main JavaScript (FULLY WORKING)
   ============================================================ */

/* ── CART FUNCTIONS ─────────────────────────────────────────── */
function getCart() {
  try { 
    var cart = localStorage.getItem('poshak_cart');
    return cart ? JSON.parse(cart) : []; 
  } catch(e) { 
    return []; 
  }
}

function saveCart(cart) {
  localStorage.setItem('poshak_cart', JSON.stringify(cart));
  updateCartCount();
  console.log('Cart saved:', cart);
}

function updateCartCount() {
  var cart = getCart();
  var count = cart.length;
  var cartCountElements = document.querySelectorAll('.cart-count');
  for (var i = 0; i < cartCountElements.length; i++) {
    if (count > 0) {
      cartCountElements[i].textContent = count;
      cartCountElements[i].style.display = 'flex';
    } else {
      cartCountElements[i].style.display = 'none';
    }
  }
}

function addToCart(name, price, btn) {
  var cart = getCart();
  var newItem = { 
    name: name, 
    price: price, 
    id: Date.now() + Math.random(),
    size: 'M',
    img: '',
    sub: ''
  };
  cart.push(newItem);
  saveCart(cart);
  showToast(name + ' added to cart!');
  
  if (btn) {
    var originalHTML = btn.innerHTML;
    btn.classList.add('added');
    btn.innerHTML = '✓ Added to Cart';
    setTimeout(function () {
      btn.classList.remove('added');
      btn.innerHTML = originalHTML;
    }, 2000);
  }
  
  updateCartCount();
}

function removeFromCart(index) {
  var cart = getCart();
  var removed = cart.splice(index, 1);
  saveCart(cart);
  showToast((removed[0] ? removed[0].name : 'Item') + ' removed');
  updateCartCount();
  return cart;
}

function clearCart() {
  localStorage.removeItem('poshak_cart');
  updateCartCount();
  showToast('Cart cleared');
}

/* ── TOAST ─────────────────────────────────────────────────── */
function showToast(msg) {
  var t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    t.innerHTML = '<span class="toast-icon">🛍️</span><div><strong id="toast-msg"></strong></div>';
    document.body.appendChild(t);
  }
  var msgEl = document.getElementById('toast-msg');
  if (msgEl) msgEl.textContent = msg;
  t.classList.add('show');
  clearTimeout(window._tt);
  window._tt = setTimeout(function () { 
    t.classList.remove('show'); 
  }, 3000);
}

/* ── SCROLL TOP ────────────────────────────────────────────── */
window.addEventListener('scroll', function () {
  var b = document.querySelector('.scroll-top');
  if (b) { 
    b.classList.toggle('visible', window.scrollY > 400); 
  }
});

function scrollToTop() { 
  window.scrollTo({ top: 0, behavior: 'smooth' }); 
}

/* ── CUSTOM CURSOR ─────────────────────────────────────────── */
(function () {
  var dot = document.querySelector('.cursor');
  var ring = document.querySelector('.cursor-follower');
  if (!dot || !ring) return;

  var mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = 'translate(calc(' + mx + 'px - 50%), calc(' + my + 'px - 50%))';
  });

  (function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = 'translate(calc(' + rx + 'px - 50%), calc(' + ry + 'px - 50%))';
    requestAnimationFrame(animateRing);
  })();

  function bindHover() {
    var elements = document.querySelectorAll('a, button, .filter-chip, .product-card, .action-btn, input, select, textarea');
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      if (el._ph) continue;
      el._ph = true;
      el.addEventListener('mouseenter', function () { 
        dot.classList.add('hovered'); 
        ring.classList.add('hovered'); 
      });
      el.addEventListener('mouseleave', function () { 
        dot.classList.remove('hovered'); 
        ring.classList.remove('hovered'); 
      });
    }
  }
  bindHover();
  setInterval(bindHover, 800);

  document.addEventListener('mousedown', function () { 
    dot.classList.add('clicking'); 
    ring.classList.add('clicking'); 
  });
  document.addEventListener('mouseup', function () { 
    dot.classList.remove('clicking'); 
    ring.classList.remove('clicking'); 
  });
})();

/* ── FILTER CHIPS ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  updateCartCount();
  
  var filterChips = document.querySelectorAll('.filter-chip');
  for (var i = 0; i < filterChips.length; i++) {
    filterChips[i].addEventListener('click', function() {
      var allChips = document.querySelectorAll('.filter-chip');
      for (var j = 0; j < allChips.length; j++) {
        allChips[j].classList.remove('active');
      }
      this.classList.add('active');
    });
  }

  /* Scroll reveal for product cards */
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) { 
          entries[i].target.style.opacity = '1'; 
          entries[i].target.style.transform = 'translateY(0)'; 
        }
      }
    }, { threshold: 0.08 });
    
    var productCards = document.querySelectorAll('.product-card');
    for (var i = 0; i < productCards.length; i++) {
      productCards[i].style.opacity = '0';
      productCards[i].style.transform = 'translateY(28px)';
      productCards[i].style.transition = 'opacity .5s ease, transform .5s ease';
      obs.observe(productCards[i]);
    }
  }
  
  console.log('Cart initialized. Items:', getCart());
});