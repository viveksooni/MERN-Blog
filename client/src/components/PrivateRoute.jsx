import React from "react";
import userStore from "@/store/userStore";
import { Outlet, Navigate } from "react-router-dom";
export default function PrivateRoute() {
  const { currentUser } = userStore();

  return currentUser ? <Outlet></Outlet> : <Navigate to="sign-in" />;
}
