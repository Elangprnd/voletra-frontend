import axiosInstance from "@/lib/axios";
import { AuthResponse, LoginRequest, RegisterRequest } from "@/types/auth";

export const AuthService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  },
  register: async (data: RegisterRequest & { role: "volunteer" | "lembaga" }): Promise<AuthResponse> => {
    const endpoint = data.role === "volunteer" ? "/auth/register/volunteer" : "/auth/register/lembaga";
    const payload = data.role === "volunteer" 
      ? { ...data } 
      : { ...data, institution_name: data.name }; // Backend expects institution_name for lembaga
    
    const response = await axiosInstance.post(endpoint, payload);
    return response.data;
  },
  updateRole: async (role: "volunteer" | "lembaga"): Promise<AuthResponse> => {
    const response = await axiosInstance.post("/auth/update-role", { role });
    return response.data;
  },
  logout: async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  },
};
