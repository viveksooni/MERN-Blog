import { SquarePen } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export default function WriteBlog() {
  return (
    <Link to="/create-post" className=" ">
      <Button className=" p-3  rounded-full z-50">
        <SquarePen className="h-5 w-5" />
      </Button>
    </Link>
  );
}
