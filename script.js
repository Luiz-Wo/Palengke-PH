// Palengke PH — frontend demo. No backend or real payment is connected.
const PRODUCTS = [
  { id: 1, name: "Fresh Tomatoes", category: "Vegetables", emoji: "🍅", price: 65, unit: "kg", desc: "Juicy and ripe", origin: "Nueva Ecija, Central Luzon", originDesc: "Kilalang taniman sa Central Luzon. I-confirm ang eksaktong farm o supplier para sa bawat batch.", tag: "BESTSELLER", bg: "#f8eee5", image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=700&q=85" },
  { id: 2, name: "Native Eggplant", category: "Vegetables", emoji: "🍆", price: 80, unit: "kg", desc: "Fresh from the farm", origin: "Pangasinan, Ilocos Region", originDesc: "Halimbawa ng local sourcing sa Northern Luzon; i-verify ang aktuwal na pinanggalingan sa supplier.", tag: "FRESH PICK", bg: "#f0eaf7", image: "" },
  { id: 3, name: "Pechay Tagalog", category: "Vegetables", emoji: "🥬", price: 45, unit: "bundle", desc: "Crisp leafy greens", origin: "Batangas, CALABARZON", originDesc: "Maaaring kunin sa mga lokal na gulayan sa CALABARZON; kumpirmahin ang farm bago ilathala.", tag: "LOCAL", bg: "#eaf2e4", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=85" },
  { id: 4, name: "Carrots", category: "Vegetables", emoji: "🥕", price: 90, unit: "kg", desc: "Sweet and crunchy", origin: "Benguet, Cordillera Administrative Region", originDesc: "Maraming highland vegetables ang nagmumula sa Benguet; kumpirmahin ang aktuwal na supplier.", tag: "", bg: "#f9eee0", image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=700&q=85" },
  { id: 5, name: "Lakatan Banana", category: "Fruits", emoji: "🍌", price: 75, unit: "kg", desc: "Naturally sweet", origin: "Davao Region, Mindanao", originDesc: "Halimbawa ng sourcing para sa saging; i-verify ang probinsya at farm para sa kasalukuyang stock.", tag: "FAVORITE", bg: "#f8f1d9", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=700&q=85" },
  { id: 6, name: "Sweet Mangoes", category: "Fruits", emoji: "🥭", price: 120, unit: "kg", desc: "Perfectly ripe", origin: "Guimaras, Western Visayas", originDesc: "Kilala ang Guimaras sa mangga; gamitin lamang kung doon talaga galing ang batch.", tag: "IN SEASON", bg: "#f9edda", image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=700&q=85" },
  { id: 7, name: "Fresh Pineapple", category: "Fruits", emoji: "🍍", price: 85, unit: "pc", desc: "Tangy and refreshing", origin: "Bukidnon, Northern Mindanao", originDesc: "Halimbawa ng pinagmulan ng pinya; i-verify ang supplier at crop source.", tag: "", bg: "#f5efd9", image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=700&q=85" },
  { id: 8, name: "Red Watermelon", category: "Fruits", emoji: "🍉", price: 55, unit: "kg", desc: "A juicy family treat", origin: "Isabela, Cagayan Valley", originDesc: "Halimbawa ng lokal na watermelon sourcing; kumpirmahin ang pinagmulan ng aktuwal na stock.", tag: "", bg: "#f7e7e2", image: "https://images.unsplash.com/photo-1563114773-84221bd62daa?auto=format&fit=crop&w=700&q=85" },
  { id: 9, name: "Fresh Bangus", category: "Meat & Seafood", emoji: "🐟", price: 180, unit: "kg", desc: "Fresh market catch", origin: "Pangasinan, Ilocos Region", originDesc: "Halimbawa ng bangus sourcing; ilagay ang tunay na fishpond o supplier location kapag verified.", tag: "FRESH CATCH", bg: "#e5eff0", image: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=700&q=85" },
  { id: 10, name: "Chicken Breast", category: "Meat & Seafood", emoji: "🍗", price: 195, unit: "kg", desc: "Ready for your recipes", origin: "Local poultry supplier — location to verify", originDesc: "Kailangang ilagay ang tunay na supplier at processing origin bago ilunsad ang produkto.", tag: "", bg: "#f4e9e2", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=700&q=85" },
  { id: 11, name: "Farm Eggs", category: "Pantry", emoji: "🥚", price: 12, unit: "pc", desc: "Everyday kitchen staple", origin: "Local poultry farm — location to verify", originDesc: "I-verify ang farm at supplier para malinaw ang traceability ng itlog.", tag: "DAILY ESSENTIAL", bg: "#f4efe4", image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=700&q=85" },
  { id: 12, name: "Premium Rice", category: "Pantry", emoji: "🍚", price: 58, unit: "kg", desc: "For everyday meals", origin: "Nueva Ecija, Central Luzon", originDesc: "Kilala sa produksyon ng palay ang Nueva Ecija; kumpirmahin kung dito galing ang aktuwal na bigas.", tag: "", bg: "#efeee6", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=85" }
];

const DELIVERY_FEE = 49;
const CART_STORAGE_KEY = "palengke-ph-cart-v2";

const productGrid = document.querySelector("#productGrid");
const productCount = document.querySelector("#productCount");
const categoryList = document.querySelector("#categoryList");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const activeFilters = document.querySelector("#activeFilters");
const filterSummary = document.querySelector("#filterSummary");
const clearFiltersBtn = document.querySelector("#clearFiltersBtn");
const emptyState = document.querySelector("#emptyState");
const resetShopBtn = document.querySelector("#resetShopBtn");

const cartCount = document.querySelector("#cartCount");
const drawerCartCount = document.querySelector("#drawerCartCount");
const cartDrawer = document.querySelector("#cartDrawer");
const overlay = document.querySelector("#overlay");
const cartItems = document.querySelector("#cartItems");
const cartEmpty = document.querySelector("#cartEmpty");
const cartSummary = document.querySelector("#cartSummary");
const cartSubtotal = document.querySelector("#cartSubtotal");
const cartDelivery = document.querySelector("#cartDelivery");
const cartTotal = document.querySelector("#cartTotal");
const checkoutModal = document.querySelector("#checkoutModal");
const checkoutForm = document.querySelector("#checkoutForm");
const checkoutTotal = document.querySelector("#checkoutTotal");
const toast = document.querySelector("#toast");
const originModal = document.querySelector("#originModal");
const originTitle = document.querySelector("#originTitle");
const originDescription = document.querySelector("#originDescription");
const originEmoji = document.querySelector("#originEmoji");

let selectedCategory = "All";
let searchTerm = "";
let sortMode = "featured";
let selectedWeights = Object.fromEntries(PRODUCTS.filter(p => p.unit === "kg").map(p => [p.id, 1]));
let cart = loadCart();
let toastTimer;

function money(amount) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency", currency: "PHP", minimumFractionDigits: 2
  }).format(amount);
}

function getProduct(id) {
  return PRODUCTS.find(product => product.id === Number(id));
}

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
    if (!Array.isArray(saved)) return [];
    return saved.filter(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      return product && Number.isInteger(item.quantity) && item.quantity > 0 &&
        (product.unit !== "kg" || [0.25, 0.5, 1].includes(item.weight));
    }).map(item => ({
      id: item.id,
      quantity: Math.min(item.quantity, 99),
      weight: getProduct(item.id).unit === "kg" ? item.weight : null
    }));
  } catch (error) {
    console.warn("Could not load saved cart:", error);
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.warn("Could not save cart:", error);
    showToast("Cart could not be saved in this browser.");
  }
}

function getCartQuantity() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function getLinePrice(item) {
  const product = getProduct(item.id);
  if (!product) return 0;
  return product.price * (product.unit === "kg" ? item.weight : 1);
}

function getSubtotal() {
  return cart.reduce((sum, item) => sum + getLinePrice(item) * item.quantity, 0);
}

function getFulfilment() {
  return checkoutForm.querySelector('input[name="fulfilment"]:checked')?.value || "delivery";
}

function getDeliveryFee() {
  return cart.length && getFulfilment() === "delivery" ? DELIVERY_FEE : 0;
}

function getTotal() {
  return getSubtotal() + getDeliveryFee();
}

function weightLabel(weight) {
  if (weight === 0.25) return "¼ kg";
  if (weight === 0.5) return "½ kg";
  return "1 kg";
}

function renderProducts() {
  const query = searchTerm.trim().toLocaleLowerCase();
  const visible = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesCategory && `${product.name} ${product.category} ${product.desc}`.toLocaleLowerCase().includes(query);
  });
  if (sortMode === "price-low") visible.sort((a, b) => a.price - b.price);
  if (sortMode === "price-high") visible.sort((a, b) => b.price - a.price);
  if (sortMode === "name") visible.sort((a, b) => a.name.localeCompare(b.name));

  productGrid.innerHTML = visible.map(product => {
    const soldByWeight = product.unit === "kg";
    const weight = selectedWeights[product.id] || 1;
    const picker = soldByWeight ? `
      <div class="weight-picker" role="group" aria-label="Choose weight for ${product.name}">
        <button type="button" class="weight-option ${weight === 0.25 ? "selected" : ""}" data-weight="${product.id}" data-value="0.25" aria-pressed="${weight === 0.25}">¼ kg</button>
        <button type="button" class="weight-option ${weight === 0.5 ? "selected" : ""}" data-weight="${product.id}" data-value="0.5" aria-pressed="${weight === 0.5}">½ kg</button>
        <button type="button" class="weight-option ${weight === 1 ? "selected" : ""}" data-weight="${product.id}" data-value="1" aria-pressed="${weight === 1}">1 kg</button>
      </div>` : "";
    const shownPrice = product.price * (soldByWeight ? weight : 1);
    const shownUnit = soldByWeight ? ` / ${weightLabel(weight)}` : ` / ${product.unit}`;
    return `
      <article class="product-card product-card-clickable" data-product-open="${product.id}" tabindex="0" role="button" aria-label="View ${product.name} photos and details">
        <div class="product-visual" style="--visual-bg:${product.bg}">
          ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ""}
          <img class="product-photo" src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false">
          <span class="product-emoji photo-fallback" role="img" aria-label="${product.name}" ${product.image ? "hidden" : ""}>${product.emoji}</span><span class="view-product-hint">Tingnan ang produkto ↗</span>
        </div>
        <div class="product-info">
          <p class="product-category">${product.category}</p>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-desc">${product.desc}${soldByWeight ? ` · ${money(product.price)}/kg` : ""}</p><button class="origin-link" type="button" data-origin="${product.id}" aria-label="Product origin: ${product.name}">📍 <span>${product.origin || "Pinagmulan to verify"}</span></button>
          ${picker}
          <div class="product-bottom">
            <span class="product-price">${money(shownPrice)}<small>${shownUnit}</small></span>
            <button class="add-button" type="button" data-add="${product.id}" data-selected-weight="${soldByWeight ? weight : ""}" aria-label="Add ${product.name} to cart" title="Add to cart">+</button>
          </div>
        </div>
      </article>`;
  }).join("");

  productCount.textContent = `${visible.length} ${visible.length === 1 ? "product" : "products"}`;
  emptyState.hidden = visible.length > 0;
  productGrid.hidden = visible.length === 0;
  activeFilters.hidden = !(selectedCategory !== "All" || searchTerm.trim());
  filterSummary.textContent = `Showing ${visible.length} result${visible.length === 1 ? "" : "s"}`;
}

function renderCart() {
  const quantity = getCartQuantity();
  const subtotal = getSubtotal();
  const hasItems = cart.length > 0;

  cartCount.textContent = quantity > 99 ? "99+" : String(quantity);
  drawerCartCount.textContent = `(${quantity})`;
  cartEmpty.hidden = hasItems;
  cartItems.hidden = !hasItems;
  cartSummary.hidden = !hasItems;

  cartItems.innerHTML = cart.map((item, index) => {
    const product = getProduct(item.id);
    if (!product) return "";
    const byWeight = product.unit === "kg";
    const portion = byWeight ? weightLabel(item.weight) : product.unit;
    const unitText = byWeight ? `${portion} portion` : `per ${product.unit}`;
    return `
      <article class="cart-item">
        <div class="cart-item-visual" style="--item-bg:${product.bg}" role="img" aria-label="${product.name}"><img src="${product.image}" alt="" loading="lazy" onerror="this.hidden=true;this.parentElement.textContent='${product.emoji}'"></div>
        <div>
          <div class="cart-item-name">${product.name}</div>
          <div class="cart-item-price">${money(getLinePrice(item))} <span style="color:#899087;font-weight:500">/ ${unitText}</span></div>
          <div class="quantity-control" aria-label="Quantity for ${product.name}, ${portion}">
            <button type="button" data-quantity="${index}" data-change="-1" aria-label="Decrease ${product.name} quantity">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-quantity="${index}" data-change="1" aria-label="Increase ${product.name} quantity">+</button>
          </div>
        </div>
        <button class="remove-item" type="button" data-remove="${index}" aria-label="Remove ${product.name}" title="Remove item">×</button>
      </article>`;
  }).join("");

  cartSubtotal.textContent = money(subtotal);
  cartDelivery.textContent = money(getDeliveryFee());
  cartTotal.textContent = money(getTotal());
  checkoutTotal.textContent = money(getTotal());
}

function addToCart(id, weight = null) {
  const product = getProduct(id);
  if (!product) return;
  const chosenWeight = product.unit === "kg" ? Number(weight || selectedWeights[product.id] || 1) : null;
  const existing = cart.find(item => item.id === product.id && item.weight === chosenWeight);
  if (existing) {
    if (existing.quantity >= 99) {
      showToast("Maximum quantity is 99 per product and weight.");
      return;
    }
    existing.quantity += 1;
  } else {
    cart.push({ id: product.id, quantity: 1, weight: chosenWeight });
  }
  saveCart();
  renderCart();
  showToast(`${product.name}${chosenWeight ? ` (${weightLabel(chosenWeight)})` : ""} added to your basket.`);
}

function changeQuantity(index, change) {
  const item = cart[Number(index)];
  if (!item) return;
  item.quantity += Number(change);
  if (item.quantity <= 0) {
    cart.splice(Number(index), 1);
  } else if (item.quantity > 99) {
    item.quantity = 99;
    showToast("Maximum quantity is 99 per product and weight.");
  }
  saveCart();
  renderCart();
}

function removeFromCart(index) {
  const item = cart[Number(index)];
  if (!item) return;
  const product = getProduct(item.id);
  cart.splice(Number(index), 1);
  saveCart();
  renderCart();
  if (product) showToast(`${product.name} removed from your basket.`);
}

function openCart() {
  overlay.hidden = false;
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  document.querySelector("#closeCartBtn").focus();
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  if (checkoutModal.hidden) {
    overlay.hidden = true;
    document.body.classList.remove("no-scroll");
  }
}

function openCheckout() {
  if (!cart.length) {
    showToast("Add at least one product before checkout.");
    return;
  }
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  checkoutModal.hidden = false;
  overlay.hidden = false;
  document.body.classList.add("no-scroll");
  checkoutTotal.textContent = money(getTotal());
  checkoutModal.querySelector('input[name="fullName"]').focus();
}

function closeCheckout() {
  checkoutModal.hidden = true;
  overlay.hidden = true;
  document.body.classList.remove("no-scroll");
}

let activeProductGalleryIndex = 0;
function openProduct(productId) {
  const product = getProduct(productId);
  if (!product) return;
  const modal = document.querySelector("#productDetailModal");
  const image = document.querySelector("#detailProductImage");
  const fallback = document.querySelector("#detailProductEmoji");
  document.querySelector("#detailProductName").textContent = product.name;
  document.querySelector("#detailProductCategory").textContent = product.category;
  document.querySelector("#detailProductDescription").textContent = product.desc;
  document.querySelector("#detailProductPrice").textContent = `${money(product.price)} / ${product.unit}`;
  document.querySelector("#detailProductOrigin").textContent = product.origin || "Pinagmulan: i-verify sa supplier";
  image.hidden = !product.image; fallback.hidden = !!product.image; fallback.textContent = product.emoji;
  image.src = product.image || ""; image.alt = product.name;
  activeProductGalleryIndex = 0;
  document.querySelector("#detailGalleryCount").textContent = "01 / 01";
  document.querySelector("#detailGalleryPrev").disabled = true; document.querySelector("#detailGalleryNext").disabled = true;
  document.querySelector("#detailAddButton").dataset.add = product.id;
  document.querySelector("#detailOriginButton").dataset.origin = product.id;
  modal.hidden = false; overlay.hidden = false; document.body.classList.add("no-scroll");
}
function closeProduct() {
  document.querySelector("#productDetailModal").hidden = true;
  if (checkoutModal.hidden && originModal.hidden && !cartDrawer.classList.contains("open")) { overlay.hidden = true; document.body.classList.remove("no-scroll"); }
}

function openOrigin(productId) {
  const product = getProduct(productId);
  if (!product) return;
  originTitle.textContent = `${product.name} — ${product.origin || "Pinagmulan to verify"}`;
  originDescription.textContent = product.originDesc || "Kumpirmahin ang eksaktong pinanggalingan sa supplier.";
  originEmoji.textContent = product.emoji;
  originModal.hidden = false;
  overlay.hidden = false;
  document.body.classList.add("no-scroll");
}
function closeOrigin() {
  originModal.hidden = true;
  if (checkoutModal.hidden && !cartDrawer.classList.contains("open")) {
    overlay.hidden = true;
    document.body.classList.remove("no-scroll");
  }
}

let activeHeroSlide = 0;
let heroTimer;
const HERO_INTERVAL = 5000;
function showHeroSlide(index) {
  const slides = [...document.querySelectorAll(".hero-slide")];
  const dots = [...document.querySelectorAll("[data-go-slide]")];
  if (!slides.length) return;
  activeHeroSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === activeHeroSlide);
    slide.setAttribute("aria-hidden", String(i !== activeHeroSlide));
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === activeHeroSlide);
    dot.setAttribute("aria-pressed", String(i === activeHeroSlide));
  });
  const progress = document.querySelector("#carouselProgress");
  if (progress) {
    progress.style.animation = "none";
    void progress.offsetWidth;
    progress.style.animation = `carouselProgress ${HERO_INTERVAL}ms linear forwards`;
  }
}
function startHeroTimer() {
  window.clearInterval(heroTimer);
  heroTimer = window.setInterval(() => showHeroSlide(activeHeroSlide + 1), HERO_INTERVAL);
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2800);
}

