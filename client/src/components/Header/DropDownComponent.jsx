import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import AvatarComponent from "./AvatarComponent";
import userStore from "@/store/userStore";
import { Link } from "react-router-dom";
export default function DropDownComponent() {
  const { setCurrentUser } = userStore();
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
        <DropdownMenuItem
          onClick={() => {
            localStorage.removeItem("currentUser-storage");
            setCurrentUser(null);
            navigate("/sign-in");
          }}
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
