export type MisiStatus = 'Open' | 'Ongoing' | 'Completed';

export interface Misi {
  id: string;
  judul: string;
  deskripsi: string;
  kategori: string;
  alamat: string;
  longitude?: number;
  latitude?: number;
  link_contact?: string;
  jumlah_relawan: number;
  tanggal_mulai?: string;
  tanggal_selesai?: string;
  foto: string[]; // URLs or file names from backend
  status: MisiStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Applicant {
  apply_id: string;
  user_id: string;
  nama: string;
  tanggal_lahir: string;
  phone: string;
  skill: string;
  domisili: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface CreateMisiRequest {
  judul: string;
  deskripsi: string;
  kategori: string;
  alamat: string;
  longitude?: number;
  latitude?: number;
  link_contact?: string;
  jumlah_relawan: number;
  tanggal_mulai?: string;
  tanggal_selesai?: string;
  foto: File[];
}
