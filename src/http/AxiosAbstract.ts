import axiosInstance from './AxiosInstance';

export abstract class AHttpClient {

    public static getPage = (url: string, charset?: string) => {
        const queryString = charset
            ? `&fromCharset=${charset}`
            : '';

        return axiosInstance
            .get<string>(`proxy?q=${url}${queryString}`)
            .then(response => response.data);
    };

    public static GetPagePost = (payload: {
        q: string;
        fromCharset?: string;
    }) => {

        return axiosInstance
            .post<string>("proxy", payload)
            .then(response => response.data);
    };
}
