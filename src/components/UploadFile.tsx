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


type UploadFilePropsType = {
    accept: string;
    title?: string;
}

const fileToDataUri = (file:any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        if(event.target) {
            resolve(event.target.result)
        }
    };
    reader.readAsDataURL(file);
})

const UploadFile = ({ accept, title }:UploadFilePropsType) => {
    const theme = useTheme();
    const fileInput = React.useRef<HTMLInputElement>(null);
    const [dataUri, setDataUri] = React.useState<null | string>(null);
    const [imageSrc, setImageSrc] = React.useState<null | string>(null);

    const uploadToCloudinary = async (file:any) => {
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

        }catch(e) {
            console.log(e)
        }
        
    }
    
    const onChange = async (file:any) => {
    
        if(!file) {
          setDataUri('');
          return;
        }
    
        fileToDataUri(file)
          .then((dataUri:any) => {
            setDataUri(dataUri)
          });
        
        await uploadToCloudinary(file);
    }

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
                                onClick={ () => {
                                    setDataUri(null);
                                    setImageSrc(null);
                                }}
                            >
                                <Clear/>
                            </IconButton>
                            <img
                                style={{
                                    maxWidth: 250
                                }}
                                src={dataUri}
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
                    imageSrc && <ColorPaletteImage src={imageSrc}/>
                }
            </Box>       
        </>
    )
}

export default UploadFile;
