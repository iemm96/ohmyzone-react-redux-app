import axios from 'axios';
import { baseUrl } from '../constants/baseUrl';
import { actionTypes } from '../actionTypes/actionTypes';
export const startGoogleLogin = () => {
    return (dispatch:any) => {
        
    }
}

export const startLogin = ( email:string, password:string ) => {

    const payload = {
        email,
        password
    }

    return async ( dispatch:any ) => {
        const { data } = await axios.post(
            `${ baseUrl }auth/login`,
            payload
        );

        localStorage.setItem('token', data.token);
        dispatch( login(data.user.name, data.token ));
    }
}

export const login = ( name:string, token:string ) => ({
    type: actionTypes.login,
    payload: {
        name,
        token
    }
})