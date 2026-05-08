# Full Stack Task Management System

A modern Full Stack Task Management Application built using the MERN Stack with JWT Authentication, Role-Based Access Control (RBAC), Admin Dashboard, and CRUD Operations.

---

# Features

## Authentication & Security

- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcryptjs
- Protected Routes
- Role-Based Access Control (User/Admin)
- Secure Token Handling

---

## User Features

- Register account
- Login securely
- Create tasks
- Update tasks
- Delete tasks
- View own tasks
- Logout

---

## Admin Features

- View all users
- Promote User → Admin
- Demote Admin → User
- Delete users
- Delete all tasks of deleted user
- Admin Dashboard Stats

---

## Task Management

- Create Task
- Edit Task
- Delete Task
- Task Title & Description
- Beautiful Confirmation Popups
- Toast Notifications

---

# Tech Stack

## Frontend

- React.js
- React Router DOM
- React Hot Toast
- SweetAlert2
- CSS3

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- dotenv
- cors

---

# Project Structure

```bash
project-root/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │  
│   │── server.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# Installation

## 1. Clone Repository

```bash
git clone <your-github-repo-link>
```

---

# Backend Setup

## Navigate to backend

```bash
cd backend
```

## Install dependencies

```bash
npm install
```

## Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

## Run backend

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Frontend Setup

## Navigate to frontend

```bash
cd frontend
```

## Install dependencies

```bash
npm install
```

## Run frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# API Endpoints

## Authentication

### Register User

```http
POST /api/v1/auth/register
```

### Login User

```http
POST /api/v1/auth/login
```

---

## Tasks

### Get Tasks

```http
GET /api/v1/tasks
```

### Create Task

```http
POST /api/v1/tasks
```

### Update Task

```http
PUT /api/v1/tasks/:id
```

### Delete Task

```http
DELETE /api/v1/tasks/:id
```

---

## Users (Admin Only)

### Get All Users

```http
GET /api/v1/users
```

### Change User Role

```http
PUT /api/v1/users/:id/role
```

### Delete User

```http
DELETE /api/v1/users/:id
```

---

# Security Features

- JWT Authentication
- Protected APIs
- Password Hashing
- Role-Based Authorization
- Ownership Validation
- Admin Restrictions
- Secure Environment Variables

---

# Scalability Notes

This project follows a modular and scalable architecture:

- Separate controllers, routes, middleware, and models
- JWT-based stateless authentication
- MongoDB Atlas cloud database
- Easy integration of Redis caching
- Can be extended into microservices architecture
- Ready for Docker deployment
- Suitable for load balancing and horizontal scaling

---

# Deployment

## Recommended Platforms

### Frontend

- Vercel

### Backend

- Render

### Database

- MongoDB Atlas

---

# Author

Jatin Kumar

---

# Assignment Highlights

✅ REST API Design

✅ Authentication & Authorization

✅ CRUD Operations

✅ Role-Based Access

✅ Frontend Integration

✅ Modern UI/UX

✅ Scalable Architecture

✅ Deployment Ready
