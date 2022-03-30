import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { UploadFile, useUploader } from '../../components/UploadFile';
import { UsernameCreator, useUsernameCreator } from '../../components/UsernameCreator';
import { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { updateZone } from '../../actions/zones';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { updateRecord } from '../../actions/updateRecord';
import { fetchRecord } from '../../actions/fetchRecord';
import CircularProgressComponent from "../../components/CircularProgressComponent";
import FormNavigationButtons from '../../components/FormNavigationButtons';
import { updateTheme } from '../../actions/themes';
import { red } from '@mui/material/colors';
import { postRecord } from '../../actions/postRecord';
import { showPreviewButton } from '../../actions/ui';
import { useFormNavigationButtons } from '../../components/FormNavigationButtons';

const CoverSection = ({ fullForm }:{ fullForm?:boolean }) => {
    const params = useParams();
    const { auth, zone } = useSelector( (state:any) => state );
    const { createdUsername, setCreatedUsername } = useUsernameCreator();
    const [ savedZone, setSavedZone ] = useState<any>( null );
    const { buttonSaveProperties, setButtonSaveProperties } = useFormNavigationButtons();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ isFormReady, setIsFormReady ] = useState<boolean>( false );

    const { dataUri, onChange, handleDelete, imageSrc, uploadToServer, openModal, handleModal, getCropData, setCropper, temporalDataUri, setDataUri, setImageServerUid, imageHasChanged} = useUploader( true );
    const { handleSubmit, setValue, control, formState: { errors }, setError } = useForm();
    
    const [ fullName, setFullName ] = useState<string | undefined>(undefined);
    const [ loading, setLoading ] = useState<boolean>(false);

    useEffect(() => {
        if(dataUri) {
            dispatch( updateZone({
                ...zone,
                profileImage: dataUri
            }));
        }else{
            dispatch( updateZone({
                ...zone,
                profileImage: null
            }));
        }
    },[dataUri]);

    useEffect(() => {
        
        dispatch( 
            showPreviewButton( true )
        );
        if( Object.keys(zone).length === 0 ) {
            getZone();
        }else {
            setSavedZone( zone );
            setDataUri( zone.profileImage );
            setImageServerUid( zone?.profileImageUid ); //This will prepare delete function in useUploader hook to delete image from cloudinary
            setCreatedUsername( zone.username );
            setIsFormReady( true );
        }
    },[]);

    //Check if there are changes to apply (Only works in full form mode)
    useEffect(() => {
        if( zone !== savedZone && fullForm ) {
            setButtonSaveProperties((prev:any) => ({
                ...prev,
                text: 'Guardar cambios',
                isVisible: true,
            }));
        }
    },[ zone ])

    const getZone = async () => {
        if(params.zone) {

            const { zone } = await fetchRecord('zones', params.zone);

            if(zone.profileImage.url) {
                setDataUri(zone.profileImage.url);
                setImageServerUid( zone?.profileImage._id );
            }

            setValue( 'title', zone.title );
            setValue( 'subtitle', zone?.subtitle );
            setValue( 'description', zone?.description );
            setCreatedUsername( zone.username );
            dispatch( updateZone({
                ...zone,
                profileImage: zone?.profileImage?.url
            }));

            if( zone.theme ) {
                dispatch( updateTheme({
                    ...zone.theme.palette,
                    backgroundImageUrl: zone?.theme?.backgroundImage?.url
                }) );
            }
        }

        setIsFormReady( true );
    }

    const validateIfZoneExists = async ( username:string ) => {
        let result:boolean = false;
        //Validate that name doesn't exists
        const { zone } = await fetchRecord( 'zones/byName', username );
        if( zone ) {
            setError('username',{
                type: 'manual',
                message: 'Ups! este nombre de usuario ya fue tomado, elige otro.'
            })
            result = true;
        }

        return result;
    }
    const handleChangeName = (e:any) => {
        
        dispatch( updateZone({
            ...zone,
            title: e.target.value
        }) );

        setFullName(e.target.value);
    }

    const submitForm = async ( data:any ) => {
        
        setButtonSaveProperties((prev:any) => ({
            ...prev,
            text: 'Guardando cambios',
            isDisabled: true,
            isLoading: true
        }));

        data.title = fullName;
        data.user = auth.uid;

        let zoneUid:string = '';

        if( params.zone ) {
            
            let image:any = null;

            //If the user changes the username
            if( zone.username !== data.username ) {
                //Validate that name doesn't exists
                if( await validateIfZoneExists( data.username ) ) {
                    setLoading( false );
                    return;
                }
            }

            if( imageHasChanged ) {
                image = await uploadToServer( zone.uid, `${ zone.username }/profile` ); //Uploads image to server with the id of the Zone recently created
                data.profileImage = image.uid;
            }

            const { zoneResult } = await updateRecord( 'zones', data, params.zone ); //Updates Zone
        
            if( imageHasChanged ) {
                zoneResult.profileImage = image.url;
                zoneResult.profileImageUid = image.uid;

            }else{
                zoneResult.profileImage = zone.profileImage; //Keep old image url
                zoneResult.profileImageUid = zone.profileImageUid; //keep old image uid
            }

            zoneUid = zoneResult.uid;

            dispatch( updateZone( {
                ...zoneResult
            } ) );

        }else {

            //Validate that name doesn't exists
            if( await validateIfZoneExists( data.username ) ) {
                setLoading( false );
                return;
            }

            const { zone } = await postRecord( 'zones', data ); //Creates Zone

            const image = await uploadToServer( zone.uid, `${ zone.username }/profile` ); //Uploads image to server with the id of the Zone recently created

            dispatch( updateZone( {
                ...zone,
                profileImage: image.url,
                profileImageUid: image.uid
            } ) );

            zoneUid = zone.uid;

            if(image) {
                await updateRecord('zones', {
                    profileImage: image.uid
                }, zoneUid
                );
            }
        }

        setLoading( false );

        if( !fullForm ) {
            navigate( `/zones/edit/2/${zoneUid}` );
        }else {
            setButtonSaveProperties((prev:any) => ({
                ...prev,
                text: 'Cambios guardados correctamente',
                isDisabled: true,
                isLoading: false,
                color: 'success'
            }));

            setTimeout(() => {
                setButtonSaveProperties((prev:any) => ({
                    ...prev,
                    text: 'Guardar cambios',
                    isDisabled: false,
                    isLoading: false,
                    isVisible: false,
                    color: 'primary',
                }));
            },4500);
        }
    }

    return(
        <>
        { isFormReady ? (
            <>
                <Grid sx={{ mt: 2 }} container>
                    <Grid xs={12} item>
                    
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
                                name="title"
                                control={ control }
                                rules={{
                                    required: 'Ingresa un título para tu zone',
                                }}
                                defaultValue={ zone ? zone.title : undefined }
                                render={ ({ field: { value, onChange } }) => (
                                    <TextField
                                        onChange={ ( e ) =>  {
                                            onChange( e.target.value );
                                            handleChangeName( e );
                                        }}
                                        fullWidth
                                        value={ value }
                                        label="Título de tu Zone" 
                                    />
                                ) }
                            />
                            { errors.title && <Typography variant="caption" sx={{color: red[200]}}>{errors.title.message}</Typography> }
                        </Grid>
                        {
                            fullForm && (
                                <>
                                    <Grid xs={12} item>
                                        <Controller
                                            name="subtitle"
                                            control={ control }
                                            defaultValue={ zone?.subtitle ? zone.subtitle : undefined }
                                            render={ ({ field: { value, onChange } }) => (
                                                <TextField
                                                    onChange={ onChange }
                                                    fullWidth
                                                    value={ value }
                                                    label="Subtítulo" 
                                                />
                                            ) }
                                        />
                                    </Grid>
                                    <Grid xs={12} item>
                                        <Controller
                                            name="description"
                                            control={ control }
                                            defaultValue={ zone?.subtitle ? zone.subtitle : undefined }
                                            render={ ({ field: { value, onChange } }) => (
                                                <TextField
                                                    multiline
                                                    rows={ 2 }
                                                    onChange={ onChange }
                                                    fullWidth
                                                    value={ value }
                                                    label="Mi bio"
                                                    placeholder="Descríbete a tí o a tu negocio" 
                                                />
                                            ) }
                                        />
                                    </Grid>
                                </>
                                
                            )
                        }
                    </Grid>
                    <Grid sx={{ mt: 2 }} container>
                        <Grid xs={12} item>
                            <UsernameCreator
                                control={ control }
                                fullName={ fullName } 
                                createdUsername={ createdUsername }
                                setCreatedUsername={ setCreatedUsername }
                                errors={ errors }
                                setValue={ setValue }
                            />
                        </Grid>
                    </Grid>
    
                    <Box sx={{ mt: 8, mb: fullForm ? 10 : 4 }}>
                        <FormNavigationButtons
                            fullForm={ fullForm }
                            prev={ `/dashboard` }
                            loading={ loading }
                            buttonSaveProperties={ buttonSaveProperties }
                        />
                    </Box>
                </form>
            </>
        ) : <CircularProgressComponent/> }
        </>
    )
}

export default CoverSection;