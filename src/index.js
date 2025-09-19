const API_URL = 'https://api.escuelajs.co/api/v1/products';
const PLACEHOLDER_IMG = 'https://placehold.co/600x400?text=Sin+Imagen';
const CURRENCY = 'USD';
const LOCALE = 'es-ES';

// Estado
const state = {
  products: [],
  filtered: [],
  cart: new Map(),     // id -> qty
  favs: new Set(),     // id
  query: '',
  category: 'all',
  sort: 'default'
};

// DOM
const grid = document.getElementById('grid');
const toasts = document.getElementById('toasts');
const btnMenu = document.getElementById('btnMenu');
const btnCloseMenu = document.getElementById('btnCloseMenu');
const drawer = document.getElementById('mobileMenu');
const backdrop = document.getElementById('backdrop');
const searchInput = document.getElementById('searchInput');
const searchInputMobile = document.getElementById('searchInputMobile');
const sortSelect = document.getElementById('sortSelect');
const cartBadge = document.getElementById('cartBadge');
const favBadge = document.getElementById('favBadge');

const fmtCurrency = (n) => new Intl.NumberFormat(LOCALE, { style: 'currency', currency: CURRENCY, maximumFractionDigits: 0 }).format(Number(n) || 0);

// Networking
const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('Error fetching products:', err);
    toast('No se pudieron cargar los productos', 'error');
    return [];
  }
};

// Imagen segura (evitar Imgur si está bloqueado)
const pickSafeImage = (images) => {
  if (!Array.isArray(images)) return PLACEHOLDER_IMG;
  const nonImgur = images.find(u => typeof u === 'string' && /^https?:\/\//i.test(u) && !/imgur\.com/i.test(u));
  if (nonImgur) return nonImgur;
  const any = images.find(u => typeof u === 'string' && /^https?:\/\//i.test(u));
  return any || PLACEHOLDER_IMG;
};

// UI helpers
// Nota: En Tailwind v4 las utilidades de translate usan la propiedad CSS `translate`.
// No mezclar con `style.transform`, porque ambas se acumulan y el panel puede quedar oculto.
const openMenu = () => {
  drawer?.classList.remove('-translate-x-full');
  // Opcional: asegurar estado accesible
  drawer?.setAttribute('aria-hidden', 'false');
  backdrop?.classList.remove('pointer-events-none');
  requestAnimationFrame(() => backdrop?.classList.add('opacity-100'));
};
const closeMenu = () => {
  drawer?.classList.add('-translate-x-full');
  drawer?.setAttribute('aria-hidden', 'true');
  backdrop?.classList.add('pointer-events-none');
  backdrop?.classList.remove('opacity-100');
};
const toast = (msg, type = 'info') => {
  const el = document.createElement('div');
  el.className = `glass rounded-xl px-4 py-2 text-sm shadow-xl ${type === 'error' ? 'ring-1 ring-red-500/30' : 'ring-1 ring-white/10'}`;
  el.textContent = msg;
  toasts.appendChild(el);
  setTimeout(() => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(6px)';
    setTimeout(() => el.remove(), 200);
  }, 1400);
};

const renderSkeletons = (n = 8) => {
  grid.innerHTML = Array.from({ length: n }).map(() => `
    <article class="group rounded-2xl overflow-hidden glass ring-1 ring-white/10">
      <div class="aspect-[4/3] shimmer"></div>
      <div class="p-3 space-y-2">
        <div class="h-4 w-3/4 shimmer rounded"></div>
        <div class="h-4 w-1/3 shimmer rounded"></div>
        <div class="h-9 w-full shimmer rounded-lg"></div>
      </div>
    </article>
  `).join('');
};

const card = (p) => {
  const imgUrl = pickSafeImage(p.images);
  const title = p?.title ?? 'Producto';
  const price = p?.price ?? 0;
  const cat = p?.category?.name ?? 'general';
  const isFav = state.favs.has(p.id);
  return `
  <article class="group rounded-2xl overflow-hidden glass ring-1 ring-white/10 transition duration-300 hover:-translate-y-0.5 hover:ring-white/20">
    <div class="relative">
      <figure class="aspect-[4/3] overflow-hidden">
        <img src="${imgUrl}" alt="${title}" loading="lazy" referrerpolicy="no-referrer"
             onerror="this.onerror=null;this.src='${PLACEHOLDER_IMG}'"
             class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"/>
      </figure>
      <button aria-label="Favorito" data-action="fav" data-id="${p.id}"
        class="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/30 hover:bg-black/40 ring-1 ring-white/20 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ${isFav ? 'text-pink-400' : 'text-white/80'}" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.645 20.91 2.4 12.357a5.998 5.998 0 0 1 8.487-8.487l.113.112.113-.112a5.998 5.998 0 0 1 8.487 8.487L11.645 20.91Z"/>
        </svg>
      </button>
      <span class="absolute left-2 top-2 rounded-full bg-white/15 backdrop-blur px-2 py-0.5 text-xs">${cat}</span>
    </div>
    <div class="p-3">
      <h3 class="text-sm font-medium text-balance line-clamp-2 min-h-[2.5rem]">${title}</h3>
      <div class="mt-1 flex items-center justify-between">
        <span class="text-lg font-semibold">${fmtCurrency(price)}</span>
      </div>
      <div class="mt-3">
        <button data-action="add" data-id="${p.id}" class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500/90 hover:bg-sky-500 text-white px-3 py-2 text-sm font-medium transition">
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
        </svg>

          Añadir al carrito
        </button>
      </div>
    </div>
  </article>`;
};

const applyFilters = () => {
  const q = state.query.trim().toLowerCase();
  let data = [...state.products];

  if (state.category !== 'all') {
    data = data.filter(p => (p.category?.slug || p.category?.name || '').toLowerCase() === state.category);
  }
  if (q) {
    data = data.filter(p =>
      (p.title || '').toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q)
    );
  }
  if (state.sort === 'price-asc') data.sort((a, b) => (a.price || 0) - (b.price || 0));
  if (state.sort === 'price-desc') data.sort((a, b) => (b.price || 0) - (a.price || 0));

  state.filtered = data;
};

