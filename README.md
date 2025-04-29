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


### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env to set your JWT_SECRET and (optionally) MySQL creds
npm run dev

##Frontend setup
cd frontend
npm install
npm run dev


