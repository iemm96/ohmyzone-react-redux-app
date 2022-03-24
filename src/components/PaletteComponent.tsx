import { Box } from "@mui/system";
import { useTheme } from '@mui/material/styles';
import { ColorPaletteImage } from "./ColorPaletteImage";
import { useState, useEffect } from 'react';
import { CurrentPaletteType } from '../types/CurrentPaletteType';
import { CardActionArea, IconButton, Paper, Stack, TextField, Typography, InputAdornment } from '@mui/material';
import { Edit, Check, Colorize, Circle, Close, Delete } from '@mui/icons-material';
import Card from '@mui/material/Card';
import { useDispatch, useSelector } from 'react-redux';
import { updateTheme } from '../actions/themes';
import { ChromePicker } from 'react-color';
import StyledButton from "../styled/StyledButton";
import { postRecord } from '../actions/postRecord';
import Button from '@mui/material/Button';
import { Controller, useForm } from 'react-hook-form';
import StyledDarkLightToggleSwitch from '../styled/StyledDarkLightToggleSwitch';
import PaletteColorsPreview from './common/PaletteColorsPreview';
import { useModalDelete, ModalDelete } from './ModalDelete';
import { updateRecord } from '../actions/updateRecord';

const boxColorStyles = {
    width: 40,
    height: 40,
    borderRadius: 2,
    cursor: 'pointer'
}

export const usePaletteComponent = () => {
    const [ mode, setMode ] = useState<'dark' | 'light'>( 'dark' );
    const [ showPaletteComponent, setShowPaletteComponent ] = useState<boolean>( false );
    const { theme } = useSelector( (state:any) => state );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( updateTheme({
            ...theme,
            mode
        }));
    },[ mode ]);

    const handlePaletteComponent = () => {
        setShowPaletteComponent( !showPaletteComponent )
    }
    return {
        mode,
        setMode,
        showPaletteComponent,
        handlePaletteComponent
    }
}

type PaleteComponentType = {
    mode: 'dark' | 'light', 
    setMode: any,
    arrayRef?:any, 
    imageToProcess?:any, 
    key:number, 
    getPalettes:any,
    edit?:boolean,
    defaultPalette?:any,
    enableDelete:boolean,
    handlePaletteComponent:any,
    setNewPalette?:any
}

