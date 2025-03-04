import { useToast } from "@/hooks/use-toast";
import userStore from "@/store/userStore";

import axios from "axios";

import React, { useEffect, useState } from "react";
import { BlogsTable } from "./BlogsTable";

export default function MyBlogs() {
  const [userBlogs, setUserBlogs] = useState([]);
  const { toast } = useToast();
  const { currentUser } = userStore();
  const [loading, setLoading] = useState(false);
  const [totalPosts, setTotalPosts] = useState(0);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/v1/post/getPosts?userId=${currentUser._id}&limit=3`
        );

        console.log(response);
        if (response.statusText === "OK") {
          setUserBlogs(response.data.posts);
          setTotalPosts(response.data.totalPosts);
        }
      } catch (e) {
        toast({
          title: "Error",
          description: e.response?.data?.message || "Failed to fetch blogs",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [currentUser._id]);
  return (
    <div className="w-full  p-4">
      <h1 className="text-4xl font-semibold my-7">My Blogs</h1>
      <div className="overflow-x-auto">
        <BlogsTable
          blogs={userBlogs}
          setBlogs={setUserBlogs}
          loading={loading}
          totalBlogs={totalPosts}
          setTotalBlogs = {setTotalPosts}
        />
      </div>
    </div>
  );
}
