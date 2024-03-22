import axiosInstance from "./AxiosInstance";

export abstract class AHttpClient {

    public static getPost = () => axiosInstance
        .get<any>('https://marketplace-backend-eeh6.onrender.com/proxy?q=https://www.rzeszowiak.pl/')
        .then(response => response.data)
}
