import { create } from "zustand";
import { persist } from "zustand/middleware";

const ThemeStore = create(
  persist(
    (set) => ({
      DefaultTheme: "light",
      toggleTheme: () =>
        set((state) => ({
          DefaultTheme: state.DefaultTheme === "light" ? "dark" : "light",
        })),
    }),
    { name: "theme-storage" }
  )
);

export default ThemeStore;
