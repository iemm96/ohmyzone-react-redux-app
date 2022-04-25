

import { StyledIframe } from '../../styled/StyledIframe';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Container } from '@mui/material';
import StyledButton from '../../styled/StyledButton';
import { ChevronLeft, Check } from '@mui/icons-material';
import { updateRecord } from '../../actions/updateRecord';
import ModalZonePublished, { useModalPublished } from '../../components/ModalZonePublished';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { showPublishZoneBar, showPreviewButton, updateUi, showModalPremium } from '../../actions/ui';
import { fetchRecord } from '../../actions/fetchRecord';
import { updateZone } from '../../actions/zones';
import { updateTheme } from '../../actions/themes';
import Premium from '../../assets/icons/premium.svg';

const { REACT_APP_PREVIEW_HOST } = process.env;

const PreviewSection = ({fullForm}:{fullForm?:boolean}) => {
    const params = useParams();
    const { zone, auth, plan } = useSelector( (state:any) => state );
    const dispatch = useDispatch();
    const [ preventPublishZone, setPreventPublishZone ] = useState<boolean>( false );
    const { handleModal, openModal } = useModalPublished();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch( 
            showPreviewButton( false )
        );

        //Validate is current plan supports premium features
        validatePremiumPlan();

        if( Object.keys(zone).length === 0 ) {
            getZone();
        }else {

        }
    },[ ]);

    useEffect(() => {
        //Validate is current plan supports premium features
        validatePremiumPlan();
    },[ plan ]);

    const validatePremiumPlan = () => {
        if( zone?.premiumFeatures && !plan.isPremium ) {
            setPreventPublishZone( zone?.premiumFeatures.length > 0 );
        }else{
            setPreventPublishZone( false );
        }
    }

    const getZone = async () => {
        if(params.zone) {

            const { zone } = await fetchRecord('zones', params.zone);


            dispatch( updateZone({
                ...zone,
                profileImage: zone?.profileImage?.url
            }));

            dispatch(
                showPublishZoneBar( true )
            )
            
            if( zone.theme ) {
                dispatch( updateTheme({
                    ...zone.theme.palette,
                    backgroundImageUrl: zone?.theme?.backgroundImage?.url
                }) );
            }
        }

    }

    const onSaveAndPublish = async ( ) => {
        const result = await updateRecord( 'zones', {
            currentStatus: 'isPublished'
        }, zone.uid );

        if( result ) {
            handleModal( );
        }
        
    }

    return (
        <Container sx={{ mt: 2, mb: fullForm ? 10 : 0 }} maxWidth="sm">
            <ModalZonePublished
                handleModal={ handleModal }
                openModal={ openModal }
                zoneUrl={ `${ REACT_APP_PREVIEW_HOST }/${ zone.username }` }
            />
            <Box
                sx={{
                    justifyContent: 'center',
                    display: 'flex'
                }}
            >
                <StyledIframe
                    src={ `${ REACT_APP_PREVIEW_HOST }/${ zone.username }?user=${ auth.uid }` }
                />
            </Box>
            {
                !fullForm && (
                    <Grid sx={{ mt: 4, mb: 4 }} spacing={ 2 } container>
                        <Grid xs={ 12 } item>
                            <StyledButton
                                variant="contained"
                                fullWidth
                                onClick={ () => {
                                    if( preventPublishZone ) {
                                        dispatch( updateUi({
                                            modalPremium: true,
                                            titleModalPremium: "¡Comienza tu prueba gratuita como Zoner Pro!"
                                        }) );

                                    }else {
                                        onSaveAndPublish()
                                    }
                                }}
                                startIcon={
                                    preventPublishZone ? 
                                    <img src={ Premium } style={{ width: 16 }} alt="img-icon" /> :
                                    <Check/>
                                }
                            >
                                ¡Guardar y publicar!
                            </StyledButton>
                        </Grid>
                        <Grid xs={ 12 } item>
                            <StyledButton
                                variant="outlined"
                                fullWidth
                                onClick={ () => navigate( `/dashboard` ) }
                            >
                                Guardar sin publicar
                            </StyledButton>
                        </Grid>
                        <Grid xs={ 12 } item>
                            <StyledButton
                                fullWidth
                                onClick={ () => navigate( `/zones/edit/4/${ zone.uid }`) }
                                startIcon={
                                    <ChevronLeft/>
                                }
                            >
                                Volver
                            </StyledButton>
                        </Grid>
                    </Grid>
                )
            }
            
        </Container>
    );
};

export default PreviewSection;



