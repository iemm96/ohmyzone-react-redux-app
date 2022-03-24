import { useState, useEffect, createRef } from 'react';
import axios from 'axios';
import { Grid, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import ThemeCard from './ThemeCard';
import { ChevronLeft, Search, ChevronRight } from '@mui/icons-material';
import StyledButton from '../styled/StyledButton';
import CircularProgressComponent from './CircularProgressComponent';

type SearchOptions = {
    query: String,
    lang: String,
    imageType: String | 'photo' | 'illustration' | undefined,
    colors: any | undefined,
    category: String | 'backgrounds' | 'fashion' | 'nature' | 'science' | 'education' | 'feelings' | 'health' | 'people' | 'religion' | 'places' | 'animals' | 'industry' | 'computer' | 'food' | 'sports' | 'transportation' | 'travel' | 'buildings' | 'business' | 'music' | undefined,
    perPage: number,
    page: number
}
const ___DEFAULT_QUERY_SEARCH__ = 'primavera';


export const usePixabaySelector = () => {
    const [ pixabayResults, setPixabayResults ] = useState([]);
    const [ totalResults, setTotalResults ] = useState<number>(1);
    const [ arrayRef, setArrayRef ] = useState([]);
    const [ querySearch, setQuerySearch ] = useState<any>( null );
    const [ loadingResults, setLoadingResults ] = useState<boolean>( false );
    const [ searchOptions, setSearchOptions ] = useState<SearchOptions>({
        query: ___DEFAULT_QUERY_SEARCH__,
        lang: 'es',
        imageType: undefined,
        colors: '',
        category: undefined,
        perPage: 16,
        page: 1
    });

    const pixabay_api = "https://pixabay.com/api/?key=25105059-4d7ff3f9a607aabea05e93997";

    useEffect(() => {
        retrievePixabayImages();
    }, [ searchOptions ]);

    const handleSearchInputChange = ( e:any ) => {
        setQuerySearch( e.target.value );
    }
    
    const handleSearch = () => {
        setSearchOptions({
            ...searchOptions,
            query: querySearch
        });
    }

    const retrievePixabayImages = async () => {
        setLoadingResults( true );
        setPixabayResults([]);

        const fullPath = `${ pixabay_api }${searchOptions.lang && '&lang=' + searchOptions.lang}${searchOptions.query && '&q=' + searchOptions.query}${searchOptions.colors !== undefined && searchOptions.colors !== false && '&colors=' + searchOptions.colors}${searchOptions.category !== undefined && '&category=' + searchOptions.category}${searchOptions.imageType !== undefined && '&image_type=' + searchOptions.imageType}${searchOptions.perPage && '&per_page=' + searchOptions.perPage}${searchOptions.page && '&page=' + searchOptions.page}`

        const result = await axios.get(fullPath);

        if(result) {
            const arr:any = [];
            result.data.hits.map((v:any,i:any) => (
                arr[i] = createRef()
            ));

            setTotalResults(Math.round(result.data.totalHits/searchOptions.perPage))
            setArrayRef(arr)
            setPixabayResults(result.data.hits);
            setLoadingResults( false );
        }
    }

    return {
        searchOptions,
        loadingResults,
        handleSearch,
        setSearchOptions,
        handleSearchInputChange,
        pixabayResults,
        arrayRef
    }
}



export const PixabaySelector = ({
    searchOptions,
    loadingResults,
    pixabayResults,
    arrayRef,
    handleSearchInputChange,
    handleSearch,
    setSearchOptions,
    isPremium,
    fullForm
}:{
    searchOptions:any,
    loadingResults: boolean,
    setSearchOptions: any,
    pixabayResults:any,
    arrayRef:any, 
    handleSearchInputChange?:any,
    handleSearch?:any,
    isPremium?: boolean,
    fullForm?: boolean
}) => {

    console.log( fullForm )
    return(
        <>
            <Grid container>
                <Grid xs={ 12 } item>
                    <TextField
                        fullWidth
                        label="Busca entre miles de temas..."
                        defaultValue={ ___DEFAULT_QUERY_SEARCH__ }
                        onChange={ handleSearchInputChange }
                        placeholder="Naturaleza, paisajes, animales, negocios..."
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={ handleSearch }
                                    >
                                        <Search/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>
            {
                loadingResults ? <CircularProgressComponent/> : (
                    <Grid sx={{ mt: 2 }} spacing={ 2 } container>
                        {
                            pixabayResults.map((value:any, index:number) => {
                                
                                return(
                                    <Grid item xs={6} md={3}>
                                        <ThemeCard
                                            isPremium={ (( index > 3 ) && isPremium ) }
                                            arrayRef={ arrayRef }
                                            largeImageURL={ value.largeImageURL }
                                            urlImage={ value.previewURL }
                                            darkMode={ false }
                                            index={ index }
                                        />
                                    </Grid>
                            )})
                        }
                    </Grid>
                )
            }
            
            {
                fullForm && (
                    <Stack sx={{ mt: 3, mb: 4 }} justifyContent="center" spacing={ 2 } direction="row">
                        {
                            ( searchOptions.page > 1 ) && (
                                <StyledButton
                                    onClick={ () => setSearchOptions({
                                        ...searchOptions,
                                        page: searchOptions.page - 1
                                    }) }
                                    color="secondary"
                                    variant="contained"
                                    size="medium"
                                    startIcon={ <ChevronLeft/> }
                                >
                                    Página anterior
                                </StyledButton>
                            )
                        }
                        
                        <StyledButton
                            onClick={ () => setSearchOptions({
                                ...searchOptions,
                                page: searchOptions.page + 1
                            }) }
                            variant="contained"
                            size="medium"
                            color="secondary"
                            endIcon={ <ChevronRight/> }
                        >
                            Página siguiente
                        </StyledButton>
                    </Stack>
                )
            }
        </>

    )
}
