import {  createRef, useEffect, useState } from "react";
import Header from "../components/Header";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import axios from "axios";

import { CardActionArea, Container, Grid, Paper, TextField, IconButton, Select, MenuItem, InputLabel, CircularProgress, Button, Stack } from "@mui/material";
import {ColorPaletteImage} from "../components/ColorPaletteImage";

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ChevronLeft, ChevronRight, Search } from "@mui/icons-material";
import Pagination from '@mui/material/Pagination';
import { Box } from "@mui/system";
import StyledSwitch from '../styled/StyledSwitch';

const pixabay_url = 'https://pixabay.com/api/?key=25105059-4d7ff3f9a607aabea05e93997';

type mediaCardTypes = {
    url:string,
    alt:string,
    index:number
}


  
type CurrentPaletteType = {
    vibrant: string,
    lightVibrant: string,
    darkVibrant: string,
    muted: string,
    lightMuted: string,
    darkMuted: string
}

type SearchOptions = {
    query: String,
    lang: String,
    imageType: String | 'photo' | 'illustration' | undefined,
    //colors: 'grayscale' | 'transparent' | 'red' | 'orange' | 'yellow' | 'green' | 'turquoise' | 'blue' | 'lilac' | 'pink' | 'white' | 'gray' | 'black' | 'brown'  | undefined,
    colors: any | undefined,
    category: String | 'backgrounds' | 'fashion' | 'nature' | 'science' | 'education' | 'feelings' | 'health' | 'people' | 'religion' | 'places' | 'animals' | 'industry' | 'computer' | 'food' | 'sports' | 'transportation' | 'travel' | 'buildings' | 'business' | 'music' | undefined,
    perPage: number,
    page: number
}

