import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, Stack, useTheme } from '@mui/material';
import StyledButton from "../styled/StyledButton";

import { ContentCopyRounded, Facebook, Share, Telegram, Twitter, WhatsApp } from '@mui/icons-material';

import QRCode from 'react-qr-code';
import { simplifyUrl } from '../helpers/simiplifyUrl';

import {
    TelegramShareButton,
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import ZonePublishedAnimation from './ZonePublishedAnimation';
import { useNavigate } from 'react-router-dom';
import { downloadQr } from '../helpers/downloadQr';

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
    const navigate = useNavigate();
    const QRCodeId:string = "QRCode";
 
    return(
        <Modal
            sx={{
                overflow: 'scroll'
            }}
            open={openModal}
            onClose={handleModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <ZonePublishedAnimation zoneUrl={ zoneUrl } />
                <Box sx={{ p: 3, pb: 2 }}>
                    <Typography
                        color="secondary"
                        align="center"
                        id="modal-modal-title" 
                        variant="h6"
                        sx={{
                            mb: 2
                        }}
                    >
                        ¿Cómo lo comparto?
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
                            alignItems: 'center',
                            flexDirection: 'column',
                            borderRadius: 2,
                            py: 2,
                            border: `solid 1px ${ theme.palette.secondary.main }`
                        }}
                    >

                        <QRCode
                            id={ QRCodeId }
                            style={{
                                borderRadius: 8,
                            }}
                            size={ 160 }
                            value={ zoneUrl }
                         />
                        <StyledButton
                            sx={{
                                borderRadius: 8,
                                mt: 2,
                            }}
                            variant="contained"
                            size='small'
                            onClick={ () => downloadQr( QRCodeId, 'qr_de_mi_zone' ) }
                        >
                            Descargar tu QR
                        </StyledButton>
                    </Box>
                    <Grid sx={{ mt: 0 }} spacing={ 2 } container>
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
                                        py: 1
                                    }}
                                >
                                    <Share
                                        sx={{
                                            color: theme.palette.background.paper
                                        }}
                                    />
                                </Box>
                                    <Stack sx={{ py: 1, px: 2, justifyContent: 'center', display: 'flex' }} direction="row" spacing={ 3 }>
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
                                        <WhatsappShareButton
                                            url={ zoneUrl }
                                            title={ "¡Mira el zone que acabo de crear! "}
                                        >
                                            <WhatsApp
                                                color="secondary"
                                            />
                                        </WhatsappShareButton>
                                        <TelegramShareButton
                                            url={ zoneUrl }
                                            title={ "¡Mira el zone que acabo de crear! "}
                                           
                                        >
                                            <Telegram
                                                color="secondary"
                                            />
                                        </TelegramShareButton>
                                    </Stack>
                                </Box>
                        </Grid>
                        <Grid
                            xs={ 12 }
                            item
                        >
                            <StyledButton
                                fullWidth
                                onClick={ () => {
                                    handleModal()
                                    navigate( '/dashboard' );
                                }}
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