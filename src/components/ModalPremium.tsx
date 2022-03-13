import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, TextField, CircularProgress } from '@mui/material';
import { useState } from "react";
import Check from '@mui/icons-material/Check';

import StyledButton from "../styled/StyledButton";
import { motion } from "framer-motion";

import Background from "../assets/premium-illustration-logo.svg";
import { transition } from '../constants/transitions';
import Premium from '../assets/icons/premium.svg';

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
    openModal: any;
    modalTitle: string;
    loading?: boolean;
    setLoading?: any;
    handleValidateCode?: any;
}


export const useModalPremium = () => {
    const [openModal, setOpenModal] = React.useState(false);
    const [modalTitle, setModalTitle] = useState<string>(' ');
    const [ loading, setLoading ] = useState<boolean>(false);
    const handleModal = () => setOpenModal(!openModal);

    const handleValidateCode = () => console.log('validating');

    return {
        openModal,
        handleModal,
        modalTitle,
        setModalTitle,
        loading,
        setLoading,
        handleValidateCode
    }
}

export const ModalPremium = ({ handleModal, openModal, modalTitle, loading, handleValidateCode }: ModalPremiumType) => {

    return (
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
                        src={Background}
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
                        variant="subtitle1">
                        {modalTitle}
                    </Typography>
                    <Typography
                        align="center"
                        sx={{ mt: 3, fontWeight: 500, color: 'white' }}
                    >
                        Por sólo
                    </Typography>
                    <Typography
                        align="center"
                        color="primary"
                        variant="h5"
                        id="modal-modal-description"
                        sx={{ mb: 3 }}
                    >
                        $48/mes
                    </Typography>
                    <Grid spacing={1} container>
                        <Grid
                            xs={12}
                            item
                        >
                            <StyledButton
                                variant="contained"
                                color="secondary"
                                fullWidth
                                startIcon={<img src={Premium} style={{ width: 12 }} alt="img-icon" />}
                            >
                                ¡Probar gratis por 7 días!
                            </StyledButton>
                        </Grid>
                        <Grid
                            xs={12}
                            item
                        >
                            <TextField
                                fullWidth
                                label="Código de descuento"
                                InputProps={{
                                    endAdornment: loading ? <CircularProgress size={ 12 }/> :
                                    <StyledButton
                                        onClick={ handleValidateCode }
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        startIcon={ <Check/> }
                                    >
                                        Validar
                                    </StyledButton>
                                }}
                            />
                        </Grid>
                        <Grid
                            xs={12}
                            item
                        >
                            <StyledButton
                                fullWidth
                                onClick={handleModal}
                            >
                                Tal vez luego
                            </StyledButton>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Modal>
    )
}