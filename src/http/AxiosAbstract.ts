import axiosInstance from "./AxiosInstance";

export abstract class AHttpClient {

    public static getPage = (url: string) => axiosInstance
        .get<string>(`proxy?q=${url}`)
        .then(response => response.data)
}
