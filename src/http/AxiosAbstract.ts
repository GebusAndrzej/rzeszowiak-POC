import axiosInstance from "./AxiosInstance";

export abstract class AHttpClient {

    public static getPost = () => axiosInstance
        .get<any>('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.data)
}
