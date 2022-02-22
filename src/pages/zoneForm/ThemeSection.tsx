import { Container, Paper, useTheme, Stack, Button, CircularProgress } from '@mui/material';
import BannerPreview from '../../components/BannerPreview';
import { PixabaySelector, usePixabaySelector } from '../../components/PixabaySelector';
import { useState } from 'react';

import FormNavigationButtons from '../../components/FormNavigationButtons';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';

const ThemeSection = ({ prev, next }:{ prev:number, next:number }) => {
    const { zone } = useSelector( (state:any) => state );
    const theme = useTheme();
    const { arrayRef, pixabayResults } = usePixabaySelector();
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ image, setImage ] = useState<any>("'https://cdn.pixabay.com/photo/2020/04/30/20/14/sky-5114501_1280.jpg'");
    
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