export interface LoginRequest {
  email: string;
  password?: string;
}

export interface RegisterVolunteerRequest {
  name: string;
  email: string;
  password?: string;
  confirm_password?: string;
  role: "volunteer";
}

export interface RegisterLembagaRequest {
  institution_name: string;
  email: string;
  password?: string;
  confirm_password?: string;
  role: "lembaga";
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    role: "volunteer" | "lembaga" | "super_admin";
    redirect_url?: string;
    user?: {
      id: string;
      email: string;
      name?: string;
      institution_name?: string;
    };
  };
}
