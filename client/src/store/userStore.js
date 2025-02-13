import { LogOut } from "lucide-react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
const userStore = create(
  persist(
    (set) => ({
      currentUser: null,
      loading: false,
      errorMessage: null,

      signInStart: () => set({ loading: true, errorMessage: null }),
      signInSuccess: (payload) =>
        set({
          currentUser: payload,
          loading: false,
          errorMessage: null,
        }),
      signInFail: (payload) => set({ loading: false, errorMessage: payload }),
      setCurrentUser: (payload) => set({ currentUser: payload }),
      setError: (payload) => set({ errorMessage: payload }),
      LogOutSuccess: () =>
        set({ loading: false, errorMessage: null, currentUser: null }),
    }),
    {
      name: "currentUser-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default userStore;
