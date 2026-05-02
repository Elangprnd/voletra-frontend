import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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
  
  setAuth: (token: string, role: string, user: User) => void;
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
 
      setAuth: (token, role, user) => set({ token, role, user }),
      clearAuth: () => set({ token: null, role: null, user: null }),
      openModal: () => set({ isModalOpen: true }),
      closeModal: () => set({ isModalOpen: false }),
      setRedirectTo: (path) => set({ redirectTo: path }),
      clearRedirectTo: () => set({ redirectTo: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage), 
    }
  )
);