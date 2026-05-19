import axiosInstance from '@/lib/axios';
import { AuthResponse, LoginRequest, RegisterVolunteerRequest, RegisterLembagaRequest } from '@/types/auth';

export const AuthService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/login', data);
    return response.data;
  },
  registerVolunteer: async (data: RegisterVolunteerRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/register/volunteer', data);
    return response.data;
  },
  registerLembaga: async (data: RegisterLembagaRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/register/lembaga', data);
    return response.data;
  },
  logout: async () => {
    const response = await axiosInstance.post('/auth/logout');
    return response.data;
  },
};
