import { Container, Paper, useTheme, Typography } from '@mui/material';

import { PixabaySelector, usePixabaySelector } from '../../components/PixabaySelector';
import { useState, useEffect } from 'react';

import FormNavigationButtons from '../../components/FormNavigationButtons';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRecord } from '../../actions/fetchRecord';
import { updateZone, startUpdateZone } from '../../actions/zones';
import { motion } from 'framer-motion';
import { transition } from '../../constants/transitions';
import { postRecord } from '../../actions/postRecord';
import { updateRecord } from '../../actions/updateRecord';

const ThemeSection = ({ prev, next }:{ prev:number, next:number }) => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector( (state:any) => state );
    const theme = useTheme();
    const { arrayRef, pixabayResults, handleSearch, handleSearchInputChange } = usePixabaySelector();
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ image, setImage ] = useState<any>("'https://cdn.pixabay.com/photo/2020/04/30/20/14/sky-5114501_1280.jpg'");
    
    useEffect(() => {
        
        if( Object.keys(state.zone).length === 0 ) {
            getZone();
        }else {

        }
    },[]);

    const getZone = async () => {
        if(params.zone) {
            const { zone } = await fetchRecord('zones', params.zone);
            dispatch( updateZone({
                ...zone,
                profileImage: zone?.profileImage?.url
            }))
        }
    }

    const submitTheme = async () => {
        const theme = state.theme;
        
        //Saves palette
        const { palette } = await postRecord( 'palettes', {
            ...theme,
            zone: state.zone.uid
        } );

        if( palette ) {
            const { theme } = await postRecord( 'themes', {
                palette: palette.uid,
                backgroundImageUrl: state.zone.backgroundImage,
                user: state.auth.uid
            } );

            if( theme ) {
                const { zoneResult } = await updateRecord( 'zones', {
                    theme: theme.uid
                }, state.zone.uid );

                dispatch( updateZone({
                    ...state.zone,
                    zoneResult
                }) );

                navigate( `/zones/edit/${ next }/${ state.zone.uid }` );
            }
            
        }

    }

    return(
        <>
            <Paper
                sx={{
                    pt: 2,
                    mt: 4,
                    backgroundColor: theme.palette.background.paper,
                    height: '100%',
                    borderRadius: '16px 16px 0 0',
                    position:'relative',                
                }}
                elevation={ 2 }
            >
                <Container maxWidth="md">
                    <PixabaySelector
                        handleSearchInputChange={ handleSearchInputChange }
                        handleSearch={ handleSearch }
                        pixabayResults={ pixabayResults }
                        arrayRef={ arrayRef }
                        lockResults={ true }
                    />
                    <Typography sx={{ my: 2 }} variant="caption">
                        ¿No encuentras un tema de tu agrado? podrás personalizarlo más adelante...
                    </Typography>
                    <Box sx={{
                        mt: 4
                    }}>
                        <FormNavigationButtons
                            prev={ `/zones/edit/${prev}/${ state.zone.uid }` }
                            next={ submitTheme }
                            loading={ loading }
                        />
                    </Box>
                </Container>
                
            </Paper>
        </>
        
    )
}

export default ThemeSection;