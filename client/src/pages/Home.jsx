import React from "react";
import "./Home.css";
import userStore from "../store/userStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarComponent from "@/components/Header/AvatarComponent";
import WriteBlog from "@/components/WriteBlog";

export default function Home() {
  const { currentUser } = userStore();

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const cleanPhotoUrl = currentUser.photoURL?.split(" ")[0];

  return (
    <div className="p-4 min-h-screen ">
      <h1 className="text-2xl  font-bold mb-4">
        Welcome, {currentUser.username || "Guest"}
      </h1>
      {cleanPhotoUrl && <AvatarComponent />}  
    </div>
  );
}
