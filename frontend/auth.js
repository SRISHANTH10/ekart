const API = "https://ekart-backend-6o5a.onrender.com/api/auth";

async function signup() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("signupMessage");

  msg.textContent = "";
  msg.className = "message";

  const res = await fetch(`${API}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();

  if (res.ok) {
    msg.textContent = "Signup successful! Redirecting to login...";
    msg.classList.add("success");

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  } else {
    msg.textContent = data.message || "Signup failed";
    msg.classList.add("error");
  }
}


async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const msg = document.getElementById("loginMessage");

  msg.textContent = "";
  msg.className = "message";

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    msg.textContent = "Login successful! Redirecting...";
    msg.classList.add("success");

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1200);
  } else {
    msg.textContent = data.message || "Login failed";
    msg.classList.add("error");
  }
}
