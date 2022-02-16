import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Stack} from "@mui/material";
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


export const useModalDelete = ( resource:string ) => {
    const [ openModal, setOpenModal ] = React.useState(false);
    const [ modalTitle, setModalTitle ] = useState<string>(' ');
    const [ uid, setUid ] = useState<string | null>(null);
    const handleModal = () => setOpenModal(!openModal);

    const handleDelete = async () => {
        if(uid) {
            await deleteRecord( resource, uid )
            setOpenModal(false); //Close modal if is open
        }
    }

    return {
        openModal,
        handleModal,
        handleDelete,
        modalTitle,
        setModalTitle,
        setUid
    }
}

type DeleteModalType = {
    handleModal: any;
    openModal: any;
    handleDelete: any;
    modalTitle: string;
    getRecords: any;
}

export const ModalDelete = ({handleDelete, handleModal, openModal, modalTitle, getRecords }:DeleteModalType) => {
    return(
        <Modal
            open={openModal}
            onClose={handleModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography
                    color="primary"
                    align="center"
                    id="modal-modal-title" 
                    variant="subtitle1">
                    { modalTitle }
                </Typography>
                <Typography
                    align="center"
                    color="primary"
                    variant="subtitle2"
                    id="modal-modal-description" 
                    sx={{ my: 2 }}
                >
                    ¡No podrás recuperarlo!
                </Typography>
                <Stack sx={{ justifyContent: 'space-between' }} direction="row">
                    <StyledButton
                        variant="outlined"
                        onClick={ handleModal }
                    >
                        Cancelar
                    </StyledButton>
                    <StyledButton
                        variant="contained"
                        color="error"
                        startIcon={ <DeleteForever/> }
                        onClick={ async () => {
                            await handleDelete()
                            getRecords()
                        }}
                    >
                        Eliminar
                    </StyledButton>
                </Stack>
            </Box>
        </Modal>
    )
}