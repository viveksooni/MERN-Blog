import ProfileComponent from "@/components/DashBoard/DashBoard-Profile";
import Sidebar from "@/components/DashBoard/DashBoard-Sidebar";
import MyBlogs from "@/components/DashBoard/MyBlogs";
import UsersList from "@/components/Dashboard/UsersList";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function DashBoard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    setTab(urlParams.get("tab")||"profile");
  }, [location.search]);

  const handleTab = () => {
    switch (tab) {
      case "profile":
        return <ProfileComponent></ProfileComponent>;
      case "MyBlogs":
        return <MyBlogs></MyBlogs>;
      case "About":
        return "ye le about section";
      case "Settings":
        return "ye le settings";
      case "Users":
        return <UsersList></UsersList>
     
    }
  };
  return (
    // <div className="grid grid-row-1 md:grid-cols-4  min-h-screen">
    <div className="flex flex-col md:flex-row  md:gap-4 min-h-[100vh]">
      {/* // sidebar */}

      <Sidebar tab={tab}></Sidebar>

      {/* //main page */}
      <div className="flex-1 p-4 ">{handleTab()}</div>
    </div>
  );
}
