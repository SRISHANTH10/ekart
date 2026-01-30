// ===== CART STATE =====
let cart = [];
const token = localStorage.getItem("token");

// ===== LOAD CART FROM SERVER =====
async function loadCart() {
  if (!token) return;

  const res = await fetch("https://ekart-backend-6o5a.onrender.com/api/cart", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();

  cart = data.map(item => ({
    id: item.productId._id,
    name: item.productId.name,
    price: item.productId.price,
    img: item.productId.img,
    qty: item.qty
  }));

  updateCartUI();
}
loadCart();

// ===== ADD TO CART =====
function addToCart(product) {
  if (!token) {
    showToast("Please login to add items to cart");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1200);
    return;
  }

  const item = cart.find(i => i.id === product._id);

  if (item) {
    item.qty += 1;
    showToast("Quantity updated in cart");
  } else {
    cart.push({
      id: product._id,
      name: product.name,
      price: product.price,
      img: product.img,
      qty: 1
    });
    showToast("🛒 Added to cart");
  }

  updateCartUI();
  saveCartToServer();
}

// ===== UPDATE UI =====
function updateCartUI() {
  updateCartCount();
  renderCart();
  updateCheckoutButton();
}

// ===== COUNT =====
function updateCartCount() {
  document.getElementById("cartCount").innerText =
    cart.reduce((s, i) => s + i.qty, 0);
}

// ===== RENDER CART =====
function renderCart() {
  const cartItemsDiv = document.getElementById("cartItems");
  const totalDiv = document.getElementById("total");

  cartItemsDiv.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = `
      <div class="empty-cart">
        🛒 Your cart is empty<br>
        <small>Start adding items</small>
      </div>
    `;
    totalDiv.innerText = 0;
    return;
  }

  cart.forEach(item => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.img}" />
      <div class="cart-info">
        <strong>${item.name}</strong>
        <p>₹${item.price}</p>

        <div class="cart-actions">
          <button onclick="decreaseQty('${item.id}')">−</button>
          <span>${item.qty}</span>
          <button onclick="increaseQty('${item.id}')">+</button>
          <button class="remove-btn" onclick="removeItem('${item.id}')">Remove</button>
        </div>
      </div>
    `;

    cartItemsDiv.appendChild(div);
  });

  totalDiv.innerText = total;
}

// ===== QTY CONTROLS =====
function increaseQty(id) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty++;
  updateCartUI();
  saveCartToServer();
}

function decreaseQty(id) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty--;
  if (item.qty <= 0) {
    removeItem(id);
  } else {
    updateCartUI();
    saveCartToServer();
  }
}

// ===== REMOVE ITEM =====
function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
  saveCartToServer();
}

// ===== SAVE CART TO SERVER =====
async function saveCartToServer() {
  if (!token) return;

  for (const item of cart) {
    await fetch("https://ekart-backend-6o5a.onrender.com/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        productId: item.id,
        qty: item.qty
      })
    });
  }
}

// ===== CHECKOUT =====
async function checkout() {
  const msg = document.getElementById("checkoutMessage");

  if (!token) {
    msg.textContent = "Please login to checkout";
    msg.style.color = "#d93025";
    return;
  }

  const res = await fetch("https://ekart-backend-6o5a.onrender.com/api/orders", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();

  if (res.ok) {
    cart = [];
    updateCartUI();
    msg.textContent = "✅ Order placed successfully!";
    msg.style.color = "#188038";

    setTimeout(() => {
      toggleCart();
      msg.textContent = "";
    }, 1500);
  } else {
    msg.textContent = data.message || "Checkout failed";
    msg.style.color = "#d93025";
  }
}

// ===== TOAST =====
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

// ===== CHECKOUT BUTTON =====
function updateCheckoutButton() {
  const checkoutBtn = document.querySelector(".checkout");
  if (!checkoutBtn) return;

  checkoutBtn.disabled = cart.length === 0;
}

// ===== CART TOGGLE =====
function toggleCart() {
  document.getElementById("cartModal").classList.toggle("active");
}
