import { CircularProgress, Grid } from '@mui/material';
import StyledButton from '../styled/StyledButton';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useState } from 'react';

export const useFormNavigationButtons = ( defaultState?:{
    color: 'primary',
    text: undefined,
    isDisabled: false,
    isLoading: false,
    isVisible: true,
} ) => {
    const [ buttonSaveProperties, setButtonSaveProperties ] = useState(defaultState);

    const handleResetButtonSave = () => {
        setButtonSaveProperties( defaultState );
    }
    return {
        handleResetButtonSave,
        buttonSaveProperties,
        setButtonSaveProperties
    }
}

const FormNavigationButtons = ({ prev, loading, next, fullForm, buttonSaveProperties }:{ prev?:string, loading?: boolean, next?:any, fullForm?:boolean, buttonSaveProperties?:any }) => {
    const navigate = useNavigate();

    return (
        <Grid sx={{ justifyContent: 'center' }} spacing={ 2 } container>
            <Grid 
                xs={ 12 }
                md={ fullForm ? 12 : 6 }
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
                            sx={{
                                display: buttonSaveProperties?.isVisible ? 'flex' : 'none'
                            }}
                            variant="contained"
                            color={ buttonSaveProperties?.color }
                            fullWidth
                            type={ next ? 'button' : 'submit' }
                            disabled={ buttonSaveProperties?.isDisabled }
                            startIcon={ buttonSaveProperties?.isLoading ? <CircularProgress size={ 12 } color="inherit"/> : <Check/> }
                            onClick={ next ? next : undefined }
                        >
                            { buttonSaveProperties ? buttonSaveProperties?.text : 'Guardar cambios' }
                        </StyledButton>
                    ) : (
                        <StyledButton
                            variant="contained"
                            fullWidth
                            type={ next ? 'button' : 'submit' }
                            disabled={ buttonSaveProperties ? buttonSaveProperties?.isLoading : loading }
                            startIcon={ buttonSaveProperties?.isLoading && <CircularProgress size={ 12 } color="inherit"/> }
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
