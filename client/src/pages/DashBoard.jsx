import ProfileComponent from "@/components/DashBoard/DashBoard-Profile";
import Sidebar from "@/components/DashBoard/DashBoard-Sidebar";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function DashBoard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    setTab(urlParams.get("tab"));
  }, [location.search]);
  console.log(tab);

  const handleTab = () => {
    switch (tab) {
      case "profile":
        return <ProfileComponent></ProfileComponent>;
      case "MyBlogs":
        return "helllo blog walo";
      case "About":
        return "ye le about section";
      case "Settings":
        return "ye le settings";
      default:
        return <Navigate to="?tab=profile"></Navigate>;
    }
  };
  return (
    <div className="grid grid-row-1 md:grid-cols-4  min-h-screen">
      {/* // sidebar */}

      <Sidebar tab={tab}></Sidebar>

      {/* //main page */}
      {handleTab()}
    </div>
  );
}
