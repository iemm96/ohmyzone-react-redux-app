import { Box } from "@mui/system";
import { useEffect, useState } from 'react';
import { fetchRecords } from '../actions/fetchRecords';
import { useSelector, useDispatch } from 'react-redux';
import ThemeCard from "./ThemeCard";
import { CircularProgress, Grid, Stack } from '@mui/material';
import StyledButton from "../styled/StyledButton";
import { Check } from "@mui/icons-material";
import { updateRecord } from '../actions/updateRecord';
import { updateTheme } from '../actions/themes';

const ThemesList = ({ref}:{ref:any}) => {
    const { zone, theme } = useSelector( (state:any) => state );
    const [ themes, setThemes ] = useState<any>( [] );
    const [ saveButtonProperties, setSaveButtonProperties ] = useState<any>({
        loading: false, 
        text: 'Guardar tema',
        visible: false,
    });

    const [ previousTheme, setPreviousTheme ] = useState<any>(  );
    const dispatch = useDispatch();

    useEffect(() => {
        getThemes().then();
        setPreviousTheme( theme );
    },[]);

    useEffect(() => {
        if( theme?.uid !== previousTheme?.uid ) {
            setSaveButtonProperties( (prev:any) => ({
                ...prev,
                visible: true,
            }))
        }
    },[ theme?.uid ]);
    
    const getThemes = async () => {
        const { themes } = await fetchRecords( `themes/byZone/${ zone.uid }`  );
        setThemes( themes );
    }

    const saveSelectedTheme = async () => {
        setSaveButtonProperties( (prev:any) => ({
            ...prev,
            loading: true,
            text: 'Guardando tema...'
        }));

        await updateRecord( 'zones', {
            theme: theme.uid,
        }, zone.uid );

        setPreviousTheme( theme );

        setSaveButtonProperties( (prev:any) => ({
            ...prev,
            loading: false,
            text: 'Guardar tema',
            visible: false
        }));
    }

    const restorePreviousSelectedTheme = () => {
        dispatch( updateTheme( previousTheme ) );
        setSaveButtonProperties( (prev:any) => ({
            ...prev,
            visible: false
        }));
    }

    return(
        <>
            <Grid spacing={ 2 } container>
                {
                    themes.map( (theme:any, index:number) => (
                        <Grid xs={ 6 } md={ 3 } item>
                            <ThemeCard
                                largeImageURL={ theme?.backgroundImage?.url }
                                arrayRef={ [ ] }
                                urlImage={ theme?.backgroundImage?.url }
                                darkMode={ false }
                                index={ index }
                                defaultPalette={ theme.palette }
                                item={ theme }
                                getThemes={ getThemes }
                            />
                        </Grid>
                        
                    ) )
                }
            </Grid>
          
                {
                    saveButtonProperties.visible && (
                        <Stack 
                            sx={{
                                mt: 4
                            }}
                            spacing={ 2 }
                        >
                            <StyledButton
                                disabled={ saveButtonProperties.loading }
                                fullWidth
                                variant="contained"
                                startIcon={ saveButtonProperties.loading ?  <CircularProgress size={12}/> : <Check/> }
                                onClick={ saveSelectedTheme }
                            >
                            { saveButtonProperties.text }
                            </StyledButton>
                            <StyledButton
                                onClick={ restorePreviousSelectedTheme }
                            >
                                Cancelar
                            </StyledButton>
                        </Stack>
                    )
                }

        </>

    )
}

export default ThemesList;