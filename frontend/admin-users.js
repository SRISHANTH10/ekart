const token = localStorage.getItem("token");
const currentUser = JSON.parse(localStorage.getItem("user"));

async function loadUsers() {
  const res = await fetch("https://ekart-backend-6o5a.onrender.com/api/admin/users", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const users = await res.json();
  const container = document.getElementById("users");

  container.innerHTML = "";

  users.forEach(u => {
    const div = document.createElement("div");
    div.className = "admin-card";

    let button = "";

    // prevent changing own role
    if (u._id !== currentUser.id) {
      button = `
        <button onclick="changeRole('${u._id}', '${u.role === "admin" ? "user" : "admin"}')">
          Make ${u.role === "admin" ? "User" : "Admin"}
        </button>
      `;
    }

    div.innerHTML = `
      <p><strong>${u.name}</strong></p>
      <p>${u.email}</p>
      <p>Role: <b>${u.role}</b></p>
      ${button}
    `;

    container.appendChild(div);
  });
}

async function changeRole(id, role) {
  const res = await fetch(
    `https://ekart-backend-6o5a.onrender.com/api/admin/users/${id}/role`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ role })
    }
  );

  const data = await res.json();

  if (!res.ok) {
    alert(data.message || "Failed to update role");
    return;
  }

  loadUsers(); // refresh list
}

loadUsers();
