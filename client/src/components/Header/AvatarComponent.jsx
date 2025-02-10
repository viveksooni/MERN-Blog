import React from "react";
import { AvatarFallback, AvatarImage, Avatar } from "../ui/avatar";
import userStore from "@/store/userStore";

export default function AvatarComponent() {
  const { currentUser } = userStore();
  return (
    <Avatar>
      <AvatarImage
        className="object-cover"
        src={currentUser.photoURL?.split(" ")[0]}
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
