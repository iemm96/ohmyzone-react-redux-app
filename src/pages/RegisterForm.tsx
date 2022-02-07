import { motion } from "framer-motion";
import { enteringFormTransition, inputTransition } from '../constants/transitions';
import { inputLoginStyles } from '../styles/inputLoginStyles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { startRegister } from '../actions/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const { uid } = useSelector( (state:any) => state.auth )
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    
    const { handleSubmit, control, formState: {errors}, } = useForm();

    useEffect(() => {
        if( uid ) {
            navigate( '/welcome' );
        }
    },[uid])

    const onSubmit = async (data: any) => {
        console.log(data);
        await dispatch( startRegister( data.name, data.email, data.password ) );
        
        //navigate('/dashboard');
    };

    return(
        <Container>
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
                                    {errors.email && <Typography variant="caption" sx={{color:'red'}}>{ errors.email.message }</Typography>}
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
                                    name={"password"}
                                    control={ control }
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
                                </Grid>
                            </Grid>
                        </motion.div>
                        <motion.div variants={ inputTransition }>
                            <Button 
                            sx={{
                                width: '100%',
                                backgroundColor: '#4664F6',
                                color: 'white',
                                padding: '14px 0',
                                borderRadius: 3.5,
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: 'black'
                                }
                            }} 
                            onClick={ handleSubmit(onSubmit) }
                            >
                                ¡Crear mi cuenta!
                            </Button>
                        </motion.div>
                    </motion.span>
                </motion.div>
            </form>
        </Container>
        
    )
}

export default RegisterForm;