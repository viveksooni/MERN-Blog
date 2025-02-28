import { useToast } from "@/hooks/use-toast";

import axios from "axios";

import React, { useEffect, useState } from "react";

export default function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("/api/v1/post/all-posts");

        console.log(response.data);
        setBlogs(response.data);
      } catch (e) {
        toast({
          title: "Error",
          description: e.response?.data?.message || "Failed to fetch blogs",
          variant: "destructive",
        });
      }
    };
    fetchBlogs();
  }, []);
  return (
    <div>
      {blogs.map((blog) => {
        return (
          <div key={blog._id}>
            <h1>{blog.title}</h1>
          </div>
        );
      })}
    </div>
  );
}
