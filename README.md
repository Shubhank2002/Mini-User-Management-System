# Project Overview & Purpose
This project is a Mini User Management System built to demonstrate full-stack authentication and user handling using the MERN stack.
It supports user signup, login, authentication using JWT (stored in cookies), protected routes, and secure API access. 

## Tech Stack Used
### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt

### tools
- Postman (API testing)
- Git and GitHub

## Setup Instructions
### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or Atlas)
- Git
### Backend Setup
```bash
cd Backend
npm install
```
- Create a .env file in the Backend folder.
- Start server
- ```bash
  node Server.js
  ```
### Frontend Setup
```bash
cd Frontend/vite-project
npm run dev
```
- Frontend will run at:
 ```bash
  http://localhost:5173
```
## Roles & Access Control
### User Roles
- This application supports role-based access control.
### Roles
- User – Can register, login, view own profile, update profile, change password, logout
- Admin – Can access admin-only APIs and manage users ,update profile, change password, logout, login
## Environment Variables
### Backend .env
```bash
PORT=
MONGO_URI=
JWT_SECRET=
```
### Frontend .env
```bash
VITE_API_URL
```
## API Documentation
### Authentication APIs
- User Signup Endpoint
  ```bash
  POST /api/auth/signup
  ```
- Request Body
```json
  {
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
  }
```
- User Login Endpoint
  ```bash
  POST /api/auth/login
  ```
- Request Body
  ```json
   {
  "email": "john@example.com",
  "password": "password123"
  }
  ```
- Get Current User (Protected) Endpoint
  ```bash
  GET /api/auth/me
  ```
- Headers
  ```bash
  Cookie: token=jwt_token
  ```
- Response
  ```json
   {
  "success": true,
  "user": {
    "_id": "123",
    "fullName": "John Doe",
    "email": "john@example.com"
    }
  }
  ```
- User Logout Endpoint
  ```bash
  POST /api/auth/logout
  ```
- Response
  ```json
  {
  "success": true,
  "message": "Logged out successfully"
  }
  ```
### Admin APIs
- Get All Users (Admin Only) Endpoint
  ```bash
  GET /api/admin/users
  ```
- Admin role required
- Protected route
- Update User Status (Admin Only) Endpoint
  ```bash
  Patch /api/admin/user/:id/deactivate
  ```
## API Testing
- APIs tested using Postman
## Features Implemented
- User Signup & Login
- Protected routes
 ## Author
  ### Shubhank Maheshwari
  ### MERN Stack Developer
  
