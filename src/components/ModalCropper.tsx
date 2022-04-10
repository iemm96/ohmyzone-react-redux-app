import { useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Grid from '@mui/material/Grid';
import StyledButton from '../styled/StyledButton';
import { CircularProgress, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Crop, CropLandscape, CropPortrait, CropSquare } from "@mui/icons-material";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 24,
    height: 'auto',
    p: 4,
  };

export const ModalCropper = ({ 
    openModal, 
    handleModal, 
    file, 
    setCropper, 
    getCropData,
    aspectRatio=1,
    cropper,
 }:{ 
    openModal?:boolean,
    handleModal:any,
    file:any,
    setCropper:any,
    getCropData:any,
    aspectRatio?:number | number[],
    cropper?:any,

 }) => {

    const [ loadingCropper, setLoadingCropper ] = useState<boolean>( true );
    const [ selectedAspectRatio, setSelectedAspectRatio ] = useState<number>( 1 );

    const handleChangeAspectRatio = (e:any, newValue:number) => {
        if (newValue !== null) {
            setSelectedAspectRatio( newValue );
            cropper.setAspectRatio( newValue );
        }
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={ openModal ? openModal : false }
            onClose={ handleModal }
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openModal}>
                <Box sx={style}>
                    { loadingCropper && 
                        <CircularProgress 
                            sx={{
                                position: 'absolute',
                                zIndex: 2000,
                                top: '50%',
                                left: 0,
                                right: 0,
                                marginLeft: 'auto',
                                marginRight: 'auto',
                            }}
                        /> 
                    }
                    <Cropper
                        style={{ height: 400, width: "100%" }}
                        initialAspectRatio={ selectedAspectRatio }
                        src={file}
                        ready={ () => setLoadingCropper( false ) }
                        viewMode={1}
                        aspectRatio={ selectedAspectRatio }
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                        onInitialized={(instance) => {
                            setCropper(instance);
                            setLoadingCropper( false );
                        }}
                        guides={true}
                    />
                    {
                        Array.isArray( aspectRatio ) && (
                            <Box
                                sx={{
                                    mb: 2
                                }}
                            >
                                <ToggleButtonGroup
                                    color="primary"
                                    value={ selectedAspectRatio }
                                    exclusive
                                    onChange={ handleChangeAspectRatio }
                                    fullWidth
                                >
                                    {
                                        aspectRatio.map( (value:number, index:number) => (
                                            <ToggleButton key={ index } value={ value }>
                                                {
                                                    value === 1.86 && (
                                                        <CropLandscape/>
                                                    )
                                                }
                                                {
                                                    value === 1 && (
                                                        <CropSquare/>
                                                    )
                                                }
                                                {
                                                    value === 0.86 && (
                                                        <CropPortrait/>
                                                    )
                                                }
                                            </ToggleButton>
                                        ) )
                                    }        
                                </ToggleButtonGroup>
                            </Box>
                        )
                    }

                    <Grid sx={{ mt: 2 }} spacing={ 2 } container>
                        <Grid 
                            order={{
                                xs: 2,
                                md: 1
                            }}
                            xs={ 12 }
                            md={ 6 } 
                            item
                        >
                            <StyledButton
                                variant="outlined"
                                fullWidth
                                onClick={ handleModal }
                            >
                                Cancelar
                            </StyledButton>
                        </Grid>
                        <Grid 
                            order={{
                                xs: 1,
                                md: 2
                            }}
                            xs={ 12 }
                            md={ 6 } 
                            item
                        >
                            <StyledButton
                                variant="contained"
                                fullWidth
                                onClick={ getCropData }
                                startIcon={ <Crop/> }
                            >
                                Recortar imagen
                            </StyledButton>
                        </Grid>
                    </Grid>
                </Box>
            </Fade>
        </Modal>
    )
}
