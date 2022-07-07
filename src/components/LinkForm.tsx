import { useState, useEffect } from 'react';
import { Grid, Paper, TextField, FormGroup, Tooltip, CircularProgress, Stack, Typography, InputAdornment } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Controller, useForm } from "react-hook-form";
import FormControlLabel from '@mui/material/FormControlLabel';
import { Add, Check } from '@mui/icons-material';
import Box from '@mui/material/Box';
import StyledSwitch from '../styled/StyledSwitch';
import IconButton from '@mui/material/IconButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { UploadFile, useUploader } from '../components/UploadFile';
import { green } from '@mui/material/colors';
import { postRecord } from '../actions/postRecord';
import { fetchRecords } from '../actions/fetchRecords';
import StyledButton from '../styled/StyledButton';
import { ModalCategory, useModalCategory } from './ModalCategory';
import { LinksItemType } from '../types/LinksItemType';
import { CategoryItemType } from '../types/CategoryItemType';
import { deleteRecord } from '../actions/deleteRecord';
import { updateRecord } from '../actions/updateRecord';
import Premium from '../assets/icons/premium.svg';
import { updateUi } from '../actions/ui';
import { useAppDispatch } from '../app/hooks';

const filter = createFilterOptions<CategoryItemType>();

export const LinkForm = ({ item, zone, getLinks, defaultCategories, editingMode, zoneName, setEditMode, userWhatsapp, isLocked }:{item?:any, zone:string | undefined, getLinks:any, defaultCategories?:CategoryItemType[], editingMode:boolean, zoneName?:string, setEditMode?:any, userWhatsapp?:string, isLocked?:boolean }) => {
  const dispatch = useAppDispatch();
  const [ isEditing, setIsEditing ] = useState<boolean>( editingMode );

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
  const { handleSubmit, control, setValue, formState: {errors}, reset } = useForm();
  const { setDataUri, dataUri, onChange, handleDelete, imageSrc, uploadToServer, openModal, handleModal, getCropData, setCropper, cropper, temporalDataUri } = useUploader( true );
  const [ categorySelected, setCategorySelected ] = useState<CategoryItemType | null>(null);
  const [ categories, setCategories ] = useState<CategoryItemType[]>([]);
  const { handleModalCategory, openModalCategory, handleNewCategory, newCategory } = useModalCategory( defaultCategories );
  const [ enableWhatsapp, setEnableWhatsapp ] = useState<boolean>( false );

  useEffect(() => {
    console.log( 'item?.whatsapp ', item?.whatsapp)
    if( item ) {
      setDataUri( item.coverImg?.url )
      setValue( 'title', item.title );
      setValue( 'description', item.description );
      setValue( 'link', item.link );
      setValue( 'buttonText', item.buttonText );
      setCategorySelected( { title: item.category?.title } );
      setEnableWhatsapp( item?.whatsapp );
    }

  },[ item ]);

  useEffect(() => {
    if( newCategory ) {
      //Add new category if categories array
      setCategories(prev => ([
        ...prev,
        {
          title: newCategory
        }
      ]));

      setCategorySelected({
        title: newCategory,
      });

    }

  },[ newCategory ]);

  useEffect(() => {
    if( defaultCategories ) {
      setCategories( defaultCategories )
    }
  },[ defaultCategories ]);

  useEffect(() => {
    setIsEditing( editingMode );
  },[ editingMode ]);

  const submitForm = async ( data:any ) => {

    if( !categorySelected ) {
      alert( '¡Ups! Debes seleccionar al menos una categoría' );
      return;
    }

    setLoading(true);

    if( !zone ) {
      return;
    }

    if( data?.link ) {
      //Remove http/https if exists in url
      data.link = data.link.replace(/^https?:\/\//, '');
    }

    let image:any = null;
    let result:any = null;

    //Add whatsapp number to data
    if(enableWhatsapp && userWhatsapp) {
      data.whatsappNumber = userWhatsapp;
    }
    data.whatsapp = enableWhatsapp;

    //If item exists then is updating
    if( item ) {

      //If image is setted
      if( dataUri ) {
        //If prev coverImageUrl is different to dataUri then consider that image was updated
        if( item.coverImg?.url !== dataUri ) {
          await deleteRecord( 'images', item.coverImg?._id ); //delete old image
          image = await uploadToServer( zone, `${ zoneName }/links` ); //Upload new image
          data.coverImg = image.uid; //Assing recently created uid image
        }
      }

      //If category has changed
      if( categorySelected.title !== item.category?.title ) {
        const categoryUid = await handleCategory( categorySelected.title );

        if( !categoryUid ) {
          alert( 'Ocurrió un error al obtener el ID de la categoría.' )
          return;
        }

        data.category = categoryUid;
      }

      result = await updateRecord('links', data, item.uid );

    }else{

      //If image is setted
      if( dataUri ) {
        image = await uploadToServer( zone, `${ zoneName }/links` );
        data.coverImg = image.uid; //Assing recently created uid image
      }

      data.isSaved = true;

      const categoryUid = await handleCategory( categorySelected.title );

      if( !categoryUid ) {
        alert( 'Ocurrió un error al obtener el ID de la categoría.' )
        return;
      }

      data.category = categoryUid;

      if(zone) {
        data.zone = zone; //Assing current zone uid
      }




      result = await postRecord('links', data);

    }

    if(result) {

      setLoading( false );

      resetForm(); //Reset form
      getLinks(); //Update links list
    }

  }

  const handleCategory = async (categorySelected:string) => {

    let result:any = false;

    //Check if category exists
    const { category } = await fetchRecords(`categories/find/${ categorySelected }/${ zone }`);

    //If category exists add uid else create new category
    if( category ) {
      result = category.uid
    } else {

      try{
        const categoryResult = await postRecord('categories', {
          title: categorySelected,
          zone
        });

        result = categoryResult.category.uid;
      }catch(e){
        console.log(e);
      }

    }

    return result;
  }

  const resetForm = () => {
    reset()
    setCategorySelected( null );
    setEnableWhatsapp( false );
    handleDelete(); //Deletes uploaded image preview
    setIsEditing( false );
    if ( setEditMode ) {
      setEditMode( false );
    }
  }

  return(
    <Box>
      <ModalCategory
        handleModalCategory={ handleModalCategory }
        openModalCategory={ openModalCategory }
        handleNewCategory={ handleNewCategory }
      />
      { isEditing && (
        <Paper sx={{ p: 1, borderRadius: 3, mb: 1 }} elevation={ 4 }>
          <form id={`form-link`}>
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
                  cropper={cropper}
                  getCropData={ getCropData }
                  handleModal={ handleModal }
                  setCropper={ setCropper }
                  temporalDataUri={ temporalDataUri }
                  maxFileSize={ 20971520 }
                  aspectRatio={ [ 16/9, 1, 4/5 ] }
                />
              </Grid>
              <Grid xs={ 12 } item>
                <Controller
                  name="title"
                  control={control}
                  defaultValue={ item?.title ? item.title : undefined }
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
                { errors.title && <Typography variant="caption" sx={{color:'red'}}>{ errors.title.message }</Typography> }
              </Grid>
              <Grid xs={ 12 } item>
                <Controller
                  name={`description`}
                  defaultValue={ item?.description ? item.description : undefined }
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
                {
                  categories.length === 0 ? (
                    <TextField
                      disabled
                      fullWidth
                      label="Categoría"
                      InputProps={{
                        endAdornment: loading ? <CircularProgress size={ 12 }/> :
                          <StyledButton
                            fullWidth
                            onClick={ handleModalCategory }
                            variant="contained"
                            color="secondary"
                            startIcon={ <Add/> }
                          >
                            Crear una categoría
                          </StyledButton>
                      }}
                    />
                  ) : (
                    <Autocomplete
                      value={ categorySelected?.title }
                      defaultValue={ categorySelected?.title }
                      onChange={(event, newValue) => {

                        console.log('cayendo aqui ',newValue)
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
                          arrayLinksItems.category = newValue?.title ? newValue?.title : '';
                          setCategorySelected({
                            title: newValue?.title ? newValue?.title : '',
                          });
                        }
                      }}
                      renderOption={( props:any, option:any ) => {

                        //If is the last option
                        if( ( categories.length - 1 ) === props["data-option-index"]) {
                          return(
                            <div key={ option.title }>
                              <li  {...props}>
                                { option.title }
                              </li>
                              <li>
                                <StyledButton
                                  onClick={ handleModalCategory }
                                  fullWidth
                                  color="secondary"
                                  startIcon={ <Add/> }
                                >
                                  Crear una categoría
                                </StyledButton>
                              </li>
                            </div>

                          )
                        }
                        return(   <li { ...props }>
                          { option.title }
                        </li> )
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
                  )
                }

              </Grid>
              <Grid display="flex" justifyContent="space-between" xs={ 12 } item>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <StyledSwitch
                        defaultChecked={ item?.whatsapp }
                        onChange={ (e) => {
                          setEnableWhatsapp( e.target.checked );
                          //setLinksItems( { ...linksItems, whatsapp: !linksItems.whatsapp } );
                          setValue( `whatsappMessage`, `Hola, me interesa tu ${ item?.title ? item.title : 'Producto/Servicio' }` );
                        } }
                      />
                    }
                    label="Enlace a mi WhatsApp"
                  />
                </FormGroup>
                <Tooltip title="Permite que las personas interesadas en este enlace te contacten por WhatsApp" arrow>
                  <IconButton>
                    <HelpOutlineIcon/>
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid sx={{ display: enableWhatsapp ? 'inline-flex' : 'none' }} xs={ 12 } item>
                <Controller
                  name={`whatsappMessage`}
                  control={ control }
                  defaultValue={ item?.whatsappMessage ? item.whatsappMessage : undefined }
                  rules={{
                    required: enableWhatsapp ? 'Agrega un mensaje de WhatsApp' : false
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
              <Grid sx={{ display: !enableWhatsapp ? 'inline' : 'none' }} xs={ 12 } item>
                <Controller
                  name="link"
                  control={ control }
                  defaultValue={ item?.link ? item.link : undefined }
                  rules={{
                    required: !enableWhatsapp ? 'Debes agregar un enlace.' : false
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      multiline
                      onChange={onChange}
                      value={ value }
                      label="Enlace personalizado"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">http://</InputAdornment>
                      }}
                      placeholder="mienlace.com"
                    />
                  )}
                />
                { errors.link && <Typography variant="caption" sx={{color:'red'}}>{ errors.link.message }</Typography> }
              </Grid>
              <Grid xs={ 12 } item>
                <Controller
                  name={`buttonText`}
                  defaultValue={ item?.buttonText ? item.buttonText : undefined }
                  control={control}
                  rules={{
                    required: 'Debes agregar un texto para tu botón.'
                  }}
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
                { errors.buttonText && <Typography variant="caption" sx={{color:'red'}}>{ errors.buttonText.message }</Typography> }
              </Grid>
            </Grid>
            <Stack spacing={ 2 } direction="row" sx={{ mt: 2, justifyContent: 'right' }}>
              <StyledButton
                variant="outlined"
                onClick={ resetForm }
              >
                Cancelar
              </StyledButton>
              <StyledButton
                disabled={ loading }
                color="success"
                startIcon={(
                  loading ? <CircularProgress size={ 12 } sx={{color: green[900] }}/> : <Check/>
                )}
                onClick={  handleSubmit(data => submitForm( data )) }
                variant="contained"
                size="small"
                form={`form-link-`}
              >
                Guardar enlace
              </StyledButton>
            </Stack>
          </form>
        </Paper> )
      }

      {
        !isEditing && (
          <Box sx={{ mt: 2, justifyContent: 'right', display: 'flex'}}>
            <StyledButton
              color="secondary"
              startIcon={( isLocked ? <img src={ Premium } style={{ width: 16 }} alt="img-icon" /> : <Add/> )}
              onClick={ () => {
                if( isLocked ) {
                  dispatch( updateUi({
                    modalPremium: true,
                    titleModalPremium: "¡Conviértete en Zoner Pro y crea hasta 200 enlaces!"
                  }) );
                }else {
                  setIsEditing(true)}
              }
              }
              variant="contained"
              size="medium"
            >
              { isLocked ? 'Cámbiate a pro para crear más enlaces' : 'Crear otro enlace' }
            </StyledButton>
          </Box>
        )
      }
    </Box>
  )
}
