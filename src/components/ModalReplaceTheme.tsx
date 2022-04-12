import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack, useTheme } from '@mui/material';
import { deleteRecord } from "../actions/deleteRecord";
import {useState} from "react";
import {DeleteForever} from "@mui/icons-material";
import StyledButton from "../styled/StyledButton";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};


export const useModalReplaceTheme = ( resource:string ) => {
    const [ openModal, setOpenModal ] = React.useState(false);
    const [ modalTitle, setModalTitle ] = useState<string>(' ');
    const [ uid, setUid ] = useState<string | null>(null);
    const [ imageUid, setImageUid ] = useState<string | null>( null ); //Allows to delete some image
    const handleModal = () => setOpenModal(!openModal);

    const handleDelete = async () => {
        if(uid) {
            await deleteRecord( resource, uid );
            
            if( imageUid ) {
                await deleteRecord( 'images', imageUid );
            }

            setOpenModal(false); //Close modal if is open
        }
    }

    return {
        openModal,
        handleModal,
        handleDelete,
        modalTitle,
        setModalTitle,
        setUid,
        setImageUid
    }
}

type DeleteModalType = {
    handleModal: any;
    openModal: any;
    modalTitle: string;
}

export const ModalReplaceTheme = ({ handleModal, openModal, modalTitle }:DeleteModalType) => {
    const theme = useTheme();

    return(
        <Modal
            open={openModal}
            onClose={handleModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography
                    sx={{
                        color: theme.palette.text.primary
                    }}
                    align="center"
                    id="modal-modal-title" 
                    variant="subtitle1"
                >
                    Haz alcanzado el máximo de temas disponibles en tu plan.
                </Typography>
                <Typography
                    sx={{
                        color: theme.palette.text.primary,
                        my: 2
                    }}
                    align="center"
                    variant="subtitle2"
                    id="modal-modal-description" 
                >
                    Elimina uno para continuar, puedes hacerlo en "Mis temas",
                    o mejor aún...
                </Typography>
                <Stack spacing={ 2 }>
                    <StyledButton
                        color="secondary"
                        variant="contained"
                        onClick={ handleModal }
                        fullWidth
                    >
                        ¡Quitar limitante!
                    </StyledButton>
                    <StyledButton
                        variant="outlined"
                        fullWidth
                        onClick={ handleModal }
                    >
                        Aceptar
                    </StyledButton>
                </Stack>
            </Box>
        </Modal>
    )
}