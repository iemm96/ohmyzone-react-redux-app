import Box from '@mui/material/Box';
import ColorSelector from './ColorSelector';
import { UploadFile, useUploader } from './UploadFile';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchRecord } from '../actions/fetchRecord';
const CustomThemeCreator = () => {
    const { theme, zone } = useSelector( ( state:any ) => state );
    const { dataUri, onChange, handleDelete, imageSrc, uploadToServer, openModal, handleModal, getCropData, setCropper, temporalDataUri, setDataUri } = useUploader( true );
    
    const [ imagesToColorsArray, setImagesToColorsArray ] = useState<any>([]);
    useEffect(() => {
        getZone();
    },[]);

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
                useCropper
                handleModal={ handleModal }
                setCropper={ setCropper }
                getCropData={ getCropData }
                temporalDataUri={ temporalDataUri }
                openModal={ openModal }
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
}

export default CustomThemeCreator;