export interface Misi {
  id: string;
  title: string;
  description: string;
  status: string;
  // Add other fields as necessary
}

export interface CreateMisiRequest {
  title: string;
  description: string;
  // Add other fields as necessary
}
