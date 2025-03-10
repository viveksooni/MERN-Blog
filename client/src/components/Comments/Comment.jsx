import { toast } from "@/hooks/use-toast";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { DEFAULT_PROFILE_IMAGE } from "../Dashboard/DashBoard-Profile";
import moment from "moment/moment";
import {
  CircleArrowRight,
  CrossIcon,
  PencilIcon,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  X,
} from "lucide-react";
import userStore from "@/store/userStore";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button"; // Added Button component
import { useNavigate } from "react-router-dom";

export default function Comment({ comment, setCommentList }) {
  const navigate = useNavigate();
  const { currentUser } = userStore();
  const [userDetails, setUserDetails] = useState(null);
  const [editedComment, setEditedComment] = useState(comment.comment);
  const [editState, setEditState] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likeCount);

  const textareaRef = useRef(null);

  // Memoized user fetch to prevent unnecessary calls
  useEffect(() => {
    const controller = new AbortController();
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/v1/user/${comment.userId}`, {
          signal: controller.signal,
        });
        setUserDetails(response.data.user);
      } catch (e) {
        if (!axios.isCancel(e)) {
          toast({
            variant: "destructive",
            title: e.response?.data.errorMessage || "Failed to fetch user",
          });
        }
      }
    };

    fetchUser();
    return () => controller.abort();
  }, [comment.userId]); // Only depend on userId

  const handleUpdateComment = async (e) => {
    e.preventDefault();
    if (editedComment === comment.comment) {
      setEditState(false);
      return;
    }
    try {
      const response = await axios.put(`/api/v1/comment/${comment._id}`, {
        comment: editedComment,
      });
      setCommentList((prev) =>
        prev.map((c) => (c._id === comment._id ? response.data : c))
      );
      setEditState(false);
      toast({ title: "Comment updated successfully" });
    } catch (e) {
      toast({
        variant: "destructive",
        title: e.response?.data.errorMessage || "Failed to update comment",
      });
    }
  };
  const handleLikeClick = async () => {
    if (!currentUser) {
      navigate("/sign-up");
    }
    try {
      const response = await axios.put(`/api/v1/comment/like/${comment._id}`);

      if (response.data) {
        setCommentList((prev) =>
          prev.map((c) => (c._id === comment._id ? response.data : c))
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleDeleteComment = async () => {
    try {
      await axios.delete(`/api/v1/comment/${comment._id}`);
      setCommentList((prev) => prev.filter((c) => c._id !== comment._id));
      toast({ title: "Comment deleted successfully" });
    } catch (e) {
      console.log(e);
      toast({
        variant: "destructive",
        title: e.response?.data.errorMessage || "Failed to delete comment",
      });
    }
  };

  // Focus and select text when entering edit mode
  useEffect(() => {
    if (editState && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        0,
        textareaRef.current.value.length
      );
    }
  }, [editState]);

  return (
    <div className="flex gap-2 border-b text-sm border-gray-300 p-4 group">
      <div className="flex-shrink-0 mr-3">
        <img
          src={userDetails?.photoURL}
          alt={userDetails?.username}
          onError={(e) => (e.target.src = DEFAULT_PROFILE_IMAGE)}
          className="w-10 h-10 object-cover rounded-full"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex gap-2 items-center text-xs text-muted-foreground">
          <span className="font-semibold truncate">
            {userDetails?.username}
          </span>
          <span className="w-1 h-1 bg-muted rounded-full" />
          <span>{moment(comment.createdAt).fromNow()}</span>
        </div>

        {editState ? (
          <form onSubmit={handleUpdateComment} className="mt-2">
            <Textarea
              ref={textareaRef}
              value={editedComment}
              maxLength="200"
              onChange={(e) => setEditedComment(e.target.value)}
              onBlur={() => !editedComment.trim() && setEditState(false)}
              className="w-full resize-y min-h-[80px]"
            />
            <div className="flex gap-2 mt-2">
              <Button type="submit" size="sm" variant="outline">
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => {
                  setEditState(false);
                  setEditedComment(comment.comment);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <>
            <p className="mt-2 mb-1 whitespace-pre-wrap break-words">
              {comment.comment}
            </p>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLikeClick}
                  className={
                    `${
                      comment.likedBy.includes(currentUser._id)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-500"
                    }` + "h-8 px-2 "
                  }
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span className="ml-1">{comment.likeCount}</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <ThumbsDown className="w-4 h-4" />
                </Button>
              </div>

              {!(
                currentUser?._id !== comment.userId && !currentUser.isAdmin
              ) && (
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {currentUser?._id == comment.userId && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2"
                      onClick={() => setEditState(true)}
                    >
                      <PencilIcon className="w-4 h-4" />
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 text-destructive hover:text-destructive"
                    onClick={handleDeleteComment}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
