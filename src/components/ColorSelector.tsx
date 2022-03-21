import { useTheme } from '@mui/material/styles';
import { useState, useEffect, createRef } from 'react';
import { CurrentPaletteType } from '../types/CurrentPaletteType';
import { Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import PaletteComponent, { usePaletteComponent } from "./PaletteComponent";
import StyledButton from '../styled/StyledButton';
import { Add } from '@mui/icons-material';
import { fetchRecords } from '../actions/fetchRecords';

type ColorSelectorProps = {
    imagesToColorsArray: any;
}
const ColorSelector = ({  imagesToColorsArray }:ColorSelectorProps) => {
    const theme = useTheme();
    const [ arrayRef, setArrayRef ] = useState([]);
    const [ newPalette, setNewPalette ] = useState<boolean>( false );
    const { handlePaletteComponent, showPaletteComponent } = usePaletteComponent();
    const [ userPalettes, setUserPalettes ] = useState<any>( [] );
    
    useEffect(() => {

        const arr:any = [];

        imagesToColorsArray.map( ( v:any, i:number ) => (
            arr[i] = createRef()
        ) );

        setArrayRef( arr );

        getPalettes().then()
    },[ ]);

    const getPalettes = async () => {
        const { palettes } = await fetchRecords('palettes');
        setUserPalettes( palettes )

    }

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
                Paletas de colores sugeridas
            </Typography>
            {
                imagesToColorsArray && imagesToColorsArray.map( (item:any, index:number) => (
                    
                    <PaletteComponent
                        handlePaletteComponent={handlePaletteComponent}
                        arrayRef={ arrayRef }
                        item={ item }
                        key={ index }
                    />
                ) )
            }
            <Typography
                sx={{ mt: 2, mb: 1 }}
                variant="caption"
            >
                Mis paletas de colores
            </Typography>
            {
                ( userPalettes.length > 0 ) && userPalettes.map((item:any, index:number) => (
                    <PaletteComponent
                        defaultPalette={ item }
                        arrayRef={ arrayRef }
                        handlePaletteComponent={ handlePaletteComponent }
                        key={ index }
                    />
                )) 
            }
            {
                showPaletteComponent && (
                    <PaletteComponent
                        handlePaletteComponent={ handlePaletteComponent }
                        edit
                        key={0}
                    />
                )
            }
            <StyledButton
                variant="contained"
                color="secondary"
                size="medium"
                startIcon={ <Add/> }
                onClick={ handlePaletteComponent }
            >
                Crear paleta de colores
            </StyledButton>
        </Stack>
    )
}

export default ColorSelector;