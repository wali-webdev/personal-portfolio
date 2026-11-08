const products = [
  {
    id: 1,
    name: "Wireless Headphones Pro",
    cat: "electronics",
    price: 89,
    old: 129,
    rating: 4.5,
    reviews: 234,
    icon: "fa-headphones",
    color: "linear-gradient(135deg,#667eea,#764ba2)",
    badge: "-30%",
  },
  {
    id: 2,
    name: "Smart Watch Series X",
    cat: "electronics",
    price: 199,
    old: 249,
    rating: 4.8,
    reviews: 512,
    icon: "fa-clock",
    color: "linear-gradient(135deg,#f093fb,#f5576c)",
    badge: "-20%",
  },
  {
    id: 3,
    name: "Leather Backpack",
    cat: "fashion",
    price: 59,
    old: 79,
    rating: 4.3,
    reviews: 189,
    icon: "fa-bag-shopping",
    color: "linear-gradient(135deg,#43e97b,#38f9d7)",
    badge: "-25%",
  },
  {
    id: 4,
    name: "Running Shoes Elite",
    cat: "fashion",
    price: 79,
    old: 99,
    rating: 4.6,
    reviews: 321,
    icon: "fa-shoe-prints",
    color: "linear-gradient(135deg,#fa709a,#fee140)",
    badge: null,
  },
  {
    id: 5,
    name: "Classic Sunglasses",
    cat: "accessories",
    price: 39,
    old: 59,
    rating: 4.4,
    reviews: 156,
    icon: "fa-glasses",
    color: "linear-gradient(135deg,#30cfd0,#330867)",
    badge: "-34%",
  },
  {
    id: 6,
    name: "Minimalist Wallet",
    cat: "accessories",
    price: 29,
    old: 45,
    rating: 4.2,
    reviews: 98,
    icon: "fa-wallet",
    color: "linear-gradient(135deg,#4facfe,#00f2fe)",
    badge: "-35%",
  },
  {
    id: 7,
    name: "Bluetooth Speaker",
    cat: "electronics",
    price: 69,
    old: 89,
    rating: 4.7,
    reviews: 445,
    icon: "fa-volume-high",
    color: "linear-gradient(135deg,#a8edea,#fed6e3)",
    badge: null,
  },
  {
    id: 8,
    name: "Denim Jacket",
    cat: "fashion",
    price: 99,
    old: 139,
    rating: 4.5,
    reviews: 267,
    icon: "fa-shirt",
    color: "linear-gradient(135deg,#ff9a9e,#fad0c4)",
    badge: "-28%",
  },
];

let cart = 0;
const grid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const toast = document.getElementById("toast");
const toastMsg = document.getElementById("toastMsg");

function productHTML(p, i) {
  const stars = "★".repeat(Math.floor(p.rating)) + (p.rating % 1 ? "½" : "");
  return `
    <div class="product" style="animation-delay:${i * 0.05}s">
      <div class="product-img" style="background:${p.color}">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
        <button class="wishlist" onclick="toggleWish(this,event)" aria-label="Add to wishlist"><i class="far fa-heart"></i></button>
        <i class="fas ${p.icon}"></i>
      </div>
      <div class="product-body">
        <div class="product-cat">${p.cat}</div>
        <h3>${p.name}</h3>
        <div class="rating">${stars} <span>(${p.reviews})</span></div>
        <div class="price-row">
          <div><span class="price">$${p.price}</span><span class="old-price">$${p.old}</span></div>
          <button class="add-btn" onclick="addToCart('${p.name}')" aria-label="Add to cart"><i class="fas fa-cart-plus"></i></button>
        </div>
      </div>
    </div>`;
}

function renderProducts(filter = "all") {
  grid.innerHTML = "";
  const list =
    filter === "all" ? products : products.filter((p) => p.cat === filter);
  if (list.length === 0) {
    grid.innerHTML =
      '<p style="grid-column:1/-1;text-align:center;color:#94a3b8;padding:50px;">No products found.</p>';
    return;
  }
  list.forEach((p, i) => {
    grid.innerHTML += productHTML(p, i);
  });
}

function toggleWish(btn, e) {
  e.stopPropagation();
  btn.classList.toggle("active");
  const icon = btn.querySelector("i");
  icon.className = btn.classList.contains("active")
    ? "fas fa-heart"
    : "far fa-heart";
}

function addToCart(name) {
  cart++;
  cartCount.textContent = cart;
  cartCount.classList.add("bump");
  setTimeout(() => cartCount.classList.remove("bump"), 400);
  showToast(name + " added to cart! 🛒");
}

function showToast(msg) {
  toastMsg.textContent = msg;
  toast.classList.add("show");
  clearTimeout(window._toastT);
  window._toastT = setTimeout(() => toast.classList.remove("show"), 2200);
}

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.filter);
  });
});

document.getElementById("searchInput").addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase().trim();
  if (!q) {
    renderProducts();
    return;
  }
  const list = products.filter(
    (p) => p.name.toLowerCase().includes(q) || p.cat.includes(q),
  );
  grid.innerHTML = "";
  if (list.length === 0) {
    grid.innerHTML =
      '<p style="grid-column:1/-1;text-align:center;color:#94a3b8;padding:50px;"><i class="fas fa-search" style="font-size:2rem;display:block;margin-bottom:12px;opacity:0.3"></i>No products found.</p>';
    return;
  }
  list.forEach((p, i) => {
    grid.innerHTML += productHTML(p, i);
  });
});

window.addEventListener("scroll", () => {
  document
    .getElementById("header")
    .classList.toggle("scrolled", window.scrollY > 50);
});

const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        revealObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1 },
);
document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

renderProducts();
