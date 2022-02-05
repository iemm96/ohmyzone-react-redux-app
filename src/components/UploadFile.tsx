import React from 'react'
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { IconButton, Typography } from '@mui/material';
import { AddAPhoto, Clear } from '@mui/icons-material';
import { red } from '@mui/material/colors';

//@ts ignore
//import { cloudinary } from 'cloudinary-react';
import axios from 'axios';
import { ColorPaletteImage } from './ColorPaletteImage';
import PaletteType from '../types/PaletteType';
import { postRecord } from '../actions/postRecord';


type UploadFilePropsType = {
    accept?: string;
    title?: string;
    dataUri: any;
    imageSrc: any; 
    onChange: any;
    handleDelete: any;
    setCurrentPalette?: any;
}

const fileToDataUri = (file:any) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        if(event.target) {
            resolve(event.target.result)
        }
    };
    reader.readAsDataURL(file);
})

export const useUploader = ( initialState = null, createTheme = false ) => {
    const [ dataUri, setDataUri ] = React.useState<null | string>(initialState);
    const [ imageSrc, setImageSrc ] = React.useState<null | string>(initialState);
    const [ file, setFile ] = React.useState<any | string>(initialState);


    const uploadToCloudinary = async () => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'tm2ljrm7')

        try{
            //const result = await cloudinary.uploader.upload( file );
            const {data} = await axios.post(
                'https://api.cloudinary.com/v1_1/nucleodev/image/upload',
                formData
            );
            
            setImageSrc( data.secure_url );
            return data.secure_url;
        }catch(e) {
            console.log(e)
        }
        
    }



    const onChange = (file:any) => {
        console.log('changed ')
        if(!file) {
          setDataUri('');
          return;
        }
    
        fileToDataUri(file)
          .then((dataUri:any) => {
            setDataUri(dataUri)
          });
        
          setFile(file);
    }

    const uploadToServer = async () => {
        const formData = new FormData();
        formData.append( 'file', file );

        const { image } = await postRecord('images', formData);
        
        setImageSrc( image.url )
    }

    const handleDelete = async () => {
        setDataUri(null);
        setImageSrc(null);
    }

    return { dataUri, imageSrc, handleDelete, onChange, uploadToCloudinary, file, uploadToServer  }
};


const UploadFile = ({ accept = '.jpg, .jpeg, .png', title, dataUri, imageSrc, onChange, handleDelete }:UploadFilePropsType) => {
    const theme = useTheme();
    const fileInput = React.useRef<HTMLInputElement>(null);
    const ref = React.useRef();
    
    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: 2,
                    borderStyle: 'dashed',
                    height: 'auto',
                    width: 'auto',
                    p: 1
                }}
            >
                <Typography 
                    color="primary"
                    variant="caption"
                >
                    { title ? title : 'Sube tu logo o foto'}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        p: 2,
                    }}
                >
                    <input
                        accept={accept}
                        ref={fileInput}
                        id="input-file"
                        type="file"
                        onChange={(event) => {
                            if(event.target.files) {
                                
                                onChange(event?.target.files[0] || null)
                            }
                        }}
                        hidden
                    />
                    {
                        dataUri ?
                        <Box
                            sx={{
                                position: 'relative'
                            }}
                        >
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    right: -20,
                                    top: -20,
                                    backgroundColor: red[400],
                                    color: 'white'
                                }}
                                size="small"
                                onClick={ handleDelete }
                            >
                                <Clear/>
                            </IconButton>
                            <img
                                style={{
                                    maxWidth: 250
                                }}
                                src={ dataUri }
                                alt="preview"
                            />
                        </Box>
                        :
                        <IconButton
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                color: 'white',
                                p: 2
                            }}
                            onClick={ () => {
                                if(fileInput.current) {
                                    fileInput.current.click();
                                }
                            } }
                        >   
                            <AddAPhoto/>
                        </IconButton>
                    }
                </Box>
                {
                    imageSrc && <ColorPaletteImage ref={ ref } src={ imageSrc }/>
                }
            </Box>       
        </>
    )
}

export default UploadFile;
