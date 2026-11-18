import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import type { ApiResponse, HealthCheckData } from "@/types/api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5143/api";

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Gắn JWT Token vào header Authorization (NFR-05)
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("mbhms_access_token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Trích xuất response hoặc bắt lỗi chuẩn
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        // Token hết hạn hoặc không hợp lệ -> chuyển về trang đăng nhập
        localStorage.removeItem("mbhms_access_token");
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Gọi API kiểm tra trạng thái sức khỏe của Backend .NET 10 (NFR-13)
 */
export async function getHealthStatus(): Promise<ApiResponse<HealthCheckData>> {
  const response = await apiClient.get<ApiResponse<HealthCheckData>>("/health");
  return response.data;
}
