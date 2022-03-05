import { useState, useEffect, createRef } from 'react';
import axios from 'axios';
import { Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import ThemeCard from './ThemeCard';
import { Search } from '@mui/icons-material';

type SearchOptions = {
    query: String,
    lang: String,
    imageType: String | 'photo' | 'illustration' | undefined,
    colors: any | undefined,
    category: String | 'backgrounds' | 'fashion' | 'nature' | 'science' | 'education' | 'feelings' | 'health' | 'people' | 'religion' | 'places' | 'animals' | 'industry' | 'computer' | 'food' | 'sports' | 'transportation' | 'travel' | 'buildings' | 'business' | 'music' | undefined,
    perPage: number,
    page: number
}

export const usePixabaySelector = () => {
    const [ pixabayResults, setPixabayResults ] = useState([]);
    const [ totalResults, setTotalResults ] = useState<number>(1);
    const [ arrayRef, setArrayRef ] = useState([]);
    const [ querySearch, setQuerySearch ] = useState<any>( null );
    const [ searchOptions, setSearchOptions] = useState<SearchOptions>({
        query: 'Planeta',
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
            
        }
    }

    return {
        handleSearch,
        handleSearchInputChange,
        pixabayResults,
        arrayRef
    }
}



export const PixabaySelector = ({
    pixabayResults,
    arrayRef,
    handleSearchInputChange,
    handleSearch,
    lockResults
}:{
    pixabayResults:any,
    arrayRef:any, 
    handleSearchInputChange?:any,
    handleSearch?:any,
    lockResults?: boolean,
}) => {

    return(
        <>
            <Grid container>
                <Grid xs={ 12 } item>
                    <TextField
                        fullWidth
                        label="Busca entre miles de temas..."
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
            <Grid sx={{ mt: 2 }} spacing={ 2 } container>
                {
                    pixabayResults.map((value:any, index:number) => {
                        
                        return(
                            <Grid item xs={6} md={3}>
                                <ThemeCard
                                    lockResults={ ( index !== 0 && lockResults ) }
                                    arrayRef={ arrayRef }
                                    largeImageURL={ value.largeImageURL }
                                    urlImage={ value.webformatURL }
                                    darkMode={ false }
                                    index={ index }
                                />
                            </Grid>
                    )})
                }
            </Grid>
        </>

    )
}
