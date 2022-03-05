import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, Stack, useTheme } from '@mui/material';
import StyledButton from "../styled/StyledButton";
import { transition } from '../constants/transitions';
import { motion } from "framer-motion";

import Background from "../assets/premium-illustration-logo.svg";
import { ContentCopyRounded, Facebook, Share, Twitter } from '@mui/icons-material';

import QRCode from 'react-qr-code';
import { simplifyUrl } from '../helpers/simiplifyUrl';

import {
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
};

type ModalPremiumType = {
    handleModal: any;
    openModal: boolean;
    zoneUrl: string;
}

export const useModalPublished = (  ) => {
    const [ openModal, setOpenModal ] = useState(false);
    const [ modalTitle, setModalTitle ] = useState<string>(' ');
    const handleModal = () => setOpenModal(!openModal);

    return {
        openModal,
        handleModal,
        modalTitle,
        setModalTitle,
    }
}

const ModalZonePublished = ({ handleModal, openModal, zoneUrl }:ModalPremiumType) => {
    const theme = useTheme();
    const title = `¡Mira el Zone que acabo de crear!  ${ zoneUrl }`;
    const shareUrl = zoneUrl;

    return(
        <Modal
        open={openModal}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box 
                    sx={{ 
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center', 
                        width: '100%', 
                        height: 200, 
                        backgroundColor: '#4664F6',
                        pt: 2,
                        overflow: 'hidden'
                    }}
                >
                    <motion.img
                        initial={{ 
                            height: 200,
                            y: 50
                        }}
                        animate={{
                            y: 5,
                            height: 200,
                            transition: { ...transition }
                        }}
                        alt="logo"
                        src={ Background } 
                        style={{
                            height: 120,
                            position: 'absolute',
                            zIndex: 0
                        }}
                    />
                </Box>
                <Box sx={{ p: 3, pb: 2 }}>
                    <Typography
                        color="primary"
                        align="center"
                        id="modal-modal-title" 
                        variant="subtitle1"
                    >
                        ¡Genial, tu Zone ha sido publicado!
                    </Typography>
                    <Typography
                        variant="caption"
                        color="secondary"
                    >
                        Descargando tu QR
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            borderRadius: 2,
                            py: 2,
                            border: `solid 1px ${ theme.palette.secondary.main }`
                        }}
                    >

                        <QRCode
                            style={{
                                borderRadius: 8,
                            }}
                            size={ 160 }
                            value={ zoneUrl }
                         />
   
                    </Box>
                    <Grid sx={{ mt: 2 }} spacing={ 1 } container>
                        <Grid
                            xs={ 12 }                            
                            item
                        >
                            <Typography
                                variant="caption"
                                color="secondary"
                            >
                                Copiando el enlace
                            </Typography>
                            <StyledButton
                                variant="contained"
                                color="secondary"
                                fullWidth
                                startIcon={ <ContentCopyRounded/> }
                                onClick={ () => {
                                    
                                    navigator.clipboard.writeText( zoneUrl ).then(function() {
                                        alert( '¡Enlace copiado exitosamente!' )
                                      }, function() {
                                        /* clipboard write failed */
                                      });
                                } }
                            >
                                { simplifyUrl( zoneUrl ) }
                            </StyledButton>
                        </Grid>
                        <Grid xs={ 12 } item>
                            <Typography
                                variant="caption"
                                color="secondary"
                            >
                                Compartiendo con tus amigos
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    
                                    borderRadius: 2,
                                    border: `solid 1px ${ theme.palette.secondary.main }`
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 20,
                                        height: '100%',
                                        backgroundColor: theme.palette.secondary.main,
                                        borderRadius: '4px 0 0 4px',
                                        px: 2,
                                    }}
                                >
                                    <Share
                                        sx={{
                                            color: theme.palette.background.paper
                                        }}
                                    />
                                </Box>
                                    <Stack direction="row" spacing={ 3 }>
                                        <FacebookShareButton
                                            url={ zoneUrl }
                                            title="Comparte en Facebook"
                                            quote={ `¡Mira el Zone que acabo de crear!  ${ zoneUrl }` }
                                            hashtag="#ohmyzone"
                                        >
                                            <Facebook
                                                color="secondary"
                                            />
                                        </FacebookShareButton>
                                        <TwitterShareButton
                                            url={ zoneUrl }
                                            title={ "¡Mira el zone que acabo de crear! "}
                                        >
                                            <Twitter
                                                color="secondary"
                                            />
                                        </TwitterShareButton>
                                    </Stack>
                                </Box>
                        </Grid>
                        <Grid
                            xs={ 12 }
                            item
                        >
                            <StyledButton
                                fullWidth
                                onClick={ handleModal }
                            >
                                Volver al dashboard
                            </StyledButton>
                        </Grid>  
                    </Grid>
                </Box>
            </Box>
        </Modal>
    )
}

export default ModalZonePublished;