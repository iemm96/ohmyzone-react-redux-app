import StyledSwitch from '../../styled/StyledSwitch';
import TextField from '@mui/material/TextField';
import { InputAdornment, Grid, Stack, useTheme } from '@mui/material';
import { Call, ChevronLeft, Email, Facebook, Instagram, WhatsApp } from '@mui/icons-material';
import { useState } from 'react';
import { ContactOptionsType } from '../../types/ContactOptionsType';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Tiktok } from '@styled-icons/boxicons-logos/Tiktok';

const SocialIconsSection = ( {prev, next}:{ prev:number, next:number }) => {
    const navigate = useNavigate();
    const theme = useTheme();

    const [ contactOptions, setContactOptions ] = useState<ContactOptionsType>({
        facebook: false,
        instagram: false,
        whatsapp: false,
        tiktok: false,
        phone: false,
        email: false,
    });


    return(
        <>
        <Grid spacing={ 2 } sx={{ mt: 2 }} container>
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
            <Grid item xs={12}>
                <Stack direction="row" sx={{alignItems: 'center', justifyContent: 'space-between' }}>
                    <StyledSwitch 
                        onChange={ (e:React.ChangeEvent<HTMLInputElement>) => setContactOptions({ ...contactOptions, instagram: e.target.checked }) }
                        checked={ contactOptions.instagram } 
                    />
                    <TextField
                        disabled={ !contactOptions.instagram }
                        placeholder="Nombre de usuario de tu instagram"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Instagram color={ contactOptions.instagram ? "primary" : "disabled" }/>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Stack direction="row" sx={{alignItems: 'center', justifyContent: 'space-between' }}>
                    <StyledSwitch 
                        onChange={ (e:React.ChangeEvent<HTMLInputElement>) => setContactOptions({ ...contactOptions, phone: e.target.checked }) }
                        checked={ contactOptions.phone } 
                    />
                    <TextField
                        disabled={ !contactOptions.phone }
                        placeholder="Tu teléfono"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Call color={ contactOptions.phone ? "primary" : "disabled" }/>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Stack direction="row" sx={{alignItems: 'center', justifyContent: 'space-between' }}>
                    <StyledSwitch 
                        onChange={ (e:React.ChangeEvent<HTMLInputElement>) => setContactOptions({ ...contactOptions, whatsapp: e.target.checked }) }
                        checked={ contactOptions.whatsapp } 
                    />
                    <TextField
                        disabled={ !contactOptions.whatsapp }
                        placeholder="Tu WhatsApp"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <WhatsApp color={ contactOptions.whatsapp ? "primary" : "disabled" }/>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Stack direction="row" sx={{alignItems: 'center', justifyContent: 'space-between' }}>
                    <StyledSwitch 
                        onChange={ (e:React.ChangeEvent<HTMLInputElement>) => setContactOptions({ ...contactOptions, email: e.target.checked }) }
                        checked={ contactOptions.email } 
                    />
                    <TextField
                        disabled={ !contactOptions.email }
                        placeholder="Tu Email"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email color={ contactOptions.email ? "primary" : "disabled" }/>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Stack direction="row" sx={{alignItems: 'center', justifyContent: 'space-between' }}>
                    <StyledSwitch 
                        onChange={ (e:React.ChangeEvent<HTMLInputElement>) => setContactOptions({ ...contactOptions, tiktok: e.target.checked }) }
                        checked={ contactOptions.tiktok } 
                    />
                    <TextField
                        disabled={ !contactOptions.tiktok }
                        placeholder="Nombre de usuario de tu Tiktok"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Tiktok size={24} color={ contactOptions.tiktok ? theme.palette.primary.main : "rgba(255,255,255,0.3)" }/>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>
            </Grid>
        </Grid>
        <Stack>
            <Button
                sx={{ 
                    mt: 8,
                    textTransform: 'none',
                }}
                variant="contained"
                fullWidth
                type="submit"
            >
                Guardar y continuar
            </Button>
            <Button
                onClick={ () => navigate( `/zones/new/${prev}` ) }
                sx={{ 
                    mt: 2,
                    textTransform: 'none',
                }}
                fullWidth
                startIcon={ <ChevronLeft/> }
            >
                Volver
            </Button>
        </Stack>
            
        </>
    )
}

export default SocialIconsSection;