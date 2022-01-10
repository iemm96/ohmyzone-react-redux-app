import {  createRef, useEffect, useState } from "react";
import Header from "../components/Header";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import axios from "axios";
import { styled } from '@mui/material/styles';
import { CardActionArea, Container, Grid, Paper, TextField, IconButton, Select, MenuItem } from "@mui/material";
import {ColorPaletteImage} from "../components/ColorPaletteImage";
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Search } from "@mui/icons-material";
import Pagination from '@mui/material/Pagination';

const pixabay_url = 'https://pixabay.com/api/?key=25105059-4d7ff3f9a607aabea05e93997';

type mediaCardTypes = {
    url:string,
    alt:string,
    index:number
}

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.primary.main,
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
  }));
  
type CurrentPaletteType = {
    vibrant: string,
    lightVibrant: string,
    darkVibrant: string,
    muted: string,
    lightMuted: string,
    darkMuted: string
}

type SearchOptions = {
    query: string,
    lang: string,
    imageType: string | 'photo' | 'illustration' | undefined,
    //colors: 'grayscale' | 'transparent' | 'red' | 'orange' | 'yellow' | 'green' | 'turquoise' | 'blue' | 'lilac' | 'pink' | 'white' | 'gray' | 'black' | 'brown'  | undefined,
    colors: any | undefined,
    category: string | 'backgrounds' | 'fashion' | 'nature' | 'science' | 'education' | 'feelings' | 'health' | 'people' | 'religion' | 'places' | 'animals' | 'industry' | 'computer' | 'food' | 'sports' | 'transportation' | 'travel' | 'buildings' | 'business' | 'music' | undefined,
    perPage: number,
    page: number
}

const Dashboard = () => {
    const [pixabayResults, setPixabayResults] = useState([]);
    const [primaryColor, setPrimaryColor] = useState('#4664F6');
    const [secondaryColor, setSecondaryColor] = useState(null);
    const [colorsArray,setColorsArray] = useState<[]>([]);
    const [totalResults,setTotalResults] = useState<Number>(1);
    const [searchOptions,setSearchOptions] = useState<SearchOptions>({
        query: 'Paisaje',
        lang: 'es',
        imageType: undefined,
        colors: '',
        category: undefined,
        perPage: 10,
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

        const fullPath = `${pixabay_url}${searchOptions.lang && '&lang=' + searchOptions.lang}${searchOptions.query && '&q=' + searchOptions.query}${searchOptions.colors !== undefined && searchOptions.colors !== false && '&colors=' + searchOptions.colors}${searchOptions.category !== undefined && '&category=' + searchOptions.category}${searchOptions.imageType !== undefined && '&image_type=' + searchOptions.imageType}${searchOptions.perPage && '&per_page=' + searchOptions.perPage}${searchOptions.page && '&page=' + searchOptions.page}`

        const result = await axios.get(fullPath);

        if(result) {
            const arr:any = [];
            result.data.hits.map((v:any,i:any) => {
                arr[i] = createRef();
            });

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
                    <ColorPaletteImage setCurrentPalette={setCurrentPalette} darkMode={darkMode} setSecondaryColor={setSecondaryColor} setPrimaryColor={setPrimaryColor} ref={arrayRef[index]} src={url}/>    
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
                                        control={<MaterialUISwitch sx={{ m: 1 }} value={darkMode} onChange={() => setDarkMode(!darkMode)} />}
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
                                            retrievePixabayImages()
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
                                        endAdornment: <IconButton onClick={() => retrievePixabayImages()}><Search/></IconButton>
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container mb={2}>
                            <Grid item xs={6}>
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
                        <Grid justifyContent="center" container spacing={2}>
                            {pixabayResults.map((value:any,index) => {
                                return(
                                    <Grid item xs={6} md={4}>
                                        {mediaCard({url:value.webformatURL,alt:'alt',index})}
                                    </Grid>
                                )
                            })}
                        </Grid>
                        <Grid container mb={4}>
                            <Grid item xs={12}>
                                <Pagination count={10} page={searchOptions.page} onChange={(e,value) => setSearchOptions({...searchOptions, page: value})} />
                            </Grid>
                        </Grid>
                    </Container>
                </Paper>
                
            </ThemeProvider>
        </>
    )
}

export default Dashboard;