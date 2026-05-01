import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  isModalOpen: boolean;
}

interface AuthState {
  token: string | null;
  role: string | null;
  user: User | null;
  isModalOpen: boolean;
  
  setAuth: (token: string, role: string, user: User) => void;
  clearAuth: () => void;
  openModal: () => void;
  closeModal: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist((set) => ({
      token: null,
      role: null,
      user: null,
      isModalOpen: false,

      setAuth: (token, role, user) => set({ token, role, user }),
      clearAuth: () => 
        set({ 
          token: null, 
          role: null, 
          user: null 
        }),
        openModal: () => set({ isModalOpen: true }),
        closeModal: () => set({ isModalOpen: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage), 
    }
  )
);