function setCategory(category) {
  selectedCategory = category;
  categoryList.querySelectorAll("[data-category]").forEach(button => {
    const active = button.dataset.category === selectedCategory;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  renderProducts();
}

function resetShop() {
  searchTerm = "";
  searchInput.value = "";
  setCategory("All");
  renderProducts();
}

searchForm.addEventListener("submit", event => {
  event.preventDefault();
  searchTerm = searchInput.value;
  renderProducts();
  document.querySelector("#products").scrollIntoView({ behavior: "smooth", block: "start" });
});
searchInput.addEventListener("input", () => {
  searchTerm = searchInput.value;
  renderProducts();
});
document.querySelector("#sortSelect")?.addEventListener("change", event => {
  sortMode = event.target.value;
  renderProducts();
});
categoryList.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (button) setCategory(button.dataset.category);
});
productGrid.addEventListener("click", event => {
  const originButton = event.target.closest("[data-origin]");
  if (originButton) { openOrigin(originButton.dataset.origin); return; }
  const weightButton = event.target.closest("[data-weight]");
  if (weightButton) {
    selectedWeights[Number(weightButton.dataset.weight)] = Number(weightButton.dataset.value);
    renderProducts();
    return;
  }
  const addButton = event.target.closest("[data-add]");
  if (addButton) { event.stopPropagation(); addToCart(addButton.dataset.add, addButton.dataset.selectedWeight || null); return; }
  const card = event.target.closest("[data-product-open]");
  if (card) openProduct(card.dataset.productOpen);
});
cartItems.addEventListener("click", event => {
  const quantityButton = event.target.closest("[data-quantity]");
  const removeButton = event.target.closest("[data-remove]");
  if (quantityButton) changeQuantity(quantityButton.dataset.quantity, quantityButton.dataset.change);
  if (removeButton) removeFromCart(removeButton.dataset.remove);
});

