import { CircularProgress, Grid } from '@mui/material';
import StyledButton from '../styled/StyledButton';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronLeft, ChevronRight } from '@mui/icons-material';

const FormNavigationButtons = ({ prev, loading, next, fullForm }:{ prev?:string, loading?: boolean, next?:any, fullForm?:boolean }) => {
    const navigate = useNavigate();

    return (
        <Grid sx={{ justifyContent: 'center' }} spacing={ 2 } container>
            <Grid 
                xs={ 12 }
                md={ 6 }
                sx={{
                    order: {
                        xs: 1,
                        md: 2
                    }
                }}
                item
            >
                {
                    fullForm ? (
                        <StyledButton
                            variant="contained"
                            fullWidth
                            type={ next ? 'button' : 'submit' }
                            disabled={ loading }
                            startIcon={ loading ? <CircularProgress size={ 12 } color="inherit"/> : <Check/> }
                            onClick={ next ? next : undefined }
                        >
                            Guardar cambios
                        </StyledButton>
                    ) : (
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
                    )
                }

            </Grid>
            { ( prev && !fullForm ) &&
                <Grid 
                    sx={{
                        order: {
                            xs: 2,
                            md: 1
                        }
                    }}
                    xs={ 12 }
                    md={ 6 }
                    item
                >
                    
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
