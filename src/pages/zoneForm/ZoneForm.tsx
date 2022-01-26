import withTheme from '../../components/WithTheme';
import Header from '../../components/Header';
import { Container, Paper, Grid, TextField, Typography, Box, Stepper, Step, StepLabel, FormGroup, Switch, InputAdornment, Stack, BottomNavigation, Button } from '@mui/material';
import { useState } from 'react';
import Uploader from '../Uploader';
import { Controller, useForm } from 'react-hook-form';
import { UsernameCreator } from '../../components/UsernameCreator';
import { useTheme } from '@mui/material';
import { motion } from "framer-motion";
import { styled } from '@mui/system';
import { Facebook } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import PreviewSection from './PreviewSection';
const steps = [
    'Datos de la portada',
    'Enlaces',
    'Temas y colores',
    'Vista previa',
];

const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      '&:after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },
}));

type ContactOptionsType = {
    facebook: boolean;
    instagram: boolean;
    tiktok: boolean;
    phone: boolean;
    email: boolean;
}
  
const ZoneForm = () => {
    const [ fullName, setFullName ] = useState<String | undefined>(undefined);
    const [ contactOptions, setContactOptions ] = useState<ContactOptionsType>({
        facebook: false,
        instagram: false,
        tiktok: false,
        phone: false,
        email: false,
    });

    const { handleSubmit, control, formState: {errors}, } = useForm();
    const params = useParams();

    console.log(params.part);
    const theme = useTheme();

    const handleChangeName = (e:any) => {
        setFullName(e.target.value);
    }

    return (
        <>
            <Header/>
            <Paper 
                sx={{
                    pt: 10,
                    pb: 6,
                    backgroundColor: theme.palette.secondary.main
                }}
                elevation={ 0 }
            >
                <Container>
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={params.part ? parseInt(params.part) : 0} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                    { params.part === '1' ? <>
                        <Grid sx={{ mt: 2 }} container>
                            <Grid xs={12} item>
                                <Uploader/>
                            </Grid>
                        </Grid>
                        <form>
                            <Grid spacing={2} mt={1} mb={2} container>
                                <Grid xs={12} md={6} item>
                                    <TextField 
                                        fullWidth
                                        onChange={ ( e ) => handleChangeName( e ) }
                                        value={ fullName }
                                        label="* Título o nombre de tu Zone" 
                                    />
                                </Grid>
                                <Grid xs={12} md={6} item>
                                    <Controller
                                        name="subtitle"
                                        control={ control }
                                        render={({ field: { onChange, value } }) => (
                                            <TextField 
                                                fullWidth
                                                onChange={ onChange }
                                                value={ value }
                                                label="Subtítulo" 
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid xs={12} item>
                                    <UsernameCreator fullName={ fullName } textInputLabel="Identificador"/>
                                </Grid>
                            </Grid>
                            <Grid sx={{ mt: 2 }} container>
                                <Grid item xs={12}>
                                    <Stack direction="row" sx={{alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Android12Switch 
                                            onChange={ (e:React.ChangeEvent<HTMLInputElement>) => setContactOptions({ ...contactOptions, facebook: e.target.checked }) }
                                            checked={ contactOptions.facebook } 
                                        />
                                        <TextField
                                            
                                            disabled={ !contactOptions.facebook }
                                            placeholder="Url de tu Facebook"
                                            fullWidth
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Facebook color={ contactOptions.facebook ? "primary" : "disabled" }/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Stack>
                                </Grid>
                            </Grid>
                        </form>
                    </> : ''}
                    
                    {
                        params.part === '2' ??
                        <>

                        </>
                    }

                    <PreviewSection/>
                </Container>
                <motion.div 
                    initial={{
                        opacity: 0,
                        bottom: -20
                    }}
                    animate={{
                        opacity: 1,
                        bottom: 0,
                        transition: { delay: 3, duration: 0.5 }
                    }}
                >
                    <Paper sx={{ p: 1, position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                        <BottomNavigation sx={{ width: '100%' }}>
                            <Button
                                sx={{
                                    width: '100%',
                                    textTransform: 'none'
                                }}
                                variant="contained"
                                color="primary"
                            >
                                Guardar y finalizar
                            </Button>
                        </BottomNavigation>
                    </Paper>
                </motion.div>
                
                
            </Paper>
        </>
    )
};

export default withTheme( ZoneForm );
