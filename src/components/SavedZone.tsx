import { Typography, Stack, useTheme, Avatar } from '@mui/material';

import { Delete, Lock } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';

import IconButton from '@mui/material/IconButton';
import { ModalDelete, useModalDelete } from './ModalDelete';
import { useNavigate } from 'react-router-dom';
import { getZoneStatusLabel } from '../helpers/getZoneStatusLabel';
import { useDispatch } from 'react-redux';
import { showModalPremium, updateUi } from '../actions/ui';


const SavedZone = ({ getZones, data, isLocked }:{  getZones?:any, data:any, isLocked?:boolean }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        openModal,
        handleModal,
        handleDelete,
        modalTitle,
        setModalTitle,
        setUid
    } = useModalDelete('zones');

    const theme = useTheme();

    return (
        <Box sx={{ position: 'relative' }}>
            <ModalDelete
                openModal={ openModal }
                handleModal={ handleModal }
                handleDelete={ handleDelete }
                modalTitle={ modalTitle }
                getRecords={ getZones }
            />
            <Stack
                sx={{
                    position: 'absolute',
                    top: -10,
                    right: -8,
                    zIndex: 100
                }}
                direction="row"
                spacing={ 2 }
            >
                <IconButton
                    sx={{
                        backgroundColor: theme.palette.error.main,
                        width: 48,
                        height: 20,
                        borderRadius: 2
                    }}
                    onClick={ () => {
                        setModalTitle( `¿Seguro que deseas eliminar el Zone "${ data.title }"?` );
                        setUid( data.uid );
                        handleModal();
                    } }
                >
                    <Delete sx={{ fontSize: 14 }}/>
                </IconButton>
            </Stack>
            <Card 
                sx={{ 
                    position:'relative',
                    display: 'flex',
                    mb: 1,
                    borderRadius: 3,
                    cursor: 'pointer'
                }} 
                onClick={ isLocked ? 
                    () => dispatch( updateUi({
                        modalPremium: true,
                        titleModalPremium: "Conviértete en Zoner Pro para editar este Zone"
                    }) )
                    : 
                    data.currentStatus === 'isEditing' ?  
                        () => navigate( `/zones/edit/1/${ data.uid }`)
                        : 
                        () => navigate( `/zones/${ data.uid }`) 
                }>
                {
                    isLocked && (
                        <Box
                            sx={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                zIndex: 10,
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                        
                            }}
                        >
                            <Lock
                                sx={{
                                    fontSize: 32
                                }}
                            />
                        </Box>
                    )
                }
                {
                    data?.profileImage ? (
                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image={ data.profileImage?.url ? data.profileImage.url : '' }
                            alt="profileImage"
                        />
                    ) : (
                        <Avatar sx={{ width: 151, height: 151, borderRadius: '12px 0 0 12px' }}/>
                    )
                }
                
                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h6">
                        { data.title }
                    </Typography>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            @{ data.username }
                        </Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 3 }}>
                        <Chip
                            label={ getZoneStatusLabel( data.currentStatus ) }
                            size="small"
                        />
                    </Box>
                </Box>
            </Card>
        </Box>
  )
}

export default SavedZone;
