# Accountrix Backend

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file (see `.env.example`):
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=accountrix
   JWT_SECRET=your_jwt_secret
   ```
3. Create MySQL database and tables:
   ```sql
   CREATE DATABASE accountrix;
   USE accountrix;
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100),
     email VARCHAR(100) UNIQUE,
     password VARCHAR(255),
     role ENUM('admin', 'user') DEFAULT 'user'
   );
   CREATE TABLE products (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100),
     description TEXT
   );
   CREATE TABLE assignments (
     id INT AUTO_INCREMENT PRIMARY KEY,
     user_id INT,
     product_id INT,
     quantity_assigned INT,
     quantity_sold INT DEFAULT 0,
     FOREIGN KEY (user_id) REFERENCES users(id),
     FOREIGN KEY (product_id) REFERENCES products(id)
   );
   ```
4. Start server:
   ```bash
   npm run dev
   ```

API runs on `http://localhost:5000/` 