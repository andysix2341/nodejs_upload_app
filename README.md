# Basic CRUD Application

A full-stack application with React (TypeScript) frontend and Node.js (TypeScript) backend for basic CRUD operations with user management and image upload capabilities.

## Features

### Backend (Node.js/Express)
- **RESTful API** with TypeScript
- **Prisma ORM** for PostgreSQL/MySQL/SQLite
- **Multer** for image upload handling
- **Endpoints**:
  - `POST /register` - Create new user with image upload
  - `GET /users` - Get all users
  - `GET /user/:id` - Get single user
  - `PUT /user/:id` - Update user
  - `DELETE /user/:id` - Delete user

### Frontend (React)
- **React Query** (TanStack) for data fetching and state management
- **React Router** for navigation
- **Axios** for HTTP requests
- **Pages**:
  - `/register-page` - User registration form
  - `/data-page` - List all users
  - `/data-page/:user_id` - User detail and edit page
  - `*` - 404 Not Found page

## Technologies

- **Backend**:
  - Node.js
  - Express
  - TypeScript
  - Prisma
  - Multer

- **Frontend**:
  - React (TypeScript)
  - React Query
  - Axios
  - React Router
  - Tailwind CSS (or your preferred CSS framework)

## Installation

### Prerequisites
- Node.js (v18+)
- npm (v9+)
- Database (MySQL)

### Backend Setup
1. Navigate to backend directory:
    ```bash
   cd backend  
2. Install dependencies:
    ```bash
    npm install
3. Configure environment variables (create .env file):
    ```bash
    DATABASE_URL="your_database_url"
    PORT=YOUR_PORT(INTEGER)
4. Run Prisma migrations:
    ```bash
    npx prisma migrate dev
5. Start server:
    ```bash
    npm run devStart

### Frontend Setup
1. Navigate to frontend directory:
    ```bash
    cd frontend
2. Install dependencies:
    ```bash
    npm install
3. Start application:
    ```bash
    npm run dev
    ```

### Project Structre
### Backend
    backend/
    ├── custom.d.ts
    ├── package-lock.json
    ├── package.json
    ├── prisma
    └── src/
        ├── Routes/
        │   ├── manageUserData.ts
        │   ├── userRegister.ts
        │   └── util
        │       ├── fileUpload.ts
        │       └── handlePrisma.ts
        └── server.ts
    
### Frontend
    client
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── public
    ├── src
    │   ├── App.tsx
    │   ├── custom.d.ts
    │   ├── handleApi.ts
    │   ├── main.tsx
    │   ├── pages
    │   │   ├── DisplayAllData.tsx
    │   │   ├── EditPage.tsx
    │   │   ├── NotFound.tsx
    │   │   └── RegisterPage.tsx
    │   ├── style.css
    │   └── vite-env.d.ts
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts

### Endpoints
|Method | Endpoint	| Description | Request Body |
| ----- | --------  | ----------- | ------------ |
|POST	| /register	| Create new user |	FormData (name, email, bio, image) |
|GET	 |/users |	Get all users	- |
|GET	| /user/:id |	Get single user	- |
|PUT	|/user/:id |	Update user |	JSON (name, email, bio) + optional image |
|DELETE	| /user/:id	| Delete user	- |
