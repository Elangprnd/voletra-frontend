export interface LoginRequest {
  email: string;
  password: string; // ← hapus '?' karena password wajib saat login
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;         // ← wajib
  confirm_password: string; // ← tambah, biasanya backend butuh ini
}

export interface AuthResponse {
  success: boolean; // ← tambah, kamu pakai ini di RoleModal & login page
  message: string;  // ← tambah, untuk error handling
  data: {           // ← wrap ke dalam 'data' — sesuai response BE sebelumnya
    token: string;
    role: 'volunteer' | 'lembaga' | null; // ← null karena setelah register belum punya role
    user: {
      id: string;
      email: string;
      name: string;
    };
  };
}