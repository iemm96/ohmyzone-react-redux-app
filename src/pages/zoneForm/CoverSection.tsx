import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { UploadFile, useUploader } from '../../components/UploadFile';
import { UsernameCreator, useUsernameCreator } from '../../components/UsernameCreator';
import { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { startupdateZone, updateZone, startUpdateZone } from '../../actions/zones';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { updateRecord } from '../../actions/updateRecord';
import { fetchRecord } from '../../actions/fetchRecord';
import CircularProgressComponent from "../../components/CircularProgressComponent";

const CoverSection = () => {
    const params = useParams();
    const { auth } = useSelector( (state:any) => state );
    const { createdUsername, setCreatedUsername } = useUsernameCreator();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ isFormReady, setIsFormReady ] = useState<boolean>(false);

    const { dataUri, onChange, handleDelete, imageSrc, uploadToServer, openModal, handleModal, getCropData, setCropper, temporalDataUri, setDataUri } = useUploader( true );
    const { handleSubmit, setValue, control } = useForm();
    
    const [ fullName, setFullName ] = useState<string | undefined>(undefined);
    const [ loading, setLoading ] = useState<boolean>(false);

    useEffect(() => {
        getZone();
    },[])

    const getZone = async () => {
        if(params.zone) {
            const { zone } = await fetchRecord('zones', params.zone);

            if(zone.profileImage.url) {
                setDataUri(zone.profileImage.url);
            }

            setValue( 'title', zone.title );
            setCreatedUsername( zone.username );
        }

        setIsFormReady(true);
    }

    const handleChangeName = (e:any) => {
        setFullName(e.target.value);
    }

    const submitForm = async ( data:any ) => {
        setLoading( true );
        
        data.username = createdUsername;
        data.title = fullName;

        let result:any;
        let zoneUid:string = '';

        if( params.zone ) {
            
            result = await dispatch( startUpdateZone( data, params.zone ) ); //Updates Zone
            zoneUid = result.uid;


        }else {
            data.user = auth.uid;

            result = await dispatch( startupdateZone( data ) ); //Creates Zone
            const image = await uploadToServer( result.uid ); //Uploads image to server with the id of the Zone recently created
            zoneUid = result.uid;
            if(image) {
                await updateRecord('zones', {
                    profileImage: image.uid
                },
                    zoneUid
                );
            }
        }

        
        
        setLoading( false );

        navigate( `/zones/edit/2/${zoneUid}` );

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
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid xs={12} item>
                            <UsernameCreator 
                                fullName={ fullName } 
                                createdUsername={ createdUsername }
                                setCreatedUsername={ setCreatedUsername } 
                            />
                        </Grid>
                    </Grid>
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
                </form>
            </>
            
        ) 
        :
        (
            <CircularProgressComponent/>
        )
        }
        </>
    )
}

export default CoverSection;