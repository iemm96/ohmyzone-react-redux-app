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
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Divider, ThemeProvider } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { postRecord } from '../actions/postRecord';
import { defaultTheme } from '../themes/index';
import { GoogleButton, useGoogleButton } from '../components/common/GoogleButton';

const { REACT_APP_GOOGLE_CLIENT, REACT_APP_API_HOST } = process.env;

const RegisterForm = () => {
    const { uid } = useSelector( (state:any) => state.auth )
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ loading, setLoading ] = useState<boolean>( false );
    const { signIn, loadingGoogle, setLoadingGoogle } = useGoogleButton({
        api_host: REACT_APP_API_HOST ? REACT_APP_API_HOST : '',
        googleClient: REACT_APP_GOOGLE_CLIENT ? REACT_APP_GOOGLE_CLIENT : ''
    });

    
    const { handleSubmit, control, formState: {errors}, setError } = useForm();
    
    useEffect(() => {
        if( uid ) {
            navigate( '/dashboard' );
        }
    },[ uid ]);

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
            <motion.div
                initial={{
                    height: 290,
                    backgroundColor: '#4664F6',
                    justifyContent:'center',
                    alignItems:'center',
                    display:'flex'
                }}
                animate={{
                    height: 100,
                    transition: { ...transition }
                }}
            >
            <motion.img
              initial={{ 
                height: 120,
                 y: 0
              }}
              animate={{
                y: 0,
                height: 60,
                transition: { ...transition }
              }}
              alt="logo"
              src={Logo} style={{
              height: 120
            }}/>
          </motion.div>
          <ThemeProvider theme={ defaultTheme }>
            <Container maxWidth="sm">
                <form>        
                    <motion.div initial='initial' animate='animate' exit='exit'>
                        <motion.span variants={ enteringFormTransition }>
                            <motion.div variants={ inputTransition }>
                                <Grid mt={5} mb={2} container>
                                    <Grid xs={ 12 } item>
                                        <Controller
                                            name={ "name" }
                                            control={ control }
                                            rules={{
                                                required: 'El nombre es requerido.',
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <TextField
                                                    InputProps={{
                                                        disableUnderline: true
                                                    }}
                                                    sx={ inputLoginStyles } 
                                                    fullWidth
                                                    variant="filled"
                                                    onChange={ onChange }
                                                    value={ value }
                                                    label="Tu nombre" 
                                                />
                                            )}
                                        />
                                        {errors.name && <Typography variant="caption" sx={{color:'red'}}>{ errors.name.message }</Typography>}
                                    </Grid>
                                </Grid>
                            </motion.div>
                            <motion.div variants={ inputTransition }>
                                <Grid mb={2} container>
                                    <Grid xs={ 12 } item>
                                        <Controller
                                            name={ "email" }
                                            control={ control }
                                            rules={{
                                                required: 'El correo es requerido.',
                                                pattern: {
                                                    value: /^\S+@\S+$/i,
                                                    message: 'El correo no es válido.'
                                                }
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <TextField
                                                    InputProps={{
                                                        disableUnderline: true
                                                    }}
                                                    sx={inputLoginStyles} 
                                                    fullWidth
                                                    variant="filled"
                                                    onChange={onChange}
                                                    value={value}
                                                    label="Tu email" 
                                                />
                                            )}
                                        />
                                        {errors.email && <Typography variant="caption" sx={{color:'red'}}>{ errors.email.message }</Typography>}
                                    </Grid>
                                </Grid>
                            </motion.div>
                            <motion.div variants={ inputTransition }>
                                <Grid mb={2}>
                                    <Grid item>
                                        <Controller
                                            name={ "password" }
                                            control={ control }
                                            rules={{
                                                required: 'La contraseña es requerida.',
                                                minLength: {
                                                    value: 6,
                                                    message: 'La contraseña debe tener al menos 6 carácteres.'
                                                }
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <TextField 
                                                    InputProps={{
                                                        disableUnderline: true,
                                                        type: "password"
                                                    }}
                                                    sx={inputLoginStyles} 
                                                    fullWidth
                                                    variant="filled"
                                                    onChange={onChange}
                                                    value={value}
                                                    label="Ingresa una contraseña" 
                                                />
                                            )}
                                        />
                                        {errors.password && <Typography variant="caption" sx={{color:'red'}}>{ errors.password.message }</Typography>}
                                    </Grid>
                                </Grid>
                            </motion.div>
                            <motion.div variants={ inputTransition }>
                                <Button
                                    disabled={ loading }
                                    fullWidth
                                    sx={{
                                        padding: '14px 0',
                                        borderRadius: 3.5,
                                        textTransform: 'none',                                
                                    }}
                                    variant="contained"
                                    startIcon={ loading && <CircularProgress  sx={{ color:'white' }} size={ 12 } /> }
                                    onClick={ handleSubmit( onSubmit ) }
                                >
                                    { loading ? 'Creando tu cuenta...' : '¡Crear mi cuenta!' }
                                </Button>
                            </motion.div>
                        </motion.span>
                        </motion.div>
                    </form>
                    <Box sx={{
                        backgroundColor: 'white',
                        bottom: 16,
                        width: '100%'
                        }}>
                        <Grid mt={12} mb={4}>
                            <Divider sx={{
                            mb:1,
                            "&.MuiDivider-root": {
                                "&::before": {
                                borderTop: "thin solid #AAAFB6"
                                },
                                "&::after": {
                                borderTop: "thin solid #AAAFB6"
                                }
                            },
                            "& .MuiDivider-wrapper": {
                                fontSize: 12,
                                color: '#AAAFB6'
                            }
                            }}>
                                O bien
                            </Divider>
                            <Grid item xs={12}>
                                <GoogleButton signIn={ signIn } loadingGoogle={ loadingGoogle } setLoadingGoogle={ setLoadingGoogle } />
                            </Grid>
                        </Grid>
                        <Grid mb={4}>
                            <Grid item xs={12} justifyContent="center" display="flex">
                                <Button 
                                    onClick={ () => navigate('/') }
                                    sx={{color: '#4664F6'}}
                                    startIcon={ <ChevronLeft/> }
                                >
                                    Volver
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
            </Container>
          </ThemeProvider>

        
        </>
        
    )
}

export default RegisterForm;