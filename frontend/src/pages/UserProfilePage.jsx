// src/pages/UserProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import PostItem from '../components/PostItem';
import Spinner from '../components/Spinner';
import toast from 'react-hot-toast';

const UserProfilePage = () => {
  const { id } = useParams();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/users/${id}`);
      setProfileData(data);
    } catch (error) {
      toast.error('Failed to fetch user profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (!profileData) return <div className="text-center">User not found</div>;

  const { user, posts } = profileData;

  return (
    <div className="max-w-6xl mx-auto">
      {/* User Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-3xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </p>
            <span className={`inline-block px-3 py-1 rounded-full text-sm ${
              user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {user.role}
            </span>
          </div>
        </div>
      </div>

      {/* User's Posts */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          {user.name}'s Posts ({posts.length})
        </h2>
        
        {posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">No posts yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
