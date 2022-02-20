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
import StyledSwitch from '../../styled/StyledSwitch';
import IconButton from '@mui/material/IconButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { UploadFile, useUploader } from '../../components/UploadFile';
import { green } from '@mui/material/colors';
import { postRecord } from '../../actions/postRecord';
import { fetchRecords } from '../../actions/fetchRecords';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { transition } from '../../constants/transitions';
import SavedLink from '../../components/SavedLink';
import { useLinkForm, LinkForm } from '../../components/LinkForm';

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


export const LinksSection = ({prev, next}:{ prev:number, next:number }) => {
  const { zone } = useParams();
  
  
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

  const refLink = useRef<null | HTMLDivElement>(null);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ linksItems, setLinksItems ] = useState<LinksItemType[] | []>([link]);
  const { handleSubmit, control, setValue, formState: {errors}, } = useForm();
  const { dataUri, onChange, handleDelete, imageSrc, file, uploadToServer, openModal, handleModal, getCropData, setCropper, temporalDataUri } = useUploader( true );
  const [ categorySelected, setCategorySelected ] = useState<CategoryItemType | null>(null);
  const [ categories, setCategories ] = useState<CategoryItemType[]>([]);
  const theme = useTheme();

  const navigate = useNavigate();
  
  useEffect(() => {
    getLinks();
  },[]);

  const getLinks = async () => {
 
    if( zone ) {
      const { links } = await fetchRecords(`links/byZone/${zone}`);

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
    
  }

  const handleAddLink = () => {
    console.log('handle')
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

    if( !zone ) {
      return;
    }

    const image:any = await uploadToServer( zone );
    
    linksArray[index].title = data[`title${index}`];
    linksArray[index].description = data[`description${index}`];
    linksArray[index].buttonText = data[`buttonText${index}`];
    linksArray[index].coverImg = image.uid; //Assing recently created uid image
    linksArray[index].whatsappMessage = data[`whatsappMessage${index}`];
    linksArray[index].isSaved = true;

    if(zone) {
      linksArray[index].zone = zone;
    }

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
    <>
      <motion.div
            initial={{
                x: 20,
                opacity: 0

            }}
            animate={{
                x: 0,
                opacity: 1,
                transition: { ...transition }
            }}
        >
            <Typography sx={{ mt: 2 }} variant="subtitle1">Crea tus links personalizados</Typography>
        </motion.div>
    <Box>
      { categories.map( (itemCategory,indexCategory) => (
        itemCategory.links?.length && itemCategory.links?.length > 0 && 
        <div key={indexCategory}>
          <Typography sx={{ mb: 1 }} variant="h6"> 
            { itemCategory.title && itemCategory.title }
          </Typography>
          { itemCategory.links?.map( (itemLink:any, indexLink) => (
            
            <Box key={indexLink} sx={{ position: 'relative' }}>
              <SavedLink getLinks={ getLinks } data={ itemLink }/>
            </Box>
            
          ))}
        </div> 
      ))}
      <LinkForm
        getLinks={ getLinks }
        zone={ zone }
        item={ {
          isSaved: false
        } }
      />
        <Stack>
            <Button
                sx={{ 
                    mt: 8,
                    textTransform: 'none',
                }}
                variant="contained"
                fullWidth
                type="submit"
                disabled={ loading }
                onClick={ () => navigate( `/zones/new/${next}` ) }
                startIcon={ loading && <CircularProgress size={ 12 } color="inherit"/> }
            >
                Guardar y continuar
            </Button>
            <Button
                onClick={ () => navigate( `/zones/new/${prev}` ) }
                sx={{ 
                    mt: 2,
                    textTransform: 'none',
                }}
                fullWidth
                startIcon={ <ChevronLeft/> }
            >
                Volver
            </Button>
        </Stack>
    </Box>
    </>
  );
};
