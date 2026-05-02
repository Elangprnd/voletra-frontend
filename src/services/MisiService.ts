import axiosInstance from "@/lib/axios";
import { CreateMisiRequest, Misi, Applicant } from "@/types/misi";

export const MisiService = {
  getMisi: async (params?: {
    lat?: number;
    lng?: number;
    radius?: number;
    kategori?: string;
  }): Promise<Misi[]> => {
    const response = await axiosInstance.get("/misi", { params });
    return response.data;
  },

  getAll: async (): Promise<Misi[]> => {
    const response = await axiosInstance.get("/misi");
    return response.data;
  },
  getById: async (id: string): Promise<Misi> => {
    const response = await axiosInstance.get(`/misi/${id}`);
    return response.data;
  },
  getByPelapor: async (status?: string): Promise<Misi[]> => {
    const params = status && status !== "All" ? { status } : {};
    const response = await axiosInstance.get("/misi/pelapor/me", { params });
    return response.data;
  },
  getApplicants: async (id: string): Promise<Applicant[]> => {
    const response = await axiosInstance.get(`/misi/${id}/applicants`);
    return response.data;
  },
  approveApplicant: async (applyId: string): Promise<void> => {
    const response = await axiosInstance.patch(`/apply/${applyId}/approve`);
    return response.data;
  },
  rejectApplicant: async (applyId: string): Promise<void> => {
    const response = await axiosInstance.patch(`/apply/${applyId}/reject`);
    return response.data;
  },
  create: async (data: CreateMisiRequest): Promise<Misi> => {
    const formData = new FormData();
    formData.append("judul", data.judul);
    formData.append("deskripsi", data.deskripsi);
    formData.append("kategori", data.kategori);
    formData.append("alamat", data.alamat);
    formData.append("jumlah_relawan", data.jumlah_relawan.toString());

    data.foto.forEach((file) => {
      formData.append("foto", file);
    });

    const response = await axiosInstance.post("/misi", formData);
    return response.data;
  },
};
