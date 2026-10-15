const PRODUCTS = [
  { id: 1, name: "Aether Wireless Headphones", category: "Electronics", price: 199, rating: 4.7, image: "img/product-1.jpg", desc: "Noise-canceling over-ear headphones with 40h battery life." },
  { id: 2, name: "Pulse Smartwatch", category: "Electronics", price: 249, rating: 4.5, image: "img/product-2.jpg", desc: "Fitness + health tracking with always-on display." },
  { id: 3, name: "Nimbus Mechanical Keyboard", category: "Electronics", price: 129, rating: 4.8, image: "img/product-3.jpg", desc: "Hot-swappable switches, RGB backlight, aluminum frame." },
  { id: 4, name: "Lampara Desk Lamp", category: "Home", price: 59, rating: 4.6, image: "img/product-4.jpg", desc: "Dimmable LED with wireless charging base." },
  { id: 5, name: "Noir Linen Shirt", category: "Fashion", price: 79, rating: 4.4, image: "img/product-5.jpg", desc: "Breathable linen, relaxed fit, four colors." },
  { id: 6, name: "Stride Running Shoes", category: "Sports", price: 139, rating: 4.6, image: "img/product-6.jpg", desc: "Lightweight foam midsole, breathable mesh upper." },
  { id: 7, name: "Glow Serum", category: "Beauty", price: 45, rating: 4.9, image: "img/product-7.jpg", desc: "Vitamin C + niacinamide for bright, even skin." },
  { id: 8, name: "Atlas Backpack", category: "Fashion", price: 109, rating: 4.5, image: "img/product-8.jpg", desc: "Water-resistant 25L pack with laptop sleeve." },
  { id: 9, name: "Bloom Ceramic Vase", category: "Home", price: 39, rating: 4.3, image: "img/product-9.jpg", desc: "Hand-thrown ceramic, matte ivory finish." },
  { id: 10, name: "Cera Coffee Grinder", category: "Home", price: 89, rating: 4.7, image: "img/product-10.jpg", desc: "Burr grinder with 30 precise settings." },
  { id: 11, name: "Vanta Sunglasses", category: "Fashion", price: 119, rating: 4.4, image: "img/product-11.jpg", desc: "Polarized UV400, matte black frame." },
  { id: 12, name: "Hydrate Bottle", category: "Sports", price: 34, rating: 4.8, image: "img/product-12.jpg", desc: "Insulated stainless steel, 750ml." }
];

const CART_KEY = "ecom_cart_v1";
function loadCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } }
function saveCart(c) { localStorage.setItem(CART_KEY, JSON.stringify(c)); }

let cart = loadCart();

function cartCount() { return cart.reduce((s, i) => s + i.qty, 0); }
function cartTotal() { return cart.reduce((s, i) => s + i.qty * productById(i.id).price, 0); }
function productById(id) { return PRODUCTS.find(p => p.id === id); }

function addToCart(id) {
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty++;
  else cart.push({ id, qty: 1 });
  saveCart(cart);
  updateCartUI();
  toast("Added to cart");
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart(cart);
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else { saveCart(cart); updateCartUI(); }
}

function updateCartUI() {
  const badge = document.getElementById("cartCount");
  if (badge) badge.textContent = cartCount();
  renderCartItems();
}

function renderCartItems() {
  const wrap = document.getElementById("cartItems");
  if (!wrap) return;
  if (cart.length === 0) {
    wrap.innerHTML = `<p style="color:var(--muted);text-align:center;margin-top:2rem">Your cart is empty.</p>`;
  } else {
    wrap.innerHTML = cart.map(i => {
      const p = productById(i.id);
      return `<div class="cart-item">
        <div class="cart-item-img"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
        <div>
          <div style="font-weight:600">${p.name}</div>
          <div style="color:var(--muted);font-size:.85rem">$${p.price} - ${i.qty}</div>
          <div style="display:flex;gap:.4rem;margin-top:.4rem">
            <button class="btn" style="padding:.25rem .6rem" onclick="changeQty(${i.id},-1)">-</button>
            <button class="btn" style="padding:.25rem .6rem" onclick="changeQty(${i.id},1)">+</button>
          </div>
        </div>
        <button class="icon-btn" onclick="removeFromCart(${i.id})" title="Remove" style="width:34px;height:34px">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/></svg>
        </button>
      </div>`;
    }).join("");
  }
  const totalEl = document.getElementById("cartTotal");
  if (totalEl) totalEl.textContent = "$" + cartTotal().toFixed(2);
}

function toggleCart(open) {
  const overlay = document.getElementById("cartOverlay");
  const drawer = document.getElementById("cartDrawer");
  if (!overlay || !drawer) return;
  if (open === undefined) open = !drawer.classList.contains("open");
  overlay.classList.toggle("open", open);
  drawer.classList.toggle("open", open);
}

function toast(msg) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(window.__toast);
  window.__toast = setTimeout(() => t.classList.remove("show"), 1800);
}

function starRating(r) {
  return r.toFixed(1) + " / 5";
}

function productCard(p) {
  return `<article class="product-card">
    <div class="product-img"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
    <div class="product-body">
      <span class="product-cat">${p.category}</span>
      <div class="product-name">${p.name}</div>
      <div style="color:var(--muted);font-size:.9rem">${p.desc}</div>
      <div class="product-meta">
        <span class="price">$${p.price}</span>
        <span class="rating">${starRating(p.rating)}</span>
      </div>
      <button class="btn btn-primary add-btn" onclick="openProduct(${p.id})">View</button>
    </div>
  </article>`;
}

