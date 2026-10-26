// Palengke PH — frontend demo. No backend or real payment is connected.
const PRODUCTS = [
  { id: 1, name: "Fresh Tomatoes", category: "Vegetables", emoji: "🍅", price: 65, unit: "kg", desc: "Juicy and ripe", origin: "Nueva Ecija, Central Luzon", originDesc: "Kilalang taniman sa Central Luzon. I-confirm ang eksaktong farm o supplier para sa bawat batch.", tag: "BESTSELLER", bg: "#f8eee5", image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=700&q=85" },
  { id: 2, name: "Native Eggplant", category: "Vegetables", emoji: "🍆", price: 80, unit: "kg", desc: "Fresh from the farm", origin: "Pangasinan, Ilocos Region", originDesc: "Halimbawa ng local sourcing sa Northern Luzon; i-verify ang aktuwal na pinanggalingan sa supplier.", tag: "FRESH PICK", bg: "#f0eaf7", image: "https://images.unsplash.com/photo-1563810851375-283a1139e2ac?auto=format&fit=crop&w=900&q=85" },
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
      quantity: Math.min(item.quantity, 9999),
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
          <button type="button" class="favorite-toggle ${readFavorites().includes(product.id) ? "is-favorite" : ""}" data-favorite="${product.id}" aria-pressed="${readFavorites().includes(product.id)}" aria-label="${readFavorites().includes(product.id) ? "Remove from" : "Add to"} favorites: ${product.name}" title="${readFavorites().includes(product.id) ? "Remove favorite" : "Add to favorites"}">♡</button>
          <img class="product-photo" src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false">
          <span class="product-emoji photo-fallback" role="img" aria-label="${product.name}" ${product.image ? "hidden" : ""}>${product.emoji}</span><span class="view-product-hint">Tingnan ang produkto ↗</span>
        </div>
        <div class="product-info">
          <p class="product-category">${product.category}</p>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-desc">${product.desc}${soldByWeight ? ` · ${money(product.price)}/kg` : ""}</p><button class="origin-link" type="button" data-origin="${product.id}" aria-label="View origin details for ${product.name}"><span class="origin-pin" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="2.5"></circle></svg></span><span class="origin-link-copy"><strong>${product.origin || "Local source"}</strong><small>Origin details</small></span><span class="origin-chevron" aria-hidden="true">↗</span></button>
          ${picker}
          <div class="product-bottom">
            <span class="product-price">${money(shownPrice)}<small>${shownUnit}</small></span>
            <div class="product-buy-controls">
              <label class="product-quantity-label" aria-label="Quantity for ${product.name}"><span>Qty</span><input type="number" min="1" max="9999" step="1" value="1" data-add-quantity="${product.id}" aria-label="Quantity to add for ${product.name}"></label>
              <button class="add-button" type="button" data-add="${product.id}" data-selected-weight="${soldByWeight ? weight : ""}" aria-label="Add ${product.name} to cart" title="Add to cart">+</button>
            </div>
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
          ${byWeight ? `<label class="cart-weight-label">Timbang<select data-cart-weight="${index}" aria-label="Change ${product.name} weight"><option value="0.25" ${item.weight === 0.25 ? "selected" : ""}>¼ kg</option><option value="0.5" ${item.weight === 0.5 ? "selected" : ""}>½ kg</option><option value="1" ${item.weight === 1 ? "selected" : ""}>1 kg</option></select></label>` : ""}
          <div class="quantity-control" aria-label="Quantity for ${product.name}, ${portion}">
            <button type="button" data-quantity="${index}" data-change="-1" aria-label="Decrease ${product.name} quantity">−</button>
            <input type="number" min="1" max="9999" step="1" value="${item.quantity}" data-cart-quantity="${index}" aria-label="Set quantity for ${product.name}">
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

function addToCart(id, weight = null, quantity = 1) {
  const product = getProduct(id);
  if (!product) return;
  const chosenWeight = product.unit === "kg" ? Number(weight || selectedWeights[product.id] || 1) : null;
  const requested = Math.max(1, Math.min(9999, Math.floor(Number(quantity) || 1)));
  const existing = cart.find(item => item.id === product.id && item.weight === chosenWeight);
  if (existing) {
    existing.quantity = Math.min(9999, existing.quantity + requested);
  } else {
    cart.push({ id: product.id, quantity: requested, weight: chosenWeight });
  }
  saveCart();
  renderCart();
  showToast(`${product.name} × ${requested} added to your basket.`);
}

function changeQuantity(index, change) {
  const item = cart[Number(index)];
  if (!item) return;
  item.quantity += Number(change);
  if (item.quantity <= 0) {
    cart.splice(Number(index), 1);
  } else if (item.quantity > 9999) {
    item.quantity = 9999;
    showToast("Maximum quantity is 9,999 per product option.");
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
  const favoriteButton = event.target.closest("[data-favorite]");
  if (favoriteButton) { event.stopPropagation(); toggleFavorite(Number(favoriteButton.dataset.favorite)); return; }
  const originButton = event.target.closest("[data-origin]");
  if (originButton) { openOrigin(originButton.dataset.origin); return; }
  const weightButton = event.target.closest("[data-weight]");
  if (weightButton) {
    selectedWeights[Number(weightButton.dataset.weight)] = Number(weightButton.dataset.value);
    renderProducts();
    return;
  }
  const addButton = event.target.closest("[data-add]");
  if (addButton) {
    event.stopPropagation();
    const qtyInput = productGrid.querySelector(`[data-add-quantity="${addButton.dataset.add}"]`);
    const quantity = Math.max(1, Math.min(9999, Math.floor(Number(qtyInput?.value) || 1)));
    addToCart(addButton.dataset.add, addButton.dataset.selectedWeight || null, quantity);
    if (qtyInput) qtyInput.value = "1";
    return;
  }
  const card = event.target.closest("[data-product-open]");
  if (card) openProduct(card.dataset.productOpen);
});
cartItems.addEventListener("click", event => {
  const quantityButton = event.target.closest("[data-quantity]");
  const removeButton = event.target.closest("[data-remove]");
  if (quantityButton) changeQuantity(quantityButton.dataset.quantity, quantityButton.dataset.change);
  if (removeButton) removeFromCart(removeButton.dataset.remove);
});
cartItems.addEventListener("change", event => {
  const quantityInput = event.target.closest("[data-cart-quantity]");
  if (quantityInput) {
    const index = Number(quantityInput.dataset.cartQuantity);
    const item = cart[index];
    if (!item) return;
    const quantity = Math.max(1, Math.min(9999, Math.floor(Number(quantityInput.value) || 1)));
    item.quantity = quantity;
    saveCart();
    renderCart();
    showToast("Cart quantity updated.");
    return;
  }
  const weightSelect = event.target.closest("[data-cart-weight]");
  if (!weightSelect) return;
  const index = Number(weightSelect.dataset.cartWeight);
  const item = cart[index];
  if (!item) return;
  const nextWeight = Number(weightSelect.value);
  const duplicateIndex = cart.findIndex((other, i) => i !== index && other.id === item.id && other.weight === nextWeight);
  if (duplicateIndex >= 0) {
    cart[duplicateIndex].quantity = Math.min(9999, cart[duplicateIndex].quantity + item.quantity);
    cart.splice(index, 1);
  } else {
    item.weight = nextWeight;
  }
  saveCart();
  renderCart();
  showToast(`${getProduct(item.id)?.name || "Item"} timbang updated.`);
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
  else if (document.querySelector("#favoritesModal") && !document.querySelector("#favoritesModal").hidden) closeFavorites();
  else if (document.querySelector("#productDetailModal") && !document.querySelector("#productDetailModal").hidden) closeProduct();
  else if (!originModal.hidden) closeOrigin();
  else closeCart();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    if (!checkoutModal.hidden) closeCheckout();
    else if (document.querySelector("#favoritesModal") && !document.querySelector("#favoritesModal").hidden) closeFavorites();
    else if (document.querySelector("#productDetailModal") && !document.querySelector("#productDetailModal").hidden) closeProduct();
    else if (!originModal.hidden) closeOrigin();
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

// Market Finds: keep the homepage calm until the shopper chooses to explore.
const marketFindsToggle = document.querySelector("#marketFindsToggle");
const marketFindsPanel = document.querySelector("#marketFindsPanel");
if (marketFindsToggle && marketFindsPanel) {
  marketFindsToggle.addEventListener("click", () => {
    const isExpanded = marketFindsToggle.getAttribute("aria-expanded") === "true";
    marketFindsToggle.setAttribute("aria-expanded", String(!isExpanded));
    marketFindsPanel.hidden = isExpanded;
    marketFindsPanel.classList.toggle("is-opening", !isExpanded);
    marketFindsToggle.querySelector(".market-toggle-label").textContent = isExpanded ? "Explore Market Finds" : "Hide Market Finds";
    marketFindsToggle.querySelector(".market-toggle-arrow").textContent = isExpanded ? "↓" : "↑";
  });
  document.querySelectorAll(".quick-nav a[href=\"#market-finds\"]").forEach(link => {
    link.addEventListener("click", () => {
      if (marketFindsPanel.hidden) marketFindsToggle.click();
    });
  });
}

const MARKET_BUNDLES = {
  sinigang: { label: "Pang-sinigang set", ids: [1, 2, 3] },
  fruit: { label: "Fruit basket", ids: [5, 6, 7] },
  pantry: { label: "Pantry starter", ids: [11, 12] }
};
document.querySelectorAll("[data-bundle]").forEach(button => {
  button.addEventListener("click", () => {
    const bundle = MARKET_BUNDLES[button.dataset.bundle];
    if (!bundle) return;
    bundle.ids.forEach(id => addToCart(id));
    showToast(`${bundle.label} added to your basket.`);
    const original = button.innerHTML;
    button.innerHTML = "Added ✓";
    button.disabled = true;
    window.setTimeout(() => { button.innerHTML = original; button.disabled = false; }, 1200);
  });
});

// Favorites are saved locally in this browser; account-wide sync needs a backend.
const FAVORITES_KEY = "palengke-ph-favorites-v1";
const readFavorites = () => {
  try { return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]").filter(id => PRODUCTS.some(product => product.id === Number(id))).map(Number); }
  catch { return []; }
};
const updateFavoritesCount = () => {
  const count = document.querySelector("#favoritesCount");
  if (count) count.textContent = String(readFavorites().length);
};
function toggleFavorite(id) {
  const favorites = readFavorites();
  const wasSaved = favorites.includes(id);
  const next = wasSaved ? favorites.filter(savedId => savedId !== id) : [...favorites, id];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  updateFavoritesCount();
  renderProducts();
  if (document.querySelector("#favoritesModal") && !document.querySelector("#favoritesModal").hidden) renderFavorites();
  showToast(wasSaved ? "Removed from favorites." : "Saved to favorites ♡");
}
function renderFavorites() {
  const modal = document.querySelector("#favoritesModal");
  const list = document.querySelector("#favoritesList");
  const empty = document.querySelector("#favoritesEmpty");
  if (!modal || !list || !empty) return;
  const products = readFavorites().map(getProduct).filter(Boolean);
  empty.hidden = products.length > 0;
  list.hidden = products.length === 0;
  list.innerHTML = products.map(product => `
    <article class="favorite-item">
      <div class="favorite-item-photo" style="--item-bg:${product.bg}"><img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.hidden=true;this.parentElement.textContent='${product.emoji}'"></div>
      <div class="favorite-item-copy"><strong>${product.name}</strong><span>${money(product.price)} / ${product.unit}</span></div>
      <button type="button" class="favorite-add-button" data-favorite-add="${product.id}">Add +</button>
      <button type="button" class="favorite-remove-button" data-favorite-remove="${product.id}" aria-label="Remove ${product.name} from favorites">×</button>
    </article>`).join("");
}
function openFavorites() {
  renderFavorites();
  const modal = document.querySelector("#favoritesModal");
  modal.hidden = false;
  overlay.hidden = false;
  document.body.classList.add("no-scroll");
}
function closeFavorites() {
  const modal = document.querySelector("#favoritesModal");
  if (!modal) return;
  modal.hidden = true;
  if (checkoutModal.hidden && originModal.hidden && !cartDrawer.classList.contains("open") && document.querySelector("#productDetailModal")?.hidden !== false) {
    overlay.hidden = true;
    document.body.classList.remove("no-scroll");
  }
}
updateFavoritesCount();
document.querySelector("#showFavoritesBtn")?.addEventListener("click", openFavorites);
document.querySelector("#closeFavoritesBtn")?.addEventListener("click", closeFavorites);
document.querySelector("#favoritesList")?.addEventListener("click", event => {
  const add = event.target.closest("[data-favorite-add]");
  const remove = event.target.closest("[data-favorite-remove]");
  if (add) { const product = getProduct(add.dataset.favoriteAdd); addToCart(product.id, product.unit === "kg" ? 1 : null, 1); }
  if (remove) toggleFavorite(Number(remove.dataset.favoriteRemove));
});
document.querySelector("#showOrdersBtn")?.addEventListener("click", () => {
  showToast("Demo orders will appear here once order history is saved. Real order history needs an account and backend.");
});

document.querySelector("#currentYear").textContent = new Date().getFullYear();
showHeroSlide(0);
startHeroTimer();
renderProducts();
renderCart();
checkoutForm.querySelector('input[name="fulfilment"][value="delivery"]').dispatchEvent(new Event("change", { bubbles: true }));


// Lightweight reveal-on-scroll: animate once, and respect reduced-motion settings.
(() => {
  const targets = document.querySelectorAll('.trust-row, .shop-section, .market-finds, .how-it-works, .market-banner, .site-footer');
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  targets.forEach((element, index) => { element.classList.add('scroll-reveal'); element.style.setProperty('--reveal-delay', `${Math.min(index % 3, 2) * 70}ms`); });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });
  targets.forEach(element => observer.observe(element));
})();
