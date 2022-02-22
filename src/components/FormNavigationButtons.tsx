import React from 'react'
import { Stack, CircularProgress, Grid } from '@mui/material';
import StyledButton from '../styled/StyledButton';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from '@mui/icons-material';

const FormNavigationButtons = ({ prev, loading }:{ prev?:string, loading: boolean }) => {
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
                    type="submit"
                    disabled={ loading }
                    startIcon={ loading && <CircularProgress size={ 12 } color="inherit"/> }
                    
                >
                    Guardar y continuar
                </StyledButton>
            </Grid>
            { prev && 
                <Grid xs={ 12 } md={ 6 } item>
                    <StyledButton
                        onClick={ () => navigate( prev ) }
                        fullWidth
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
