import { Box } from "@mui/system";
import { useTheme } from '@mui/material/styles';
import { ColorPaletteImage } from "./ColorPaletteImage";
import { useState, useEffect, createRef } from 'react';
import { CurrentPaletteType } from '../types/CurrentPaletteType';
import { CardActionArea, IconButton, Paper, Stack, Typography } from '@mui/material';
import { Edit } from "@mui/icons-material";
import Card from '@mui/material/Card';
import { useDispatch } from 'react-redux';
import { updateTheme } from '../actions/themes';
import PaletteComponent from "./PaletteComponent";

type ColorSelectorProps = {
    imagesToColorsArray: any;
}
const ColorSelector = ({  imagesToColorsArray }:ColorSelectorProps) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [ arrayRef, setArrayRef ] = useState([]);

    const [currentPalette, setCurrentPalette] = useState<CurrentPaletteType>({
        vibrant: '#4664F6',
        lightVibrant: '#F8FAFF',
        darkVibrant: '#010413',
        muted: '#7AE7C7',
        lightMuted: '#CBF6E9',
        darkMuted: '#03110D'
    });

    useEffect(() => {

        const arr:any = [];

        imagesToColorsArray.map( ( v:any, i:number ) => (
            arr[i] = createRef()
        ) );

        setArrayRef( arr );

    },[ ]);

    return(
        <Stack
            sx={{
                borderRadius: 2,
                border: `1px solid ${ theme.palette.primary.main }`,
                p: 2
            }}
            spacing={ 2 }
        >
            <Typography
                variant="caption"
            >
                Colores
            </Typography>
            {
                imagesToColorsArray && imagesToColorsArray.map( (item:any, index:number) => (
                    
                    <PaletteComponent
                        arrayRef={ arrayRef }
                        item={ item }
                        key={ index }
                    />
                ) )
            }
        </Stack>
    )
}

export default ColorSelector;