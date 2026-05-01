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
  getByPelapor: async (status?: string): Promise<Misi[]> => {
    const params = status && status !== 'All' ? { status } : {};
    const response = await axiosInstance.get('/misi/pelapor/me', { params });
    return response.data;
  },
  create: async (data: CreateMisiRequest): Promise<Misi> => {
    const formData = new FormData();
    formData.append('judul', data.judul);
    formData.append('deskripsi', data.deskripsi);
    formData.append('kategori', data.kategori);
    formData.append('alamat', data.alamat);
    formData.append('jumlah_relawan', data.jumlah_relawan.toString());
    
    data.foto.forEach((file) => {
      formData.append('foto', file);
    });

    const response = await axiosInstance.post('/misi', formData);
    return response.data;
  },
};
