import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Stack, TextField} from "@mui/material";
import {useState} from "react";
import { DeleteForever, Check } from '@mui/icons-material';
import StyledButton from "../styled/StyledButton";
import { postRecord } from '../actions/postRecord';

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


export const useModalCategory = ( ) => {
    const [ openModalCategory, setOpenModalCategory ] = React.useState(false);
    const handleModalCategory = () => setOpenModalCategory(!openModalCategory);
    const [ newCategory, setNewCategory ] =  React.useState<string | null>( null );

    return {
        setNewCategory,
        newCategory,
        openModalCategory,
        handleModalCategory,
    }
}

type ModalCategoryType = {
    handleModalCategory: any;
    openModalCategory: any;
    setNewCategory: any;
}

export const ModalCategory = ({ handleModalCategory, openModalCategory, setNewCategory  }:ModalCategoryType) => {
    const [ value, setValue ] = useState<any>( undefined );

    return(
        <Modal
            open={openModalCategory}
            onClose={handleModalCategory}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography
                    color="primary"
                    align="center"
                    id="modal-modal-title" 
                    variant="subtitle1">
                    Crear nueva categoría
                </Typography>
                <TextField
                    sx={{
                        mt: 2
                    }}
                    fullWidth
                    placeholder="Ejemplo: Productos"
                    label="Título de la categoría"
                    onChange={ ( e ) => setValue( e.target.value ) }
                />
                <Stack 
                    sx={{ 
                        justifyContent: 'space-between',
                        mt: 2
                    }}
                    direction="row"
                >
                    <StyledButton
                        variant="outlined"
                        onClick={ handleModalCategory }
                    >
                        Cancelar
                    </StyledButton>
                    <StyledButton
                        variant="contained"
                        color="primary"
                        startIcon={ <Check/> }
                        onClick={ () => {
                            setNewCategory( value );
                            handleModalCategory()
                        }}
                    >
                        Crear categoría
                    </StyledButton>
                </Stack>
            </Box>
        </Modal>
    )
}