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
    }),
    {
      name: "currentUser-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default userStore;