const render = () => {
  if (!Array.isArray(state.filtered) || state.filtered.length === 0) {
    grid.innerHTML = `<div class="col-span-full text-center text-slate-300 py-10">No hay productos para mostrar.</div>`;
    return;
  }
  grid.innerHTML = state.filtered.map(card).join('');
};

const updateBadges = () => {
  const cartCount = [...state.cart.values()].reduce((a, b) => a + b, 0);
  const favCount = state.favs.size;

  if (cartCount > 0) {
    cartBadge.textContent = String(cartCount);
    cartBadge.classList.remove('hidden');
  } else cartBadge.classList.add('hidden');

  if (favCount > 0) {
    favBadge.textContent = String(favCount);
    favBadge.classList.remove('hidden');
  } else favBadge.classList.add('hidden');
};

// Eventos
const onGridClick = (e) => {
  const btn = e.target.closest('button[data-action]');
  if (!btn) return;
  const id = Number(btn.dataset.id);
  const product = state.products.find(p => p.id === id);
  if (!product) return;

  if (btn.dataset.action === 'add') {
    state.cart.set(id, (state.cart.get(id) || 0) + 1);
    updateBadges();
    toast(`Añadido: ${product.title}`);
  }
  if (btn.dataset.action === 'fav') {
    if (state.favs.has(id)) state.favs.delete(id); else state.favs.add(id);
    updateBadges();
    // Re-render ícono corazón
    const cardEl = btn.closest('article');
    if (cardEl) {
      cardEl.outerHTML = card(product);
    } else {
      render();
    }
  }
};

const wireHeader = () => {
  btnMenu?.addEventListener('click', openMenu);
  btnCloseMenu?.addEventListener('click', closeMenu);
  backdrop?.addEventListener('click', closeMenu);

  const syncQuery = (v) => {
    state.query = v;
    applyFilters();
    render();
  };
  searchInput?.addEventListener('input', (e) => syncQuery(e.target.value));
  searchInputMobile?.addEventListener('input', (e) => syncQuery(e.target.value));

  sortSelect?.addEventListener('change', (e) => {
    state.sort = e.target.value;
    applyFilters();
    render();
  });

  document.querySelectorAll('[data-filter]').forEach(el => {
    el.addEventListener('click', () => {
      state.category = el.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(n => n.classList.remove('bg-white/10'));
      el.classList.add('bg-white/10');
      applyFilters();
      render();
    });
  });
};

const init = async () => {
  renderSkeletons(12);
  wireHeader();
  const data = await fetchData(API_URL);
  state.products = data;
  applyFilters();
  render();
};

document.addEventListener('DOMContentLoaded', () => {
  grid?.addEventListener('click', onGridClick);
  init();
});

