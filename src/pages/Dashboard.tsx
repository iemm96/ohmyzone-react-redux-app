import {  createRef, useEffect, useState } from "react";
import Header from "../components/Header";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import axios from "axios";
import { CardActionArea, Container, Grid, Paper, TextField, Button, IconButton } from "@mui/material";
import {ColorPaletteImage} from "../components/ColorPaletteImage";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Search } from "@mui/icons-material";

const pixabay_url = 'https://pixabay.com/api/?key=25105059-4d7ff3f9a607aabea05e93997';

type mediaCardTypes = {
    url:string,
    alt:string,
    index:number
}

const Dashboard = () => {
    const [pixabayResults, setPixabayResults] = useState([]);
    const [primaryColor, setPrimaryColor] = useState('#4664F6');
    const [secondaryColor, setSecondaryColor] = useState(null);
    const [query,setQuery] = useState<String>('');
    const [arrayRef,setArrayRef] = useState([]);

    const theme = createTheme({
        palette: {
            primary: {
                main: primaryColor,
            },
            secondary: {
                main: secondaryColor ? secondaryColor : '#E4B7E5',
            },
        },
    })

    useEffect(() => {
        retrievePixabayImages();
    }, []);

    const retrievePixabayImages = async () => {

        const queryParams = {
            lang: 'es',
            q: query !== '' ? query : 'Paisaje',
            image_type: 'all',
        }

        const result = await axios.get(`${pixabay_url}&lang=${queryParams.lang}&q=${queryParams.q}&image_type=${queryParams.image_type}`);

        if(result) {
            const arr:any = [];
            result.data.hits.map((v:any,i:any) => {
                arr[i] = createRef();
            });

            setArrayRef(arr)
            console.log(arrayRef);
            setPixabayResults(result.data.hits);
            
        }
    }

    const updateThemeColor = (index:any) => {
        const reff:any = arrayRef[index];
        reff?.current.updatePalette();
    }

    const mediaCard = ({url,alt,index}:mediaCardTypes) => {
        return(
            <Card sx={{ maxWidth: 345, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.5)' }} key={index}>
                <CardActionArea onClick={() => updateThemeColor(index)}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={url}
                        alt={alt}
                    />
                    <ColorPaletteImage setSecondaryColor={setSecondaryColor} setPrimaryColor={setPrimaryColor} ref={arrayRef[index]} src={url}/>    
                </CardActionArea>
            </Card>
        )
    }

    return(
        <>
            <ThemeProvider theme={theme}>
                <Header/>
                <Paper sx={{
                    backgroundColor: theme.palette.secondary.main,
                    mt:6,
                    paddingTop: 2
                }}>
                    <Container maxWidth="xl">
                        <Grid display="flex" justifyContent="center" container my={4}>
                            <Grid item xs={8}>
                                <TextField 
                                    label="Buscar imagenes"
                                    value={query}
                                    onChange={(event) => {setQuery(event.target.value)}}
                                    sx={{
                                        width:'100%'
                                    }}
                                    InputProps={{
                                        endAdornment: <IconButton onClick={() => retrievePixabayImages()}><Search/></IconButton>
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            {pixabayResults.map((value:any,index) => {
                                return(
                                    <Grid item sm={12} md={4}>
                                        {mediaCard({url:value.webformatURL,alt:'alt',index})}
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Container>
                </Paper>
                
            </ThemeProvider>
        </>
    )
}

export default Dashboard;