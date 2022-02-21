import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import {ColorPaletteImage} from "./ColorPaletteImage";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateZone } from '../actions/zones';


type CurrentPaletteType = {
    vibrant: string,
    lightVibrant: string,
    darkVibrant: string,
    muted: string,
    lightMuted: string,
    darkMuted: string
}


const ThemeCard = ({ arrayRef, urlImage, darkMode, index, setImage, largeImageURL }:{ largeImageURL:string, arrayRef:any, urlImage:string, darkMode:boolean, index:number, setImage:any }) => {
    const { zone } = useSelector( (state:any) => state );
    const dispatch = useDispatch();

    const [currentPalette,setCurrentPalette] = useState<CurrentPaletteType>({
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
        dispatch( updateZone(
            {
                ...zone,
                backgroundImage: largeImageURL
            }
        ) )
        setImage( largeImageURL );
    }

    return(

        <Card sx={{ maxWidth: 345, borderRadius: 4, backgroundColor: darkMode ? currentPalette.lightVibrant : currentPalette.darkVibrant }} key={index}>
            <CardActionArea onClick={() => {
                    updateThemeColor(index);
                    
                }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={ urlImage }
                    alt="image-alt"
                />
                <ColorPaletteImage setCurrentPalette={ setCurrentPalette } darkMode={darkMode} ref={arrayRef[index]} src={ urlImage }/>    
            </CardActionArea>
        </Card>
    )
}

export default ThemeCard;