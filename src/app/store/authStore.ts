import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  token: string | null;
  role: string | null;
  user: User | null;
  
  setAuth: (token: string, role: string, user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist((set) => ({
      token: null,
      role: null,
      user: null,

      setAuth: (token, role, user) => set({ token, role, user }),

      clearAuth: () => 
        set({ 
          token: null, 
          role: null, 
          user: null 
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage), 
    }
  )
);