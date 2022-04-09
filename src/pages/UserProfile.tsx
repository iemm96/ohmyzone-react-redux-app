import { UploadFile, useUploader } from '../components/UploadFile';
import Container from '@mui/material/Container'; 
import Grid from '@mui/material/Grid'; 
import TextField from '@mui/material/TextField'; 

import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/system';
import FormNavigationButtons from '../components/FormNavigationButtons';
import { Typography, useTheme } from '@mui/material';
import { red } from '@mui/material/colors';
import CurrentSubscription from '../components/CurrentSubscription';


const UserProfile = () => {
    const { auth, subscription } = useSelector( (state:any) => state );
    const { dataUri, onChange, handleDelete, imageSrc, uploadToServer, openModal, handleModal, getCropData, setCropper, temporalDataUri, setDataUri, setImageServerUid, imageHasChanged} = useUploader( true );
    const { handleSubmit, setValue, control, formState: { errors }, setError } = useForm();
    const dispatch = useDispatch();
    const theme = useTheme();
    const [ saveButtonProperties, setSaveButtonProperties ] = useState<any>({
        loading: false, 
        text: 'Guardar tema',
        visible: false,
    });
    
    const submitForm = async ( data:any ) => {
        
        setSaveButtonProperties((prev:any) => ({
            ...prev,
            text: 'Guardando cambios',
            isDisabled: true,
            isLoading: true
        }));



        setSaveButtonProperties((prev:any) => ({
            ...prev,
            text: 'Cambios guardados correctamente',
            isDisabled: true,
            isLoading: false,
            color: 'success'
        }));
    }

    return(
        <Container>

            <Grid container>
                <Grid item xs={12}>
                    <UploadFile
                        file={dataUri}
                        openModal={ openModal }
                        handleModal={ handleModal }
                        onChange={ onChange } 
                        handleDelete={ handleDelete }
                        dataUri={ dataUri }
                        imageSrc={ imageSrc }
                        getCropData={ getCropData }
                        setCropper={ setCropper }
                        temporalDataUri={ temporalDataUri }
                        useCropper={ true }
                        roundedPreview={ true }
                    />
                </Grid>
            </Grid>
            <form onSubmit={ handleSubmit( submitForm ) }>
                    <Grid mt={1} mb={2} spacing={2} container>
                        <Grid xs={12} item>
                            <Controller
                                name="name"
                                control={ control }
                                rules={{
                                    required: 'Ingresa tu nombre',
                                }}
                                defaultValue={ auth ? auth.name : undefined }
                                render={ ({ field: { value, onChange } }) => (
                                    <TextField
                                        onChange={ onChange }
                                        fullWidth
                                        value={ value }
                                        label="Nombre" 
                                    />
                                ) }
                            />
                            { errors.name && <Typography variant="caption" sx={{color: red[200]}}>{errors.name.message}</Typography> }
                        </Grid>
                        <Grid xs={12} item>
                            <Controller
                                name="email"
                                control={ control }
                                rules={{
                                    required: 'Ingresa tu email',
                                }}
                                defaultValue={ auth ? auth.email : undefined }
                                render={ ({ field: { value, onChange } }) => (
                                    <TextField
                                        onChange={ onChange }
                                        fullWidth
                                        value={ value }
                                        label="Email" 
                                    />
                                ) }
                            />
                            { errors.email && <Typography variant="caption" sx={{color: red[200]}}>{errors.email.message}</Typography> }
                        </Grid>
                    </Grid>
                    <Typography variant="caption" sx={{ color: theme.palette.text.primary }}>
                         Subscripción Activa
                    </Typography>
                    <Grid container>
                        <Grid item xs={ 12 }>
                            <CurrentSubscription data={ subscription }/>
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 8, mb: 4 }}>
                        <FormNavigationButtons
                            
                            prev={ `/dashboard` }

                            buttonSaveProperties={ saveButtonProperties }
                        />
                    </Box>
            </form>

        </Container>
    )
}

export default UserProfile;