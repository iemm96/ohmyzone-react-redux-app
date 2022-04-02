import { useTheme } from '@mui/material/styles';
import { useState, useEffect, createRef } from 'react';
import { Stack, Typography } from '@mui/material';
import PaletteComponent, { usePaletteComponent } from "./PaletteComponent";
import StyledButton from '../styled/StyledButton';
import { Add } from '@mui/icons-material';
import { fetchRecords } from '../actions/fetchRecords';

type ColorSelectorProps = {
    imagesToColorsArray: any;
    zone: string;
}
const ColorSelector = ({  imagesToColorsArray, zone }:ColorSelectorProps) => {
    const theme = useTheme();
    const [ arrayRef, setArrayRef ] = useState([]);
    const [ newPalette, setNewPalette ] = useState<boolean>( false );
    const { showPaletteComponent, handlePaletteComponent, mode, setMode } = usePaletteComponent();
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
        const { palettes } = await fetchRecords( `palettes/byZone/${ zone }` );
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
                imagesToColorsArray && imagesToColorsArray.map( (image:any, index:number) => (
                    
                    <PaletteComponent
                        mode={ mode }
                        setMode={ setMode }
                        arrayRef={ arrayRef }
                        imageToProcess={ image }
                        getPalettes={ getPalettes }
                        key={ index }
                        enableDelete={ false }
                        handlePaletteComponent={ handlePaletteComponent }
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
                        mode={ mode }
                        setMode={ setMode }
                        defaultPalette={ item }
                        arrayRef={ arrayRef }
                        key={ index }
                        getPalettes={ getPalettes }
                        setNewPalette={ setNewPalette }
                        enableDelete
                        handlePaletteComponent={ handlePaletteComponent }
                    />
                )) 
            }
            {
                newPalette && (
                    <PaletteComponent
                        mode={ mode }
                        setMode={ setMode }
                        key={0}
                        edit
                        getPalettes={ getPalettes }
                        enableDelete
                        handlePaletteComponent={ handlePaletteComponent }
                        setNewPalette={ setNewPalette }
                    />
                ) 
            }
            {
                !showPaletteComponent && (
                    <StyledButton
                        variant="contained"
                        color="secondary"
                        size="medium"
                        startIcon={ <Add/> }
                        onClick={ () => { 
                            handlePaletteComponent()
                            setNewPalette( true ) 
                        } }
                    >
                        Crear paleta de colores
                    </StyledButton>
                )
            }

        </Stack>
    )
}

export default ColorSelector;