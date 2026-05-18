# Smart Leads Dashboard

A full-stack Lead Management Dashboard built using Next.js, TypeScript, MongoDB, and TailwindCSS.

This project was built as part of a Full Stack Internship Assignment and focuses on scalable architecture, secure authentication, clean API design, and modern frontend/backend best practices.

---

# Features

## Authentication & Authorization

- JWT Authentication
- Secure HTTP-only Cookies
- User Registration & Login
- Password Hashing using bcryptjs
- Protected Routes
- Role-Based Access Control (RBAC)

### Roles

#### Admin
- View all leads
- Create leads
- Update any lead
- Delete any lead
- Access admin dashboard
- View all users

#### Sales User
- Create leads
- Update own leads
- Delete own leads only

---

# Leads Management

- Create Lead
- Update Lead
- Delete Lead
- View Single Lead
- View Leads List

---

# Advanced Filtering

- Search by Name or Email
- Filter by Status
- Filter by Source
- Sort by Latest / Oldest
- Backend Pagination
- Debounced Search

---

# Dashboard

## User Dashboard
- Total Leads
- Lead Status Analytics
- Source Breakdown
- Recent Leads

## Admin Dashboard
- System Overview
- User Management
- Leads Analytics
- Source Analytics

---

# CSV Export

- Export filtered leads into CSV format

---

# Tech Stack

## Frontend
- Next.js 15
- TypeScript
- TailwindCSS
- shadcn/ui
- Axios
- Lucide Icons

## Backend
- Next.js API Routes
- MongoDB
- Mongoose
- JWT
- bcryptjs

---

# Project Structure

```bash
src/
│
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── leads/
│   │   ├── dashboard/
│   │   └── admin/
│   │
│   ├── dashboard/
│   ├── leads/
│   └── admin/
│
├── components/
│
├── lib/
│
├── models/
│
├── utils/
│
├── context/
│
└── hooks/
```

---

# Environment Variables

Create a `.env.local` file in the root directory.

```env
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

---

# Installation

## Clone Repository

```bash
git clone <your-repository-url>
```

## Go to Project Folder

```bash
cd smart-leads-dashboard
```

## Install Dependencies

Using pnpm:

```bash
pnpm install
```

---

# Run Development Server

```bash
pnpm dev
```

Project runs on:

```bash
http://localhost:3000
```

---

# API Endpoints

# Authentication

## Register

```http
POST /api/auth/signup
```

## Login

```http
POST /api/auth/login
```

## Logout

```http
POST /api/auth/logout
```

## Current User

```http
GET /api/auth/me
```

---

# Leads

## Get All Leads

```http
GET /api/leads
```

### Query Params

```http
?page=1
&search=rahul
&status=Qualified
&source=Instagram
&sort=latest
```

## Create Lead

```http
POST /api/leads
```

## Update Lead

```http
PATCH /api/leads/:id
```

## Delete Lead

```http
DELETE /api/leads/:id
```

---

# Dashboard

## User Dashboard

```http
GET /api/dashboard
```

## Admin Dashboard

```http
GET /api/admin/dashboard
```

---

# Security Features

- JWT Authentication
- HTTP-only Cookies
- Protected APIs
- Role-Based Authorization
- Ownership-Based Authorization
- Password Hashing
- Environment Variables

---

# Performance Optimizations

- Debounced Search
- Backend Pagination
- Optimized MongoDB Queries
- Reusable Components
- Memoization using useMemo

---

# UI Features

- Responsive Design
- Reusable Components
- Loading States
- Empty States
- Error Handling
- Toast Notifications

---

# Future Improvements

- Docker Deployment
- Refresh Tokens
- Rate Limiting
- Unit Testing
- Email Notifications
- Charts & Analytics
- Dark Mode

---

# Author

Pawan Thakre

---

# License

This project is built for educational and internship assignment purposes.
