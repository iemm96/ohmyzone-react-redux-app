import { Box } from "@mui/system";
import { useTheme } from '@mui/material/styles';
import { ColorPaletteImage } from "./ColorPaletteImage";
import { useState } from 'react';
import { CurrentPaletteType } from '../types/CurrentPaletteType';
import { CardActionArea, IconButton, Paper, Stack, TextField, Typography, InputAdornment } from '@mui/material';
import { Edit, Check } from '@mui/icons-material';
import Card from '@mui/material/Card';
import { useDispatch, useSelector } from 'react-redux';
import { updateTheme } from '../actions/themes';
import { ChromePicker } from 'react-color';
import StyledButton from "../styled/StyledButton";
import { postRecord } from '../actions/postRecord';

const boxColorStyles = {
    width: 40,
    height: 40,
    borderRadius: 2,
    cursor: 'pointer'
}

export const usePaletteComponent = () => {
    const [ showPaletteComponent, setShowPaletteComponent ] = useState<boolean>( false );

    const handlePaletteComponent = () => {
        setShowPaletteComponent( !showPaletteComponent )
    }
    return {
        showPaletteComponent,
        handlePaletteComponent
    }
}

type PaleteComponentType = {
    arrayRef?:any, 
    item?:any, 
    key:number, 
    edit?:boolean,
    handlePaletteComponent:any,
    defaultPalette?:any
}

const PaletteComponent = ({arrayRef, item, key, edit, defaultPalette, handlePaletteComponent}:PaleteComponentType) => {
    const state = useSelector( (state:any) => state );
    const [ editMode, setEditMode ] = useState<boolean>( edit ? edit : false );
    const [ colorPickerWindow, setColorPickerWindow ] = useState<any>( false )
    const theme = useTheme();

    const dispatch = useDispatch();

    const [ editingPalette, setEditingPalette ] = useState<CurrentPaletteType | null >( defaultPalette ? defaultPalette : {
        vibrant: '#4664F6',
        lightVibrant: '#F8FAFF',
        darkVibrant: '#010413',
        muted: '#7AE7C7',
        lightMuted: '#CBF6E9',
        darkMuted: '#03110D'
    } );

    const [ currentPalette, setCurrentPalette ] = useState<CurrentPaletteType | null>( !edit ? {
        vibrant: '#4664F6',
        lightVibrant: '#F8FAFF',
        darkVibrant: '#010413',
        muted: '#7AE7C7',
        lightMuted: '#CBF6E9',
        darkMuted: '#03110D'
    } : null );

    const handleEditMode = (key:number) => {
        setEditingPalette( currentPalette );

        if( editMode ) {
            updateThemeColor( key );
        }

        setEditMode( !editMode );
    }

    const updateThemeColor = (index:any) => {

        if( defaultPalette ) {
            dispatch( updateTheme({
                ...state.theme,
                ...editingPalette,
            }));
        }else {
            const reff:any = arrayRef[index];
            reff?.current.updatePalette();
            dispatch( updateTheme({
                ...state.theme,
                ...currentPalette,
            }));
        }

    }

    const handleSubmit = async () => {
        await postRecord( 'palettes', {
            ...currentPalette,
            zone: state.zone.uid,
        } );

    }

    const colorInput = ( name:any, label:string, color?:string ) => (
        <Stack spacing={ 2 } direction="row" alignItems="center">
            <Box
                onClick={ () => color && setColorPickerWindow( color ) }
                sx={{
                    ...boxColorStyles,
                    backgroundColor: color,
                }}
            />
            <TextField
                fullWidth
                label={ label }
                onChange={ (e) => setEditingPalette( (prev:any) => ({ ...prev, [name]: `#${e.target.value.replace('#','')}` })) }
                defaultValue={ color && color.replace('#','') }
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
                            { colorInput( 'vibrant', 'Color de acento', editingPalette?.vibrant  ) }
                            { colorInput( 'lightVibrant', 'Color secundario',editingPalette?.lightVibrant  ) }
                            { colorInput( 'darkVibrant', 'Fondo oscuro', editingPalette?.darkVibrant  ) }
                            { colorInput( 'muted', 'Fondo oscuro', editingPalette?.muted  ) }
                            { colorInput( 'lightMuted', 'Fondo claro', editingPalette?.lightMuted  ) }
                            { colorInput( 'darkMuted', '',editingPalette?.darkMuted  ) }
                        </Stack>
                        <Stack sx={{ mt:2 }} spacing={ 2 } direction="row">
                            <StyledButton
                                variant="outlined"
                                size="medium"
                                onClick={ () => handleEditMode( key ) }
                            >
                                Cancelar
                            </StyledButton>
                            <StyledButton
                                variant="contained"
                                size="medium"
                                onClick={ handleSubmit }
                                startIcon={ <Check/> }
                            >
                                Guardar
                            </StyledButton>
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
                                    {
                                        defaultPalette && (
                                            <Box sx={{padding: '1rem 0'}} display="flex" justifyContent="space-evenly">
                <Box sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: defaultPalette.vibrant
                }}/>
                <Box sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: defaultPalette.muted
                }}/>
                <Box sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: defaultPalette.lightMuted
                }}/>
                <Box sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: defaultPalette.darkVibrant
                }}/>
                <Box sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: defaultPalette.lightVibrant
                }}/>
                <Box sx={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: defaultPalette.darkMuted
                }}/>
            </Box>
                                        )
                                    }
                                    {
                                        item?.image && (
                                            <ColorPaletteImage setCurrentPalette={ setCurrentPalette } ref={ arrayRef[ key ] } src={ item.image }/>
                                        )
                                    }
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