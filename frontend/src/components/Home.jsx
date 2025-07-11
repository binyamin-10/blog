import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useBlog } from '../BlogContext';

// BlogPost Component: Renders a single blog post card.
const BlogPost = ({ id, image, category, title, onDelete, onUpdate }) => (
  <div className="blog-post">
    <img 
      src={image} 
      alt={title} 
      className="post-image"
      onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/cccccc/ffffff?text=Image+Not+Found'; }}
    />
    <div className="post-content">
      <p className="post-category">{category}</p>
      <h3 className="post-title">{title}</h3>
      <div className="post-actions">
        <button className="btn" onClick={() => onDelete(id)}>DELETE</button>
        <button className="btn" onClick={() => onUpdate(id)}>UPDATE</button>
      </div>
    </div>
  </div>
);

// --- Main Home Component ---

const Home = () => {
  const { blogPosts, deleteBlog, updateBlogPosts } = useBlog();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogsFromDB();
  }, []);

  const fetchBlogsFromDB = async () => {
    try {
      const response = await axios.get('http://localhost:3001/get');
      updateBlogPosts(response.data);
    } catch (error) {
      console.log('Using local data - backend not connected:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`);
      deleteBlog(id);
      alert('Blog deleted successfully');
    } catch (error) {
      console.log('Database delete failed, removing locally:', error);
      deleteBlog(id);
      alert('Blog deleted successfully (local)');
    }
  };

  const handleUpdate = (id) => {
    const blogToUpdate = blogPosts.find(post => post._id === id);
    localStorage.setItem('updateBlog', JSON.stringify(blogToUpdate));
    navigate(`/add?id=${id}`);
  };

  return (
    <div className="app">
      <div className="blog-list">
        {blogPosts.map(post => (
          <BlogPost 
            key={post._id} 
            id={post._id}
            image={post.img_url}
            category={post.content}
            title={post.title}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;