import userStore from "@/store/userStore";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import axios from "axios";
import CommentList from "./CommentList";
import { DEFAULT_PROFILE_IMAGE } from "../Dashboard/DashBoard-Profile";

export default function CommentSection({ postId }) {
  const { currentUser } = userStore();
  const [commentList, setCommentList] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  
  //handles new comment post
  const handlePost = async (e) => {
    if (comment.length > 200) {
      return toast({ title: "Comment must be less than 200 characters" });
    }
    e.preventDefault();
    setLoading(true);
    const commentBody = { postId, userId: currentUser._id, comment };
    try {
      const response = await axios.post("/api/v1/comment/create", commentBody);

      if (response.data) {
        setCommentList((prev) => [response.data, ...prev]);
        setComment("");
      }
    } catch (e) {
      console.log(e.response?.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl w-full p-3 mx-auto">
      {currentUser ? (
        <div className="flex items-center gap-1 text-sm text-gray-400 my-5 ">
          <p>Signed in as :</p>
          <div className="overflow-hidden rounded-full">
            <img
              src={currentUser.photoURL}
              alt={currentUser.username}
              onError={(e) => {
                e.target.src = DEFAULT_PROFILE_IMAGE;
              }}
              className="w-5 h-5 object-cover rounded-full"
            />
          </div>
          <Link to={"/dashboard?tab=profile"}>
            @
            <span className="!text-teal-400 text-xs hover:underline ml-[0.1rem]">
              {currentUser.username}
            </span>
          </Link>
        </div>
      ) : (
        <div className="flex flex-row gap-1 text-sm text-gray-400 my-5">
          <p>You must sign in to comment </p>
          <Link
            to={"/signin"}
            className="text-teal-400 hover:underline hover:underline-offset-4"
          >
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <>
          <form
            className={`flex flex-col gap-4 bg-black-900  border border-white p-8 rounded-md ${
              loading ? "opacity-50" : ""
            }`}
          >
            <Textarea
              placeholder="Comment here..."
              maxLength="200"
              rows="3"
              value={comment}
              className="focus-visible:ring-1 focus-visible:ring-teal-500 focus-visible-outline-none "
              onChange={(event) => {
                setComment(event.target.value);
              }}
            ></Textarea>
            <div className="flex justify-between mt-5">
              <p
                className={`text-xs ${
                  200 - comment.length > 10
                    ? "!text-neutral-500"
                    : "!text-red-500 font-semibold animate-pulse"
                } `}
              >
                {200 - comment.length} Character remaining.
              </p>
              <Button
                onClick={handlePost}
                variant="secondary"
                className={`w-fit-content  ${
                  loading ? "disabled:opacity-50" : ""
                }`}
              >
                {loading ? "Posting...." : "Post"}
              </Button>
            </div>
          </form>

          <CommentList
            postId={postId}
            userId={currentUser._id}
            commentList={commentList}
            setCommentList={setCommentList}
          />
        </>
      )}
    
    </div>
  );
}