function renderFeatured() {
  const grid = document.getElementById("featuredGrid");
  if (!grid) return;
  grid.innerHTML = PRODUCTS.slice(0, 6).map(productCard).join("");
}

function renderShop() {
  const grid = document.getElementById("shopGrid");
  if (!grid) return;
  const search = (document.getElementById("searchInput")?.value || "").toLowerCase();
  const cat = document.getElementById("categoryFilter")?.value || "all";
  const sort = document.getElementById("sortFilter")?.value || "featured";
  let list = PRODUCTS.filter(p =>
    (cat === "all" || p.category === cat) &&
    (p.name.toLowerCase().includes(search) || p.desc.toLowerCase().includes(search))
  );
  if (sort === "price-asc") list.sort((a,b)=>a.price-b.price);
  else if (sort === "price-desc") list.sort((a,b)=>b.price-a.price);
  else if (sort === "rating") list.sort((a,b)=>b.rating-a.rating);
  grid.innerHTML = list.length
    ? list.map(productCard).join("")
    : `<p style="color:var(--muted);grid-column:1/-1;text-align:center;padding:2rem">No products match.</p>`;
}

function renderCategories() {
  const wrap = document.getElementById("categoriesWrap");
  if (!wrap) return;
  const cats = [...new Set(PRODUCTS.map(p=>p.category))];
  wrap.innerHTML = cats.map(c => `
    <section class="category-section">
      <h3>${c}</h3>
      <div class="product-grid">${PRODUCTS.filter(p=>p.category===c).map(productCard).join("")}</div>
    </section>`).join("");
}

function renderCategoryCards() {
  const wrap = document.getElementById("categoryCards");
  if (!wrap) return;
  const cats = [
    { name: "Electronics", image: "img/category-electronics.jpg", desc: "Gadgets and gear" },
    { name: "Fashion", image: "img/category-fashion.jpg", desc: "Apparel and accessories" },
    { name: "Home", image: "img/category-home.jpg", desc: "Living and kitchen" },
    { name: "Beauty", image: "img/category-beauty.jpg", desc: "Skincare and wellness" },
    { name: "Sports", image: "img/category-sports.jpg", desc: "Performance essentials" }
  ];
  wrap.innerHTML = cats.map(c => {
    const count = PRODUCTS.filter(p=>p.category===c.name).length;
    return `<a class="cat-card" href="shop.html?category=${encodeURIComponent(c.name)}">
      <img src="${c.image}" alt="${c.name}" loading="lazy">
      <div class="cat-overlay">
        <h3>${c.name}</h3>
        <p>${c.desc} - ${count} items</p>
      </div>
    </a>`;
  }).join("");
}

function populateCategoryFilter() {
  const sel = document.getElementById("categoryFilter");
  if (!sel) return;
  const cats = [...new Set(PRODUCTS.map(p=>p.category))];
  sel.innerHTML = `<option value="all">All categories</option>` + cats.map(c=>`<option value="${c}">${c}</option>`).join("");
}

function initFromQuery() {
  const params = new URLSearchParams(location.search);
  const cat = params.get("category");
  const q = params.get("q");
  const cf = document.getElementById("categoryFilter");
  if (cf && cat) cf.value = cat;
  const si = document.getElementById("searchInput");
  if (si && q) si.value = q;
}

function openProduct(id) {
  const p = productById(id);
  const modal = document.getElementById("productModal");
  if (!modal) return;
  modal.querySelector(".modal-img").innerHTML = `<img src="${p.image}" alt="${p.name}" loading="lazy">`;
  modal.querySelector(".modal-info").innerHTML = `
    <span class="product-cat">${p.category}</span>
    <h3>${p.name}</h3>
    <div style="color:var(--muted)">${p.desc}</div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:.6rem">
      <span class="price">$${p.price}</span>
      <span class="rating">${starRating(p.rating)}</span>
    </div>
    <button class="btn btn-primary" style="margin-top:1rem" onclick="addToCart(${p.id});closeModal()">Add to cart</button>
  `;
  modal.classList.add("open");
}
function closeModal() { document.getElementById("productModal")?.classList.remove("open"); }

function markActiveNav() {
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) a.classList.add("active");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  populateCategoryFilter();
  initFromQuery();
  renderFeatured();
  renderShop();
  renderCategories();
  renderCategoryCards();
  updateCartUI();
  markActiveNav();

  const search = document.getElementById("searchInput");
  if (search) search.addEventListener("input", renderShop);
  const cf = document.getElementById("categoryFilter");
  if (cf) cf.addEventListener("change", renderShop);
  const sf = document.getElementById("sortFilter");
  if (sf) sf.addEventListener("change", renderShop);

  document.getElementById("cartOverlay")?.addEventListener("click", () => toggleCart(false));
  document.getElementById("productModal")?.addEventListener("click", e => { if (e.target.id === "productModal") closeModal(); });
});

window.addToCart = addToCart;
window.changeQty = changeQty;
window.removeFromCart = removeFromCart;
window.toggleCart = toggleCart;
window.openProduct = openProduct;
window.closeModal = closeModal;