import React from "react";
import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";

import ThemeToggleButton from "./ThemeToggleButton";
import "./Header.css";
import userStore from "@/store/userStore";

import Logo from "../Logo";

import DropDownComponent from "./DropDownComponent";

export default function Header() {
  const { currentUser } = userStore();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkStyle = (tab) => {
    const style = `relative font-semibold hover:underline-animation ${
      isActive(`${tab}`)
        ? "!text-purple-600 hover:text-purple-600 "
        : "hover:!text-gray-700 dark:hover:!text-white"
    }`;
    return style;
  };
  return (
    <Navbar className="border b-2 dark:bg-[#09090b]">
      {/* Logo */}
      <Logo size={"sm:text-xl text-sm"} />

      {/* Search */}
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        ></TextInput>
      </form>

      <Button className="w-12 h-10 lg:hidden" pill color="gray">
        <AiOutlineSearch size={18} />
      </Button>

      <div className="flex flex-row gap-2  md:order-2">
        {/* toggletheme */}
        
        <ThemeToggleButton />

        {currentUser ? (
          <DropDownComponent />
        ) : (
          <Link to={"/sign-up"}>
            <Button
              pill
              outline
              gradientDuoTone="cyanToBlue"
              className="font-semibold"
            >
              Sign Up
            </Button>
          </Link>
        )}
        <Navbar.Toggle className="text-purple-400" />
      </div>

      {/* Nav Links */}
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/" className={linkStyle("/")}>
          Home
        </Navbar.Link>

        <Navbar.Link
          as={Link}
          to="/dashboard"
          className={linkStyle("/dashboard")}
        >
          Dashboard
        </Navbar.Link>

        <Navbar.Link as={Link} to="/project" className={linkStyle("/project")}>
          Project
        </Navbar.Link>

        <Navbar.Link as={Link} to="/about" className={linkStyle("/about")}>
          About
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
