import axios, {AxiosRequestConfig, AxiosRequestHeaders} from "axios";

const { REACT_APP_API_HOST } = process.env;

export const postRecord = async (resource:string, payload: any ) => {

    const authToken = localStorage.getItem('token');

    const headers:AxiosRequestHeaders = {
        "Content-Type": "application/json",
        "x-token": ""
    };

    if(authToken) {
        headers["x-token"] = authToken;
    }

    const options:AxiosRequestConfig<any> = {
        url:`${ REACT_APP_API_HOST }${ resource }`,
        method: 'POST',
        headers: headers,
        data: payload
    };

    try {
        const response = await axios(options);

        if(response) {
            return response.data;
        }

    }catch (error) {
        return {
            success: false,
            error
        }
    }

};