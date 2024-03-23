import axiosInstance from "./AxiosInstance";

export abstract class AHttpClient {

    public static getPage = (url: string) => axiosInstance
        .get<string>(`https://marketplace-backend-eeh6.onrender.com/proxy?q=${url}`)
        .then(response => response.data)
}
