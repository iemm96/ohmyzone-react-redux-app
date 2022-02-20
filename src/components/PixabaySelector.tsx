import { useState, useEffect, createRef } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import ThemeCard from './ThemeCard';

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
    const [ searchOptions, setSearchOptions] = useState<SearchOptions>({
        query: 'Textura',
        lang: 'es',
        imageType: undefined,
        colors: '',
        category: undefined,
        perPage: 12,
        page: 1
    });

    const pixabay_api = "https://pixabay.com/api/?key=25105059-4d7ff3f9a607aabea05e93997";

    useEffect(() => {
        retrievePixabayImages();
    }, [searchOptions]);

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
        pixabayResults,
        arrayRef
    }
}

export const PixabaySelector = ({
    pixabayResults,
    arrayRef,
    setImage
}:{
    pixabayResults:any,
    arrayRef:any,
    setImage:any
}) => {

    return(
        <Grid spacing={ 2 } container>
            {
                pixabayResults.map((value:any,index:number) => {
                    console.log(value)
                    return(
                
                    <Grid item xs={6} md={3}>
                        <ThemeCard
                            arrayRef={ arrayRef }
                            largeImageURL={ value.largeImageURL }
                            urlImage={ value.webformatURL }
                            darkMode={ false }
                            index={ index }
                            setImage={ setImage }
                        />
                    </Grid>
                
                )})
        }
            
        </Grid>
    )
}
