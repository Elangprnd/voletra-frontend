import axiosInstance from "@/lib/axios";
import { AuthResponse, LoginRequest, RegisterRequest } from "@/types/auth";

export const AuthService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {

    // MOCK — hapus kalau backend sudah siap
    if (data.email === 'relawan@test.com') {
      return { success: true, message: 'ok', data: { token: 'mock-token', role: 'volunteer', user: { id: '1', email: data.email, name: 'Relawan Test' } } };
    }
    if (data.email === 'lembaga@test.com') {
      return { success: true, message: 'ok', data: { token: 'mock-token', role: 'lembaga', user: { id: '2', email: data.email, name: 'Lembaga Test' } } };
    }

    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  },
  register: async (data: RegisterRequest): Promise<AuthResponse> => {

    // MOCK — hapus kalau backend sudah siap
    // Role null karena belum pilih role, akan diarahkan ke /pilih-role
    if (data.email && data.password) {
      return { success: true, message: 'ok', data: { token: 'mock-token', role: null, user: { id: '3', email: data.email, name: data.name } } };
    }
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
  },
  updateRole: async (role: "volunteer" | "lembaga"): Promise<AuthResponse> => {

    // MOCK — hapus kalau backend sudah siap
    return { 
      success: true, 
      message: 'ok', 
      data: { 
        token: 'mock-token', 
        role, 
        user: { id: '3', email: 'test@test.com', name: 'Test User' } 
      } 
    };
    // balikin ini kalo BE siap
    // const response = await axiosInstance.post("/auth/update-role", { role });
    // return response.data;
  },
  logout: async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  },
};
