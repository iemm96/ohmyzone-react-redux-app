import { Box } from "@mui/system";
import { useEffect, useState } from 'react';
import { fetchRecords } from '../actions/fetchRecords';
import { useSelector } from 'react-redux';
import ThemeCard from "./ThemeCard";
import { Grid } from '@mui/material';

const ThemesList = ({ref}:{ref:any}) => {
    const { zone } = useSelector( (state:any) => state );
    const [ themes, setThemes ] = useState<any>( [] );

    useEffect(() => {
        getThemes().then();
    },[]);
    
    const getThemes = async () => {
        const { themes } = await fetchRecords( `themes/byZone/${ zone.uid }`  );
        console.log( themes );
        setThemes( themes );
    }

    return(
        <Grid spacing={ 2 } container>
            {
                themes.map( (theme:any, index:number) => (
                    <Grid xs={ 3 } item>
                        <ThemeCard
                            largeImageURL={ theme?.backgroundImage?.url }
                            arrayRef={ [ ] }
                            urlImage={ theme?.backgroundImage?.url }
                            darkMode={ false }
                            index={ index }
                            defaultPalette={ theme.palette }
                        />
                    </Grid>
                    
                ) )
            }
        </Grid>
    )
}

export default ThemesList;