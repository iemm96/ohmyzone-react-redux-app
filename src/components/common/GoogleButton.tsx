import GoogleIcon from '../../icons/GoogleIcon';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/auth';
import { useGoogleLogin } from 'react-google-login';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';

export const useGoogleButton = ({api_host, googleClient}:{ api_host:string, googleClient:string }) => {
    const dispatch = useDispatch();
    const [ loadingGoogle, setLoadingGoogle ] = useState<boolean>( false );

    const onSuccessGoogleAuth = async (response:any) => {
        try{
            const { data } = await axios.post(
                `${ api_host }auth/google`,
                response.tokenObj
            );
    
            localStorage.setItem('token', data.token);

            setLoadingGoogle( false );

            dispatch( login(
                data.user.name,
                data.user.uid,
                data.token,
                data.user?.subscription,
                data.picture,
            ));
        }catch(e:any){
            return e?.response?.data
        }
    }

    const { signIn, loaded } = useGoogleLogin({
        onSuccess: onSuccessGoogleAuth,
        onFailure: (success:any) => {
            alert('Ocurrió un error al iniciar sesión con Google.');
            setLoadingGoogle( false );
        },
        clientId: googleClient,
    });

    return({
        signIn,
        loadingGoogle,
        setLoadingGoogle
    })

}

export const GoogleButton = ({signIn, loadingGoogle, setLoadingGoogle}:{signIn:any, loadingGoogle:boolean, setLoadingGoogle:any}) => {
    return(
        <Button
            disabled={ loadingGoogle }
            sx={{
                width: '100%',
                border: '1px solid #8A9DF9',
                color: '#8A9DF9',
                padding: '14px 0',
                borderRadius: 3.5,
                textTransform: 'none'
            }}
            onClick={ () => {
                setLoadingGoogle( true );
                signIn();
            } }
            startIcon={ loadingGoogle ? <CircularProgress size={ 12 }/> : <GoogleIcon/> }
        >
            Accede con Google
        </Button>
    )
}