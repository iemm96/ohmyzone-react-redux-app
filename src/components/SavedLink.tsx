import { Typography, Stack, useTheme } from '@mui/material';

import { Delete, Edit } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import IconButton from '@mui/material/IconButton';
import { ModalDelete, useModalDelete } from './ModalDelete';


const SavedLink = ({ getLinks, data, disableEdit = false }:{  getLinks?:any, data:any, disableEdit?:boolean, }) => {

    const {
        openModal,
        handleModal,
        handleDelete,
        modalTitle,
        setModalTitle,
        setUid
    } = useModalDelete('links');

    const theme = useTheme();

    return (
        <>
            {
                disableEdit === false && (
                    <>
                        <ModalDelete
                            openModal={ openModal }
                            handleModal={ handleModal }
                            handleDelete={ handleDelete }
                            modalTitle={ modalTitle }
                            getRecords={ getLinks }
                        />
                        <Stack
                            sx={{
                            position: 'absolute',
                            top: -20,
                            right: -10,
                            zIndex: 100
                            }}
                            direction="row"
                            spacing={ 2 }
                        >
                            <IconButton
                            sx={{
                                backgroundColor: theme.palette.primary.main
                            }}
                            >
                            <Edit/>
                            </IconButton>
                            <IconButton
                                sx={{
                                    backgroundColor: theme.palette.error.main
                                }}
                                onClick={ () => {
                                    setModalTitle( `¿Seguro que deseas eliminar el link "${ data.title }"?` );
                                    setUid( data.uid );
                                    handleModal();
                                } }
                            >
                                <Delete/>
                            </IconButton>
                        </Stack>
                    </>
                    
            )}
            <Card
                sx={{ 
                    display: 'flex',
                    mb: 1,
                    borderRadius: 3,
                    backgroundColor: theme.palette.secondary.dark
                }}
                >
            
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={ data.coverImg?.url ? data.coverImg.url : '' }
                    alt="Cover link"
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h6">
                        { data.title }
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                        { data.description }
                    </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    
                    </Box>
                </Box>
            </Card>
        </>
  )
}

export default SavedLink;
