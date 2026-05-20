import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  token: string | null;
  role: string | null;
  user: User | null;
  isModalOpen: boolean;
  redirectTo: string | null;

  setAuth: (token: string, role: string | null, user: User) => void;
  clearAuth: () => void;
  openModal: () => void;
  closeModal: () => void;
  setRedirectTo: (path: string) => void;
  clearRedirectTo: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      role: null,
      user: null,
      isModalOpen: false,
      redirectTo: null,

      openModal: () => set({ isModalOpen: true }),
      closeModal: () => set({ isModalOpen: false }),
      setRedirectTo: (path) => set({ redirectTo: path }),
      clearRedirectTo: () => set({ redirectTo: null }),

      setAuth: (token, role, user) => {
        set({ token, role, user });
        if (typeof window !== "undefined") {
          document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;
          document.cookie = `role=${role}; path=/; max-age=86400; SameSite=Lax`; // ← tambah ini
        }
      },

      clearAuth: () => {
        set({ token: null, role: null, user: null });
        if (typeof window !== "undefined") {
          document.cookie ="token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
          document.cookie ="role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; // ← tambah ini
          localStorage.removeItem("auth-storage");
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
