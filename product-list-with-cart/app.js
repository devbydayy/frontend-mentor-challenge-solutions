(() => {
  const productGrid = document.getElementById("productGrid");
  const cartList = document.getElementById("cartList");
  const cartCount = document.getElementById("cartCount");
  const emptyMessage = document.getElementById("emptyMessage");
  const totalEl = document.getElementById("total");
  const confirmOrderBtn = document.getElementById("confirmOrderBtn");
  const orderModal = document.getElementById("orderModal");
  const orderSummary = document.getElementById("orderSummary");
  const startAnotherBtn = document.getElementById("startAnotherBtn");

  let products = [];
  const cartState = new Map();

  async function loadData() {
    const res = await fetch("./data.json");
    products = await res.json();
    renderProducts();
  }

  function formatCurrency(n) {
    return "$" + n.toFixed(2);
  }

  function calcTotal() {
    return Array.from(cartState.values()).reduce(
      (sum, i) => sum + i.qty * i.product.price,
      0
    );
  }

  function updateTotalsUI() {
    totalEl.textContent = formatCurrency(calcTotal());
    cartCount.textContent = Array.from(cartState.values()).reduce(
      (s, i) => s + i.qty,
      0
    );
  }

  function renderProducts() {
    productGrid.innerHTML = "";
    products.forEach((p, idx) => {
      const li = document.createElement("li");
      li.className = "product-card";
      li.innerHTML = `
        <picture class="product-media">
          <source srcset="${p.image.desktop}" media="(min-width:1024px)">
          <source srcset="${p.image.tablet}" media="(min-width:600px)">
          <img src="${p.image.mobile}" alt="${p.name}">
          <button class="add-btn" data-index="${idx}">
            <img src="./images/icon-add-to-cart.svg" alt="">
            Add to Cart
          </button>
        </picture>
        <div class="product-info">
          <p class="product-category">${p.category}</p>
          <p class="product-name">${p.name}</p>
          <div class="product-bottom">
            <div class="product-price">${formatCurrency(p.price)}</div>
          </div>
        </div>
      `;
      productGrid.appendChild(li);
    });

    productGrid.querySelectorAll(".add-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = Number(btn.dataset.index);
        addToCart(index);
        renderActiveButton(index);
      });
    });
  }

  function renderActiveButton(index) {
    const media = document.querySelectorAll(".product-media")[index];
    if (!media) return;
    const oldBtn = media.querySelector(".add-btn");
    if (oldBtn) oldBtn.remove();

    const pill = document.createElement("div");
    pill.className = "qty-controls pill";
    pill.innerHTML = `
      <button class="qty-dec"><img src="./images/icon-decrement-quantity.svg" alt="Decrease"></button>
      <div class="qty-val">${cartState.get(index).qty}</div>
      <button class="qty-inc"><img src="./images/icon-increment-quantity.svg" alt="Increase"></button>
    `;

    media.appendChild(pill);

    pill.querySelector(".qty-inc").addEventListener("click", () =>
      changeQty(index, 1)
    );
    pill.querySelector(".qty-dec").addEventListener("click", () =>
      changeQty(index, -1)
    );
  }

  function addToCart(index) {
    const product = products[index];
    const existing = cartState.get(index);
    if (existing) existing.qty++;
    else cartState.set(index, { product, qty: 1 });
    renderCart();
  }

  function removeFromCart(index) {
    cartState.delete(index);
    renderCart();

    const media = document.querySelectorAll(".product-media")[index];
    if (media) {
      const addBtn = document.createElement("button");
      addBtn.className = "add-btn";
      addBtn.dataset.index = index;
      addBtn.innerHTML = `
        <img src="./images/icon-add-to-cart.svg" alt="">
        Add to Cart
      `;
      addBtn.addEventListener("click", () => {
        addToCart(index);
        renderActiveButton(index);
      });
      media.appendChild(addBtn);
    }
  }

  function changeQty(index, delta) {
    const item = cartState.get(index);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(index);
    } else {
      renderCart();
      renderActiveButton(index);
    }
  }

  function renderCart() {
    cartList.innerHTML = "";
    if (cartState.size === 0) {
      emptyMessage.style.display = "block";
    } else {
      emptyMessage.style.display = "none";
      for (const [index, item] of cartState) {
        const li = document.createElement("li");
        li.className = "cart-item";
        li.innerHTML = `
          <div class="meta">
            <p class="name">${item.product.name}</p>
            <p class="price">${item.qty}x @ ${formatCurrency(
          item.product.price
        )}</p>
          </div>
          <button class="remove-link">
            <img src="./images/icon-remove-item.svg" alt="Remove">
          </button>
        `;
        li.querySelector(".remove-link").addEventListener("click", () =>
          removeFromCart(index)
        );
        cartList.appendChild(li);
      }
    }
    updateTotalsUI();
  }

  function toggleAddToCartButtons(disable = false) {
    productGrid.querySelectorAll(".add-btn").forEach((btn) => {
      btn.disabled = disable;
    });
  }

  function resetAllAddButtons() {
    products.forEach((p, index) => {
      const media = document.querySelectorAll(".product-media")[index];
      if (!media) return;

      const qtyControls = media.querySelector(".qty-controls");
      if (qtyControls) qtyControls.remove();

      let addBtn = media.querySelector(".add-btn");
      if (!addBtn) {
        addBtn = document.createElement("button");
        addBtn.className = "add-btn";
        addBtn.dataset.index = index;
        addBtn.innerHTML = `
          <img src="./images/icon-add-to-cart.svg" alt="">
          Add to Cart
        `;
        addBtn.addEventListener("click", () => {
          addToCart(index);
          renderActiveButton(index);
        });
        media.appendChild(addBtn);
      }
    });
  }

  function confirmOrder() {
    if (cartState.size === 0) return;
    const total = calcTotal();
    orderSummary.innerHTML = `
      <ul class="cart-list">
        ${Array.from(cartState.values())
          .map(
            (item) => `
            <li class="cart-item">
              <img src="${item.product.image.thumbnail}" alt="${item.product.name}" style="width:40px;height:40px;border-radius:6px;">
              <div class="meta">
                <p class="name">${item.product.name}</p>
                <p class="price">${item.qty}x @ ${formatCurrency(
              item.product.price
            )}</p>
              </div>
              <strong>${formatCurrency(item.qty * item.product.price)}</strong>
            </li>
          `
          )
          .join("")}
      </ul>
      <div class="total-line" style="margin-top:12px;">
        <span>Order Total</span>
        <strong>${formatCurrency(total)}</strong>
      </div>
    `;
    orderModal.setAttribute("aria-hidden", "false");

    toggleAddToCartButtons(true);
  }

  confirmOrderBtn.addEventListener("click", confirmOrder);

  startAnotherBtn.addEventListener("click", () => {
    cartState.clear();
    renderCart();
    orderModal.setAttribute("aria-hidden", "true");

    toggleAddToCartButtons(false);
    resetAllAddButtons(); 
  });

  loadData();
})();
