// src/components/PostItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = ({ post }) => {
  // Create a snippet from the rich text content
  const createSnippet = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent?.slice(0, 100) + '...' || '';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <p className="text-sm text-gray-500 mb-2">By {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}</p>
        <h3 className="text-2xl font-bold mb-2">
          <Link to={`/post/${post._id}`} className="hover:text-blue-600">
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-700 mb-4">{createSnippet(post.content)}</p>
        <Link to={`/post/${post._id}`} className="font-semibold text-blue-600 hover:text-blue-800">
          Read More &rarr;
        </Link>
      </div>
    </div>
  );
};

export default PostItem;