import React from 'react'
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { IconButton, Typography } from '@mui/material';
import { AddAPhoto, Clear } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import axios from 'axios';
import { postRecord } from '../actions/postRecord';
import { ModalCropper } from './ModalCropper';
import { resizeImage } from '../actions/resizeImage';

type UploadFilePropsType = {
    accept?: string;
    title?: string;
    dataUri: any;
    imageSrc?: any; 
    onChange: any;
    handleDelete: any;
    setCurrentPalette?: any;
    handleModal?: any;
    openModal?: boolean;
    file?: any;
    getCropData?: any;
    setCropper?: any;
    temporalDataUri?: string | null;
    useCropper?: boolean;
    roundedPreview?: boolean;
    maxFileSize?: number;
    aspectRatio?: number;
    height?: number;
}

const dataURItoBlob = (dataURI:string) => {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    //Old Code
    //write the ArrayBuffer to a blob, and you're done
    //var bb = new BlobBuilder();
    //bb.append(ab);
    //return bb.getBlob(mimeString);

    //New Code
    return new Blob([ab], {type: mimeString});

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

export const useUploader = ( useCropper = false,  initialState = null ) => {
    const [ dataUri, setDataUri ] = React.useState<null | string>(initialState);
    const [ temporalDataUri, setTemporalDataUri ] = React.useState<null | string>( initialState );
    const [ imageSrc, setImageSrc ] = React.useState<null | string>(initialState);
    const [ file, setFile ] = React.useState<any | string>(initialState);
    const [ openModal, setOpenModal ] = React.useState<boolean>( false );

    const [cropper, setCropper] = React.useState<any>();
    const handleModal = () => {
        setOpenModal( !openModal );
    }

    const getCropData = () => {
        
        if (typeof cropper !== "undefined") {
            const croppedImageUri = cropper.getCroppedCanvas().toDataURL();
            setDataUri( croppedImageUri );
            handleModal();
        }
    };

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
        
        if(!file) {
          setDataUri('');
          return;
        }
    
        fileToDataUri(file)
          .then((dataUri:any) => {
            useCropper ? setTemporalDataUri( dataUri ) : setDataUri( dataUri )
          });
        
          if( useCropper ) {
            handleModal();
          }

          setFile(file); 
    }

    const uploadToServer = async ( zone:string, cloudinaryFolder?:string ) => {
        const formData = new FormData();
        formData.append( 'zone', zone );

        if( cloudinaryFolder ) {
            formData.append( 'folderName', cloudinaryFolder );
        }

        let fileToUpload:any = null;

        if( useCropper ) {
            let dataBlob:Blob = new Blob();
            let metadata = {
                type: file.type
              };

              if( dataUri ) {
                dataBlob = dataURItoBlob( dataUri )
              }

              fileToUpload = new File([ dataBlob ], file.name, metadata);
        
        }else {
            fileToUpload = file;
        }

        const resized:any = await resizeImage( fileToUpload ); //Starts resizing image
            
        formData.append( 'file', resized );

        const { image } = await postRecord('images', formData);
        
        setImageSrc( image.url );

        return image;
    }

    const handleDelete = async () => {
        setDataUri(null);
        setImageSrc(null);
    }

    return { temporalDataUri, dataUri, imageSrc, handleDelete, onChange, uploadToCloudinary, file, uploadToServer, openModal, handleModal , getCropData, setCropper,setDataUri  }
};


export const UploadFile = ({ 
    accept = '.jpg, .jpeg, .png',
    title,
    dataUri,
    onChange,
    handleDelete,
    openModal,
    handleModal,
    setCropper,
    getCropData,
    temporalDataUri,
    maxFileSize = 5242880,
    roundedPreview = false,
    useCropper = false,
    aspectRatio = 1,
    height
}:UploadFilePropsType) => {

    const theme = useTheme();
    const fileInput = React.useRef<HTMLInputElement>(null);


    return (
        <>
            { useCropper && 
                <ModalCropper
                    openModal={ openModal }
                    handleModal={ handleModal }
                    file={ temporalDataUri }
                    setCropper={ setCropper }
                    getCropData={ getCropData }
                    aspectRatio={ aspectRatio }
                />
            }
            <Box
                sx={{   
                    position: 'relative',
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: 2,
                    borderStyle: 'dashed',
                    minHeight: height ? height : 'auto',
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
                        accept={ accept }
                        ref={ fileInput }
                        id="input-file"
                        type="file"
                        onChange={(event) => {
                            if(event.target.files) {
                                
                                if(event.target.files[0].size > maxFileSize ) {
                                    alert(`El archivo no debe ser mayor a ${ Math.round(maxFileSize/1000000) }MB`);
                                    return;
                                }
                                onChange(event?.target.files[0] || null)
                            }
                        }}
                        hidden
                    />
                    {
                        dataUri ?
                        <Box
                            sx={{
                                position: 'relative',
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
                                    maxWidth: 250,
                                    borderRadius: roundedPreview ? '50%' : 0
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
            </Box>       
        </>
    )
}