document.querySelector("#closeOriginBtn").addEventListener("click", closeOrigin);
document.querySelector("#closeProductBtn").addEventListener("click", closeProduct);
document.querySelector("#detailAddButton").addEventListener("click", event => { addToCart(event.currentTarget.dataset.add, null); closeProduct(); });
document.querySelector("#detailOriginButton").addEventListener("click", event => { closeProduct(); openOrigin(event.currentTarget.dataset.origin); });
productGrid.addEventListener("keydown", event => { if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-product-open]")) { event.preventDefault(); openProduct(event.target.dataset.productOpen); } });
document.querySelector("#heroPrev").addEventListener("click", () => { showHeroSlide(activeHeroSlide - 1); startHeroTimer(); });
document.querySelector("#heroNext").addEventListener("click", () => { showHeroSlide(activeHeroSlide + 1); startHeroTimer(); });
document.querySelector("#heroDots").addEventListener("click", event => {
  const dot = event.target.closest("[data-go-slide]");
  if (dot) { showHeroSlide(Number(dot.dataset.goSlide)); startHeroTimer(); }
});
document.querySelector(".hero-carousel").addEventListener("mouseenter", () => window.clearInterval(heroTimer));
document.querySelector(".hero-carousel").addEventListener("mouseleave", startHeroTimer);
document.querySelector(".hero-carousel").addEventListener("focusin", () => window.clearInterval(heroTimer));
document.querySelector(".hero-carousel").addEventListener("focusout", startHeroTimer);

document.querySelector("#openCartBtn").addEventListener("click", openCart);
document.querySelector("#closeCartBtn").addEventListener("click", closeCart);
document.querySelector("#continueShoppingBtn").addEventListener("click", () => {
  closeCart();
  document.querySelector("#products").scrollIntoView({ behavior: "smooth" });
});
document.querySelector("#checkoutBtn").addEventListener("click", openCheckout);
document.querySelector("#closeCheckoutBtn").addEventListener("click", closeCheckout);
document.querySelector("#clearFiltersBtn").addEventListener("click", resetShop);
document.querySelector("#resetShopBtn").addEventListener("click", resetShop);

overlay.addEventListener("click", () => {
  if (!checkoutModal.hidden) closeCheckout();
  else closeCart();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    if (!checkoutModal.hidden) closeCheckout();
    else if (cartDrawer.classList.contains("open")) closeCart();
  }
});

