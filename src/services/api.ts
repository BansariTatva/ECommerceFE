import axios, { type AxiosRequestConfig } from 'axios';

// Create an Axios instance with base configuration
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081';
const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                const newAccessToken = await refreshAccessToken(refreshToken);
                if (newAccessToken) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                }
            }
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const apiPost = <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => api.post<T>(url, data, config);
export const refreshAccessToken = (refreshToken: string) => apiPost<{ accessToken: string }>('/auth/refresh', { refreshToken });


export default api;