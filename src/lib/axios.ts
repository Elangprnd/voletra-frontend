import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthStore } from '@/app/store/authStore';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Crucial for sending cookies to backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // If we have a token in store, send it as Bearer (fallback for non-cookie auth)
    const token = useAuthStore.getState().token;
    if (token && token !== 'session') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // Clear auth state on the frontend
      useAuthStore.getState().clearAuth();
      
      // Redirect to home with auth param only if we are in the browser
      if (typeof window !== 'undefined') {
        window.location.href = '/?auth=login';
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
