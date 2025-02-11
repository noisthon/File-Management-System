# 📂 Secure File Management System

## Overview

A secure file management system built with Node.js and Express that allows users to upload, manage, and access files with public and private permissions. The application features user authentication, session management, and secure file storage capabilities.

## Features

## 🔐 User Authentication

- **Secure Registration** with username and password
- **User Session Management** using express-session
- **Protected Routes** ensuring authenticated access
- **Login/Logout Functionality** with session persistence

## 📤 File Management

- **File Upload System** with Multer integration
- **Public/Private File Storage** in separate public/private directories
- **File Listing** with different views for public and private files

## 🛡️ Security Features

- **Environment Variable Protection** using dotenv
- **Session-based Authentication**
- **Secure File Access Control**
- **Protected API Endpoints**

## 🛠 Technologies Used  

- **Node.js** → Server runtime environmen 
- **Express.js** → Web application framework
- **MySQL/Sequelize** → Database and ORM 
- **express-session** → Session management 
- **Multer** → File upload handling
- **Tailwind CSS** → Styling
- **dotenv** → Environment configuration

## 🚀 Prerequisites

To run this application locally, follow these steps:

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/ElanasBartulis/File-Management-System.git
   ```

2. **Install Dependencies**  
   ```bash
   npm install
   ```

3. **Install Nodemon**  
   ```bash
   npm install -g nodemon
   ```

4. **Setup Environment Variables** Setup Environment Variables:
   ```bash
    DB_USERNAME=""
    DB_PASSWORD=""
    DB_NAME=""
    DB_HOST=""
    SESSION_SECRET=""
   ```

5. **Setup Database**  
   - Create a MySQL database
   - Configure the connection in .env
   - The tables will be automatically created on first run

6. **Start the Application**  
   ```bash
   npm run dev
   ```

## 🛠️ API Endpoints

- `POST /register` - User registration
- `POST /login` - User authentication
- `GET /logout` - User logout
- `POST /` - File upload
- `GET /public/:file` - Access public files
- `GET /private/:file` - Access private files (authenticated)
- `GET /all-files` - List all files (authenticated)
- `GET /all-public-files` - List public files
- `GET /all-private-files` - List private files (authenticated)

## 📚 Conclusion

This Secure File Management System represents my third project. Creating it was an enjoyable learning experience that significantly deepened my understanding of back-end development. Through this project, I gained hands-on experience with:

- ✅ User authentication and session management
- ✅ File system operations in Node.js
- ✅ Database integration with Sequelize
- ✅ Security best practices
- ✅ Environment configuration

The project was particularly enlightening as it helped me grasp how the server-side of web applications works, from handling user sessions to managing file uploads and database operations. It was a significant step in my journey from front-end to full-stack development.

## 🎬 Demo  

Here’s a small demo showing of this project :

![Demo GIF](./gif/file-system.gif)
