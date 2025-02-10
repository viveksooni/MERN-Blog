import React from "react";
import "./Home.css";
import userStore from "../store/userStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarComponent from "@/components/Header/AvatarComponent";

export default function Home() {
  const { currentUser } = userStore();

  // Early return if no user data
  if (!currentUser) {
    return <div>Loading...</div>;
  }

  // Clean up the photoURL by removing any extra code/text that might have been concatenated
  const cleanPhotoUrl = currentUser.photoURL?.split(" ")[0];

  return (
    <div className="p-4">
      <h1 className="text-2xl  font-bold mb-4">
        Welcome, {currentUser.username || "Guest"}
      </h1>

      {cleanPhotoUrl && (
        <AvatarComponent/>
      )}
    </div>
  );
}
