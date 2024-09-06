import axios from 'axios';
import { useState, useEffect } from 'react';
import { BACKEND_URL } from '../../config';

// Define the shape of the blog
export interface BlogTypes {
  id: number | string;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

// Hook to fetch a single blog by ID
export const useBlog = ({ id }: { id: number | string }) => {
  const [blog, setBlog] = useState<BlogTypes | undefined>(undefined); // Use undefined initially
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: localStorage.getItem('jwt') || '', // Fallback to empty string if jwt is missing
          },
        });
        setBlog(response?.data?.blog); // Set the blog data
      } catch (error) {
        console.error('Error fetching blog:', error); // Handle error (optional)
      } finally {
        setLoading(false); // Set loading to false once the request is completed
      }
    };

    fetchBlog(); // Call the async function inside the useEffect hook
  }, [id]);

  return { blog, loading };
};

// Hook to fetch a list of blogs
export const useBlogs = () => {
  const [blogs, setBlogs] = useState<BlogTypes[]>([]); // Initialize with an empty array
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            Authorization: localStorage.getItem('jwt') || '', // Fallback to empty string if jwt is missing
          },
        });
        setBlogs(response?.data?.blogs); // Set the blogs data
      } catch (error) {
        console.error('Error fetching blogs:', error); // Handle error (optional)
      } finally {
        setLoading(false); // Set loading to false once the request is completed
      }
    };

    fetchBlogs(); // Call the async function inside the useEffect hook
  }, []);

  return { blogs, loading };
};
