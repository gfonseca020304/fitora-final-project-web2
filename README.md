# Fitora

A full-stack restaurant ordering application that lets customers register, log in, browse a seeded menu of food items, add or remove items in their cart, and place orders with randomized ETA. Administrators can perform full CRUD on menu items and update order statuses, all via a JWT-protected REST API backed by Sequelize and SQLite (or MySQL).

## Features

- **User Authentication**: Register & login with JWT-based stateless sessions  
- **Role-Based Access**: `user` vs. `admin` middleware guards  
- **Food Catalog**: Full CRUD on `FoodItem` (name, description, price, calories, photoUrl)  
- **Order Workflow**:  
  - Customers add/remove items in cart  
  - `POST /orders` with random 20–40 min ETA  
  - View order details (`GET /orders/:id`)  
  - Cancel pending orders (`DELETE /orders/:id`)  
- **Admin Controls**:  
  - Manage menu items (`/foods` endpoints)  
  - Update order status (`PATCH /orders/:id/status`)  
- **Database Seeding**:  
  - Auto-creates an initial `admin` user  
  - Auto-seeds 15 random menu items on first run  
- **Zero-Setup DB**: SQLite by default, swap to MySQL via `.env`

## Tech Stack

- **Backend**: Node.js, Express, Sequelize ORM, JWT, SQLite/MySQL  
- **Frontend**: React, Vite, React Router, Axios  
- **Dev Tools**: nodemon, dotenv, @faker-js/faker (for seeding)

## Prerequisites

- Node.js v14+ & npm  
- (Optional) Docker & Docker Compose if you prefer MySQL container

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/<your-username>/fitora.git
cd fitora

```
### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env to set your JWT_SECRET and (optionally) MySQL creds
npm run dev
```
##Frontend setup
```bash
cd frontend
npm install
npm run dev
```
Backend → http://localhost:4000
Frontend → http://localhost:5173

Environment Variables
Copy backend/.env.example to .env and configure:

```bash
PORT=4000

# Choose sqlite or mysql
DB_DIALECT=sqlite
DB_STORAGE=./dev.sqlite
# DB_HOST=localhost
# DB_NAME=fitora_db
# DB_USER=fitora_user
# DB_PASS=StrongPass123

JWT_SECRET=your_long_random_secret
```
#API Endpoints
##Auth
POST /auth/register – Register new user

POST /auth/login – Login user (returns JWT)

##Foods
GET /foods – List all menu items

GET /foods/:id – Get one item

POST /foods – admin create item

PUT /foods/:id – admin update item

DELETE /foods/:id – admin delete item

##Orders
GET /orders – List your orders

GET /orders/:id – Get order details

POST /orders – Place new order (body: { items: [{ id, quantity }] })

DELETE /orders/:id – Cancel your pending order

PATCH /orders/:id/status – admin update status ({ status: pending|cancelled|completed })

##Database Seeding
On first run, server.js will:

Create an initial admin user (admin@fitora.com / bcrypt-hashed password)

Seed 15 random menu items using Faker

Check console logs for “Seeding random menu items…” and “Seeded admin user”.
