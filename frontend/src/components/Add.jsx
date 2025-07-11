import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useBlog } from '../BlogContext';

const Add = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateBlog, addBlog } = useBlog();
  const [isUpdate, setIsUpdate] = useState(false);
  const [blogId, setBlogId] = useState(null);
  
  var [inputs, setInputs] = useState({
    title: "",
    content: "",
    img_url: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (id) {
      setIsUpdate(true);
      setBlogId(id);
      fetchBlogData(id);
    }
  }, [location]);

  const fetchBlogData = (id) => {
    const blogData = localStorage.getItem('updateBlog');
    if (blogData) {
      const blog = JSON.parse(blogData);
      setInputs({
        title: blog.title,
        content: blog.content,
        img_url: blog.img_url
      });
    }
  };

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const addData = async () => {
    try {
      if (isUpdate) {
        await axios.put(`http://localhost:3001/update/${blogId}`, inputs);
        updateBlog(blogId, inputs);
        alert('Blog updated successfully');
        localStorage.removeItem('updateBlog');
        navigate("/");
      } else {
        await axios.post('http://localhost:3001/add', inputs);
        addBlog(inputs);
        alert('Blog added successfully');
        navigate("/");
      }
    } catch (error) {
      console.log('Database operation failed, using local:', error);
      if (isUpdate) {
        updateBlog(blogId, inputs);
        alert('Blog updated successfully (local)');
      } else {
        addBlog(inputs);
        alert('Blog added successfully (local)');
      }
      localStorage.removeItem('updateBlog');
      navigate("/");
    }
  };
  return (
    <div>
      <div>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "90vh",
          }}
        >
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "600px",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Title"
              onChange={inputHandler}
              name="title"
              value={inputs.title}
              fullWidth
            />
            <TextField
              variant="outlined"
              placeholder="content"
              onChange={inputHandler}
              name="content"
              value={inputs.content}
              multiline
              rows={4}
            />
            <TextField
              variant="outlined"
              placeholder="image url"
              onChange={inputHandler}
              name="img_url"
              value={inputs.img_url}
            />

            <Button variant="contained" color="secondary" onClick={addData}>
              {isUpdate ? 'Update' : 'Submit'}
            </Button>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default Add;
