import axios from 'axios';
import baseUrl from '../constants/baseUrl';
import { actionTypes } from '../actionTypes/actionTypes';
export const startGoogleLogin = () => {
    return (dispatch:any) => {
        
    }
}

export const startValidateJWT = ( jwt:string ) => {

    return async ( dispatch:any ) => {

        try{
            const { data } = await axios.get(
                `${ baseUrl }auth`,
                {
                    headers: {'x-token': jwt}
                }
            );

            if(data.user) {
                return dispatch( login(data.user.name, data.user.uid, jwt ));
            }else{
                return false;
            }
        }catch(e){
            console.log(e);
        }
        

        
        
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
        dispatch( login(data.user.name, data.user.uid, data.token ));
    }
}

export const startRegister = ( name:string, email:string, password:string, role:string = "USER" ) => {
    const payload = {
        name, 
        email,
        password,
        role
    }

    return async ( dispatch:any ) => {
        await axios.post(
            `${ baseUrl }users`,
            payload
        );

        dispatch( startLogin( email, password ) );
    }
}

export const login = ( name:string, uid:string, token:string ) => ({
    type: actionTypes.login,
    payload: {
        name,
        uid,
        token
    }
});