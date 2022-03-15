import { Box } from "@mui/system";
import { useTheme } from '@mui/material/styles';
import { ColorPaletteImage } from "./ColorPaletteImage";
import { useState, useEffect } from 'react';
import { CurrentPaletteType } from '../types/CurrentPaletteType';
import { CardActionArea, IconButton, Paper, Stack, TextField, Typography, InputAdornment } from '@mui/material';
import { Edit, Check } from '@mui/icons-material';
import Card from '@mui/material/Card';
import { useDispatch, useSelector } from 'react-redux';
import { updateTheme } from '../actions/themes';
import { ChromePicker } from 'react-color';

const boxColorStyles = {
    width: 40,
    height: 40,
    borderRadius: 2,
    cursor: 'pointer'
}

const PaletteComponent = ({arrayRef, item, key}:{arrayRef:any, item:any, key:number}) => {
    const state = useSelector( (state:any) => state );
    const [ editMode, setEditMode ] = useState<boolean>( false );
    const [ colorPickerWindow, setColorPickerWindow ] = useState<any>( false )
    const theme = useTheme();

    const dispatch = useDispatch();

    const [ editingPalette, setEditingPalette ] = useState<CurrentPaletteType>({
        vibrant: '#4664F6',
        lightVibrant: '#F8FAFF',
        darkVibrant: '#010413',
        muted: '#7AE7C7',
        lightMuted: '#CBF6E9',
        darkMuted: '#03110D'
    });

    const [ currentPalette, setCurrentPalette ] = useState<CurrentPaletteType>({
        vibrant: '#4664F6',
        lightVibrant: '#F8FAFF',
        darkVibrant: '#010413',
        muted: '#7AE7C7',
        lightMuted: '#CBF6E9',
        darkMuted: '#03110D'
    });

    const handleEditMode = (key:number) => {
        setEditingPalette( currentPalette );

        if( editMode ) {
            updateThemeColor( key );
        }

        setEditMode( !editMode );
    }

    const updateThemeColor = (index:any) => {
        const reff:any = arrayRef[index];
        reff?.current.updatePalette();
        dispatch( updateTheme({
            ...state.theme,
            ...currentPalette,
            //backgroundImageUrl: largeImageURL
        }));
    }

    const colorInput = ( color:string, name:any ) => (
        <Stack spacing={ 2 } direction="row" alignItems="center">
            <Box
                onClick={ () => setColorPickerWindow( color ) }
                sx={{
                    ...boxColorStyles,
                    backgroundColor: color,
                }}
            />
            <TextField
                fullWidth
                onChange={ (e) => setEditingPalette( (prev:any) => ({ ...prev, [name]: `#${e.target.value.replace('#','')}` })) }
                defaultValue={ color.replace('#','') }
                InputProps={{
                    startAdornment: '#',
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={ () => setCurrentPalette( editingPalette ) }
                            >
                                <Check/>
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

        </Stack>
    )
    return(
        <>
            { colorPickerWindow && (
                <div
                    style={{
                        position: 'absolute',
                        zIndex: '2',
                    }}
                >
                    <div
                        onClick={ () => setColorPickerWindow(false) }
                        style={{
                            position: 'fixed',
                            top: '0px',
                            right: '0px',
                            bottom: '0px',
                            left: '0px',
                        }}
                    />
                    <ChromePicker
                        color={ colorPickerWindow }
                    />
                </div>
            )}
                 
            <Box
                key={ key }
                sx={{
                    position: 'relative'
                }}
            >
                <IconButton
                    onClick={ () => handleEditMode( key ) }
                    sx={{
                        position: 'absolute',
                        right: -10,
                        top: -10,
                        backgroundColor: theme.palette.primary.main
                    }}
                >
                    { editMode ?  <Check/> : <Edit/> }
                </IconButton>
                { editMode ? (
                    <Paper
                        elevation={ 4 }
                        sx={{
                            p: 2
                        }}
                    >
                        <Stack spacing={ 2 }>
                            { colorInput( editingPalette.vibrant, 'vibrant' ) }
                            { colorInput( editingPalette.lightVibrant, 'lightVibrant' ) }
                            { colorInput( editingPalette.darkVibrant, 'darkVibrant' ) }
                            { colorInput( editingPalette.muted, 'muted' ) }
                            { colorInput( editingPalette.lightMuted, 'lightMuted' ) }
                            { colorInput( editingPalette.darkMuted, 'darkMuted' ) }
                        </Stack>
                        

                    </Paper>
                ) : (
                    <Card
                        elevation={ 4 }
                    >
                        <CardActionArea
                            onClick={ () => updateThemeColor( key ) }
                            sx={{
                                p: 1
                            }}
                        >
                            <Typography
                                variant="caption"
                            >
                                { item?.title }
                            </Typography>
                            <Stack direction="row">
                                <Box sx={{
                                    flex: 1
                                }}>
                                    <ColorPaletteImage setCurrentPalette={ setCurrentPalette } ref={ arrayRef[ key ] } src={ item.image }/>
                                </Box>

                            </Stack>
                        </CardActionArea>
                    </Card>
                ) }

            </Box>
        </>

    )
}

export default PaletteComponent;