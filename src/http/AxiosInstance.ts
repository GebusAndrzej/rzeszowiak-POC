import axios, {
    AxiosInstance,
    InternalAxiosRequestConfig
} from 'axios'

const axiosInstance: AxiosInstance = axios.create({
        baseURL: import.meta.env.VITE_APP_BASE_URL,
    });

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        // config.headers.Authorization = 'Bearer <example>'

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;