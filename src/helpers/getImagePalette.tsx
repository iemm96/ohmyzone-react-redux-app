import { usePalette } from 'react-palette'


const GetImagePalette = (IMAGE_URL:string) => {
    const { data, loading, error } = usePalette(IMAGE_URL)

    return(
        <>
        <h1>holi</h1>
        </>
    )
}

export default GetImagePalette
