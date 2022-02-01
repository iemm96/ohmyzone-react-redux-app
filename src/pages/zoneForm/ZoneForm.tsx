import withTheme from '../../components/WithTheme';
import Header from '../../components/Header';
import { Container, Paper, Grid, TextField, Typography, Box, Stepper, Step, StepLabel, FormGroup, InputAdornment, Stack, BottomNavigation, Button } from '@mui/material';
import { useState } from 'react';
import Uploader from '../Uploader';
import { Controller, useForm } from 'react-hook-form';
import { UsernameCreator } from '../../components/UsernameCreator';
import { useTheme } from '@mui/material';
import { motion } from "framer-motion";
import { Facebook } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import PreviewSection from './PreviewSection';
import { LinksSection } from './LinksSection';
import StyledSwitch from '../../styled/StyledSwitch';

const steps = [
    'Datos de la portada',
    'Enlaces',
    'Temas y colores',
    'Vista previa',
];

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
    const navigate = useNavigate();
    const theme = useTheme();

    const handleChangeName = (e:any) => {
        setFullName(e.target.value);
    }

    const goBack = () => {
        const parsedPart = params.part && parseInt( params.part );

        if(parsedPart) {
            navigate( `/zones/new/${ parsedPart - 1 }` );
        }
    }

    const goNext = () => {
        const parsedPart = params.part && parseInt( params.part );
        if(parsedPart) {
            navigate( `/zones/new/${ parsedPart + 1 }` );
        }
    }

    const submitForm = (data:any) => {
        console.log(data);
    }

    return (
        <>
            <Header/>
            <Paper 
                sx={{
                    pt: 10,
                    pb: 8,
                    height: '100%',
                    backgroundColor: theme.palette.secondary.main
                }}
                elevation={ 0 }
            >
                <Container>
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={params.part ? parseInt(params.part) - 1 : 0} alternativeLabel>
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
                        <form onSubmit={ handleSubmit( submitForm ) }>
                            <Grid mt={1} mb={2} container>
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
                                        <StyledSwitch 
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
                    
                    { params.part === '2' && <LinksSection/> }

                    { params.part === '4' && <PreviewSection/> }
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
                    <Paper 
                        sx={{
                            p: 1,
                            position: params.part === '4' ? 'fixed' : 'fixed',
                            bottom: 0, 
                            left: 0,
                            right: 0,
                            zIndex: 100
                        }} 
                        elevation={ params.part === '4' ? 3 : 0 }
                    >
                        <BottomNavigation sx={{ width: '100%' }}>
                            <Stack sx={{ width: '100%', justifyContent: 'space-around' }} direction="row">
                                <Button onClick={ () => goBack() }>
                                    Volver
                                </Button>
                                <Button
                                    onClick={ () => goNext() }
                                    sx={{
                                        textTransform: 'none'
                                    }}
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    Guardar y continuar
                                </Button>
                            </Stack>
                            
                        </BottomNavigation>
                    </Paper>
                </motion.div>
            </Paper>
        </>
    )
};

export default withTheme( ZoneForm );
