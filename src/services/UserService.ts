import axiosInstance from '@/lib/axios';
import { User } from '@/app/store/authStore';

export const UserService = {
  getMe: async (): Promise<User> => {
    const response = await axiosInstance.get('/user/me');
    return response.data;
  },
};
