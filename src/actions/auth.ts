import axios from 'axios';
import { actionTypes } from '../actionTypes/actionTypes';
export const startGoogleLogin = () => {
    return (dispatch:any) => {
        
    }
}

const { REACT_APP_API_HOST } = process.env;

export const startValidateJWT = ( jwt:string ) => {

    return async ( dispatch:any ) => {

        try{
            const { data } = await axios.get(
                `${ REACT_APP_API_HOST }auth`,
                {
                    headers: {'x-token': jwt}
                }
            );

            if(data.user) {
                return dispatch( login(data.user.name, data.user.uid, jwt, data.user.plan ));
            }else{
                dispatch( logout );
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

        try{
            const { data } = await axios.post(
                `${ REACT_APP_API_HOST }auth/login`,
                payload
            );
    
            localStorage.setItem('token', data.token);
            dispatch( login(
                data.user.name,
                data.user.uid,
                data.token,
                data.user.plan,
            ));
        }catch(e:any){
            return e.response.data
        }
        
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
            `${ REACT_APP_API_HOST }users`,
            payload
        );

        dispatch( startLogin( email, password ) );
    }
}

export const login = ( name:string, uid:string, token:string, plan:string ) => ({
    type: actionTypes.login,
    payload: {
        name,
        uid,
        token,
        plan
    }
});

export const logout = () => ({
    type: actionTypes.logout,
})