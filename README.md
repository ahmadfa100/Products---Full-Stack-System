# 🛒 ProductHub

A modern full-stack **PERN** product management system built with **PostgreSQL, Express.js, React.js, and Node.js**.

The application includes authentication, protected routes, product CRUD operations, image upload, responsive UI, and a clean dashboard-style layout.

---

## ✨ Features

- 🔐 User authentication with JWT
- 🧾 Register and login pages with validation
- 🛡️ Protected routes
- 📦 Product CRUD operations
- 🖼️ Product image upload from device
- 🏠 Home page displaying products from the backend API
- 🧭 Responsive navbar and toggle sidebar
- 📱 Responsive design for desktop, tablet, and mobile
- ⚠️ Loading states and error handling
- 🎨 Clean Material UI interface

---

## 🧰 Technologies Used

### Frontend

- React.js
- Vite
- Material UI
- React Router
- Axios
- Context API

### Backend

- Node.js
- Express.js
- PostgreSQL
- pg
- bcryptjs
- jsonwebtoken
- multer
- dotenv
- cors

---

## 📁 Folder Structure
```
Products-System/
│
├── client/
│   └── src/
│       ├── api/
│       │   └── axios.js
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Sidebar.jsx
│       │   ├── Footer.jsx
│       │   └── ProtectedRoute.jsx
│       ├── context/
│       │   └── AuthContext.jsx
│       ├── layouts/
│       │   └── MainLayout.jsx
│       ├── pages/
│       │   ├── Login.jsx
│       │   ├── Register.jsx
│       │   ├── Home.jsx
│       │   └── ManageProducts.jsx
│       ├── App.jsx
│       └── main.jsx
│
└── server/
    ├── uploads/
    └── src/
        ├── config/
        │   └── db.js
        ├── controllers/
        │   ├── authController.js
        │   └── productController.js
        ├── data/
        │   ├── userTable.js
        │   └── productTable.js
        ├── middlewares/
        │   ├── authMiddleware.js
        │   ├── errorMiddleware.js
        │   └── uploadMiddleware.js
        ├── models/
        │   ├── userModel.js
        │   └── productModel.js
        ├── routes/
        │   ├── authRoutes.js
        │   └── productRoutes.js
        └── index.js
```
---

## ⚙️ Project Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd Products-System
```

---

## 🖥️ Backend Setup

Go to the server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` folder:

```env
PORT=3001
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=products_system

JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
```

Create a PostgreSQL database named:

```txt
products_system
```

Start the backend server:

```bash
npm run dev
```

The backend will run on:

```txt
http://localhost:3001
```

---

## 🌐 Frontend Setup

Go to the client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run on:

```txt
http://localhost:5173
```

---

## 🔌 API Documentation

### Authentication Routes

#### Register

```http
POST /api/auth/register
```

Body:

```json
{
  "name": "Ahmad",
  "email": "ahmad@test.com",
  "password": "123456",
  "confirmPassword": "123456"
}
```

---

#### Login

```http
POST /api/auth/login
```

Body:

```json
{
  "email": "ahmad@test.com",
  "password": "123456"
}
```

---

#### Get Current User

```http
GET /api/auth/me
```

Requires Bearer Token:

```http
Authorization: Bearer <token>
```

---

### Product Routes

#### Get All Products

```http
GET /api/products
```

---

#### Get Product By ID

```http
GET /api/products/:id
```

---

#### Create Product

```http
POST /api/products
```

Requires Bearer Token.

Form Data:

```txt
title
description
price
category
stock
image
```

---

#### Update Product

```http
PUT /api/products/:id
```

Requires Bearer Token.

Form Data:

```txt
title
description
price
category
stock
image
old_image_url
```

---

#### Delete Product

```http
DELETE /api/products/:id
```

Requires Bearer Token.

---

## 🧪 Main Application Pages

### `/login`

Login page with email/password validation and error handling.

### `/register`

Register page with required field validation and password confirmation.

### `/home`

Protected page that fetches and displays products from the backend API.

### `/manage-products`

Protected page for creating, updating, and deleting products.

---

## ✅ Assessment Requirements Covered

* React.js frontend
* Material UI
* React Router
* Responsive layout
* Login and register pages
* Home page with backend API data
* Manage Data page with CRUD operations
* Navbar
* Toggle sidebar/drawer
* Footer
* Protected routes
* REST API
* PostgreSQL database integration
* Controllers, routes, middlewares, models, and database layer
* Validation and error handling
* Image upload bonus

---

## 👨‍💻 Author

**Ahmad Bani Hamad**
Full-Stack Developer
