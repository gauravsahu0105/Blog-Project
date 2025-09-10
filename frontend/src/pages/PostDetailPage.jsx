// src/pages/PostDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import api from '../api';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';
import Spinner from '../components/Spinner';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ title: '', content: '', category: '' });

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const { data } = await api.get(`/posts/${id}`);
      setPost(data);
      setEditData({ title: data.title, content: data.content, category: data.category });
      setIsLiked(data.likes.some(like => like.toString() === user?.id));
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch post');
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated()) {
      toast.error('Please login to like posts');
      return;
    }
    
    try {
      if (isLiked) {
        await api.put(`/posts/${id}/unlike`);
        setIsLiked(false);
        setPost(prev => ({ ...prev, likes: prev.likes.filter(like => like.toString() !== user.id) }));
      } else {
        await api.put(`/posts/${id}/like`);
        setIsLiked(true);
        setPost(prev => ({ ...prev, likes: [...prev.likes, user.id] }));
      }
    } catch (error) {
      toast.error('Failed to update like');
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    try {
      const { data } = await api.post(`/posts/${id}/comment`, { text: commentText });
      setPost(prev => ({ ...prev, comments: data }));
      setCommentText('');
      toast.success('Comment added successfully');
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put(`/posts/${id}`, editData);
      setPost(data);
      setIsEditing(false);
      toast.success('Post updated successfully');
    } catch (error) {
      toast.error('Failed to update post');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await api.delete(`/posts/${id}`);
        toast.success('Post deleted successfully');
        navigate('/');
      } catch (error) {
        toast.error('Failed to delete post');
      }
    }
  };

  if (loading) return <Spinner />;
  if (!post) return <div className="text-center">Post not found</div>;

  const canEdit = isAuthenticated() && (user?.id === post.author._id || user?.role === 'admin');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {isEditing ? (
          <form onSubmit={handleEdit} className="space-y-6">
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              className="w-full text-3xl font-bold px-4 py-2 border rounded-md focus:outline-none"
            />
            <input
              type="text"
              value={editData.category}
              onChange={(e) => setEditData({ ...editData, category: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
            />
            <ReactQuill
              theme="snow"
              value={editData.content}
              onChange={(content) => setEditData({ ...editData, content })}
              className="bg-white"
            />
            <div className="flex space-x-4">
              <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <p className="text-gray-600 mb-2">
                  By <span className="font-semibold">{post.author.name}</span> • {new Date(post.createdAt).toLocaleDateString()}
                </p>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {post.category}
                </span>
              </div>
              {canEdit && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            <div 
              className="prose max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="flex items-center space-x-4 mb-8">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                  isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                } hover:bg-red-100 hover:text-red-600 transition-colors`}
              >
                <span>❤️</span>
                <span>{post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}</span>
              </button>
            </div>

            {/* Comments Section */}
            <div className="border-t pt-8">
              <h3 className="text-2xl font-bold mb-6">Comments ({post.comments.length})</h3>
              
              {isAuthenticated() && (
                <form onSubmit={handleComment} className="mb-8">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />
                  <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add Comment
                  </button>
                </form>
              )}

              <div className="space-y-4">
                {post.comments.map((comment, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{comment.name}</p>
                        <p className="text-gray-600 text-sm">
                          {new Date(comment.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="mt-2">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PostDetailPage;
