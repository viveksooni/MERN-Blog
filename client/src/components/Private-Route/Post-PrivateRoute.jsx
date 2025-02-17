import userStore from "@/store/userStore";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PostPrivateRoute() {

  
  const { currentUser } = userStore();
  return currentUser.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
}
