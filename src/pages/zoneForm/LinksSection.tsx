import { useRef, useState, useEffect } from 'react';
import { Grid, Paper, Typography, TextField, FormGroup, Switch, Button, Tooltip, CircularProgress } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Controller, useForm } from "react-hook-form";
import FormControlLabel from '@mui/material/FormControlLabel';
import { Add, Check } from "@mui/icons-material";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import StyledSwitch from '../../styled/StyledSwitch';
import IconButton from '@mui/material/IconButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import UploadFile from '../../components/UploadFile';
import { useUploader } from '../../components/UploadFile';
import { green } from '@mui/material/colors';
import { postRecord } from '../../actions/postRecord';
import { fetchRecords } from '../../actions/fetchRecords';

type LinksItemType = {
  title: string;
  description: string;
  imgUrl: string;
  coverImg: string;
  category: any;
  whatsapp: boolean;
  whatsappMessage?: string;
  buttonText: string;
  isSaved: boolean;
  file?: any;
}

type ObjectCategoryType = {
  _id: string;
  title: string;
}

type CategoryItemType = {
  inputValue?: string;
  title: string;
  links?: Array<LinksItemType> | null;
}

const filter = createFilterOptions<CategoryItemType>();


export const LinksSection = () => {

  const link:LinksItemType = {
    title: '',
    description: '',
    imgUrl: '',
    coverImg: '',
    category: '',
    whatsapp: false,
    whatsappMessage: '',
    buttonText: '',
    isSaved: false
  }

  const refLink = useRef<null | HTMLDivElement>(null);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ linksItems, setLinksItems ] = useState<LinksItemType[] | []>([link]);
  const { handleSubmit, control, setValue, formState: {errors}, } = useForm();
  const { dataUri, file, onChange, handleDelete, imageSrc } = useUploader();
  const [ categorySelected, setCategorySelected ] = useState<CategoryItemType | null>(null);
  const [ categories, setCategories ] = useState<CategoryItemType[]>([]);

  useEffect(() => {
    getLinks();
  },[]);

  const getLinks = async () => {
    const { links } = await fetchRecords('links');
    
    const arrayCategories:any = [];

    links.map((item:any) => {
        arrayCategories.push(item.category)
    });

    arrayCategories.map((item:any) => {
      const result = links.filter((obj:any) => {
        
        const cat:ObjectCategoryType = obj.category;
        
        return cat._id === item._id
        
      });
      if(result.length > 0) {
        item.links = result;
      }
    });

    setCategories( arrayCategories );
  }

  const handleAddLink = () => {
    const linksArray = [...linksItems];
    linksArray.push( link );
    setLinksItems( linksArray );
    
    if(refLink.current) {
      //refLink.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }

  const submitForm = async (data:any, index:number) => {
    setLoading(true);
    const linksArray = [...linksItems];

    linksArray[index].isSaved = true;
    const formData = new FormData();
    formData.append( 'file', file );

    const { image } = await postRecord('images', formData);

    linksArray[index].title = data[`title${index}`];
    linksArray[index].description = data[`description${index}`];
    linksArray[index].buttonText = data[`buttonText${index}`];
    linksArray[index].coverImg = image.uid; //Assing recently created uid image
    linksArray[index].whatsappMessage = data[`whatsappMessage${index}`];

    if(categorySelected) {
      linksArray[index].category = categorySelected.title;
    }
    
    const result = await postRecord('links', linksArray[index]);
    
    if(result) {
      setCategorySelected( null );
      setLinksItems(linksArray);
      handleDelete(); //Deletes uploaded image preview
      setLoading(false);
      getLinks();
    }
    
  }

  return(
    <Box sx={{ mt: 2 }}>
      { categories.map( (itemCategory,indexCategory) => (
        itemCategory.links?.length && itemCategory.links?.length > 0 && 
        <div key={indexCategory}>
          <Typography sx={{ mb: 1 }} variant="h6"> 
            { itemCategory.title && itemCategory.title }
          </Typography>
          { itemCategory.links?.map( (itemLink:any, indexLink) => (
            <Card sx={{ display: 'flex', mb: 1, borderRadius: 3 }} key={indexLink}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={ itemLink.coverImg.url ? itemLink.coverImg.url : '' }
                alt="Cover link"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography component="div" variant="h6">
                    { itemLink.title }
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" component="div">
                    { itemLink.description }
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                  
                </Box>
              </Box>
            </Card>
          ))}
        </div> 
      ))}
      { linksItems.map( (item,index) => {
          return(
            <div ref={ refLink } style={{ margin: '2rem 0' }} key={index}>
              { item.isSaved === false && <Paper sx={{ p: 1, borderRadius: 3, mb: 1 }} elevation={ 4 }>
                  <form id={`form-link-${ index }`}>
                    <Grid spacing={ 2 } container>
                      <Grid xs={ 12 } item>
                        <UploadFile title="Sube una imagen" onChange={onChange} handleDelete={handleDelete} dataUri={dataUri} imageSrc={imageSrc}/>
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
                                onChange={ onChange }
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
                            setValue( `whatsappMessage${index}`, `Hola, me interesa tu ${ item.title ? item.title : 'Producto/Servicio' }` );
                          } }/>} label="Enlace a mi WhatsApp" />
                        </FormGroup>
                        <Tooltip title="Permite que las personas interesadas en este enlace te contacten por WhatsApp" arrow>
                          <IconButton>
                            <HelpOutlineIcon/>
                          </IconButton>
                        </Tooltip>
                        
                      </Grid>
                      
                        <Grid sx={{ display: item.whatsapp ? 'inline-flex' : 'none' }} xs={ 12 } item>
                          <Controller
                            name={`whatsappMessage${index}`}
                            control={control}
                            rules={{
                              required: 'Agrega un mensaje de WhatsApp'
                            }}
                            render={({ field: { onChange, value } }) => (
                              <TextField                       
                                fullWidth
                                multiline
                                onChange={onChange}
                                value={ value }
                                label="Mensaje automático de WhatsApp" 
                                placeholder="Hola! me interesa tu producto/servicio"
                              />
                            )}
                          />
                        </Grid>
                      
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
                
                { index === linksItems.length - 1 &&  
                  <Box display="flex" justifyContent="right">
                    <Button
                      disabled={ loading }
                      color={ item.isSaved ? 'primary' : 'success' }
                      sx={{ textTransform: 'none' }}
                      startIcon={ ( item.isSaved ? <Add/> : (
                        loading ? <CircularProgress size={ 12 } sx={{color: green[900] }}/>
                        :
                        <Check/>
                      ) ) }
                      onClick={ 
                        item.isSaved ? handleAddLink : handleSubmit(data => submitForm(data,index)) 
                      }
                      variant="contained"
                      size="small"
                      //type={ item.isSaved ? 'button' : 'submit' }
                      form={`form-link-${ index }`}
                    >
                      { item.isSaved ? 'Crear otro enlace' : 'Guardar enlace' }
                    </Button>
                  </Box> 
                }
              
            </div>
          )
      })}
        
    </Box>
  );
};
