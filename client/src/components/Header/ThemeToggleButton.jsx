import React from "react";
import { Button } from "flowbite-react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "next-themes";

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      color="gray"
      className="w-13 h-10 self-center sm:inline"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      pill
    >
      {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
    </Button>
  );
}
