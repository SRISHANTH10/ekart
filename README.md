#  eKart – Full Stack E-Commerce Web Application

eKart is a full-stack e-commerce web application inspired by platforms like Amazon.  
It allows users to browse products, manage carts, place orders, and provides an admin dashboard to manage products, users, and orders.

Link of live demo
https://ekart10.netlify.app/



#  Tech Stack

# Frontend
- HTML5  
- CSS3  
- JavaScript (Vanilla JS)

# Backend
- Node.js  
- Express.js  
- MongoDB (Atlas)  
- JWT Authentication  

# Tools & Services
- Git & GitHub  
- Postman (API Testing)  
- Render (Backend Deployment)  
- Netlify (Frontend Deployment)

---

# Features

# User Features
- User Signup & Login (JWT Authentication)
- Browse products with images
- Search products by name
- Filter products by category
- Sort products by price (Low → High, High → Low)
- Add products to cart
- Increase / decrease product quantity
- Persistent cart per logged-in user
- Checkout and place orders
- View personal orders

---

# Admin Features
- Secure admin login
- Admin dashboard
- Add new products (with image URL)
- Delete products
- View all users
- View all orders

---

##  Authentication & Authorization
- JWT-based authentication
- Role-based access control (`user` / `admin`)
- Protected routes for cart, orders, and admin operations

---

##  Project Structure
│
├── frontend/
│ ├── index.html
│ ├── login.html
│ ├── signup.html
│ ├── admin.html
│ ├── orders.html
│ ├── style.css
│ ├── script.js
│ ├── cart.js
│
├── backend/
│ ├── server.js
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ ├── package.json
│
├── .gitignore
└── README.md

# API Testing
- APIs tested using Postman
- includes endpoints for:
  - Authentication (Signup/Login)
  - Produts
  - Cart
  - Orders
  - Admin operations

# Backend Setup
 - cd backend
 - npm install

create a .env file inside backend/:
  MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000

run the backend server
  node server.js
# frontend setup  
- Open frontend/index.html using Live Server or browser

- Make sure API URLs point to:
  http://localhost:3000
  


# Author

- Srishanth Guguloth

- GitHub: https://github.com/SRISHANTH10

- LinkedIn: https://www.linkedin.com/in/srishanth-guguloth-26613b381/

