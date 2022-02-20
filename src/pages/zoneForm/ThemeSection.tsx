import { Container, Grid, Paper, useTheme } from '@mui/material';
import BannerPreview from '../../components/BannerPreview';
import { PixabaySelector, usePixabaySelector } from '../../components/PixabaySelector';
import { useState, useEffect } from 'react';

const ThemeSection = ({ prev, next }:{ prev:number, next:number }) => {
    const theme = useTheme();
    const { arrayRef, pixabayResults } = usePixabaySelector();
    const [ image, setImage ] = useState<any>("'https://cdn.pixabay.com/photo/2020/04/30/20/14/sky-5114501_1280.jpg'");

    useEffect(() => {
        console.log(image)
    },[image])
    return(
        <>
            <BannerPreview
                data={{
                    title: 'Titulo',
                    description: 'description',
                    backgroundImage: image
                }}
            />
            <Paper
                sx={{
                    mt: 56,
                    backgroundColor: theme.palette.secondary.main,
                    height: '100%',
                    borderRadius: '16px 16px 0 0',
                    position:'relative',
                    zIndex: 1000
                }}
                elevation={ 2 }
            >
                <Container>
                    <PixabaySelector
                        setImage={ setImage }
                        pixabayResults={ pixabayResults }
                        arrayRef={ arrayRef }
                    />
                </Container>
            </Paper>
        </>
        
    )
}

export default ThemeSection;