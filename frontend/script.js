/* ================= AUTH UI ================= */
const authArea = document.getElementById("authArea");
const user = JSON.parse(localStorage.getItem("user"));

if (user) {
  authArea.innerHTML = `
    <span>Hello, ${user.name}</span>
    <a href="orders.html">My Orders</a>
    ${user.role === "admin" ? `<a href="admin.html">Admin</a>` : ""}
    <a href="#" onclick="logout()">Logout</a>
  `;
} else {
  authArea.innerHTML = `
    <a href="login.html">Login</a>
    <a href="signup.html">Signup</a>
  `;
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

/* ================= MAIN ================= */
document.addEventListener("DOMContentLoaded", () => {

  let productData = [];
  let currentProducts = []; // ✅ IMPORTANT (for sorting)

  const productsDiv = document.getElementById("products");
  const searchInput = document.getElementById("search");
  const categoryNav = document.getElementById("categoryNav");
  const sortSelect = document.getElementById("sort");

  /* ===== LOAD PRODUCTS ===== */
  fetch("https://ekart-backend-6o5a.onrender.com/api/products")
    .then(res => res.json())
    .then(data => {
      productData = data;
      currentProducts = [...productData];
      renderProducts(currentProducts);
    })
    .catch(err => console.error("Failed to load products:", err));

  /* ===== RENDER PRODUCTS ===== */
  function renderProducts(list) {
    productsDiv.innerHTML = "";

    list.forEach(product => {
      const div = document.createElement("div");
      div.className = "product";

      const isLoggedIn = !!localStorage.getItem("token");

      div.innerHTML = `
        <img src="${product.img}" />
        <h3>${product.name}</h3>
        <div class="price">₹${product.price}</div>
        <button ${!isLoggedIn ? "disabled" : ""}>
          ${isLoggedIn ? "Add to Cart" : "Login to add"}
        </button>
      `;

      div.querySelector("button").onclick = () => addToCart(product);
      productsDiv.appendChild(div);
    });
  }

  /* ===== SEARCH ===== */
  if (searchInput) {
    searchInput.addEventListener("input", e => {
      const value = e.target.value.toLowerCase();
      currentProducts = productData.filter(p =>
        p.name.toLowerCase().includes(value)
      );
      applySortAndRender();
    });
  }

  /* ===== CATEGORY FILTER ===== */
  if (categoryNav) {
    categoryNav.addEventListener("click", e => {
      if (e.target.tagName !== "SPAN") return;

      document.querySelectorAll("nav span")
        .forEach(span => span.classList.remove("active"));
      e.target.classList.add("active");

      const category = e.target.dataset.category;

      currentProducts =
        category === "all"
          ? [...productData]
          : productData.filter(p => p.category === category);

      applySortAndRender();
    });
  }

  /* ===== SORT ===== */
  if (sortSelect) {
    sortSelect.addEventListener("change", applySortAndRender);
  }

  function applySortAndRender() {
    let sorted = [...currentProducts];

    if (sortSelect.value === "low-high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortSelect.value === "high-low") {
      sorted.sort((a, b) => b.price - a.price);
    }

    renderProducts(sorted);
  }

});
