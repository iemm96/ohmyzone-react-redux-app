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

const CoverSection = () => {
    const { auth } = useSelector( (state:any) => state );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ fullName, setFullName ] = useState<String | undefined>(undefined);
    const { dataUri, onChange, handleDelete, imageSrc, uploadToServer } = useUploader();
    const { handleSubmit } = useForm();
    const { createdUsername, setCreatedUsername } = useUsernameCreator();
    
    const handleChangeName = (e:any) => {
        setFullName(e.target.value);
    }

    const submitForm = async ( data:any ) => {
        data.username = createdUsername;
        data.title = fullName;
        data.user = auth.uid;

        const result:any = await dispatch( startCreateZone( data ) ); //Creates Zone
        await uploadToServer( result.uid );
        navigate('/zones/new/2')
        
    }

    return(
        <>
            <Grid sx={{ mt: 2 }} container>
                <Grid xs={12} item>
                    <UploadFile onChange={onChange} handleDelete={handleDelete} dataUri={dataUri} imageSrc={imageSrc} />
                </Grid>
            </Grid>
            <form onSubmit={ handleSubmit( submitForm ) }>
                <Grid mt={1} mb={2} spacing={2} container>
                    <Grid xs={12} md={6} item>
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
                        position: 'absolute',
                        bottom: 4,
                        textTransform: 'none',
                    }}
                    variant="contained"
                    fullWidth
                    type="submit"
                >
                    Guardar y continuar
                </Button>
            </form>
        </>
    )
}

export default CoverSection;