checkoutForm.querySelectorAll('input[name="fulfilment"]').forEach(radio => {
  radio.addEventListener("change", () => {
    const isPickup = getFulfilment() === "pickup";
    document.querySelector("#deliveryOption").classList.toggle("selected", !isPickup);
    document.querySelector("#pickupOption").classList.toggle("selected", isPickup);
    document.querySelector("#pickupNote").hidden = !isPickup;
    const pickupDate = document.querySelector("#pickupDate");
    const pickupTime = document.querySelector("#pickupTime");
    pickupDate.required = isPickup;
    pickupTime.required = isPickup;
    document.querySelector("#addressField").querySelector("label");
    if (isPickup && !pickupDate.min) {
      const today = new Date();
      const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
      pickupDate.min = localToday;
      pickupDate.value = localToday;
    }
    const addressInput = checkoutForm.querySelector('textarea[name="address"]');
    document.querySelector("#addressField").hidden = isPickup;
    addressInput.required = !isPickup;
    cartDelivery.textContent = money(getDeliveryFee());
    cartTotal.textContent = money(getTotal());
    checkoutTotal.textContent = money(getTotal());
  });
});

checkoutForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!checkoutForm.reportValidity()) return;
  if (!cart.length) {
    closeCheckout();
    showToast("Your basket is empty. Add a product first.");
    return;
  }

  const formData = new FormData(checkoutForm);
  const orderNumber = `PP-${Date.now().toString().slice(-7)}`;
  const customerName = String(formData.get("fullName") || "").trim();
  const fulfilment = getFulfilment();
  const orderTotal = getTotal();
  const pickupDate = formData.get("pickupDate");
  const pickupTime = formData.get("pickupTime");

  // Demo only: no order is sent to a server and no customer details are stored.
  closeCheckout();
  cart = [];
  saveCart();
  renderCart();
  checkoutForm.reset();
  checkoutForm.querySelector('input[name="fulfilment"][value="delivery"]').dispatchEvent(new Event("change", { bubbles: true }));
  showToast(`Demo ${fulfilment} order ${orderNumber} placed. Thank you, ${customerName}!${fulfilment === "pickup" ? ` Pickup: ${pickupDate}, ${pickupTime}.` : ""} Total: ${money(orderTotal)}.`);
  closeCart();
});

document.querySelector("#currentYear").textContent = new Date().getFullYear();
showHeroSlide(0);
startHeroTimer();
renderProducts();
renderCart();
checkoutForm.querySelector('input[name="fulfilment"][value="delivery"]').dispatchEvent(new Event("change", { bubbles: true }));
