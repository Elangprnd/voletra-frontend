export interface Misi {
  id: string;
  title: string;
  description: string;
  status: string;
  category: string;
  lat: number;
  lng: number;
  // Add other fields as necessary
}

export interface CreateMisiRequest {
  title: string;
  description: string;
  // Add other fields as necessary
}
