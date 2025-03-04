# farm-folks-market-api

# Project Setup

## Prerequisites

Before running this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [MySQL](https://www.mysql.com/)

## Installation Steps

### 1. Clone the Repository/Download Project

        git clone your-repo-url
        cd your-project

### 2. Install Dependencies

        npm install

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

        PORT=8080
        DB_LOCAL_HOST=localhost
        DB_LOCAL_USER=root
        DB_LOCAL_PASSWORD=yourpassword
        DB_LOCAL_DBNAME=yourdatabase

Replace `yourpassword` and `yourdatabase` with your actual MySQL credentials.
`yourpassword` is usually rootroot unless set otherwise.
`PORT` if left blank will automatically set to 5050.
`localhost` like 127.0.0.1.

### 4. Set Up MySQL Database

Ensure MySQL is running and create a new database:

        CREATE DATABASE yourdatabase;
        USE yourdatabase;

### 5. Run Database Migrations & Seed Data

        npx knex migrate:latest   # Run database migrations
        npx knex seed:run         # Populate database with sample data

### 6. Start the Server

        npm start

Or manually run:

        node index.js

## Front-End Repository

This project works with the following front-end repository:
[Farm Folks Market Front-End](https://github.com/sonalsood/farm-folks-market.git)

## Additional Commands

- To reset the database:
  npx knex migrate:rollback --all
  npx knex migrate:latest
  npx knex seed:run

## Troubleshooting

- If MySQL connection fails, check:
  - MySQL is running (`mysql -u root -p` to verify)
  - Credentials in `.env` file match your database setup
  - The correct database is created (`SHOW DATABASES;` in MySQL shell)
