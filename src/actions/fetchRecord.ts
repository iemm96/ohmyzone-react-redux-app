import baseUrl from "./../constants/baseUrl";

import axios, {AxiosRequestConfig, AxiosRequestHeaders} from "axios";

export const fetchRecord = async (resource:string, uid:string) => {

    const authToken = localStorage.getItem('token');

    const headers:AxiosRequestHeaders = {
        "Content-Type": "application/json",
        "x-token": ""
    };

    if(authToken) {
        headers["x-token"] = `Bearer ${authToken}`;
    }

    const options:AxiosRequestConfig<any> = {
        url:`${baseUrl}${resource}/${uid}`,
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