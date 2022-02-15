import StyledSwitch from '../../styled/StyledSwitch';
import TextField from '@mui/material/TextField';
import { InputAdornment, Grid, Stack, useTheme, Typography, CircularProgress } from '@mui/material';
import { Call, ChevronLeft, Email, Facebook, Instagram, WhatsApp } from '@mui/icons-material';
import { useState } from 'react';
import { ContactOptionsType } from '../../types/ContactOptionsType';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { Tiktok } from '@styled-icons/boxicons-logos/Tiktok';
import { updateRecord } from '../../actions/updateRecord';
import { motion } from "framer-motion";
import { transition } from '../../constants/transitions';
import { Controller, useForm } from 'react-hook-form';

const SocialIconsSection = ( {prev, next}:{ prev:number, next:number } ) => {
    const  { zone } = useParams();
    const [ loading, setLoading ] = useState<boolean>(false);
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors }, clearErrors } = useForm();

    const theme = useTheme();

    const [ contactOptions, setContactOptions ] = useState<ContactOptionsType>({
        facebook: false,
        instagram: false,
        whatsapp: false,
        tiktok: false,
        phone: false,
        email: false,
    });

    const onSubmit = async ( data:any ) => {
        setLoading( true );
        const links:any = {
            socialLinks: data
        }
        if(zone) {
            await updateRecord( 'zones', links, zone );
            setLoading( false );
            navigate( `/zones/new/${next}/${zone}`);
        }
    }

    return(
        <>
        <motion.div
            initial={{
                x: 20,
                opacity: 0

            }}
            animate={{
                x: 0,
                opacity: 1,
                transition: { ...transition }
            }}
        >
            <Typography sx={{ mt: 2, mb: 1 }} variant="subtitle1">Botones de contacto</Typography>
        </motion.div>
        <form onSubmit={ handleSubmit( onSubmit )}>
            <Grid spacing={ 2 }  container>
                <Grid item xs={12}>
                    <Stack direction="row" sx={{alignItems: 'center', justifyContent: 'space-between' }}>
                        <StyledSwitch 
                            onChange={ (e:React.ChangeEvent<HTMLInputElement>) => {
                                setContactOptions({ ...contactOptions, facebook: e.target.checked });
                                clearErrors('facebook');
                            } }
                            checked={ contactOptions.facebook } 
                        />
                        <Controller
                            name="facebook"
                            control={ control }
                            rules={{
                                required: contactOptions.facebook ? 'Ingresa tu nombre de usuario de Facebook' : false
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextField
                                    disabled={ !contactOptions.facebook }
                                    placeholder="Url de tu Facebook"
                                    fullWidth
                                    onChange={ onChange }
                                    value={ value }
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Facebook color={ contactOptions.facebook ? "primary" : "disabled" }/>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </Stack>
                    { errors.facebook && <Typography variant="caption" sx={{color:'red'}}>{errors.facebook.message }</Typography>}
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" sx={{alignItems: 'center', justifyContent: 'space-between' }}>
                        <StyledSwitch 
                            onChange={ (e:React.ChangeEvent<HTMLInputElement>) => 
                                {
                                    setContactOptions({ ...contactOptions, instagram: e.target.checked })
                                    clearErrors('instagram');
                                } }
                            checked={ contactOptions.instagram } 
                        />
                        <Controller
                            name="instagram"
                            rules={{
                                required: contactOptions.instagram ? 'Ingresa tu nombre de usuario de Instagram' : false
                            }}
                            control={ control }
                            render={ ({ field: { onChange, value } }) => (
                                
                                <TextField
                                    disabled={ !contactOptions.instagram }
                                    placeholder="Nombre de usuario de tu instagram"
                                    fullWidth
                                    onChange={ onChange }
                                    value={ value }
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Instagram color={ contactOptions.instagram ? "primary" : "disabled" }/>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </Stack>
                    { errors.instagram && <Typography variant="caption" sx={{color:'red'}}>{errors.instagram.message }</Typography>}
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" sx={{alignItems: 'center', justifyContent: 'space-between' }}>
                        <StyledSwitch 
                            onChange={ (e:React.ChangeEvent<HTMLInputElement>) => {
                                setContactOptions({ ...contactOptions, phone: e.target.checked });
                                clearErrors('phone');
                            } }
                            checked={ contactOptions.phone } 
                        />
                        <Controller
                            name="phone"
                            rules={{
                                required: contactOptions.phone ? 'Ingresa tu teléfono' : false
                            }}
                            control={ control }
                            render={ ({ field: { onChange, value } }) => (
                                
                                <TextField
                                    disabled={ !contactOptions.phone }
                                    placeholder="Tu teléfono"
                                    fullWidth
                                    onChange={ onChange }
                                    value={ value }
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Call color={ contactOptions.phone ? "primary" : "disabled" }/>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                        
                    </Stack>
                    { errors.phone && <Typography variant="caption" sx={{color:'red'}}>{errors.phone.message }</Typography>}
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" sx={{alignItems: 'center', justifyContent: 'space-between' }}>
                        <StyledSwitch 
                            onChange={ (e:React.ChangeEvent<HTMLInputElement>) => {
                                setContactOptions({ ...contactOptions, whatsapp: e.target.checked });
                                clearErrors('whatsapp');
                            } }
                            checked={ contactOptions.whatsapp } 
                        />
                        <Controller
                            name="whatsapp"
                            rules={{
                                required: contactOptions.whatsapp ? 'Ingresa tu WhatsApp' : false
                            }}
                            control={ control }
                            render={ ({ field: { onChange, value } }) => (
                                
                                <TextField
                                    disabled={ !contactOptions.whatsapp }
                                    placeholder="Tu WhatsApp"
                                    fullWidth
                                    onChange={ onChange }
                                    value={ value }
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <WhatsApp color={ contactOptions.whatsapp ? "primary" : "disabled" }/>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                        
                    </Stack>
                    { errors.whatsapp && <Typography variant="caption" sx={{color:'red'}}>{errors.whatsapp.message }</Typography>}
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" sx={{alignItems: 'center', justifyContent: 'space-between' }}>
                        <StyledSwitch 
                            onChange={ (e:React.ChangeEvent<HTMLInputElement>) =>{
                                setContactOptions({ ...contactOptions, email: e.target.checked })
                                clearErrors('email');
                            } }
                            checked={ contactOptions.email } 
                        />
                        <Controller
                            name="email"
                            rules={{
                                required: contactOptions.tiktok ? 'Ingresa tu Email' : false
                            }}
                            control={ control }
                            render={ ({ field: { onChange, value } }) => (
                                
                                <TextField
                                    disabled={ !contactOptions.email }
                                    placeholder="Tu Email"
                                    fullWidth
                                    onChange={ onChange }
                                    value={ value }
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email color={ contactOptions.email ? "primary" : "disabled" }/>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                        
                    </Stack>
                    { errors.email && <Typography variant="caption" sx={{color:'red'}}>{errors.email.message }</Typography>}
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" sx={{alignItems: 'center', justifyContent: 'space-between' }}>
                        <StyledSwitch 
                            onChange={ (e:React.ChangeEvent<HTMLInputElement>) => {
                                setContactOptions({ ...contactOptions, tiktok: e.target.checked })
                                clearErrors('tiktok');
                            } }
                            checked={ contactOptions.tiktok } 
                        />
                        <Controller
                            name="tiktok"
                            rules={{
                                required: contactOptions.tiktok ? 'Ingresa tu usuario de Tiktok' : false
                            }}
                            control={ control }
                            render={ ({ field: { onChange, value } }) => (
                                
                                <TextField
                                    disabled={ !contactOptions.tiktok }
                                    placeholder="Nombre de usuario de tu Tiktok"
                                    fullWidth
                                    onChange={ onChange }
                                    value={ value }
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Tiktok size={24} color={ contactOptions.tiktok ? theme.palette.primary.main : "rgba(255,255,255,0.3)" }/>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                        
                    </Stack>
                    { errors.tiktok && <Typography variant="caption" sx={{color:'red'}}>{errors.tiktok.message }</Typography>}
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
                    disabled={ loading }
                    startIcon={ loading && <CircularProgress size={ 12 } color="inherit"/> }
                    
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
        </form>
        </>
    )
}

export default SocialIconsSection;