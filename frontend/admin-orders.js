const token = localStorage.getItem("token");

async function loadOrders() {
  const res = await fetch("https://ekart-backend-6o5a.onrender.com/api/admin/orders", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const orders = await res.json();
  const container = document.getElementById("orders");

  container.innerHTML = "";

  orders.forEach(order => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${order._id.slice(-6)}</td>
      <td>
        ${order.user?.name}<br>
        <small>${order.user?.email}</small>
      </td>
      <td>
        ${order.items.map(i => `${i.name} × ${i.qty}`).join("<br>")}
      </td>
      <td>${new Date(order.createdAt).toLocaleDateString()}</td>
    `;

    container.appendChild(tr);
  });
}

loadOrders();
