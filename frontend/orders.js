const token = localStorage.getItem("token");
const ordersDiv = document.getElementById("orders");

async function loadOrders() {
  if (!token) {
    ordersDiv.innerHTML = "<p>Please login to see orders</p>";
    return;
  }

  const res = await fetch("https://ekart-backend-6o5a.onrender.com/api/orders", {
    headers: { Authorization: `Bearer ${token}` }
  });

  const orders = await res.json();

  if (!orders.length) {
    ordersDiv.innerHTML = "<p>No orders yet</p>";
    return;
  }

  orders.forEach(order => {
    const div = document.createElement("div");
    div.className = "order-card";

    div.innerHTML = `
      <div class="order-header">
        <span>Order ID: ${order._id}</span>
        <span>${new Date(order.createdAt).toLocaleDateString()}</span>
      </div>

   <ul class="order-items">
  ${order.items.map(
    item => `
      <li class="order-item">
        <img src="${item.img}" />
        <span>${item.name} × ${item.qty}</span>
      </li>
    `
  ).join("")}
</ul>

      <div class="order-total">
        Total: ₹${order.total}
      </div>
    `;

    ordersDiv.appendChild(div);
  });
}

loadOrders();