const Dashboard = () => {
    const [pixabayResults, setPixabayResults] = useState([]);
    const [colorsArray,setColorsArray] = useState<[]>([]);
    const [totalResults,setTotalResults] = useState<number>(1);
    const [searchOptions,setSearchOptions] = useState<SearchOptions>({
        query: 'Paisaje',
        lang: 'es',
        imageType: undefined,
        colors: '',
        category: undefined,
        perPage: 8,
        page: 1
    });

    const [query,setQuery] = useState<String>('');
    const [darkMode,setDarkMode] = useState<Boolean>(false);
    const [arrayRef,setArrayRef] = useState([]);
    const [currentPalette,setCurrentPalette] = useState<CurrentPaletteType>({
        vibrant: '#4664F6',
        lightVibrant: '#F8FAFF',
        darkVibrant: '#010413',
        muted: '#7AE7C7',
        lightMuted: '#CBF6E9',
        darkMuted: '#03110D'
    });

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: currentPalette.vibrant,
            },
            secondary: {
                main: darkMode ? currentPalette.darkVibrant : currentPalette.lightVibrant,
            },
        },
    })

    useEffect(() => {
        retrievePixabayImages();
    }, []);

    useEffect(() => {
        retrievePixabayImages();
    }, [searchOptions]);

    const retrievePixabayImages = async () => {

        setPixabayResults([]);

        const fullPath = `${pixabay_url}${searchOptions.lang && '&lang=' + searchOptions.lang}${searchOptions.query && '&q=' + searchOptions.query}${searchOptions.colors !== undefined && searchOptions.colors !== false && '&colors=' + searchOptions.colors}${searchOptions.category !== undefined && '&category=' + searchOptions.category}${searchOptions.imageType !== undefined && '&image_type=' + searchOptions.imageType}${searchOptions.perPage && '&per_page=' + searchOptions.perPage}${searchOptions.page && '&page=' + searchOptions.page}`

        const result = await axios.get(fullPath);

        if(result) {
            const arr:any = [];
            result.data.hits.map((v:any,i:any) => (
                arr[i] = createRef()
            ));

            setTotalResults(Math.round(result.data.totalHits/searchOptions.perPage))
            setArrayRef(arr)
            setPixabayResults(result.data.hits);
            
        }
    }

    const updateThemeColor = (index:any) => {
        const reff:any = arrayRef[index];
        reff?.current.updatePalette();
    }

    const mediaCard = ({url,alt,index}:mediaCardTypes) => {
        return(
            <Card sx={{ maxWidth: 345, borderRadius: 4, backgroundColor: darkMode ? currentPalette.lightVibrant : currentPalette.darkVibrant }} key={index}>
                <CardActionArea onClick={() => updateThemeColor(index)}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={url}
                        alt={alt}
                    />
                    <ColorPaletteImage setCurrentPalette={setCurrentPalette} darkMode={darkMode} ref={arrayRef[index]} src={url}/>    
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
                    paddingTop: 2,
                    minHeight: '100vh'
                }}>
                    <Container maxWidth="xl">
                        <Grid container>
                            <Grid item>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<StyledSwitch sx={{ m: 1 }} value={darkMode} onChange={() => setDarkMode(!darkMode)} />}
                                        label={darkMode ? 'Fondo oscuro' : 'Fondo claro'}
                                    />
                                </FormGroup>
                            </Grid>
                        </Grid>
                        <Grid justifyContent="center" mt={2} mb={2} container>
                            <Grid item xs={12}>
                                <TextField
                                    onKeyPress={(event) => {
                                        if(event.key === "Enter") {
                                            setSearchOptions({...searchOptions,query:query})
                                        }
                                    }}
                                    variant="filled"
                                    label="Buscar imagenes"
                                    value={query}
                                    onChange={(event) => {setQuery(event.target.value)}}
                                    sx={{
                                        width:'100%'
                                    }}
                                    InputProps={{
                                        disableUnderline: true,
                                        endAdornment: <IconButton onClick={() => setSearchOptions({...searchOptions,query:query})}><Search/></IconButton>
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container mb={2}>
                            <Grid item xs={6}>
                                <InputLabel id="image-type-select-label">Tipo de imagen</InputLabel>
                                <Select
                                    fullWidth
                                    variant="filled"
                                    size="small"
                                    labelId="image-type-select-label"
                                    id="image-type-select"
                                    value={searchOptions.imageType}
                                    label="Tipo de imagen"
                                    placeholder="Tipo de imagen"
                                    onChange={(e) => setSearchOptions({...searchOptions, imageType:e.target.value})}
                                >
                                    <MenuItem value="photo">Fotografías</MenuItem>
                                    <MenuItem value="illustration">Ilustraciones</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel id="color-select-label">Color</InputLabel>
                                <Select
                                    fullWidth
                                    variant="filled"
                                    size="small"
                                    labelId="color-select-label"
                                    id="color-select"
                                    value={colorsArray}
                                    label="Color"
                                    multiple
                                    onChange={(e:any) => { 
                                        const {
                                            target: { value },
                                        } = e;

                                        setColorsArray(typeof value === 'string' ? value.split(',') : value)
                                        setSearchOptions({...searchOptions, colors: value.join(",")});
                                    }}
                                >
                                    <MenuItem value="grayscale">Escala de grises</MenuItem>
                                    <MenuItem value="transparent">Transparente</MenuItem>
                                    <MenuItem value="red">Rojo</MenuItem>
                                    <MenuItem value="orange">Naranja</MenuItem>
                                    <MenuItem value="yellow">Amarillo</MenuItem>
                                    <MenuItem value="green">Verde</MenuItem>
                                    <MenuItem value="turquoise">Turquesa</MenuItem>
                                    <MenuItem value="blue">Azul</MenuItem>
                                    <MenuItem value="lilac">Lila</MenuItem>
                                    <MenuItem value="pink">Rosa</MenuItem>
                                    <MenuItem value="white">Blanco</MenuItem>
                                    <MenuItem value="gray">Gris</MenuItem>
                                    <MenuItem value="black">Negro</MenuItem>
                                    <MenuItem value="brown">Marrón</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid container mb={4}>
                            <Grid item xs={12}>
                                <InputLabel id="category-select-label">Categoría</InputLabel>
                                <Select
                                    fullWidth
                                    variant="filled"
                                    size="small"
                                    labelId="category-select-label"
                                    id="category-type-select"
                                    value={searchOptions.category}
                                    label="Categoría"
                                    onChange={(e) => setSearchOptions({...searchOptions, category:e.target.value})}
                                >
                                    <MenuItem value="backgrounds">Fondos</MenuItem>
                                    <MenuItem value="fashion">Moda</MenuItem>
                                    <MenuItem value="nature">Naturaleza</MenuItem>
                                    <MenuItem value="science">Ciencia</MenuItem>
                                    <MenuItem value="education">Educación</MenuItem>
                                    <MenuItem value="feelings">Sentimientos</MenuItem>
                                    <MenuItem value="health">Salud</MenuItem>
                                    <MenuItem value="people">Personas</MenuItem>
                                    <MenuItem value="religion">Religión</MenuItem>
                                    <MenuItem value="places">Lugares</MenuItem>
                                    <MenuItem value="animals">Animales</MenuItem>
                                    <MenuItem value="industry">Industria</MenuItem>
                                    <MenuItem value="computer">Computación</MenuItem>
                                    <MenuItem value="food">Comida</MenuItem>
                                    <MenuItem value="sports">Deportes</MenuItem>
                                    <MenuItem value="transportation">Transporte</MenuItem>
                                    <MenuItem value="travel">Viajes</MenuItem>
                                    <MenuItem value="buildings">Construcciones</MenuItem>
                                    <MenuItem value="business">Negocios</MenuItem>
                                    <MenuItem value="music">Música</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>

                        {pixabayResults.length > 0 ? <>
                            <Grid justifyContent="center" container>
                                

                                {pixabayResults.map((value:any,index) => {
                                    return(
                                        <Grid item xs={6} md={3}>
                                            {mediaCard({url:value.webformatURL,alt:'alt',index})}
                                        </Grid>
                                    )
                                })}
                            </Grid>
                            <Grid container my={4}>
                                <Stack justifyContent="center" direction="row" spacing={2}>
                                    <Button
                                        sx={{
                                            textTransform: 'none'
                                        }}
                                        startIcon={<ChevronLeft/>}
                                    >
                                        Anterior
                                    </Button>
                                    <Button
                                        sx={{
                                            textTransform: 'none'
                                        }}
                                        variant="contained"
                                        color="primary"
                                        endIcon={<ChevronRight/>}
                                    >
                                        Siguiente página
                                    </Button>
                                </Stack>
                                <Grid item xs={12}>
                                    
                                    <Pagination count={totalResults} page={searchOptions.page} onChange={(e,value) => setSearchOptions({...searchOptions, page: value})} />
                                </Grid>
                            </Grid>
                        </> : <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignContent: 'center',
                                height: 400
                            }}>
                                <CircularProgress color="primary"/>
                        </Box>}
                    </Container>
                </Paper>
                
            </ThemeProvider>
        </>
    )
}

export default Dashboard;