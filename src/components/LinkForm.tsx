import { useRef, useState, useEffect } from 'react';
import { Grid, Paper, Typography, TextField, FormGroup, Switch, Button, Tooltip, CircularProgress, Stack, useTheme } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Controller, useForm } from "react-hook-form";
import FormControlLabel from '@mui/material/FormControlLabel';
import { Add, Check, ChevronLeft, Delete, Edit } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import StyledSwitch from '../styled/StyledSwitch';
import IconButton from '@mui/material/IconButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { UploadFile, useUploader } from '../components/UploadFile';
import { green } from '@mui/material/colors';
import { postRecord } from '../actions/postRecord';
import { fetchRecords } from '../actions/fetchRecords';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { transition } from '../constants/transitions';
import SavedLink from '../components/SavedLink';

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
    zone: string;
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

export const useLinkForm = () => {
    

    


}

export const LinkForm = ({ item, zone, getLinks }:{item:any, zone:string | undefined, getLinks:any }) => {

    const [ isEditing, setIsEditing ] = useState<boolean>( true );

    const link:LinksItemType = {
        title: '',
        description: '',
        imgUrl: '',
        coverImg: '',
        category: '',
        whatsapp: false,
        whatsappMessage: '',
        buttonText: '',
        isSaved: false,
        zone: '',
      }

    const [ loading, setLoading ] = useState<boolean>(false);
    const [ linksItems, setLinksItems ] = useState<LinksItemType>(link);
    const { handleSubmit, control, setValue, formState: {errors}, } = useForm();
    const { dataUri, onChange, handleDelete, imageSrc, file, uploadToServer, openModal, handleModal, getCropData, setCropper, temporalDataUri } = useUploader( true );
    const [ categorySelected, setCategorySelected ] = useState<CategoryItemType | null>(null);
    const [ categories, setCategories ] = useState<CategoryItemType[]>([]);

    const submitForm = async ( data:any ) => {

        setLoading(true);
    
        if( !zone ) {
          return;
        }
    
        const image:any = await uploadToServer( zone );
        
        data.coverImg = image.uid; //Assing recently created uid image
        data.isSaved = true;
    
        if(zone) {
            data.zone = zone;
        }
    
        if(categorySelected) {

            const { category } = await fetchRecords(`categories/find/${categorySelected.title}/${zone}`);

            if( category ) {
                data.category = category.uid
            } else {

                try{
                    const categoryResult = await postRecord('categories', {
                        title: categorySelected.title,
                        zone
                    });
    
                    console.log( categoryResult )
                    data.category = categoryResult.category.uid;
                }catch(e){
                    console.log(e)
                }
               
            }

            
        }

        console.log('data ',data);

        const result = await postRecord('links', data);
        
        if(result) {
          setCategorySelected( null );
          handleDelete(); //Deletes uploaded image preview
          setLoading(false);
          getLinks();
          setIsEditing( false )
        }
        
    }

    return(
        <Box>
              { isEditing && <Paper sx={{ p: 1, borderRadius: 3, mb: 1 }} elevation={ 4 }>
                  <form id={`form-link-${ item.uid }`}>
                    <Grid spacing={ 2 } container>
                      <Grid xs={ 12 } item>
                        <UploadFile 
                          useCropper={ true }
                          title="Sube una imagen"
                          onChange={ onChange }
                          handleDelete={ handleDelete }
                          dataUri={ dataUri }  
                          imageSrc={ imageSrc }
                          openModal={ openModal }
                          getCropData={ getCropData }
                          handleModal={ handleModal }
                          setCropper={ setCropper }
                          temporalDataUri={ temporalDataUri }
                          maxFileSize={ 20971520 }
                          aspectRatio={ 1.86 }
                        />
                      </Grid>
                      <Grid xs={ 12 } item>
                        <Controller
                            name={`title`}
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
                            name={`description`}
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
                        
                            if (typeof newValue === 'string') {
                          
                            
                              setCategorySelected({
                                title: newValue,
                              });
                            } else if (newValue && newValue.inputValue) {

                              setCategories( prev => [...prev, { title: newValue.inputValue ? newValue.inputValue : '' }] );
                              const arrayLinksItems:any = linksItems;
                              arrayLinksItems.category = newValue.inputValue ? newValue.inputValue : '';
                              setLinksItems( arrayLinksItems );
                              // Create a new value from the user input
                              setCategorySelected({
                                title: newValue.inputValue,
                              });
                            } else {
                              const arrayLinksItems:any = linksItems;
                              console.log('onChange select ', newValue?.title);
                              arrayLinksItems.category = newValue?.title ? newValue?.title : '';
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
                          
                            setLinksItems( { ...linksItems, whatsapp: !linksItems.whatsapp } );
                            setValue( `whatsappMessage`, `Hola, me interesa tu ${ item.title ? item.title : 'Producto/Servicio' }` );
                          } }/>} label="Enlace a mi WhatsApp" />
                        </FormGroup>
                        <Tooltip title="Permite que las personas interesadas en este enlace te contacten por WhatsApp" arrow>
                          <IconButton>
                            <HelpOutlineIcon/>
                          </IconButton>
                        </Tooltip>
                        
                      </Grid>
                      
                        <Grid sx={{ display: linksItems.whatsapp ? 'inline-flex' : 'none' }} xs={ 12 } item>
                          <Controller
                            name={`whatsappMessage`}
                            control={ control }
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
                            name={`buttonText`}
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
                </Paper> 
                }
                
           
                <Box display="flex" justifyContent="right">
                <Button
                    disabled={ loading }
                    color={ isEditing ? 'success' : 'primary' }
                    sx={{ textTransform: 'none' }}
                    startIcon={( 
                        isEditing ? <Check/> : (
                            loading ? <CircularProgress size={ 12 } sx={{color: green[900] }}/>
                        :
                            <Add/>
                    ))}
                    onClick={ isEditing ? handleSubmit(data => submitForm( data )) : () => setIsEditing(true) }
                    variant="contained"
                    size="small"
                    //type={ item.isSaved ? 'button' : 'submit' }
                    form={`form-link-`}
                >
                    { isEditing ? 'Guardar enlace' : 'Crear otro enlace' }
                </Button>
                </Box> 
              
        </Box>
    )
}
