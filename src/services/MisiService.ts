import axiosInstance from '@/lib/axios';
import { CreateMisiRequest, Misi } from '@/types/misi';

export const MisiService = {
  getAll: async (): Promise<Misi[]> => {
    const response = await axiosInstance.get('/misi');
    return response.data;
  },
  getById: async (id: string): Promise<Misi> => {
    const response = await axiosInstance.get(`/misi/${id}`);
    return response.data;
  },
  create: async (data: CreateMisiRequest): Promise<Misi> => {
    const response = await axiosInstance.post('/misi', data);
    return response.data;
  },
};
