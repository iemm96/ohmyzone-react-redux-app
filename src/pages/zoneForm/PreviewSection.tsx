

import { StyledIframe } from '../../styled/StyledIframe';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { Grid, Container } from '@mui/material';
import StyledButton from '../../styled/StyledButton';
import { ChevronLeft, Check } from '@mui/icons-material';
import { updateRecord } from '../../actions/updateRecord';
import ModalZonePublished, { useModalPublished } from '../../components/ModalZonePublished';

const { REACT_APP_PREVIEW_HOST } = process.env;

const PreviewSection = () => {
    const { zone } = useSelector( (state:any) => state );
    const { handleModal, openModal } = useModalPublished();

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
                zoneUrl={ `${ REACT_APP_PREVIEW_HOST }/${ zone.username }` }
            />
            <Box
                sx={{
                    justifyContent: 'center',
                    display: 'flex'
                }}
            >
                <StyledIframe
                    src={ `${ REACT_APP_PREVIEW_HOST }/${ zone.username }` }
                />
            </Box>
            <Grid sx={{ mt: 4 }} spacing={ 2 } container>
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
                    >
                        Guardar sin publicar
                    </StyledButton>
                </Grid>
                <Grid xs={ 12 } item>
                    <StyledButton
                        fullWidth
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



