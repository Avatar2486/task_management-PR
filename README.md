# Task Management Application Guide

Welcome! This guide will help you set up and run a full-stack web application for managing tasks. With this app, you can create, update, delete, and view tasks with ease. The app is built using Angular for the frontend, Node.js with Express.js for the backend, and MySQL as the database.

## Quick Navigation

- [How Things Are Organized](#how-things-are-organized)
- [What You’ll Need Before Starting](#what-youll-need-before-starting)
- [Setting Up the Backend](#setting-up-the-backend)
  - [Configuring Environment Variables](#configuring-environment-variables)
  - [Setting Up the Database](#setting-up-the-database)
  - [Running the Backend Server](#running-the-backend-server)
- [Setting Up the Frontend](#setting-up-the-frontend)
  - [Configuring the Environment](#configuring-the-environment)
  - [Running the Frontend Server](#running-the-frontend-server)
- [Available API Endpoints](#available-api-endpoints)
- [Launching the Application](#launching-the-application)
- [Screenshots](#screenshots)
- [Need Help?](#need-help)

## How Things Are Organized

Here’s how the project is laid out:

```
task-management-app/
│
├── backend/        # Everything related to the backend
│   ├── controllers/ # Logic for handling requests
│   ├── models/      # Database models
│   ├── routes/      # API routes
│   ├── config/      # Configuration files
│   ├── .env         # Environment variables
│   ├── server.js    # Main server file
│   ├── package.json # Backend dependencies
│   └── README.md    # Backend-specific guide
│
└── frontend/       # Everything related to the frontend
    ├── src/        # Angular source files
    ├── angular.json# Angular configuration
    ├── package.json# Frontend dependencies
    ├── README.md   # Frontend-specific guide
    └── ...         # Other frontend files
```

## What You’ll Need Before Starting

Make sure you have the following installed on your machine before diving in:

- **Node.js**: You can download and install it from [here](https://nodejs.org/).
- **npm**: It comes with Node.js, but it’s a good idea to update it to the latest version.
- **Angular CLI**: Install it globally using this command:

  ```bash
  npm install -g @angular/cli
  ```

- **MySQL**: You can install it using [XAMPP](https://www.apachefriends.org/index.html) or download standalone [MySQL](https://dev.mysql.com/downloads/).

## Setting Up the Backend

### Configuring Environment Variables

Start by creating a `.env` file inside the `backend/` directory. This file will hold important settings for your app. Here’s what you need to add:

```plaintext
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=task_management
PORT=3000
```

Make sure to replace `DB_PASSWORD` with your actual MySQL root password if you have one set up.

### Setting Up the Database

1. **Start XAMPP** and make sure MySQL is running.
2. **Create the database**:
   - Open phpMyAdmin (or your preferred MySQL client).
   - Run the following SQL commands:

     ```sql
     CREATE DATABASE IF NOT EXISTS task_management;

     USE task_management;

     CREATE TABLE IF NOT EXISTS tasks (
         id INT AUTO_INCREMENT PRIMARY KEY,
         title VARCHAR(255) NOT NULL,
         description TEXT,
         status ENUM('To Do', 'In Progress', 'Completed') DEFAULT 'To Do',
         deadline DATE,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     ```

### Running the Backend Server

1. Navigate to the backend directory by running:

   ```bash
   cd backend
   ```

2. Install the necessary packages with:

   ```bash
   npm install
   ```

3. Finally, start the backend server using:

   ```bash
   npm start
   ```

   Your backend server should now be up and running at `http://localhost:3000`.

## Setting Up the Frontend

### Configuring the Environment

Open the `src/environments/environment.ts` file in the `frontend/` directory. Replace the contents with the following configuration:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

### Running the Frontend Server

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install the Angular dependencies:

   ```bash
   npm install
   ```

3. Run the Angular development server:

   ```bash
   ng serve
   ```

   The frontend should now be live at `http://localhost:4200`.

## Available API Endpoints

Here’s a quick rundown of the API endpoints you can use:

- **GET** `/api/tasks`: Fetch all tasks.
- **GET** `/api/tasks/:id`: Fetch a specific task by its ID.
- **POST** `/api/tasks`: Create a new task.
- **PUT** `/api/tasks/:id`: Update an existing task.
- **DELETE** `/api/tasks/:id`: Delete a task.

## Launching the Application

To get everything working together:

1. Make sure both the backend and frontend servers are running:
   - Backend: `http://localhost:3000`
   - Frontend: `http://localhost:4200`

2. Open your web browser and go to `http://localhost:4200` to start using the Task Management Application.


## Need Help?

Running into issues? Here are some common problems and solutions:

- **Port Conflicts**: If `PORT=3000` is already taken, change the port number in both the `.env` file and the `environment.ts` file.
- **Database Connection Errors**: Double-check the database credentials in your `.env` file and make sure MySQL is running.
