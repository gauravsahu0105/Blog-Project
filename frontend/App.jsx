// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePostPage from './pages/CreatePostPage';
import PostDetailPage from './pages/PostDetailPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Toaster position="top-right" />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          
          {/* Protected Routes */}
          <Route path="" element={<PrivateRoute />}>
            <Route path="/create-post" element={<CreatePostPage />} />
            <Route path="/edit-post/:id" element={<CreatePostPage />} />
            {/* Add other private routes like profile here */}
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;