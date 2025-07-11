import React, { createContext, useContext, useState } from 'react';

const BlogContext = createContext();

export const useBlog = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState([
    {
      _id: 1,
      img_url: "https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      content: "Travel",
      title: "Travel the world!!!!"
    },
    {
      _id: 2,
      img_url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2808&auto=format&fit=crop",
      content: "Art",
      title: "Art!!!!!!!!!!!"
    },
    {
      _id: 3,
      img_url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2881&auto=format&fit=crop",
      content: "Food",
      title: "Food is Art!!!!"
    }
  ]);

  const updateBlog = (id, updatedData) => {
    setBlogPosts(prevPosts => 
      prevPosts.map(post => 
        post._id === parseInt(id) ? { ...post, ...updatedData } : post
      )
    );
  };

  const deleteBlog = (id) => {
    setBlogPosts(prevPosts => prevPosts.filter(post => post._id !== id));
  };

  const addBlog = (newBlog) => {
    const newId = Math.max(...blogPosts.map(p => p._id)) + 1;
    setBlogPosts(prevPosts => [...prevPosts, { ...newBlog, _id: newId }]);
  };

  const updateBlogPosts = (posts) => {
    setBlogPosts(posts);
  };

  return (
    <BlogContext.Provider value={{ blogPosts, updateBlog, deleteBlog, addBlog, updateBlogPosts }}>
      {children}
    </BlogContext.Provider>
  );
};