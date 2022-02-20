import React, { useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Grid from '@mui/material/Grid';
import StyledButton from '../styled/StyledButton';
import { CircularProgress } from '@mui/material';

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
    aspectRatio=1
 }:{ 
    openModal?:boolean,
    handleModal:any,
    file:any,
    setCropper:any,
    getCropData:any
    aspectRatio?:number
 }) => {

    const [ loadingCropper, setLoadingCropper ] = useState<boolean>( true );
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
                        initialAspectRatio={1}
                        src={file}
                        ready={ () => setLoadingCropper( false ) }
                        viewMode={1}
                        aspectRatio={ aspectRatio }
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
