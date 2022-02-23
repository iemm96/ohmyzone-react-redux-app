import axios, {AxiosRequestConfig, AxiosRequestHeaders} from "axios";

const { REACT_APP_API_HOST } = process.env;

export const fetchRecords = async (resource:string) => {

    const authToken = localStorage.getItem('token');

    const headers:AxiosRequestHeaders = {
        "Content-Type": "application/json",
        "x-token": ""
    };

    if(authToken) {
        headers["x-token"] = `Bearer ${authToken}`;
    }

    const options:AxiosRequestConfig<any> = {
        url:`${ REACT_APP_API_HOST }${ resource }`,
        method: 'GET',
        headers: headers,
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