import { Typography, Stack, useTheme } from '@mui/material';

import { Delete, Edit } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import IconButton from '@mui/material/IconButton';
import { ModalDelete, useModalDelete } from './ModalDelete';
import { useState } from 'react';
import { LinkForm } from './LinkForm';
import { CategoryItemType } from '../types/CategoryItemType';
import { format,add } from 'date-fns';
import es from 'date-fns/locale/es';

const CurrentSubscription = ({ getLinks, data, disableEdit = false, defaultCategories, zoneName }:{  getLinks?:any, data:any, disableEdit?:boolean, defaultCategories?:CategoryItemType[], zoneName?:string }) => {
    const [ editMode, setEditMode ] = useState<boolean>( false );

    const {
        openModal,
        handleModal,
        handleDelete,
        modalTitle,
        setModalTitle,
        setUid,
        setImageUid,
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
                            top: -10,
                            right: -10,
                            zIndex: 10
                            }}
                            direction="row"
                            spacing={ 2 }
                        >
                            <IconButton
                                sx={{
                                    backgroundColor: theme.palette.primary.main,
                                    width: 48,
                                    height: 20,
                                    borderRadius: 2
                                }}
                                onClick={ () => setEditMode( !editMode )}
                            >
                                <Edit  sx={{ fontSize: 14 }}/>
                            </IconButton>
                            <IconButton
                                sx={{
                                    backgroundColor: theme.palette.error.main,
                                    width: 48,
                                    height: 20,
                                    borderRadius: 2
                                }}
                                onClick={ () => {
                                    setModalTitle( `¿Seguro que deseas eliminar el link "${ data.title }"?` );
                                    setUid( data.uid );
                                    setImageUid( data?.coverImg?._id ); //Set uid cover image to delete
                                    handleModal();
                                } }
                            >
                                <Delete sx={{ fontSize: 14 }}/>
                            </IconButton>
                        </Stack>
                    </>
                    
            )}
            {
                !editMode ? (
                    <Card
                        elevation={ 6 }
                        sx={{ 
                            display: 'flex',
                            mb: 1,
                            borderRadius: 3,
                            backgroundColor: theme.palette.background.paper
                        }}
                        >
                        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h6">
                                { data?.plan?.nameToShow }
                            </Typography>
                            {
                                data?.activeUntil ? (
                                    <Typography variant="subtitle2" color="text.secondary" component="div">
                                    {  `Activa hasta: ${format( new Date( data.activeUntil ), 'dd/MMMM/yyyy', { locale: es } )}` }
                                    </Typography>
                                ) : (
                                  <Typography variant="subtitle2">
                                      Activa
                                  </Typography>
                                )
                            }
                            </CardContent>
                        </Box>
                    </Card>
                ) : (
                    <LinkForm
                        defaultCategories={ defaultCategories }
                        zoneName={ zoneName }
                        item={ data }
                        zone={ data.zone }
                        getLinks={ getLinks }
                        editingMode={ true }
                        setEditMode={ setEditMode }
                    />
                )
            }
        
        </>
  )
}

export default CurrentSubscription;
