import React from "react";
import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import "./Header.css"; // Import the CSS file for custom styles

export default function Header() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <Navbar className="border b-2">
      <Link
        to={"/"}
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-1 py-2 bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 rounded-lg text-white">
          Vivek's
        </span>
        Blog
      </Link>

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

      <div className="flex flex-row gap-2 md:order-2">
        <Button color="gray" className="w-12 h-10 hidden sm:inline" pill>
          <FaMoon />
        </Button>
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
        <Navbar.Toggle className="text-purple-400" />
      </div>

      <Navbar.Collapse>
        <Navbar.Link
          as={Link}
          to="/"
          className={`relative font-semibold hover:underline-animation ${
            isActive("/") ? "!text-purple-600 hover:text-purple-600 " : "hover:!text-gray-700"
          }`}
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          to="/about"
          className={`relative font-semibold hover:underline-animation ${
            isActive("/about") ? "!text-purple-600 hover:text-purple-600 " : "hover:!text-gray-700"
          }`}
        >
          About
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          to="/project"
          className={`relative font-semibold hover:underline-animation ${
            isActive("/project") ? "!text-purple-600 hover:text-purple-600 " : "hover:!text-gray-700"
          }`}
        >
          Project
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          to="/pricing"
          className={`relative font-semibold hover:underline-animation ${
            isActive("/pricing") ? "!text-purple-600 hover:text-purple-600 " : "hover:!text-gray-700"
          }`}
        >
          Pricing
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          to="/contact"
          className={`relative font-semibold hover:underline-animation ${
            isActive("/contact") ? "!text-purple-600 hover:text-purple-600 " : "hover:!text-gray-700"
          }`}
        >
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
