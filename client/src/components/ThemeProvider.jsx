import ThemeStore from "@/store/ThemeStore";
import React from "react";

export default function ThemeProvider({ children }) {
  const { toggleTheme, DefaultTheme } = ThemeStore();
  return (
    <div className={DefaultTheme}>
      <div className="bg-white text-gray-700 dark:text-gray-200 dark:bg-black min-h-screen">{children}</div>
    </div>
  );
}
