import React from "react";
import { AvatarFallback, AvatarImage, Avatar } from "../ui/avatar";
import userStore from "@/store/userStore";
const DEFAULT_AVATAR = "https://github.com/shadcn.png";
export default function AvatarComponent() {
  const { currentUser } = userStore();
  return (
    <Avatar>
      <AvatarImage className="object-cover" src={currentUser.photoURL} />
      <AvatarFallback>
        <img
          src={DEFAULT_AVATAR}
          alt="Default avatar"
          className={`w-full h-full object-cover `}
        />
      </AvatarFallback>
    </Avatar>
  );
}
