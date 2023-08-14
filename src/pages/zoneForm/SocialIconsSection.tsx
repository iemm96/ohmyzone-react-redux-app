import StyledSwitch from '../../styled/StyledSwitch';
import TextField from '@mui/material/TextField';
import { InputAdornment, Grid, Stack, useTheme, Typography } from '@mui/material';
import { Call, Email, Facebook, Instagram, LinkedIn, Twitter, WhatsApp, YouTube } from "@mui/icons-material";
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
        twitter: null,
        linkedin: null,
        youtube: null,
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

        zone?.socialLinks?.instagram && setValue( 'instagram', zone?.socialLinks?.instagram );
        zone?.socialLinks?.email && setValue( 'email', zone?.socialLinks?.email );
        zone?.socialLinks?.whatsapp && setValue( 'whatsapp', zone?.socialLinks?.whatsapp );
        zone?.socialLinks?.twitter && setValue( 'twitter', zone?.socialLinks?.twitter );
        zone?.socialLinks?.linkedin && setValue( 'linkedin', zone?.socialLinks?.linkedin );
        zone?.socialLinks?.tiktok && setValue( 'tiktok', zone?.socialLinks?.tiktok );
        zone?.socialLinks?.phone && setValue( 'phone', zone.socialLinks.phone );
        zone?.socialLinks?.facebook && setValue( 'facebook', zone?.socialLinks?.facebook );
        zone?.socialLinks?.youtube && setValue( 'youtube', zone?.socialLinks?.youtube );
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
                                        let val:any = e.target.checked ? '' : null;
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
                                        required: contactOptions?.facebook !== null ? 'Ingresa tu nombre de usuario de Facebook' : false
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextField
                                            disabled={ contactOptions.facebook === null }
                                            placeholder="Nombre de usuario de tu Facebook"
                                            fullWidth
                                            onBlur={ (e) => {
                                                dispatch( updateZone({
                                                    ...zone,
                                                    socialLinks: {
                                                        ...contactOptions,
                                                        facebook: e.target.value
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
                                        let val:any = e.target.checked ? '' : null;
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
                                        required: contactOptions?.instagram !== null ? 'Ingresa tu nombre de usuario de Instagram' : false
                                    }}
                                    control={ control }
                                    render={ ({ field: { onChange, value } }) => (
                                        
                                        <TextField
                                            disabled={ contactOptions.instagram === null }
                                            placeholder="Nombre de usuario de tu instagram"
                                            fullWidth
                                            onBlur={ (e) => {
                                                dispatch( updateZone({
                                                    ...zone,
                                                    socialLinks: {
                                                        ...contactOptions,
                                                        instagram: e.target.value
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
                                        let val:any = e.target.checked ? '' : null;
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
                                        required: contactOptions.phone !== null ? 'Ingresa tu teléfono' : false
                                    }}
                                    control={ control }
                                    render={ ({ field: { onChange, value } }) => (
                                        
                                        <TextField
                                            disabled={ contactOptions.phone === null }
                                            placeholder="Tu teléfono"
                                            fullWidth
                                            onChange={ onChange }
                                            onBlur={ (e) => {
                                                dispatch( updateZone({
                                                    ...zone,
                                                    socialLinks: {
                                                        ...contactOptions,
                                                        phone: e.target.value
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
                                        let val:any = e.target.checked ? '' : null
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
                                        required: contactOptions?.whatsapp !== null ? 'Ingresa tu WhatsApp' : false
                                    }}
                                    control={ control }
                                    render={ ({ field: { onChange, value } }) => (
                                        
                                        <TextField
                                            disabled={ contactOptions.whatsapp === null }
                                            placeholder="Tu WhatsApp"
                                            fullWidth
                                            onChange={ onChange }
                                            onBlur={ (e) => {
                                                dispatch( updateZone({
                                                    ...zone,
                                                    socialLinks: {
                                                        ...contactOptions,
                                                        whatsapp: e.target.value
                                                    },
                                                    socialLinksCounter: {

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
                            { errors.whatsapp && <Typography variant="caption" sx={{color:'red'}}>{errors.whatsapp.message }</Typography> }
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction="row" sx={{alignItems: 'center', justifyContent: 'space-between' }}>
                                <StyledSwitch 
                                    onChange={ (e:React.ChangeEvent<HTMLInputElement>) => {
                                        let val:any = e.target.checked ? '' : null;
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
                                        required: contactOptions.email !== null ? 'Ingresa tu Email' : false,
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: 'El correo no es válido.'
                                        }
                                    }}
                                    control={ control }
                                    render={ ({ field: { onChange, value } }) => (
                                        
                                        <TextField
                                            disabled={ contactOptions.email === null }
                                            placeholder="Tu Email"
                                            fullWidth
                                            onChange={ onChange }
                                            onBlur={ (e) => {
                                                dispatch( updateZone({
                                                    ...zone,
                                                    socialLinks: {
                                                        ...contactOptions,
                                                        email: e.target.value
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
                                        let val:any = e.target.checked ? '' : null
                                        setContactOptions({ ...contactOptions, twitter: val});
                                        dispatch( updateZone({
                                            ...zone,
                                            socialLinks: {
                                                ...contactOptions,
                                                twitter: val
                                            }
                                        }));
                                        clearErrors('twitter');
                                    } }
                                    checked={ contactOptions.twitter !== null } 
                                />
                                <Controller
                                    name="twitter"
                                    rules={{
                                        required: contactOptions?.twitter !== null ? 'Ingresa tu Twitter' : false
                                    }}
                                    control={ control }
                                    render={ ({ field: { onChange, value } }) => (
                                        
                                        <TextField
                                            disabled={ contactOptions.twitter === null }
                                            placeholder="Tu Twitter"
                                            fullWidth
                                            onChange={ onChange }
                                            onBlur={ (e) => {
                                                dispatch( updateZone({
                                                    ...zone,
                                                    socialLinks: {
                                                        ...contactOptions,
                                                        twitter: e.target.value
                                                    },
                                                    socialLinksCounter: {

                                                    }
                                                }));
                                            } }
                                            value={ value }
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Twitter color={ contactOptions.twitter ? "primary" : "disabled" }/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                                
                            </Stack>
                            { errors.twitter && <Typography variant="caption" sx={{color:'red'}}>{errors.twitter.message }</Typography> }
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction="row" sx={{alignItems: 'center', justifyContent: 'space-between' }}>
                                <StyledSwitch 
                                    onChange={ (e:React.ChangeEvent<HTMLInputElement>) => {
                                        let val:any = e.target.checked ? '' : null
                                        setContactOptions({ ...contactOptions, linkedin: val});
                                        dispatch( updateZone({
                                            ...zone,
                                            socialLinks: {
                                                ...contactOptions,
                                                linkedin: val
                                            }
                                        }));
                                        clearErrors('linkedin');
                                    } }
                                    checked={ contactOptions.linkedin !== null } 
                                />
                                <Controller
                                    name="linkedin"
                                    rules={{
                                        required: contactOptions?.linkedin !== null ? 'Ingresa tu LinkedIn' : false
                                    }}
                                    control={ control }
                                    render={ ({ field: { onChange, value } }) => (
                                        
                                        <TextField
                                            disabled={ contactOptions.linkedin === null }
                                            placeholder="Tu LinkedIn"
                                            fullWidth
                                            onChange={ onChange }
                                            onBlur={ (e) => {
                                                dispatch( updateZone({
                                                    ...zone,
                                                    socialLinks: {
                                                        ...contactOptions,
                                                        linkedin: e.target.value
                                                    },
                                                    socialLinksCounter: {

                                                    }
                                                }));
                                            } }
                                            value={ value }
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LinkedIn color={ contactOptions.linkedin ? "primary" : "disabled" }/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                                
                            </Stack>
                            { errors.linkedin && <Typography variant="caption" sx={{color:'red'}}>{errors.linkedin.message }</Typography> }
                        </Grid>
                        <Grid item xs={12}>
                            <Stack direction="row" sx={{alignItems: 'center', justifyContent: 'space-between' }}>
                                <StyledSwitch 
                                    onChange={ (e:React.ChangeEvent<HTMLInputElement>) => {
                                        let val:any = e.target.checked ? '' : null;
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
                                        required: contactOptions.tiktok !== null ? 'Ingresa tu usuario de Tiktok' : false
                                    }}
                                    control={ control }
                                    render={ ({ field: { onChange, value } }) => (
                                        
                                        <TextField
                                            disabled={ contactOptions.tiktok === null }
                                            placeholder="Nombre de usuario de tu Tiktok"
                                            fullWidth
                                            onChange={ onChange }
                                            onBlur={ (e) => {
                                                dispatch( updateZone({
                                                    ...zone,
                                                    socialLinks: {
                                                        ...contactOptions,
                                                        tiktok: e.target.value
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
                        <Grid item xs={12}>
                            <Stack direction="row" sx={{alignItems: 'center', justifyContent: 'space-between' }}>
                                <StyledSwitch
                                  onChange={ (e:React.ChangeEvent<HTMLInputElement>) => {
                                      let val:any = e.target.checked ? '' : null;
                                      setContactOptions({ ...contactOptions, youtube: val})
                                      dispatch( updateZone({
                                          ...zone,
                                          socialLinks: {
                                              ...contactOptions,
                                              youtube: val
                                          }
                                      }));

                                      clearErrors('youtube');
                                  } }
                                  checked={ contactOptions.youtube !== null }
                                />
                                <Controller
                                  name="youtube"
                                  rules={{
                                      required: contactOptions.youtube !== null ? 'Ingresa tu usuario de YouTube' : false
                                  }}
                                  control={ control }
                                  render={ ({ field: { onChange, value } }) => (

                                    <TextField
                                      disabled={ contactOptions.youtube === null }
                                      placeholder="Nombre de usuario de YouTube"
                                      fullWidth
                                      onChange={ onChange }
                                      onBlur={ (e) => {
                                          dispatch( updateZone({
                                              ...zone,
                                              socialLinks: {
                                                  ...contactOptions,
                                                  youtube: e.target.value
                                              }
                                          }));
                                      } }
                                      value={ value }
                                      InputProps={{
                                          startAdornment: (
                                            <InputAdornment position="start">
                                                { /* @ts-ignore */ }
                                                <YouTube size={24} color={ contactOptions.youtube ? theme.palette.primary.main : "rgba(255,255,255,0.3)" }/>
                                            </InputAdornment>
                                          ),
                                      }}
                                    />
                                  )}
                                />

                            </Stack>
                            { errors.youtube && <Typography variant="caption" sx={{color:'red'}}>{errors.youtube.message }</Typography>}
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