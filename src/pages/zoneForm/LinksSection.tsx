import { useRef, useState, useEffect } from 'react';
import { Grid, Paper, Typography, TextField, FormGroup, Switch, Button, Tooltip } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Controller, useForm } from "react-hook-form";
import Uploader from '../Uploader';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Add, Check } from "@mui/icons-material";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import StyledSwitch from '../../styled/StyledSwitch';
import IconButton from '@mui/material/IconButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

type LinksItemType = {
  title: string;
  description: string;
  imgUrl: string;
  category: string;
  whatsapp: boolean;
  whatsappMessage?: string;
  buttonText: string;
  isSaved: boolean;
}

type CategoryItemType = {
  inputValue?: string;
  title: string;
  links?: Array<LinksItemType> | null;
}

const filter = createFilterOptions<FilmOptionType>();


export const LinksSection = () => {

  const link:LinksItemType = {
    title: '',
    description: '',
    imgUrl: '',
    category: '',
    whatsapp: false,
    whatsappMessage: '',
    buttonText: '',
    isSaved: false
  }

  const refLink = useRef<null | HTMLDivElement>(null);
  const [ linksItems, setLinksItems ] = useState<LinksItemType[] | []>([]);
  const { handleSubmit, control, formState: {errors}, } = useForm();
  const [ categorySelected, setCategorySelected ] = useState<CategoryItemType | null>(null);
  const [ categories, setCategories ] = useState<CategoryItemType[]>([]);

  useEffect(() => {
    
    const arrayLinksItems = [...linksItems];
    const arrayCategories = [...categories];
    console.log('linksItems ' ,linksItems)
    arrayCategories.map((item) => {
      const result = arrayLinksItems.filter(obj => {
        return obj.category === item.title
      })
      console.log( 'result!!!! ', result )
      if(result) {
        item.links = result;
      }
    })
    setCategories( arrayCategories );
  },[linksItems]);

  useEffect(() => {
    setLinksItems([link])
  },[]);

  const handleSaveLink = (element:number) => {
    const linksArray = [...linksItems];

    linksArray[element].whatsappMessage = "mensaje pedorro";
    linksArray[element].isSaved = true;

    setLinksItems(linksArray);
  }

  const handleAddLink = () => {
    const linksArray = [...linksItems];
    linksArray.push( link );
    setLinksItems( linksArray );
    
    //setLinksItems( prev => [...prev ,link] );
    console.log(linksArray);
    console.log(link);
    if(refLink.current) {
      //refLink.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }

  const submitForm = (data:any, index:number) => {
    console.log(data);
    const linksArray = [...linksItems];
    
    linksArray[index].title = data[`title${index}`];
    linksArray[index].description = data[`description${index}`];
    linksArray[index].isSaved = true;
    setLinksItems(linksArray);
    setCategorySelected( null );

  }

  return(
    <>
      { categories.map( (itemCategory,indexCategory) => (
        itemCategory.links?.length && itemCategory.links?.length > 0 && <div key={indexCategory}>
        <Typography> { itemCategory.title && itemCategory.title } </Typography>
        { itemCategory.links?.map( (itemLink, indexLink) => (
          <Card sx={{ display: 'flex', mb: 1 }} key={indexLink}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                { itemLink.title }
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                { itemLink.description }
              </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              
            </Box>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image="/static/images/cards/live-from-space.jpg"
            alt="Live from space album cover"
          />
        </Card> 
        
        ) ) }
        
      </div> 
      ))}
      { linksItems.map( (item,index) => {
          return(
            <div ref={ refLink } style={{ margin: '2rem 0' }} key={index}>
              { item.isSaved === false && <Paper sx={{ p: 1, borderRadius: 3, mb: 1 }} elevation={ 4 }>
                  <Typography variant="caption">
                    Link 1
                  </Typography>
                  <form id={`form-link-${ index }`}>
                    <Grid spacing={ 2 } container>
                      <Grid xs={ 12 } item>
                        <Uploader/>
                      </Grid>
                      <Grid xs={ 12 } item>
                        <Controller
                            name={`title${ index }`}
                            control={control}
                            rules={{
                              required: 'El título es requerido.'
                            }}
                            render={({ field: { onChange, value } }) => (
                              <TextField                       
                                fullWidth
                                onChange={onChange}
                                value={ value }
                                label="Título" 
                              />
                            )}
                          />
                      </Grid>
                      <Grid xs={ 12 } item>
                        <Controller
                            name={`description${ index }`}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <TextField                       
                                fullWidth
                                multiline
                                onChange={onChange}
                                value={value}
                                label="Descripción" 
                              />
                            )}
                          />
                      </Grid>
                      <Grid xs={ 12 } item>
                        <Autocomplete
                          value={categorySelected}
                          onChange={(event, newValue) => {
                            console.log('onChange select ',newValue);
                            if (typeof newValue === 'string') {
                              console.log('Entro en el primer if ',newValue);
                              
                              setCategorySelected({
                                title: newValue,
                              });
                            } else if (newValue && newValue.inputValue) {

                              setCategories( prev => [...prev, { title: newValue.inputValue ? newValue.inputValue : '' }] );
                              const arrayLinksItems = [...linksItems];
                              arrayLinksItems[index].category = newValue.inputValue ? newValue.inputValue : '';
                              setLinksItems( arrayLinksItems );
                              // Create a new value from the user input
                              setCategorySelected({
                                title: newValue.inputValue,
                              });
                            } else {
                              const arrayLinksItems = [...linksItems];
                              console.log('onChange select ', newValue?.title);
                              arrayLinksItems[index].category = newValue?.title ? newValue?.title : '';
                              setCategorySelected({
                                title: newValue?.title ? newValue?.title : '',
                              });
                            }
                          }}
                          filterOptions={(categories, params) => {
                            const filtered = filter(categories, params);

                            const { inputValue } = params;
                            // Suggest the creation of a new value
                            const isExisting = categories.some((category) => inputValue === category.title);
                            if (inputValue !== '' && !isExisting) {
                              filtered.push({
                                inputValue,
                                title: `Crear categoría: "${inputValue}"`,
                              });
                            }

                            return filtered;
                          }}
                          selectOnFocus
                          clearOnBlur
                          handleHomeEndKeys
                          id="free-solo-with-text-demo"
                          options={ categories }
                          getOptionLabel={(option) => {
                            // Value selected with enter, right from the input
                            if (typeof option === 'string') {
                              return option;
                            }
                            // Add "xxx" option created dynamically
                            if (option.inputValue) {
                              return option.inputValue;
                            }
                            // Regular option
                            return option.title;
                          }}
                          renderOption={(props, option) => <li {...props}>{option.title}</li>}
                          fullWidth
                          freeSolo
                          renderInput={(params) => {
                            params.fullWidth = true;

                            return (<TextField 
                              {...params}
                              label="Categoría"
                            />)
                          }}
                        />
                      </Grid>
                      <Grid display="flex" justifyContent="space-between" xs={ 12 } item>
                        <FormGroup>
                          <FormControlLabel control={<StyledSwitch onChange={ () => {
                            const arrayLinksItems = [...linksItems];
                            arrayLinksItems[index].whatsapp = !arrayLinksItems[index].whatsapp;
                            setLinksItems( arrayLinksItems );
                            console.log(arrayLinksItems)
                          } }/>} label="Enlace a mi WhatsApp" />
                        </FormGroup>
                        <Tooltip title="Permite que las personas interesadas en este enlace te contacten por WhatsApp" arrow>
                          <IconButton>
                            <HelpOutlineIcon/>
                          </IconButton>
                        </Tooltip>
                        
                      </Grid>
                      { item.whatsapp && (
                        <Grid xs={ 12 } item>
                          <Controller
                            name={"whatsappMessage"}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <TextField                       
                                fullWidth
                                multiline
                                onChange={onChange}
                                value={ value ? value : `Hola, me interesa tu ${ item.title ? item.title : 'Producto/Servicio' }` }
                                label="Mensaje automático de WhatsApp" 
                              />
                            )}
                          />
                        </Grid>
                      ) }
                      <Grid xs={ 12 } item>
                        <Controller
                            name={`buttonText${index}`}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <TextField                       
                                fullWidth
                                multiline
                                onChange={onChange}
                                value={ value }
                                label="Texto del botón"
                                placeholder="Comprar, Más información, etc"
                              />
                            )}
                          />
                      </Grid>
                    </Grid>
                  </form>
                </Paper>  }
                
                { index === linksItems.length - 1 &&  <Box display="flex" justifyContent="right">
                <Button
                  color={ item.isSaved ? 'primary' : 'success' }
                  sx={{ textTransform: 'none' }}
                  startIcon={ ( item.isSaved ? <Add/> : <Check/> ) }
                  onClick={ item.isSaved ? handleAddLink : handleSubmit(data => submitForm(data,index)) }
                  variant="contained"
                  size="small"
                  //type={ item.isSaved ? 'button' : 'submit' }
                  form={`form-link-${ index }`}
                >
                  { item.isSaved ? 'Crear otro enlace' : 'Guardar enlace' }
                </Button>
              </Box> }
              
            </div>
          )
      })}
        
    </>
  );
};

interface FilmOptionType {
  inputValue?: string;
  title: string;
  year?: number;
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films: readonly FilmOptionType[] = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  {
    title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    year: 1964,
  },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  {
    title: 'Star Wars: Episode VI - Return of the Jedi',
    year: 1983,
  },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  {
    title: 'Eternal Sunshine of the Spotless Mind',
    year: 2004,
  },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 },
];