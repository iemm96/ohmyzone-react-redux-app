

import { StyledIframe } from '../../styled/StyledIframe';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { Grid, Container } from '@mui/material';
import StyledButton from '../../styled/StyledButton';
import { ChevronLeft, Check } from '@mui/icons-material';
import { updateRecord } from '../../actions/updateRecord';
import ModalZonePublished, { useModalPublished } from '../../components/ModalZonePublished';
import { useNavigate } from 'react-router-dom';

const { REACT_APP_PREVIEW_HOST } = process.env;

const PreviewSection = () => {
    const { zone, auth } = useSelector( (state:any) => state );
    const { handleModal, openModal } = useModalPublished();
    const navigate = useNavigate();

    const onSaveAndPublish = async ( ) => {
        const result = await updateRecord( 'zones', {
            currentStatus: 'isPublished'
        }, zone.uid );

        if( result ) {
            handleModal( );
        }
        console.log( result );
        
    }

    return (
        <Container maxWidth="sm">
            <ModalZonePublished
                handleModal={ handleModal }
                openModal={ openModal }
                zoneUrl={ `${ REACT_APP_PREVIEW_HOST }${ zone.username }` }
            />
            <Box
                sx={{
                    justifyContent: 'center',
                    display: 'flex'
                }}
            >
                <StyledIframe
                    src={ `${ REACT_APP_PREVIEW_HOST }/${ zone.username }?user=${ auth.uid }` }
                />
            </Box>
            <Grid sx={{ mt: 4, mb: 4 }} spacing={ 2 } container>
                <Grid xs={ 12 } item>
                    <StyledButton
                        variant="contained"
                        fullWidth
                        onClick={ onSaveAndPublish }
                        startIcon={
                            <Check/>
                        }
                    >
                        ¡Guardar y publicar!
                    </StyledButton>
                </Grid>
                <Grid xs={ 12 } item>
                    <StyledButton
                        variant="outlined"
                        fullWidth
                        onClick={ () => navigate( `/dashboard` ) }
                    >
                        Guardar sin publicar
                    </StyledButton>
                </Grid>
                <Grid xs={ 12 } item>
                    <StyledButton
                        fullWidth
                        onClick={ () => navigate( `/zones/edit/4/${ zone.uid }`) }
                        startIcon={
                            <ChevronLeft/>
                        }
                    >
                        Volver
                    </StyledButton>
                </Grid>
            </Grid>
        </Container>
    );
};

export default PreviewSection;



