import { CircularProgress, Grid } from '@mui/material';
import StyledButton from '../styled/StyledButton';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const FormNavigationButtons = ({ prev, loading, next }:{ prev?:string, loading?: boolean, next?:any }) => {
    const navigate = useNavigate();

    return (
        <Grid sx={{ justifyContent: 'center' }} spacing={ 2 } container>
            <Grid 
                xs={ 12 }
                md={ 6 }
                sx={{
                    order: {
                        xs: 2,
                        md: 1
                    }
                }}
                item
            >
                <StyledButton
                    variant="contained"
                    fullWidth
                    type={ next ? 'button' : 'submit' }
                    disabled={ loading }
                    startIcon={ loading && <CircularProgress size={ 12 } color="inherit"/> }
                    onClick={ next ? next : undefined }
                    endIcon={ <ChevronRight/> }
                >
                    Guardar y continuar
                </StyledButton>
            </Grid>
            { prev && 
                <Grid xs={ 12 } md={ 6 } item>
                    <StyledButton
                        onClick={ () => navigate( prev ) }
                        fullWidth
                        variant="outlined"
                        startIcon={ <ChevronLeft/> }
                    >
                        Volver
                    </StyledButton>
                </Grid>
            }
        </Grid>
    )
}

export default FormNavigationButtons;
