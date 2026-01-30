console.log("✅ admin.js loaded");

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!user || user.role !== "admin") {
  alert("Admin access only");
  window.location.href = "index.html";
}

/* =========================
   LOAD ALL PRODUCTS
========================= */
async function loadProducts() {
  console.log("loadProducts() called");

  const res = await fetch("https://ekart-backend-6o5a.onrender.com/api/admin/products", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  console.log("Status:", res.status);

  if (!res.ok) {
    const error = await res.json();
    alert(error.message || "Failed to load products");
    return;
  }

  const products = await res.json();

  const productsDiv = document.getElementById("adminProducts");
  productsDiv.innerHTML = "";

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "admin-product";

    div.innerHTML = `
      <img src="${p.img}" />
      <div class="admin-info">
        <h4>${p.name}</h4>
        <p>₹${p.price}</p>
        <small>${p.category}</small>
      </div>
      <button onclick="deleteProduct('${p._id}')">Delete</button>

    `;

    productsDiv.appendChild(div);
  });
}

/* =========================
   ADD PRODUCT
========================= */
async function addProduct() {
  const msg = document.getElementById("adminMsg");

  const name = document.getElementById("name").value.trim();
  const price = document.getElementById("price").value.trim();
  const category = document.getElementById("category").value.trim();
  const img = document.getElementById("img").value.trim();

  if (!name || !price || !category || !img) {
    msg.textContent = "All fields are required";
    msg.style.color = "red";
    return;
  }

  const res = await fetch("https://ekart-backend-6o5a.onrender.com/api/admin/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      name,
      price: Number(price),
      category,
      img
    })
  });

  const data = await res.json();

  if (!res.ok) {
    msg.textContent = data.message || "Failed to add product";
    msg.style.color = "red";
    return;
  }

  msg.textContent = "✅ Product added successfully";
  msg.style.color = "green";

  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("category").value = "";
  document.getElementById("img").value = "";

  loadProducts(); // 🔥 refresh list
}

/* =========================
   DELETE PRODUCT
========================= */


async function deleteProduct(id) {
  const msg = document.getElementById("deleteMsg");
  msg.textContent = "Deleting product...";
  msg.style.color = "#555";

  const res = await fetch(`https://ekart-backend-6o5a.onrender.com/api/admin/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();

  if (!res.ok) {
    msg.textContent = data.message || "Failed to delete product";
    msg.style.color = "red";
    return;
  }

  msg.textContent = "🗑️ Product deleted successfully";
  msg.style.color = "green";

  loadProducts();

  setTimeout(() => {
    msg.textContent = "";
  }, 3000);
}

/* =========================
   INITIAL LOAD
========================= */
loadProducts();

async function loadStats() {
  const res = await fetch("https://ekart-backend-6o5a.onrender.com/api/admin/stats", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) return;

  const data = await res.json();

  document.getElementById("statProducts").innerText = data.totalProducts;
  document.getElementById("statOrders").innerText = data.totalOrders;
  document.getElementById("statUsers").innerText = data.totalUsers;
  
}
loadStats();
