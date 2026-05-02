export interface Misi {
  id: string;
  judul: string;
  deskripsi: string;
  kategori: string;
  alamat: string;
  jumlah_relawan: number;
  foto: string[]; // URLs or file names from backend
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMisiRequest {
  judul: string;
  deskripsi: string;
  kategori: string;
  alamat: string;
  jumlah_relawan: number;
  foto: File[];
}
