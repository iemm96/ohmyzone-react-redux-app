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
import { Box, CircularProgress, Divider, Paper, ThemeProvider } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { postRecord } from '../actions/postRecord';
import { defaultTheme } from '../themes/index';
import LoginFooter from '../components/common/LoginFooter';


const RegisterForm = () => {
    const { uid } = useSelector( (state:any) => state.auth )
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ loading, setLoading ] = useState<boolean>( false );
    
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
        <ThemeProvider theme={ defaultTheme }>
            <Paper>
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
                    <LoginFooter backTo='/'/>
                </Container>
            </Paper>
        </ThemeProvider>  
    );
}

export default RegisterForm;