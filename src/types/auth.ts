export interface LoginRequest {
  email: string;
  password?: string;
  // Add other fields as necessary
}

export interface RegisterRequest {
  email: string;
  name: string;
  password?: string;
  // Add other fields as necessary
}

export interface AuthResponse {
  token: string;
  role: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}
