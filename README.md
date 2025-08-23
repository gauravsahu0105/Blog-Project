MERN Stack Blog

A full-stack blog application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).
This project allows users to create, read, update, and delete blog posts with authentication and responsive UI.

🚀 Features

🔑 User Authentication (JWT / OAuth / Firebase)

✍️ Create, Edit, Delete blog posts

📄 Rich-text editor for writing posts

🖼️ Upload images for posts

👤 User profile & dashboard

📱 Responsive design (mobile-friendly)

🗂️ Save history of blogs

⚡ Fast backend API with Express + MongoDB

🛠️ Tech Stack

Frontend:

React.js (Vite/CRA)

React Router DOM

TailwindCSS / Bootstrap

Backend:

Node.js

Express.js

MongoDB + Mongoose

Other Tools:

JWT Authentication

Multer / Cloudinary for file uploads

Axios for API calls

📂 Folder Structure
MERN-Blog/
│── backend/              # Express + Node.js server
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── controllers/      # Logic for routes
│   ├── middleware/       # Auth middleware
│   ├── server.js         # Entry point
│   └── .env              # Environment variables
│
│── frontend/             # React client
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── context/      # State management
│   │   ├── App.jsx       
│   │   └── index.js      
│   └── public/
│
│── README.md             # Project documentation
│── package.json          # Dependencies
# mern-blog
