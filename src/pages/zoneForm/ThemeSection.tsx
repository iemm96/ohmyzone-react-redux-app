import { Container, Paper, useTheme, Stack, Button, CircularProgress } from '@mui/material';

import { PixabaySelector, usePixabaySelector } from '../../components/PixabaySelector';
import { useState, useEffect } from 'react';

import FormNavigationButtons from '../../components/FormNavigationButtons';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { fetchRecord } from '../../actions/fetchRecord';
import { updateZone } from '../../actions/zones';

const ThemeSection = ({ prev, next }:{ prev:number, next:number }) => {
    const params = useParams();
    const dispatch = useDispatch();
    const { zone } = useSelector( (state:any) => state );
    const theme = useTheme();
    const { arrayRef, pixabayResults } = usePixabaySelector();
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ image, setImage ] = useState<any>("'https://cdn.pixabay.com/photo/2020/04/30/20/14/sky-5114501_1280.jpg'");
    
    useEffect(() => {
        
        if( Object.keys(zone).length === 0 ) {
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

    return(
        <>
            <Paper
                sx={{
                    mt: 4,
                    backgroundColor: theme.palette.secondary.main,
                    height: '100%',
                    borderRadius: '16px 16px 0 0',
                    position:'relative',
                    zIndex: 1000
                }}
                elevation={ 2 }
            >
                <Container maxWidth="md">
                    <PixabaySelector
                        setImage={ setImage }
                        pixabayResults={ pixabayResults }
                        arrayRef={ arrayRef }
                    />
                    <Box sx={{
                        mt: 4
                    }}>
                        <FormNavigationButtons
                            prev={ `/zones/edit/3/${ zone.uid }` }
                            loading={ loading }
                        />
                    </Box>
                </Container>
                
            </Paper>
        </>
        
    )
}

export default ThemeSection;