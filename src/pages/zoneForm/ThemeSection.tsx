import { Container, Paper, useTheme, Typography } from '@mui/material';

import { PixabaySelector, usePixabaySelector } from '../../components/PixabaySelector';
import { useState, useEffect, useRef } from 'react';

import FormNavigationButtons from '../../components/FormNavigationButtons';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRecord } from '../../actions/fetchRecord';
import { updateZone } from '../../actions/zones';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { postRecord } from '../../actions/postRecord';
import { updateRecord } from '../../actions/updateRecord';
import { fetchFile } from '../../actions/fetchFile';

import Premium from '../../assets/icons/premium.svg';
import CustomThemeCreator from '../../components/CustomThemeCreator';
import ThemesList from '../../components/ThemesList';
import { useFormNavigationButtons } from '../../components/FormNavigationButtons';
import { showPreviewButton } from '../../actions/ui';

const ThemeSection = ({ prev, next, fullForm }:{ prev?:number, next?:number, fullForm?:boolean }) => {
    const params = useParams();
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const state = useSelector( (state:any) => state );
    const theme = useTheme();


    const ref = useRef<any>(null);

    const { buttonSaveProperties, setButtonSaveProperties } = useFormNavigationButtons();

    const { arrayRef, pixabayResults, handleSearch, handleSearchInputChange, searchOptions, setSearchOptions, loadingResults } = usePixabaySelector();
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ themeMode, setThemeMode ] = useState<string>( fullForm ? 'myThemes' : 'search' );

    const [ currentThemeState, setCurrentThemeState ] = useState<any>( null );

    useEffect(() => {
        
        dispatch( 
            showPreviewButton( true )
        );

        setCurrentThemeState( state.theme );

        if( Object.keys(state.zone).length === 0 ) {
            getZone();
        }

        if( fullForm ) {
            setButtonSaveProperties((prev:any) => ({
                ...prev,
                text: 'Guardar cambios',
                isVisible: false,
            }));
        }

    },[ ]);

    useEffect(() => {
        //Detects if the state theme changes and shows the button
        if( state.theme !== currentThemeState ) {
            setButtonSaveProperties((prev:any) => ({
                ...prev,
                isVisible: true,
            }))
        }
    },[ state.theme ])

    const handleChangeMode = (
      event: React.MouseEvent<HTMLElement>,
      newMode: string,
    ) => {
        console.log( event );
        const premiumFeature:string = "createTheme";

        if( !state.zone?.premiumFeatures ) {
            dispatch( updateZone({
                ...state.zone,
                premiumFeatures: []  
            }) )
        }

        if( newMode === "create" ) {

            if( !state.zone?.premiumFeatures.find((e:any) => {
                return e === premiumFeature
            })) {
                dispatch( updateZone({
                    ...state.zone,
                    premiumFeatures: [ ...state.zone.premiumFeatures, premiumFeature ]  
                }) )
                
            }
            
           
        } else {
            const index:number = state.zone?.premiumFeatures.indexOf( premiumFeature )
            if( index !== -1 ) {
                state.zone?.premiumFeatures.splice( index, 1 );

                dispatch( updateZone({
                    ...state.zone,
                    premiumFeatures: state.zone?.premiumFeatures 
                }) )
                
            }
        }
        setThemeMode( newMode );
    };

    const getZone = async () => {
        if(params.zone) {
            const { zone } = await fetchRecord('zones', params.zone);
            dispatch( updateZone({
                ...zone,
                profileImage: zone?.profileImage?.url
            }))
        }
    }

    const submitTheme = async () => {
        const theme = state.theme;
        setButtonSaveProperties((prev:any) => ({
            ...prev,
            text: 'Guardando cambios',
            isDisabled: true,
            isLoading: true
        }));

        //Saves palette
        const { palette } = await postRecord( 'palettes', {
            ...theme,
            backgroundImageUrl: null,
            zone: state.zone.uid
        } );

        let image:any = null;
        const formData = new FormData();

        if( themeMode === 'search' ) {
            //fetch image from pixabay
            const imageDownloaded:any = await fetchFile( state.theme.backgroundImageUrl );
            formData.append( 'file', imageDownloaded );
            formData.append( 'folderName', `${ state.zone.username }/themes` );
            formData.append( 'zone', state.zone.uid );
        
            //Save image to cloudinary
            const result = await postRecord( 'images', formData );
            image = result.image;
            
        } else {
            image = await ref.current.uploadImageToServer(); //Upload pixabay image to server
        }

        if( palette ) {
            const { theme } = await postRecord( 'themes', {
                palette: palette.uid,
                backgroundImage: image.uid,
                zone: state.zone.uid,
                user: state.auth.uid
            } );

            if( theme ) {
                const { zoneResult } = await updateRecord( 'zones', {
                    theme: theme.uid
                }, state.zone.uid );

                dispatch( updateZone({
                    ...state.zone,
                    zoneResult
                }) );
                

                if( !fullForm ) {
                    setLoading( false );
                    navigate( `/zones/edit/${ next }/${ state.zone.uid }` );
                }else {
                    
                    setButtonSaveProperties((prev:any) => ({
                        ...prev,
                        text: 'Cambios guardados correctamente',
                        isDisabled: true,
                        isLoading: false,
                        color: 'success'
                    }));

                    setTimeout(() => {
                        setButtonSaveProperties((prev:any) => ({
                            ...prev,
                            text: 'Guardar cambios',
                            isDisabled: false,
                            isLoading: false,
                            isVisible: false,
                            color: 'primary',
                        }));
                    },4500);
                }
            }
            
        }

    }

    return(
        <>
            <Paper
                sx={{
                    pt: 2,
                    mt: 4,
                    backgroundColor: theme.palette.background.paper,
                    height: '100%',
                    borderRadius: '16px 16px 0 0',
                    position:'relative',                
                }}
                elevation={ 2 }
            >
                <Container maxWidth="md">
                    <Box
                        sx={{
                            mb: 4
                        }}
                    >
                        <ToggleButtonGroup
                            color="primary"
                            value={ themeMode }
                            exclusive
                            onChange={ handleChangeMode }
                            fullWidth
                        >
                            {
                                fullForm && (
                                    <ToggleButton
                                        sx={{
                                            textTransform: 'none'
                                        }}
                                        value="myThemes"
                                    >
                                        Mis temas
                                    </ToggleButton>
                                )
                            }
                            <ToggleButton
                                sx={{
                                    textTransform: 'none'
                                }}
                                value="search"
                            >
                                Buscar temas
                            </ToggleButton>
                            <ToggleButton
                                sx={{
                                    textTransform: 'none'
                                }}
                                
                                value="create"
                            >
                                Crear mi tema <img src={ Premium } style={{ width: 12, marginLeft: 4 }} alt="img-icon" />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                    {
                        themeMode === 'myThemes' && (
                            <ThemesList ref={ref}/>
                        )
                    }
                    {
                        themeMode === 'search' && (
                            <Box>
                                <PixabaySelector
                                    handleSearchInputChange={ handleSearchInputChange }
                                    handleSearch={ handleSearch }
                                    pixabayResults={ pixabayResults }
                                    arrayRef={ arrayRef }
                                    setSearchOptions={ setSearchOptions }
                                    searchOptions={ searchOptions }
                                    loadingResults={ loadingResults }
                                    fullForm={ fullForm }
                                    isPremium
                                />
                                {
                                    !fullForm && (
                                        <Typography align="center" sx={{ mt: 2, color: theme.palette.text.secondary  }} variant="caption">
                                            ¿No encuentras un tema de tu agrado? podrás personalizarlo más adelante...
                                        </Typography>
                                    )
                                }
                                
                            </Box>
                        ) 
                    }
                    {
                        themeMode === 'create' && (
                            <CustomThemeCreator ref={ref}/>
                        )
                    }
                    <Box sx={{
                        mt: 4,
                        mb: fullForm ? 10 : 4,
                    }}>
                        {
                            <FormNavigationButtons
                                prev={ `/zones/edit/${prev}/${ state.zone.uid }` }
                                next={ submitTheme }
                                loading={ loading }
                                fullForm={ fullForm }
                                buttonSaveProperties={ buttonSaveProperties }
                            />

                        }
                        
                    </Box>
                </Container>
                
            </Paper>
        </>
        
    )
}

export default ThemeSection;