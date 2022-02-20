import PreviewSection from "./zoneForm/PreviewSection"
import { Paper, Container, Stack, Button } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ZonePreview = () => {
    const navigate = useNavigate();

    return(
        <Paper sx={{
            pt: 10,
            pb: 2
        }}>
            <Container>
                <PreviewSection/>

                <Stack>
                    <Button
                        onClick={ () => navigate( `/dashboard` ) }
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
            </Container>
        </Paper>
    )
}

export default ZonePreview;