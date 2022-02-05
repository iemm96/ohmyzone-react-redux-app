import React from 'react';
import './App.css';
import { Box } from '@mui/system';
import Logo from './assets/logo.svg';
import { Button, Container, Divider, Grid, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { createSvgIcon } from '@mui/material/utils';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startLogin } from './actions/auth';

const HomeIcon = createSvgIcon(
  <>
    <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107"/>
    <path d="M3.15308 7.3455L6.43858 9.755C7.32758 7.554 9.48058 6 12.0001 6C13.5296 6 14.9211 6.577 15.9806 7.5195L18.8091 4.691C17.0231 3.0265 14.6341 2 12.0001 2C8.15908 2 4.82808 4.1685 3.15308 7.3455Z" fill="#FF3D00"/>
    <path d="M11.9999 22C14.5829 22 16.9299 21.0115 18.7044 19.404L15.6094 16.785C14.5717 17.5742 13.3036 18.001 11.9999 18C9.39891 18 7.19041 16.3415 6.35841 14.027L3.09741 16.5395C4.75241 19.778 8.11341 22 11.9999 22Z" fill="#4CAF50"/>
    <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2"/>
  </>,
  'Google',
);

const transition = {
  duration: 1,
  ease: [0.6, .01, -0.05, 0.9]
}

const enteringFormTransition = {
  initial: {
    opacity:0,
    x: -10
  },
  animate: {
    opacity:1,
    x: 0,
    transition: {
      delayChildren: .6,
      staggerChildren: .1,
      staggerDirection: 1,
    }
  }
}

const inputTransition = {
  initial: {
    opacity:0,
    x: -10,
  },
  animate: {
    opacity:1,
    x: 0,
    transition: {...transition}
  }
}

function App() {
  const navigate = useNavigate();
  const { handleSubmit, control, formState: {errors}, } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data: any) => {
    console.log(data);
    dispatch( startLogin( data.email, data.password ) );
    navigate('zones/new/1');
  };

  const inputStyles = {
    '& .MuiFilledInput-input': {                      
      color: '#4664F6',
    },
    '& .MuiFilledInput-root': {
      backgroundColor: '#EBF2FF',
      borderRadius: 3.5,
    }
  }

  return (
    <>
      <Box sx={{
        height: 290,
        backgroundColor: '#4664F6',
        justifyContent:'center',
        alignItems:'center',
        display:'flex'
      }}>
        <motion.img
          initial={{ 
            opacity:0,
             y:20
          }}
          animate={{
            opacity:1,
            y:0,
            transition: {delay: .2, ...transition}
          }}
          alt="logo"
          src={Logo} style={{
          height: 120
        }}/>
      </Box>      
      <Container>
        
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
                          sx={inputStyles} 
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
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextField 
                          InputProps={{
                            disableUnderline: true,
                            type: "password"
                          }}
                          sx={inputStyles} 
                          fullWidth
                          variant="filled"
                          onChange={onChange}
                          value={value}
                          label="Contraseña" />
                      )}
                    />
                  </Grid>
                </Grid>
              </motion.div>
              <motion.div variants={inputTransition}>
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
                  onClick={handleSubmit(onSubmit)}
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
                startIcon={<HomeIcon/>}
                >
                Accede con Google
              </Button>
            </Grid>
          </Grid>
          <Grid mb={4}>
            <Grid item xs={12} justifyContent="center" display="flex">
              <Typography sx={{color: '#AAAFB6'}}>¿Aún no tienes cuenta?</Typography>
              <Typography sx={{color: '#4664F6', fontWeight: 600, marginLeft:1}}>Regístrate</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default App;