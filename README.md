# MERN Stack Blog Platform

A full-stack blog application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring user authentication, rich text editing, comments, likes, and admin dashboard.

## 🚀 Features

### Core Features
- **User Authentication (JWT based)** - Secure login/register system
- **Create/Edit/Delete blogs with rich text editor** - Powered by Quill.js
- **User profile with authored blogs** - Personal dashboard for each user
- **Admin dashboard** - Manage posts and users
- **Search and category filtering** - Find posts easily
- **Comments & Likes system** - Interactive engagement features

### Technical Features
- **Responsive design** - Mobile-friendly UI with Tailwind CSS
- **Real-time updates** - Instant feedback with toast notifications
- **Protected routes** - Secure access control
- **Role-based permissions** - Admin and user roles
- **Rich text editing** - Full-featured content creation

## 🛠️ Tech Stack

### Frontend
- **React.js** with Vite
- **React Router DOM** for navigation
- **TailwindCSS** for styling
- **React Quill** for rich text editing
- **Zustand** for state management
- **Axios** for API calls
- **React Hot Toast** for notifications

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Express Validator** for input validation
- **CORS** for cross-origin requests

## 📂 Project Structure

```
Blog-Project/
├── backend/                 # Express + Node.js server
│   ├── config/             # Database configuration
│   ├── controllers/        # Route handlers
│   ├── middleware/         # Authentication middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── server.js          # Entry point
│   └── package.json       # Backend dependencies
│
├── frontend/              # React client
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── store/         # State management
│   │   ├── api/           # API configuration
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
│
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Blog-Project
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/blog-platform
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=5000
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server will run on http://localhost:5000

3. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on http://localhost:3000

## 📱 Usage

### For Users
1. **Register** a new account or **Login** with existing credentials
2. **Create posts** with rich text editor
3. **Browse posts** with search and category filtering
4. **Like and comment** on posts
5. **View profiles** of other users
6. **Edit/Delete** your own posts

### For Admins
1. **Access admin dashboard** at `/admin`
2. **View statistics** - total users, posts, recent activity
3. **Manage users** - view all users, delete users
4. **Manage posts** - view all posts, delete any post
5. **Full CRUD access** to all content

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Posts
- `GET /api/posts` - Get all posts (with search/category filters)
- `POST /api/posts` - Create new post (protected)
- `GET /api/posts/:id` - Get post by ID
- `PUT /api/posts/:id` - Update post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)
- `PUT /api/posts/:id/like` - Like post (protected)
- `PUT /api/posts/:id/unlike` - Unlike post (protected)
- `POST /api/posts/:id/comment` - Add comment (protected)

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/profile` - Update profile (protected)

### Admin
- `GET /api/admin/stats` - Get dashboard statistics (admin only)
- `GET /api/admin/users` - Get all users (admin only)
- `DELETE /api/admin/users/:id` - Delete user (admin only)
- `GET /api/admin/posts` - Get all posts (admin only)
- `DELETE /api/admin/posts/:id` - Delete any post (admin only)

## 🎨 Features in Detail

### Rich Text Editor
- Powered by Quill.js
- Supports headers, bold, italic, lists, links, images
- Clean, modern interface
- Real-time preview

### Search & Filtering
- Real-time search by post title
- Category-based filtering
- Combined search and filter functionality
- Clear filters option

### User Profiles
- Personal information display
- List of authored posts
- Join date and role information
- Responsive profile cards

### Admin Dashboard
- Comprehensive statistics overview
- User management with role indicators
- Post management with author information
- Bulk operations support

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcryptjs for secure password storage
- **Input Validation** - Express validator for data validation
- **Protected Routes** - Role-based access control
- **CORS Configuration** - Secure cross-origin requests

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or use cloud MongoDB service
2. Update environment variables
3. Deploy to Heroku, Vercel, or similar platform

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Deploy to Netlify, Vercel, or similar platform
3. Update API base URL in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email your-email@example.com or create an issue in the repository.
