import Logo from '../assets/logo.svg';
import { motion } from "framer-motion";
import { enteringFormTransition, inputTransition, transition } from '../constants/transitions';
import { inputLoginStyles } from '../styles/inputLoginStyles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { startLogin, login } from '../actions/auth';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, CircularProgress, Divider, Stack, ThemeProvider } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { postRecord } from '../actions/postRecord';
import { defaultTheme } from '../themes/index';
import { GoogleButton, useGoogleButton } from '../components/common/GoogleButton';
import ConfirmationIllustration from '../assets/confirmed-email.svg';
import StyledButton from '../styled/StyledButton';
import { validateEmail } from '../actions/validateEmail';
import Dashboard from './Dashboard';

const { REACT_APP_GOOGLE_CLIENT, REACT_APP_API_HOST } = process.env;

const ConfirmEmail = () => {
    const { uid } = useSelector( (state:any) => state.auth )
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const [ loading, setLoading ] = useState<boolean>( false );
    

    
    const { handleSubmit, control, formState: {errors}, setError } = useForm();
    
    useEffect(() => {
        handleValidateEmail();
    },[ ]);

    const handleValidateEmail = async () => {
        setLoading( true );

        if( params.user && params.token ) {
            const result = await validateEmail( params.user, params.token );
            if( result.success ) {
                setLoading( false );
            }
        }
    }
    const onSubmit = async (data: any) => {
        setLoading( true );
        const result = await postRecord('users', {
            ...data,
            role: 'USER'
        });

        if( result?.success === false ) {
            setLoading( false );
            setError( result.error.response.data.errors[0].param, {
                type: 'manual',
                message: result.error.response.data.errors[0].msg
            } )
            return;
        }
        setLoading( false );
        dispatch( startLogin( result.user.email, data.password ) );
    };

    return(
        <>
            <Box
                sx={{
                    height: 100,
                    backgroundColor: '#4664F6',
                    justifyContent:'center',
                    alignItems:'center',
                    display:'flex'
                }}
            >
            <img
              
              alt="logo"
              src={Logo} 
              style={{
                 height: 60
            }}/>
          </Box>
          <ThemeProvider theme={ defaultTheme }>
            <Container maxWidth="sm">
                
                <Stack justifyContent="center" sx={{ mt: 4 }} spacing={ 2 }>
                    {
                        loading ? (
                            <Box sx={{ justifyContent: 'center', display: 'flex' }}>
                                <CircularProgress/>
                            </Box>
                        ) : (
                            <>
                                <Typography align="center" color="text.primary" variant="h4">
                                    ¡Tu correo ha sido confirmado correctamente!
                                </Typography>
                                <motion.img
                                    initial={{
                                        opacity: 0,
                                        height: 120,
                                        y: 10
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        height: 200,
                                        transition: { ...transition }
                                    }}
                                    alt="logo"
                                    src={ ConfirmationIllustration } 
                                    style={{
                                        height: 120
                                    }}
                                />
                                <Typography align="center" color="text.secondary" variant="body2">
                                    ¡Ya puedes publicar tu Zone!
                                </Typography>
                                <StyledButton
                                    color="primary"
                                    variant="contained"
                                    onClick={ () => navigate( '/dashboard' )}
                                >
                                    Volver a mi Dashboard
                                </StyledButton>
                            </>
                        )
                    }
                    
                </Stack>
            </Container>
          </ThemeProvider>

        
        </>
        
    )
}

export default ConfirmEmail;