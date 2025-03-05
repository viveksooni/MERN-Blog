import { toast } from "@/hooks/use-toast";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DEFAULT_PROFILE_IMAGE } from "../Dashboard/DashBoard-Profile";
import moment from "moment/moment";
import { PencilIcon, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react";
import userStore from "@/store/userStore";
import { Textarea } from "../ui/textarea";

export default function Comment({ comment }) {
  const [userDetails, setUserDetails] = useState();
  const { currentUser } = userStore();
  const [editState, setEditState] = useState(false);
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
  }, [comment.userId]);
  return (
    <div className="flex flex-col gap-2 border  border-gray-300 p-3 rounded-md">
      <div className=" flex gap-4 items-center ">
        <div className="overflow-hidden rounded-full">
          {" "}
          <img
            src={userDetails?.photoURL}
            alt={userDetails?.username}
            onError={(e) => {
              e.target.src = DEFAULT_PROFILE_IMAGE;
            }}
            className="w-8 h-8 object-cover rounded-full"
          />
        </div>
        <div className="font-semibold truncate text-xs">
          {userDetails?.username}
        </div>
        <div className="bg-gray-600 rounded-full w-1 h-1 -mx-2  mt-2"></div>
        <div className="font-semibold text-xs">
          {moment(comment?.createdAt).fromNow()}
        </div>
      </div>
      {editState ? (
        <Textarea value={comment.comment}></Textarea>
      ) : (
        <div>{comment.comment}</div>
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
              <Trash2 size={20}></Trash2>
            </div>
            <div onClick={() => setEditState((prev)=>!prev)}>
              <PencilIcon size={20}></PencilIcon>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
