import Logo from '../assets/logo.svg';
import { Button, Container, Divider, Grid, TextField, Typography, Box, CircularProgress, useMediaQuery, useTheme, Paper } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startLogin } from '../actions/auth';
import { useEffect, useState } from 'react';
import { transition, enteringFormTransition, inputTransition } from '../constants/transitions';
import { inputLoginStyles } from '../styles/inputLoginStyles';
import { ThemeProvider } from '@emotion/react';
import { defaultTheme } from '../themes/index';
import LoginFooter from '../components/common/LoginFooter';

const Login = () => {
    const { name } = useSelector( (state:any ) => state.auth );
    const theme = useTheme();
    const mediaQuery = useMediaQuery(theme.breakpoints.down('md'));
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
           
          <ThemeProvider theme={ defaultTheme }>
            <Paper>
              <motion.div
                  initial={{
                      height: mediaQuery ? 100 : 80,
                      backgroundColor: '#4664F6',
                      justifyContent:'center',
                      alignItems:'center',
                      display:'flex'
                  }}
                  animate={{
                      height: mediaQuery ? 290 : 180,
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
                <LoginFooter/>
              </Container>
            </Paper>
          </ThemeProvider>    
        </>
    )
}

export default Login;