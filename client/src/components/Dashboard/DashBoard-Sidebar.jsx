import userStore from "@/store/userStore";
import { User, Settings, Book, Info } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ tab }) {
  const { currentUser } = userStore();
  return (
    <aside className="md:sticky top-0 md:h-screen md:w-64 w-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 ">
      {/* Mobile header */}
      <div className="md:hidden flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold">Dashboard</h2>
      </div>
      {/* Mobile header dashboard */}
      <nav className=" md:hidden flex-row md:flex-col h-full overflow-y-auto p-2 md:p-4 md:pt-8 md:h-full">
        <div className="flex flex-row flex-wrap">
          <Link to="?tab=profile">
            <SidebarButton tabSelected={tab === "profile"}>
              <User className="w-5 h-5" />
              <span>Profile</span>
            </SidebarButton>
          </Link>
          {currentUser.isAdmin && (
            <Link to="?tab=MyBlogs">
              <SidebarButton tabSelected={tab === "MyBlogs"}>
                <Book className="w-5 h-5" />
                <span>My Blogs</span>
              </SidebarButton>
            </Link>
          )}
          <Link to="?tab=About">
            <SidebarButton tabSelected={tab === "About"}>
              <Info className="w-5 h-5" />
              <span>About</span>
            </SidebarButton>
          </Link>{" "}
          <Link to="?tab=Settings">
            <SidebarButton tabSelected={tab === "Settings"}>
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </SidebarButton>
          </Link>
        </div>
      </nav>
      {/* Sidebar navigation */}
      <nav className="hidden md:flex  md:flex-col h-full overflow-y-auto p-2 md:p-4 md:pt-8 md:h-full">
        <div className="flex-1 space-y-2">
          <Link to="?tab=profile">
            <SidebarButton tabSelected={tab === "profile"}>
              <User className="w-5 h-5" />
              <span>Profile</span>
            </SidebarButton>
          </Link>

          {currentUser.isAdmin && (
            <Link to="?tab=MyBlogs">
              <SidebarButton tabSelected={tab === "MyBlogs"}>
                <Book className="w-5 h-5" />
                <span>My Blogs</span>
              </SidebarButton>
            </Link>
          )}

          <Link to="?tab=About">
            <SidebarButton tabSelected={tab === "About"}>
              <Info className="w-5 h-5" />
              <span>About</span>
            </SidebarButton>
          </Link>
        </div>
        <div className="pt-2  border-t border-gray-200 dark:boarder-gray-800"></div>
        <Link to="?tab=Settings">
          <SidebarButton tabSelected={tab === "Settings"}>
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </SidebarButton>
        </Link>
      </nav>
    </aside>
  );
}

function SidebarButton({ children, tabSelected }) {
  return (
    <div
      className={`p-3 my-1 flex items-center gap-3 rounded-lg transition-all duration-200 ${
        tabSelected
          ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-medium"
          : "hover:bg-gray-100 dark:hover:bg-gray-800/60 text-gray-700 dark:text-gray-300"
      }`}
    >
      {children}
    </div>
  );
}
