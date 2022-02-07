import withTheme from '../../components/WithTheme';
import Header from '../../components/Header';
import { Container, Paper, Box, Stepper, Step, StepLabel, Stack, BottomNavigation, Button } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTheme } from '@mui/material';
import { motion } from "framer-motion";
import { useParams, useNavigate } from 'react-router-dom';
import PreviewSection from './PreviewSection';
import { LinksSection } from './LinksSection';
import CoverSection from './CoverSection';

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
    
    const { handleSubmit, control, formState: {errors}, } = useForm();
    const params = useParams();
    const navigate = useNavigate();
    const theme = useTheme();

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

    return (
        <>
            <Header/>
            <Paper 
                sx={{
                    pt: 10,
                    height: '100vh',
                    backgroundColor: theme.palette.secondary.main
                }}
                elevation={ 0 }
            >
                <Container maxWidth="sm">
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={params.part ? parseInt(params.part) - 1 : 0} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                    { params.part === '1' && <CoverSection/> }
                    
                    { params.part === '2' && <LinksSection/> }

                    { params.part === '4' && <PreviewSection/> }
                </Container>
            </Paper>
        </>
    )
};

export default withTheme( ZoneForm );
