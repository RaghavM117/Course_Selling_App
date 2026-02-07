# Course Selling App

A scalable backend API for a course marketplace built with **Node.js, Express, and MongoDB**.  
It supports secure user and admin authentication, course management, and a protected purchase workflow.

---

## 🚀 Features

- **Admin Panel** – Create, update, and delete courses.
- **User Dashboard** – Browse available courses, purchase them, and access enrolled content.
- **Authentication & Security** – JWT-based authentication with password hashing using Bcrypt.
- **Input Validation** – Request validation using Zod to ensure clean and safe API inputs.
- **Duplicate Purchase Prevention** – Database-level unique indexing prevents users from purchasing the same course twice.

---

## 🛠 Tech Stack

- Node.js  
- Express.js  
- MongoDB (Mongoose)  

---

## 🔐 Authentication & Validation

- Passwords hashed using **Bcrypt**
- Token-based authentication using **JWT**
- Request schema validation using **Zod**

---

## 🏁 Getting Started

### Prerequisites

- **Node.js** (v16+ recommended)
- **MongoDB** (Local instance or MongoDB Atlas connection string)

---

### 1️⃣ Clone the Repository

#### HTTPS
```bash
git clone https://github.com/RaghavM117/Course_Selling_App.git
cd Course_Selling_App
```

#### SSH
```bash
git clone git@github.com:RaghavM117/Course_Selling_App.git
cd Course_Selling_App
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ 🔐 Setup Environment Variables
* Create a .env file in the root directory
```bash
touch .env
```
* Add the following inside the .env file
```
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_ADMIN_PASSWORD=your_admin_secret
JWT_USER_PASSWORD=your_user_secret
```

---

### 4️⃣ Run the Application

#### Production Mode
```bash
npm start
```

#### Development Mode (with nodemon)
```bash
npm run dev
```

---

## 📡 API Routes

### 🔐 Admin Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /admin/signup | Register a new admin |
| POST | /admin/signin | Admin login |
| PATCH | /admin/changePassword | Changing Admin's Password |
| POST | /admin/courses | Create a new course |
| PATCH | /admin/editCourse/:courseId | Update course details |
| DELETE | /admin/deleteCourse/:courseId | Delete a course |
| GET | /admin/getCourse/:courseId | Getting a Course |
| GET | /admin/myCourses | Getting admin's own courses |

---

### 👤 User Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /user/signup | Register a new user |
| POST | /user/signin | User login |
| PATCH | /user/changePassword | Changing User's Password |
| GET | /user//allCourses | Get all available courses |
| GET | /user/singleCourse/:courseId | Getting a Single Course |
| POST | /user/purchaseCourse/:courseId | Purchase a course |
| GET | /user/myCourses | Get purchased courses |

---

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.
