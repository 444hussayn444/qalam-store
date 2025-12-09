# Gemini Code Assistant Context

This document provides a comprehensive overview of the `qalam-store` project, intended to be used as a context for the Gemini Code Assistant.

## Project Overview

The `qalam-store` project is a full-stack e-commerce web application. It consists of a React-based frontend and a Node.js/Express backend. The application appears to be a store for t-shirts, with features for user authentication and browsing products.

### Frontend

*   **Framework:** React
*   **Routing:** `react-router-dom` is used for client-side routing.
*   **Key Components:**
    *   `App.js`: The main component that sets up the application's routing.
    *   `Navbar.jsx`: The navigation bar component.
    *   `Home.jsx`: The home page of the application.
    *   `Store.jsx`: The page that displays the products.
    *   `Description.jsx`: A page for displaying product details.

### Backend

*   **Framework:** Node.js with Express
*   **Database:** The backend uses `mysql2` to connect to a MySQL database. The connection requires SSL and uses credentials from a `.env` file. The application automatically creates and populates the `products` table from a `data.json` file.
*   **Authentication:** User authentication is handled using JSON Web Tokens (JWT). The backend provides endpoints for OTP verification, user registration, and login.
*   **APIs:**
    *   `/api/v1/products`: Retrieves a list of products.
    *   `/api/v1/send-otp`: Sends a one-time password for account verification.
    *   `/api/v1/register`: Registers a new user.
    *   `/api/v1/login`: Logs in a user.

## Building and Running

### Environment Variables

Before running the backend, you must create a `.env` file in the `backend` directory with the following variables:

```
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USER=your_database_user
DB_NAME=your_database_name
DB_PASSWORD=your_database_password
```

You will also need to have a `cer.pem` file in the `backend/db` directory for the SSL connection.

### Frontend

To run the frontend development server:

```bash
cd front
npm install
npm start
```

To build the frontend for production:

```bash
cd front
npm install
npm run build
```

### Backend

To run the backend server:

```bash
cd backend
npm install
npm start
```

## Development Conventions

*   The project is split into two main directories: `front` for the frontend code and `backend` for the backend code.
*   The backend follows a typical Node.js project structure, with routes, controllers, and database logic separated into different directories.
*   The frontend uses a standard Create React App folder structure.
*   The backend uses ES modules (`"type": "module"` in `package.json`).
*   The backend automatically handles the creation and seeding of the `products` table from the `backend/controllers/data.json` file.
