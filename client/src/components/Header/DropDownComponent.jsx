import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import userStore from "@/store/userStore";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AvatarComponent from "./AvatarComponent";
export default function DropDownComponent() {
  const { LogOutSuccess } = userStore();
  const handleLogOut = async () => {
    try {
      navigate("/sign-in", { replace: true });
      await axios.post("/api/v1/signout");
      LogOutSuccess();
      toast({
        title: "Success",
        description: `Logged out successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AvatarComponent />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>{" "}
        <DropdownMenuSeparator />
        <Link to="/dashboard?tab=profile">
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={handleLogOut}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
