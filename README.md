# StoreRate — Store Rating Platform

A full-stack web application that allows users to submit ratings for registered stores. Built with React, Node.js, Express, PostgreSQL, and Prisma ORM.

---

## Tech Stack

**Frontend:** React, TypeScript, Tailwind CSS, shadcn/ui  
**Backend:** Node.js, Express 5, Prisma ORM  
**Database:** PostgreSQL  
**Auth:** JWT via HTTP-only cookies

---

## Project Structure

```
/
├── client/     # React frontend
└── server/     # Express backend
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL database
- npm

---

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <repo-name>
```

---

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
JWT_SECRET=your_jwt_secret
PORT=3000
```

Run database migrations and seed default data:

```bash
npx prisma migrate deploy
npx prisma db seed
```

Start the server:

```bash
npm run dev
```

Server runs on `http://localhost:3000`

---

### 3. Setup the Frontend

```bash
cd client
npm install
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## Default Credentials

Use these to test all three roles immediately after seeding:

| Role  | Email          | Password   |
| ----- | -------------- | ---------- |
| Admin | admin@test.com | Password@1 |
| Owner | owner@test.com | Password@1 |
| User  | user@test.com  | Password@1 |

---

## Features

### System Administrator

- Dashboard with total users, stores, and ratings count
- Add stores, normal users, and admin users
- View and filter users by name, email, address, and role
- View and search stores
- View individual user details (owners show their store rating)
- Sortable tables

### Normal User

- Register and log in
- Update password
- View all stores with overall rating and personal submitted rating
- Submit and modify ratings (1-5)
- Search stores by name and address
- Sortable tables

### Store Owner

- Log in and update password
- View dashboard with average store rating
- See list of their stores with average store rating
- See list of users who rated their store
