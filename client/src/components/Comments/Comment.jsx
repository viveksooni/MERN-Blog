import { toast } from "@/hooks/use-toast";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { DEFAULT_PROFILE_IMAGE } from "../Dashboard/DashBoard-Profile";
import moment from "moment/moment";
import {
  CircleArrowRight,
  CircleArrowRightIcon,
  CrossIcon,
  PencilIcon,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  X,
} from "lucide-react";
import userStore from "@/store/userStore";
import { Textarea } from "../ui/textarea";

export default function Comment({ comment, setCommentList }) {
  const [userDetails, setUserDetails] = useState();
  const { currentUser } = userStore();
  const [commentEdit, setCommentEdit] = useState(comment.comment);
  const [editedComment, setEditedComment] = useState(comment.comment);
  const [editState, setEditState] = useState(false);

  const updateComment = async () => {
    try {
      const response = await axios.put(`/api/v1/comment/${comment._id}`, {
        comment: editedComment,
      });
      if (response.data) {
        setEditState(false);
        setCommentEdit(response.data.comment);
      }
    } catch (e) {
      console.log(e);
      toast({ title: e.response?.data.errorMessage });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/v1/comment/${comment._id}`);
      setCommentList((prev) => prev.filter((c) => c._id !== comment._id));
      if (response.data) {
        toast({ title: "Comment deleted successfully" });
      }
    } catch (e) {
      toast({ title: e.response?.data.errorMessage });
    }
  };
  useEffect(() => {
    if (editState && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        0,
        textareaRef.current.value.length
      );
    }
  }, [editState]);
  console.log(editState);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`/api/v1/user/${comment.userId}`);

        if (response.data) {
          setUserDetails(response.data.user);
        }
      } catch (e) {
        toast({ title: e.response?.errorMessage });
      }
    };
    getUser();
  }, [comment]);
  const textareaRef = useRef(null);
  return (
    <div className="flex   gap-2 border-b text-sm border-gray-300 p-4">
      {/* <div className="overflow-hidden rounded-full"> */}
      <div className="flex-shrink-0 mr-3">
        <img
          src={userDetails?.photoURL}
          alt={userDetails?.username}
          onError={(e) => {
            e.target.src = DEFAULT_PROFILE_IMAGE;
          }}
          className="w-10 h-10 object-cover rounded-full"
        />
      </div>
      <div className="flex-1">
        <div className=" flex gap-4 items-center ">
          <div className="font-semibold truncate text-xs">
            {userDetails?.username}
          </div>
          <div className="bg-gray-600 rounded-full w-1 h-1 -mx-2  mt-2"></div>
          <div className="font-semibold text-xs">
            {moment(comment?.createdAt).fromNow()}
          </div>
        </div>
        {editState ? (
          <Textarea
            onChange={(e) => setEditedComment(e.target.value)}
            value={editedComment}
            ref={textareaRef}
            rows={1}
            className="bg-transparent backdrop:blur-lg"
          ></Textarea>
        ) : (
          <p>{commentEdit}</p>
        )}

        <div className="flex justify-between items-center ">
          <div className="flex flex-row gap-3 p-1">
            <button className="text-teal-700">
              <ThumbsUp size={20} />
            </button>
            <button className="text-teal-700">
              <ThumbsDown size={20} />
            </button>
          </div>
          {comment.userId == currentUser._id && (
            <div className="flex gap-4 ">
              <div>
                <Trash2 size={20} onClick={handleDelete}></Trash2>
              </div>

              {editState && (
                <CircleArrowRight size={20} onClick={updateComment} />
              )}
              {editState && (
                <X
                  size={21}
                  onClick={() => {
                    setEditState(!editState);
                    setEditedComment(commentEdit);
                  }}
                />
              )}

              {!editState && (
                <PencilIcon
                  size={20}
                  onClick={() => setEditState(true)}
                ></PencilIcon>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
