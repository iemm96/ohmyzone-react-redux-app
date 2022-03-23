import Box from '@mui/material/Box';
import ColorSelector from './ColorSelector';
import { UploadFile, useUploader } from './UploadFile';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecord } from '../actions/fetchRecord';
import { updateTheme } from '../actions/themes';

const CustomThemeCreator = forwardRef((props:any,ref:any) => {
    const { theme, zone } = useSelector( ( state:any ) => state );
    const dispatch = useDispatch();
    const { dataUri, onChange, handleDelete, imageSrc, uploadToServer, openModal, handleModal, getCropData, setCropper, temporalDataUri, setDataUri } = useUploader();
    
    const [ imagesToColorsArray, setImagesToColorsArray ] = useState<any>([]);

    useEffect(() => {

        dispatch( updateTheme({
            ...theme,
            backgroundImageUrl: dataUri
        }) );

    },[dataUri]);

    useEffect(() => {
        getZone();
    },[]);

    useImperativeHandle(ref,() => ({
        uploadImageToServer: () => {
            return uploadToServer( zone.uid, `${ zone.username }/themes` )
            
            /*
            if( 
                data

            ) {
                dispatch( updateTheme({
                    ...data,
                    backgroundImageUrl: props.src
                }
                    ) );
            }*/

    
        }})
    );

    const getZone = async ( ) => {
        const zoneResult = await fetchRecord( 'zones', zone.uid );
        if( zoneResult.zone?.profileImage?.url ) {
            setImagesToColorsArray((prev:any) => [
                ...prev,
                {
                    title: 'Colores de tu imagen de perfil',
                    image: zoneResult.zone.profileImage.url
                }
            ])
        }
    }

    useEffect(() => {
        if( dataUri ) {
            setImagesToColorsArray((prev:any) => [
                ...prev,
                {
                    title: 'Colores del fondo que subiste',
                    image: dataUri
                }
            ])
        }
    },[ dataUri ])

    return(
        <Box>
            <UploadFile
                dataUri={ dataUri } 
                onChange={ onChange }
                handleDelete={ handleDelete }
                title="Sube una imagen de fondo"
                height={ 200 }
            />
            <Box
                sx={{
                    mt: 2
                }}
            >
                <ColorSelector imagesToColorsArray={ imagesToColorsArray }/>
            </Box>
        </Box>
    )
})

export default CustomThemeCreator;