import { User, Settings, Book, Info } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ tab }) {
  return (
    <div className="bg-black-700 flex flex-col border-r-2 dark:border-gray-800 border-gray-200 sm:border-b-2">
      <Link to="?tab=profile" className="md:mt-28 ">
        <SidebarButton tabSelected={tab == "profile"}>
          <User className="w-5 h-5" />
          <span>Profile</span>
        </SidebarButton>
      </Link>
      <Link to="?tab=MyBlogs">
        <SidebarButton tabSelected={tab == "MyBlogs"}>
          <Book className="w-5 h-5" />
          <span>My Blogs</span>
        </SidebarButton>
      </Link>
      <Link to="?tab=About">
        <SidebarButton tabSelected={tab == "About"}>
          <Info className="w-5 h-5" />
          <span>About</span>
        </SidebarButton>
      </Link>
      <Link to="?tab=Settings">
        <SidebarButton tabSelected={tab == "Settings"}>
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </SidebarButton>
      </Link>
    </div>
  );
}

function SidebarButton({ children, tabSelected }) {
  return (
    <div
      className={`mx-4 my-2 p-4 text-xl font-semibold flex items-center gap-3 rounded-lg transition-colors
        ${
          tabSelected
            ? "bg-[#e2e2e2] dark:bg-gray-800 text-purple-600 dark:text-purple-500 [&>*]:text-purple-600 dark:[&>*]:text-purple-500"
            : "hover:bg-gray-100 dark:hover:bg-gray-800 [&>*]:text-gray-700 dark:[&>*]:text-gray-300"
        }`}
    >
      {children}
    </div>
  );
}