const PaletteComponent = ({arrayRef, imageToProcess, key, edit, defaultPalette, mode, setMode, getPalettes, enableDelete, handlePaletteComponent, setNewPalette }:PaleteComponentType) => {
    const state = useSelector( (state:any) => state );

    const {
        openModal,
        handleModal,
        handleDelete,
        modalTitle,
        setModalTitle,
        setUid,
        setImageUid,
    } = useModalDelete( 'palettes' );

    const [ editMode, setEditMode ] = useState<boolean>( edit ? edit : false );
    const [ colorPickerWindow, setColorPickerWindow ] = useState<any>( false );
    const { handleSubmit, control, setValue, formState: {errors}, reset } = useForm();
    const theme = useTheme();

    const dispatch = useDispatch();


    const [ editingPalette, setEditingPalette ] = useState<CurrentPaletteType>( defaultPalette ? defaultPalette : {
        vibrant: '#4664F6',
        lightVibrant: '#F8FAFF',
        darkVibrant: '#010413',
        muted: '#7AE7C7',
        lightMuted: '#CBF6E9',
        darkMuted: '#03110D'
    } );

    const [ currentPalette, setCurrentPalette ] = useState<CurrentPaletteType>( defaultPalette ? defaultPalette : {
        vibrant: '#4664F6',
        lightVibrant: '#F8FAFF',
        darkVibrant: '#010413',
        muted: '#7AE7C7',
        lightMuted: '#CBF6E9',
        darkMuted: '#03110D'
    } );

    useEffect(() => {

        if(editingPalette) {
            setValue( 'vibrant', editingPalette.vibrant.replace('#','') );
            setValue( 'lightVibrant', editingPalette.lightVibrant.replace('#','') );
            setValue( 'darkVibrant', editingPalette.darkVibrant.replace('#','') );
            setValue( 'muted', editingPalette.muted.replace('#','') );
            setValue( 'lightMuted', editingPalette.lightMuted.replace('#','') );
            setValue( 'darkMuted', editingPalette.darkMuted.replace('#','') );
            //setCurrentPalette( editingPalette );
        }

        
    },[ editingPalette ]);

    const handleEditMode = (key:number) => {
        handlePaletteComponent()
        setEditMode( !editMode );
    }

    const updateThemeColor = (index:any) => {

        
        if( defaultPalette ) {
            dispatch( updateTheme({
                ...state.theme,
                ...defaultPalette,
            }));
        }else {
            const reff:any = arrayRef[index];
            reff?.current.updatePalette();
        console.log( currentPalette );

            dispatch( updateTheme({
                ...state.theme,
                ...currentPalette,
            }));
        }

    }

    const onSubmit = async (data:any) => {
        console.log('data ',data)

        const paletteData:any = {
            vibrant: `#${ data.vibrant }`,
            lightVibrant:  `#${ data.lightVibrant }`,
            darkVibrant:  `#${ data.darkVibrant }`,
            muted:  `#${ data.muted }`,
            lightMuted:  `#${ data.lightMuted }`,
            darkMuted:  `#${ data.darkMuted }`,
            zone: state.zone.uid,
        }
        //If is predefined palette and defaultPalette is not present create a palette
        if( !enableDelete ) {
            await postRecord( 'palettes', paletteData );
        }

        //If is not predefined palette and defaultPalette is present create a palette
        if( defaultPalette && enableDelete ) {
            await updateRecord( 'palettes', paletteData, defaultPalette.uid );
        }

        getPalettes();
        handleEditMode( key );
    }

    const colorInput = ( name:'darkMuted' | 'vibrant' | 'lightVibrant' | 'darkVibrant' | 'muted' | 'lightMuted',  label:string, show:boolean, color?:string  ) => (
        <>
            <Stack sx={{
                display: show ? 'flex' : 'none'
            }} spacing={ 2 } direction="row" alignItems="center">
                <Button
                    onClick={ () => {
                        if(color) {
                            setColorPickerWindow( color )
                        }else {
                            setColorPickerWindow( '#000000' )
                        }}}
                    sx={{
                        ...boxColorStyles,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    variant="outlined"
                    startIcon={ <Circle sx={{ color }}/> }
                    endIcon={ <Colorize/> }
                />
                <Box
                    sx={{
                        flex: 1,
                        display: show ? 'inline' : 'none'
                    }}
                >
                    <Controller
                        name={ name }
                        control={control}
                        rules={{
                            required: 'Este color es requerido.',
                            maxLength: {
                                message: 'Asegúrate de color un color hex válido',
                                value: 6
                            }
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextField
                                fullWidth
                                label={ label }
                                value={ value }
                                onChange={ (e) => {
                                    onChange(e);
                                    setEditingPalette( (prev:any) => ({ ...prev, [name]: `#${e.target.value.replace('#','')}` }));
                                } }
                                defaultValue={ color && color.replace('#','') }
                                InputProps={{
                                    startAdornment: '#',
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {
                                                ( color !== currentPalette[ name ] ) && (
                                                    <StyledButton
                                                        onClick={ () => {
                                                            setCurrentPalette({
                                                                ...currentPalette,
                                                                [name]: editingPalette[name],
                                                            }) 
                                                            dispatch( updateTheme({
                                                                ...state.theme,
                                                                [name]: editingPalette[name],
                                                            }));
                                                        }}
                                                        variant="contained"
                                                        color="secondary"
                                                        startIcon={ <Check/> }
                                                        size="small"
                                                    >
                                                        Aplicar
                                                    </StyledButton>
                                                )
                                            }
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        )}
                    />
                </Box>
            </Stack>
                { errors[ name ] && <Typography variant="caption" sx={{color:'red'}}>{ errors[name].message }</Typography> }

        </>

    )
    return(
        <>
            <ModalDelete
                openModal={ openModal }
                handleModal={ handleModal }
                handleDelete={ handleDelete }
                modalTitle={ modalTitle }
                getRecords={ getPalettes }
            />
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
                <Stack
                    sx={{
                        position: 'absolute',
                        top: -10,
                        right: -10,
                        zIndex: 2
                    }}
                    direction="row"
                    spacing={ 2 }
                >
                    <IconButton
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            width: 48,
                            height: 20,
                            borderRadius: 2
                        }}
                        onClick={ () => handleEditMode( key ) }
                    >
                        { editMode ?  <Close sx={{ fontSize: 14 }}/> : <Edit  sx={{ fontSize: 14 }}/> }
                    </IconButton>
                    { ( !editMode && enableDelete ) && (
                        <IconButton
                            sx={{
                                backgroundColor: theme.palette.error.main,
                                width: 48,
                                height: 20,
                                borderRadius: 2
                            }}
                            onClick={ () => {
                                setModalTitle( `¿Seguro que deseas eliminar esta paleta de colores?` );
                                setUid( defaultPalette.uid );
                                handleModal();
                            } }
                        >
                            <Delete sx={{ fontSize: 14 }}/>
                        </IconButton>
                    ) }
             
                </Stack>
                { editMode ? (
                    <Paper
                        elevation={ 4 }
                        sx={{
                            p: 2
                        }}
                    >
                            <form id="form-colors" onSubmit={ handleSubmit( onSubmit ) }>
                                <Stack spacing={ 2 }>
                                    <StyledDarkLightToggleSwitch
                                        defaultChecked={ mode === 'dark' }
                                        onChange={ (e) => (
                                            setMode( e.target.checked ? 'dark' : 'light' )
                                        ) }
                                    />
                                    { colorInput( 'vibrant', 'Color de acento', true, editingPalette?.vibrant,   ) }
                                    { colorInput( 'muted', 'Color secundario', true, editingPalette?.muted,   ) }
                                    { colorInput( 'lightVibrant', 'Superficie clara', mode === 'light', editingPalette?.lightVibrant,   ) }
                                    { colorInput( 'lightMuted', 'Fondo claro',  mode === 'light', editingPalette?.lightMuted, ) }
                                    { colorInput( 'darkVibrant', 'Superficie oscura', mode === 'dark', editingPalette?.darkVibrant,  ) }
                                    { colorInput( 'darkMuted', 'Fondo oscuro', mode === 'dark', editingPalette?.darkMuted,   ) }
                            
                                </Stack>
                                <Stack justifyContent="right" sx={{ mt:2 }} spacing={ 2 } direction="row">
                                    <StyledButton
                                        variant="outlined"
                                        size="medium"
                                        onClick={ () => { 
                                            handlePaletteComponent( )
                                            if ( setNewPalette ) {
                                                setNewPalette( false )
                                            }
                                            handleEditMode( key ) 
                                        }}
                                    >
                                        Cancelar
                                    </StyledButton>
                                    <StyledButton
                                        variant="contained"
                                        size="medium"
                                        type="submit"
                                        startIcon={ <Check/> }
                                    >
                                        Guardar
                                    </StyledButton>
                                </Stack>
                            </form>
     
                        
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
                                { imageToProcess?.title }
                            </Typography>
                            <Stack direction="row">
                                <Box sx={{
                                    flex: 1
                                }}>
                                    {
                                        defaultPalette && (
                                            <PaletteColorsPreview data={ defaultPalette }/>
                                        )
                                    }
                                    {
                                        imageToProcess?.image && (
                                            <ColorPaletteImage setCurrentPalette={ setCurrentPalette } ref={ arrayRef[ key ] } src={ imageToProcess.image }/>
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