import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { UploadFile, useUploader } from '../../components/UploadFile';
import { UsernameCreator, useUsernameCreator } from '../../components/UsernameCreator';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { startCreateZone } from '../../actions/zones';
import { useNavigate } from "react-router-dom";
import { CircularProgress } from '@mui/material';

const CoverSection = () => {
    const { auth } = useSelector( (state:any) => state );
    const { createdUsername, setCreatedUsername } = useUsernameCreator();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { dataUri, onChange, handleDelete, imageSrc, uploadToServer, openModal, handleModal, getCropData, setCropper, temporalDataUri } = useUploader( true );
    const { handleSubmit } = useForm();
    
    const [ fullName, setFullName ] = useState<string | undefined>(undefined);
    const [ loading, setLoading ] = useState<boolean>(false);

    useEffect(() => {
        getZone();
    },[])

    const getZone = async () => {

    }

    const handleChangeName = (e:any) => {
        setFullName(e.target.value);
    }

    const submitForm = async ( data:any ) => {
        setLoading( true );
        data.username = createdUsername;
        data.title = fullName;
        data.user = auth.uid;

        const result:any = await dispatch( startCreateZone( data ) ); //Creates Zone
        await uploadToServer( result.uid ); //Uploads image to server with the id of the Zone recently created

        setLoading( false );

        navigate( `/zones/new/2/${result.uid}` )
        
    }

    return(
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
                    />
                </Grid>
            </Grid>
            <form onSubmit={ handleSubmit( submitForm ) }>
                <Grid mt={1} mb={2} spacing={2} container>
                    <Grid xs={12} item>
                        <TextField 
                            fullWidth
                            onChange={ ( e ) => handleChangeName( e ) }
                            value={ fullName }
                            label="Título de tu Zone" 
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid xs={12} item>
                        <UsernameCreator fullName={ fullName } createdUsername={ createdUsername } setCreatedUsername={ setCreatedUsername } />
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
}

export default CoverSection;