import React, { useEffect, useState } from "react";
import "./Home.css";
import userStore from "@/store/userStore";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import BlogCard from "@/components/BlogCard";

export default function Home() {
  const { currentUser } = userStore();

  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/v1/post/getPosts?limit=9`);

        console.log(response);
        if (response.statusText === "OK") {
          setBlogs(response.data.posts);
          setTotalPosts(response.data.totalPosts);
        }
      } catch (e) {
        toast({
          title: "Error",
          description:
            e.response?.data?.errorMessage || "Failed to fetch blogs",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="p-4 min-h-screen ">
      <h1 className="text-4xl   text-center font-bold mb-4">
        Welcome, {currentUser?.username || "Guest"}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-14 justify-center ">
        {loading
          ? "loading...."
          : blogs.map((blog) => {
              return <BlogCard blog={blog} key={blog._id} />;
            })}
      </div>
    </div>
  );
}
