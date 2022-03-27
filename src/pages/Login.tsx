import Logo from '../assets/logo.svg';
import { Button, Container, Divider, Grid, TextField, Typography, Box, CircularProgress } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startLogin } from '../actions/auth';
import { useEffect, useState } from 'react';
import { transition, enteringFormTransition, inputTransition } from '../constants/transitions';
import { inputLoginStyles } from '../styles/inputLoginStyles';
import GoogleIcon from '../icons/GoogleIcon';
import { ThemeProvider } from '@emotion/react';
import { defaultTheme } from '../themes/index';

const Login = () => {
    const { name } = useSelector( (state:any ) => state.auth );
  
    const navigate = useNavigate();
    const { handleSubmit, control, formState: {errors}, setError } = useForm();
    const [ loading, setLoading ] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
      document.body.style.backgroundColor = 'white';
    },[ ]);

    useEffect(() => {
        if( name ) {
          navigate('/dashboard');
        }
    },[ name ]);

    const onSubmit = async (data: any) => {
        setLoading( true );

          const result:any = await dispatch( startLogin( data.email, data.password ) );
        
          if(result?.type) {
            setError( result.type , {
              type: "manual",
              message: result.msg,
            });
          }
          
        setLoading( false );
    };



    return(
        <>
           <motion.div
                initial={{
                    height: 100,
                    backgroundColor: '#4664F6',
                    justifyContent:'center',
                    alignItems:'center',
                    display:'flex'
                }}
                animate={{
                    height: 290,
                    transition: { ...transition }
                }}
            >
            <motion.img
              initial={{ 
                height: 60,
                 y: 0
              }}
              animate={{
                y: 0,
                height: 120,
                transition: { ...transition }
              }}
              alt="logo"
              src={Logo} style={{
              height: 120
            }}/>
          </motion.div>
          <ThemeProvider theme={ defaultTheme }>
            <Container maxWidth="xs">
              <form>        
                <motion.div initial='initial' animate='animate' exit='exit'>
                  <motion.span variants={enteringFormTransition}>
                    <motion.div variants={inputTransition}>
                      <Grid mt={5} mb={2} container>
                        <Grid xs={ 12 } item>
                          <Controller
                            name={"email"}
                            control={control}
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
                                sx={ inputLoginStyles } 
                                fullWidth
                                variant="filled"
                                onChange={onChange}
                                value={value}
                                label="Email" 
                              />
                            )}
                          />
                          {errors.email && <Typography variant="caption" sx={{color:'red'}}>{errors.email.message}</Typography>}
                        </Grid>
                      </Grid>
                    </motion.div>
                    <motion.div variants={inputTransition}>
                      <Grid mb={2}>
                        <Grid item>
                          <Controller
                            name={"password"}
                            rules={{
                              required: 'La contraseña es requerida.'
                            }}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <TextField
                                InputProps={{
                                  disableUnderline: true,
                                  type: "password"
                                }}
                                sx={ inputLoginStyles } 
                                fullWidth
                                variant="filled"
                                onChange={onChange}
                                value={value}
                                label="Contraseña" />
                            )}
                          />
                          {errors.password && <Typography variant="caption" sx={{color:'red'}}>{errors.password.message}</Typography>}
                        </Grid>
                      </Grid>
                    </motion.div>
                    <motion.div variants={inputTransition}>
                      <Button 
                        disabled={ loading }
                        sx={{
                          width: '100%',
                          color: 'white',
                          padding: '14px 0',
                          borderRadius: 3.5,
                          textTransform: 'none',
                        }} 
                        variant="contained"
                        startIcon={ loading && <CircularProgress sx={{ color:'inherit' }} size={ 12 }/> }
                        onClick={handleSubmit( onSubmit )}
                      >
                      Iniciar sesión
                      </Button>
                    </motion.div>
                  </motion.span>
                </motion.div>
              </form>
              
              <Grid mt={2}>
                <Grid item sx={{
                    justifyContent: 'center',
                    display: 'flex',
                  }}>
                  <Typography sx={{color: '#AAAFB6'}}>Olvidé mi contraseña</Typography>
                </Grid>
              </Grid>
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
                    <Button 
                      sx={{
                        width: '100%',
                        backgroundColor: 'white',
                        border: '1px solid #4664F6',
                        color: '#4664F6',
                        padding: '14px 0',
                        borderRadius: 3.5,
                        textTransform: 'none'
                      }}
                      startIcon={<GoogleIcon/>}
                      >
                      Accede con Google
                    </Button>
                  </Grid>
                </Grid>
                <Grid mb={4}>
                  <Grid item xs={12} justifyContent="center" display="flex">
                    <Typography sx={{color: '#AAAFB6'}}>¿Aún no tienes cuenta?</Typography>
                    <Button onClick={ () => navigate('/register') } sx={{p: 0, color: '#4664F6', fontWeight: 600, marginLeft:1}}>Regístrate</Button>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </ThemeProvider>    
        </>
    )
}

export default Login;