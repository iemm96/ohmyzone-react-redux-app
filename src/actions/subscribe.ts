import axios, {AxiosRequestConfig, AxiosRequestHeaders} from "axios";

const { REACT_APP_API_HOST } = process.env;

export const subscribe = async ( user:string, subscriptionType:"free" | "expired" | "proWithFreeTrial" | "proMonthly" | "proAnnual" | "proLifetime", activeUntil:Date, transactionUid?:string  ) => {

    const authToken = localStorage.getItem('token');

    const headers:AxiosRequestHeaders = {
        "Content-Type": "application/json",
        "x-token": ""
    };

    if(authToken) {
        headers["x-token"] = authToken;
    }

    const options:AxiosRequestConfig<any> = {
        url:`${ REACT_APP_API_HOST }subscriptions/subscribe`,
        method: 'POST',
        headers: headers,
        data: {
            subscriptionType,
            user,
            activeUntil,
            transactionUid
        }
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