import CallToAction from "@/components/CallToAction";
import CommentSection from "@/components/Comments/CommentSection";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { Loader2 } from "lucide-react";

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Post() {
  const { slug } = useParams();
  const [postDetails, setPostDetails] = useState(null);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/v1/post/getPosts/?slug=${slug}`);
        if (response.data) {
          setPostDetails(response.data.posts[0]);
      
        }
      } catch (e) {
        toast({ title: e.response?.errorMessage });
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [slug]);
 
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen animate-spin">
        <div>
          <Loader2 size={48}></Loader2>
        </div>
      </div>
    );
  }
  return (
    <main className=" p-3 flex flex-col max-w-6xl mx-auto min-h-screen bg-gray-900">
      <div className="text-3xl mt-10 p-3 font-serif text-center capitalize  max-w-2xl mx-auto lg:text-4xl">
        {postDetails && postDetails?.title}
      </div>
      <Link
        to={`/search/?category=${postDetails?.category}`}
        className="self-center mt-5"
      >
        <Button className="text-sm bg-gray-90 hover:bg-gray-800 text-white rounded-full border-[0.5px] border-purple-400 duration-200">
          {postDetails && postDetails?.category}
        </Button>
      </Link>

      <img
        src={postDetails?.image}
        alt={postDetails?.title}
        className="mt-10  max-h-[600px] w-full object-cover"
      />

      <div className="flex mt-4 justify-between p-4 border-b-2 border-gray-800 text-xs  w-full mx-auto max-w-2xl">
        <div>{new Date(postDetails?.createdAt).toLocaleDateString()}</div>
        <div className="italic">
          {postDetails && (postDetails?.content.length / 1000).toFixed(0)} mins
          read
        </div>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{
          __html: postDetails && postDetails?.content,
        }}
      ></div>
      <div className="max-w-2xl mx-auto">
        <CallToAction></CallToAction>
      </div>

      <div>
        <CommentSection postId={postDetails?._id}></CommentSection>
      </div>
    </main>
  );
}
