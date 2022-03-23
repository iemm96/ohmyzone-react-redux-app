import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import {ColorPaletteImage} from "./ColorPaletteImage";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Premium from '../assets/icons/premium.svg';
import Box from '@mui/material/Box';
import { updateTheme } from '../actions/themes';
import { CurrentPaletteType } from '../types/CurrentPaletteType';
import { updateZone } from '../actions/zones';
import PaletteColorsPreview from './common/PaletteColorsPreview';




const ThemeCard = ({ arrayRef, urlImage, darkMode, index, largeImageURL, isPremium, defaultPalette }:{ largeImageURL:string, arrayRef:any, urlImage:string, darkMode:boolean, index:number, isPremium?:boolean, defaultPalette?:any }) => {
    const { zone } = useSelector( (state:any) => state );
    const dispatch = useDispatch();

    const [currentPalette, setCurrentPalette] = useState<CurrentPaletteType>({
        vibrant: '#4664F6',
        lightVibrant: '#F8FAFF',
        darkVibrant: '#010413',
        muted: '#7AE7C7',
        lightMuted: '#CBF6E9',
        darkMuted: '#03110D'
    });

    const updateThemeColor = (index:any) => {
        const reff:any = arrayRef[index];
        reff?.current.updatePalette();
        const premiumFeature = "selectedTheme";

        if( isPremium ) {
            if( zone?.premiumFeatures ) {
                if(!zone?.premiumFeatures.find((e:any) => {
                    return e === premiumFeature
                })) {
                    dispatch( updateZone({
                        ...zone,
                        premiumFeatures: [ ...zone?.premiumFeatures, premiumFeature ]  
                    }) )
                    
                }
            }else {
                dispatch( updateZone({
                    ...zone,
                    premiumFeatures: [ premiumFeature ]  
                }) )
            }
            
           
        }else {

            if( zone?.premiumFeatures ){
                const index:number = zone?.premiumFeatures.indexOf( premiumFeature )
                if( index !== -1 ) {
                    zone?.premiumFeatures.splice( index, 1 );
    
                    dispatch( updateZone({
                        ...zone,
                        premiumFeatures: zone?.premiumFeatures 
                    }) )
                    
                }
            }else{
                dispatch( updateZone({
                    ...zone,
                    premiumFeatures: [] 
                }) )
            }
            
        }

        dispatch( updateTheme({
            ...currentPalette,
            backgroundImageUrl: largeImageURL
        }));
    }

    return(

        <Card sx={{ maxWidth: 345, borderRadius: 4, backgroundColor: darkMode ? currentPalette.lightVibrant : currentPalette.darkVibrant }} key={index}>
            <CardActionArea 
                onClick={() => {
                    updateThemeColor(index);
                }}
            >
                {
                    isPremium && (
                        <Box sx={{
                            position: 'absolute',
                            zIndex: 10,
                            top: 4,
                            right: 4,
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            borderRadius: 4,
                            px: 1.5,
                        }}>
                           <img src={ Premium } style={{ width: 16 }} alt="img-icon" />
                        </Box>
                    )
                }
                <CardMedia
                    component="img"
                    height="140"
                    image={ urlImage }
                    alt="image-alt"
                />
                {
                    defaultPalette ?
                    <PaletteColorsPreview data={ defaultPalette }/>
                    :
                    <ColorPaletteImage setCurrentPalette={ setCurrentPalette } darkMode={darkMode} ref={arrayRef[index]} src={ urlImage } isPremium={ isPremium }/>    
                }
            </CardActionArea>
        </Card>
    )
}

export default ThemeCard;