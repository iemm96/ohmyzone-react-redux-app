import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { fetchRecords } from '../../actions/fetchRecords';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { transition } from '../../constants/transitions';
import SavedLink from '../../components/SavedLink';
import { LinkForm } from '../../components/LinkForm';
import FormNavigationButtons from '../../components/FormNavigationButtons';
import { useSelector, useDispatch } from 'react-redux';
import { updateZone } from '../../actions/zones';
import { ObjectCategoryType } from '../../types/ObjectCategoryType';
import { fetchRecord } from '../../actions/fetchRecord';
import CircularProgressComponent from '../../components/CircularProgressComponent';

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

type CategoryItemType = {
  inputValue?: string;
  title: string;
  links?: Array<LinksItemType> | null;
}

export const LinksSection = ({prev, next}:{ prev?:number, next?:number }) => {
  const params = useParams();
  const navigate = useNavigate();
  
  const { zone } = useSelector( (state:any) => state );
  const dispatch = useDispatch();
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

  const [ categories, setCategories ] = useState<CategoryItemType[]>([]);
  const [ categoriesAutocomplete, setCategoriesAutocomplete ] = useState<ObjectCategoryType[]>([]);
  const [ isFormReady, setIsFormReady ] = useState<boolean>( false );

  useEffect(() => {
    dispatch( updateZone({
      ...zone,
      links: categories
    }) );
  },[ categories ]);
  
  useEffect(() => {
    getLinks();
  },[  ]);

  const findCategoryInArray = (category:string, arrayCategories:ObjectCategoryType[]) => {
    let exists = false;

    arrayCategories.map((item:ObjectCategoryType) => (
      (category === item.title) && (exists = true)
    ));

    return exists;
  }

  const getLinks = async () => {
 
    if( params.zone ) {

      if( Object.keys(zone).length === 0  ) {

        const { zone } = await fetchRecord('zones', params.zone);

        dispatch( updateZone({
            ...zone,
            profileImage: zone?.profileImage?.url
        }));

      }

      const { links } = await fetchRecords( `links/byZone/${ params.zone }` );

      const arrayCategories:any = [];

      links.map((item:any) => {
        if(!findCategoryInArray( item.category.title, arrayCategories )){
          arrayCategories.push( item.category )
        }

      });
  
      setCategoriesAutocomplete( arrayCategories );

      arrayCategories.map((item:any) => {
        const result = links.filter((obj:any) => {
          
          const cat:ObjectCategoryType = obj.category;
          
          return cat._id === item._id
          
        });
        if(result.length > 0) {
          item.links = result;
        }
      });
      
      setIsFormReady( true );
      setCategories( arrayCategories );
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
        <Box key={indexCategory}>
          <Typography sx={{ mb: 1 }} variant="h6"> 
            { itemCategory.title && itemCategory.title }
          </Typography>
          { itemCategory.links?.map( (itemLink:any, indexLink) => (
            
            <Box key={indexLink} sx={{ position: 'relative' }}>
              <SavedLink getLinks={ getLinks } data={ itemLink }/>
            </Box>
            
          ))}
        </Box> 
      ))}
      {
        isFormReady ? (
          <Box sx={{ mt: 2 }}>
            <LinkForm
              getLinks={ getLinks }
              zone={ zone.uid }
              defaultCategories={ categoriesAutocomplete }
              editingMode={ ( categories.length === 0 ) }
              item={ {
                isSaved: false
              } }
            />
          </Box>
        ) : (
          <CircularProgressComponent/>
        )
      }

      <Box sx={{ mt: 8, mb: 4 }}>
          <FormNavigationButtons
              next={ () => navigate( `/zones/edit/${next}/${ zone.uid }` ) }
              prev={ `/zones/edit/${prev}/${ zone.uid }` }
          />
      </Box>
    </Box>
    </>
  );
};
