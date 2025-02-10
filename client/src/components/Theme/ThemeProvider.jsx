import { Flowbite } from 'flowbite-react';
import React, { useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ThemeProvider({ children }) {
  const customTheme = {
    dark: true,
    theme: {
      navbar: {
        root: {
          base: "bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-[#09090b] sm:px-4",
        },
      },
    },
  };

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Flowbite theme={{ theme: customTheme }}>
        <div className="min-h-screen bg-white text-gray-700 dark:text-white dark:bg-[#09090b]">
          {children}
        </div>
      </Flowbite>
    </NextThemesProvider>
  );
}
