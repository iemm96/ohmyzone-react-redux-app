import StyledSwitch from '../../styled/StyledSwitch';
import TextField from '@mui/material/TextField';
import { InputAdornment, Grid, Stack, useTheme, Typography } from '@mui/material';
import { Call, Email, Facebook, Instagram, WhatsApp } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { ContactOptionsType } from '../../types/ContactOptionsType';
import { useNavigate, useParams } from 'react-router-dom';
import { Tiktok } from '@styled-icons/boxicons-logos/Tiktok';
import { updateRecord } from '../../actions/updateRecord';
import { motion } from "framer-motion";
import { transition } from '../../constants/transitions';
import { Controller, useForm } from 'react-hook-form';
import CircularProgressComponent from '../../components/CircularProgressComponent';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import FormNavigationButtons from '../../components/FormNavigationButtons';
import { updateZone } from '../../actions/zones';
import { fetchRecord } from '../../actions/fetchRecord';
import { showPreviewButton } from '../../actions/ui';
import { useFormNavigationButtons } from '../../components/FormNavigationButtons';

const SocialIconsSection = ( {prev, next, fullForm}:{ prev?:number, next?:number, fullForm?:boolean } ) => {
    const { zone } = useSelector( (state:any) => state );
    const theme = useTheme();

    const params = useParams();
    const [ loading, setLoading ] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { control, handleSubmit, formState: { errors }, clearErrors, setValue } = useForm();
    const [ isFormReady, setIsFormReady ] = useState<boolean>( false );
    const { setButtonSaveProperties, buttonSaveProperties } = useFormNavigationButtons();

    const [ contactOptions, setContactOptions ] = useState<ContactOptionsType>({
        facebook: null,
        instagram: null,
        whatsapp: null,
        tiktok: null,
        phone: null,
        email: null,
    });

    useEffect(() => {
        dispatch( 
            showPreviewButton( true )
        );

        if( Object.keys(zone).length === 0 ) {
            getZone();
        }else{
            setDefaultValues(zone);
            setIsFormReady(true);
        }

        setButtonSaveProperties((prev:any) => ({
            ...prev,
            text: 'Guardar cambios',
            isVisible: true
        }));
    },[ ])

    const getZone = async () => {
        if( params.zone) {
            const { zone } = await fetchRecord('zones', params.zone);

            setDefaultValues(zone);

            dispatch( updateZone({
                ...zone,
                profileImage: zone?.profileImage?.url
            }));
        }

        setIsFormReady(true);
    }

    const setDefaultValues = (zone:any) => {

        if( zone?.socialLinks ) {
            setContactOptions( zone?.socialLinks );
        }

        zone?.socialLinks?.instagram && setValue( 'instagram', zone?.socialLinks?.instagram.value );
        zone?.socialLinks?.email && setValue( 'email', zone?.socialLinks?.email.value );
        zone?.socialLinks?.whatsapp && setValue( 'whatsapp', zone?.socialLinks?.whatsapp.value );
        zone?.socialLinks?.tiktok && setValue( 'tiktok', zone?.socialLinks?.tiktok.value );
        zone?.socialLinks?.phone && setValue( 'phone', zone.socialLinks.phone.value );
        zone?.socialLinks?.facebook && setValue( 'facebook', zone?.socialLinks?.facebook.value );
    }

    const onSubmit = async ( data:any ) => {
        setButtonSaveProperties( (prev:any) => ({
            ...prev,
            loading: true,
            text: 'Guardando botones...'
        }));
        const links:any = {
            socialLinks: data
        }
        if(zone) {
            await updateRecord( 'zones', links, zone.uid );
            setButtonSaveProperties( (prev:any) => ({
                ...prev,
                loading: false,
                text: 'Cambios guardados'
            }));

            if( !fullForm ) {
                navigate( `/zones/edit/${next}/${ zone.uid }`);
            }
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
            <Typography sx={{ mt: 2, mb: 1, color: theme.palette.text.secondary }} variant="subtitle1">Botones de contacto</Typography>
        </motion.div>
        {
            isFormReady ? 
            (
                <form onSubmit={ handleSubmit( onSubmit )}>
                    <Grid spacing={ 2 }  container>
                        <Grid item xs={12}>
                            <Stack direction="row" sx={{alignItems: 'center', justifyContent: 'space-between' }}>
                                <StyledSwitch 
                                    onChange={ (e:React.ChangeEvent<HTMLInputElement>) => {
                                        let val:any = e.target.checked ? {
                                            value: '',
                                            clicksCounter: contactOptions?.facebook?.clicksCounter ? contactOptions?.facebook?.clicksCounter : 0
                                        } : null;
                                        setContactOptions({ ...contactOptions, facebook: val});

                                        dispatch( updateZone({
                                            ...zone,
                                            socialLinks: {
                                                ...contactOptions,
                                                facebook: val
                                            }
                                        }));

                                        
                                        clearErrors('facebook');
                                    } }
                                    checked={ contactOptions?.facebook !== null } 
                                />
                                <Controller
                                    name="facebook"
                                    control={ control }
                                    rules={{
                                        required: contactOptions?.facebook ? 'Ingresa tu nombre de usuario de Facebook' : false
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            disabled={ !contactOptions.facebook }
                                            placeholder="Nombre de usuario de tu Facebook"
                                            fullWidth
                                            onBlur={ (e) => {
                                                dispatch( updateZone({
                                                    ...zone,
                                                    socialLinks: {
                                                        ...contactOptions,
                                                        facebook: {
                                                            value: e.target.value,
                                                            clicksCounter: contactOptions?.facebook ? contactOptions?.facebook?.clicksCounter : 0
                                                        }
                                                    }
                                                }));
                                            } }
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
                                    onChange={ (e:React.ChangeEvent<HTMLInputElement>) => {
                                        let val:any = e.target.checked ? {
                                            value: '',
                                            clicksCounter: contactOptions?.instagram?.clicksCounter ? contactOptions?.instagram?.clicksCounter : 0
                                        } : null;
                                        setContactOptions({ ...contactOptions, instagram: val })
                                        dispatch( updateZone({
                                            ...zone,
                                            socialLinks: {
                                                ...contactOptions,
                                                instagram: val
                                            }
                                        }));

                                        clearErrors('instagram');
                                    } }
                                    checked={ contactOptions?.instagram !== null  } 
                                />
                                <Controller
                                    name="instagram"
                                    rules={{
                                        required: contactOptions?.instagram ? 'Ingresa tu nombre de usuario de Instagram' : false
                                    }}
                                    control={ control }
                                    render={ ({ field: { onChange, value } }) => (
                                        
                                        <TextField
                                            disabled={ !contactOptions.instagram }
                                            placeholder="Nombre de usuario de tu instagram"
                                            fullWidth
                                            onBlur={ (e) => {
                                                dispatch( updateZone({
                                                    ...zone,
                                                    socialLinks: {
                                                        ...contactOptions,
                                                        instagram: {
                                                            value: e.target.value,
                                                            clicksCounter: contactOptions?.instagram ? contactOptions?.instagram?.clicksCounter : 0
                                                        }
                                                    }
                                                }));
                                            }}
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
                                        let val:any = e.target.checked ? {
                                            value: '',
                                            clicksCounter: contactOptions?.phone?.clicksCounter ? contactOptions?.phone?.clicksCounter : 0
                                        } : null;
                                        setContactOptions({ ...contactOptions, phone: val});
                                        dispatch( updateZone({
                                            ...zone,
                                            socialLinks: {
                                                ...contactOptions,
                                                phone: val
                                            }
                                        }));
                                        clearErrors('phone');
                                    } }
                                    checked={ contactOptions?.phone !== null } 
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
                                            onBlur={ (e) => {
                                                dispatch( updateZone({
                                                    ...zone,
                                                    socialLinks: {
                                                        ...contactOptions,
                                                        phone: {
                                                            value: e.target.value,
                                                            clicksCounter: contactOptions?.phone ? contactOptions?.phone?.clicksCounter : 0
                                                        }
                                                    }
                                                }));
                                            } }
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
                                        let val:any = e.target.checked ? {
                                            value: '',
                                            clicksCounter: contactOptions?.whatsapp?.clicksCounter ? contactOptions?.whatsapp?.clicksCounter : 0
                                        } : null;
                                        setContactOptions({ ...contactOptions, whatsapp: val});
                                        dispatch( updateZone({
                                            ...zone,
                                            socialLinks: {
                                                ...contactOptions,
                                                whatsapp: val
                                            }
                                        }));
                                        clearErrors('whatsapp');
                                    } }
                                    checked={ contactOptions.whatsapp !== null } 
                                />
                                <Controller
                                    name="whatsapp"
                                    rules={{
                                        required: contactOptions?.whatsapp ? 'Ingresa tu WhatsApp' : false
                                    }}
                                    control={ control }
                                    render={ ({ field: { onChange, value } }) => (
                                        
                                        <TextField
                                            disabled={ !contactOptions.whatsapp }
                                            placeholder="Tu WhatsApp"
                                            fullWidth
                                            onChange={ onChange }
                                            onBlur={ (e) => {
                                                dispatch( updateZone({
                                                    ...zone,
                                                    socialLinks: {
                                                        ...contactOptions,
                                                        whatsapp: {
                                                            value: e.target.value,
                                                            clicksCounter: contactOptions?.whatsapp ? contactOptions?.whatsapp?.clicksCounter : 0
                                                        }
                                                    }
                                                }));
                                            } }
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
                                    onChange={ (e:React.ChangeEvent<HTMLInputElement>) => {
                                        let val:any = e.target.checked ? {
                                            value: '',
                                            clicksCounter: contactOptions?.email?.clicksCounter ? contactOptions?.email?.clicksCounter : 0
                                        } : null;
                                        setContactOptions({ ...contactOptions, email: val})
                                        dispatch( updateZone({
                                            ...zone,
                                            socialLinks: {
                                                ...contactOptions,
                                                email: val
                                            }
                                        }));

                                        clearErrors('email');
                                    } }
                                    checked={ contactOptions.email !== null } 
                                />
                                <Controller
                                    name="email"
                                    rules={{
                                        required: contactOptions.email ? 'Ingresa tu Email' : false,
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: 'El correo no es válido.'
                                        }
                                    }}
                                    control={ control }
                                    render={ ({ field: { onChange, value } }) => (
                                        
                                        <TextField
                                            disabled={ !contactOptions.email }
                                            placeholder="Tu Email"
                                            fullWidth
                                            onChange={ onChange }
                                            onBlur={ (e) => {
                                                dispatch( updateZone({
                                                    ...zone,
                                                    socialLinks: {
                                                        ...contactOptions,
                                                        email: {
                                                            value: e.target.value,
                                                            clicksCounter: contactOptions?.email ? contactOptions?.email?.clicksCounter : 0
                                                        }
                                                    }
                                                }));
                                            } }
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
                                        let val:any = e.target.checked ? {
                                            value: '',
                                            clicksCounter: contactOptions?.tiktok?.clicksCounter ? contactOptions?.tiktok?.clicksCounter : 0
                                        } : null;
                                        setContactOptions({ ...contactOptions, tiktok: val})
                                        dispatch( updateZone({
                                            ...zone,
                                            socialLinks: {
                                                ...contactOptions,
                                                tiktok: val
                                            }
                                        }));

                                        clearErrors('tiktok');
                                    } }
                                    checked={ contactOptions.tiktok !== null } 
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
                                            onBlur={ (e) => {
                                                dispatch( updateZone({
                                                    ...zone,
                                                    socialLinks: {
                                                        ...contactOptions,
                                                        tiktok: {
                                                            value: e.target.value,
                                                            clicksCounter: contactOptions?.tiktok ? contactOptions?.tiktok?.clicksCounter : 0
                                                        }
                                                    }
                                                }));
                                            } }
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
                    <Box sx={{ mt: 8, mb: fullForm ? 10 : 4 }}>
                        <FormNavigationButtons
                            buttonSaveProperties={ buttonSaveProperties }
                            fullForm={ fullForm }
                            loading={ loading }
                            prev={ `/zones/edit/1/${ zone.uid }` }
                        />
                    </Box>
                </form>
            ) : (
                <CircularProgressComponent/>
            )
                        
        }
        
        </>
    )
}

export default SocialIconsSection;