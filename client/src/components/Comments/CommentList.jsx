import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Comment from "./Comment";

export default function CommentList({ postId, commentList, setCommentList }) {
  useEffect(() => {
    const getCommentList = async () => {
      try {
        const response = await axios.get(`/api/v1/comment/${postId}`);
        if (response) {
          setCommentList(response.data.comments);
        }
      } catch (e) {
        toast({
          description: "Error fetching comments",
          action: <ToastAction onClick={getCommentList}>Retry</ToastAction>,
        });
      }
    };
    getCommentList();
  }, []);
  console.log(commentList);
  return (
    <div>
      <div className="flex items-center gap-2  mt-10 text-sm">
        <p>Comments </p>
        <div className="border border-gray-600 py-1 px-2 rounded-sm ">
          <p>{commentList.length}</p>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-5">
        {commentList.length == 0 && (
          <div className="text-gray-400 text-sm mt-5">No Comments Yet</div>
        )}
        {commentList.map((comment) => {
          return <Comment comment={comment} key={comment._id} />;
        })}
      </div>
    </div>
  );
}
