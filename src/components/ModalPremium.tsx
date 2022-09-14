import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid, TextField, CircularProgress, ToggleButtonGroup, ToggleButton, Chip, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import Check from '@mui/icons-material/Check';

import StyledButton from "../styled/StyledButton";
import { motion } from "framer-motion";

import Background from "../assets/premium-illustration-logo.svg";
import { transition } from '../constants/transitions';
import Premium from '../assets/icons/premium.svg';
import Link from '@mui/material/Link';
import PaypalButtonComponent from './PaypalButtonComponent';
import { useSelector, useDispatch } from 'react-redux';
import { subscribe } from '../actions/subscribe';

import { format,add } from 'date-fns';
import es from 'date-fns/locale/es';
import { updateSubscription } from '../actions/subscriptions';
import { updatePlan } from '../actions/plans';

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
    subscription: any;
    plan: any;
    auth:any;
    handleModal: any;
    openModal: any;
    modalTitle: string;
    loading?: boolean;
    setLoading?: any;
    handleValidateCode?: any;
    handleStartFreeTrial?:any;
}


export const useModalPremium = () => {
    const { ui, auth, plan, subscription } = useSelector( (state:any) => state );
    const [openModal, setOpenModal] = React.useState(false);
    const [ modalTitle, setModalTitle ] = useState<string>(' ');
    const [ loading, setLoading ] = useState<boolean>(false);
    const dispatch = useDispatch();


    useEffect(() => {
        if( ui.modalPremium ) {
            handleModal();
            if( ui.titleModalPremium ) {
                setModalTitle( ui.titleModalPremium );
            }
        }
    },[ui])

    const handleModal = () => setOpenModal(!openModal);

    const handleStartFreeTrial = async () => {
        {
            const dateModified = add(new Date(), {
                days: 7,
              })

              if( auth?.uid ) {
                const result = await subscribe( auth.uid, "proWithFreeTrial", undefined, undefined, dateModified);
                dispatch( updateSubscription( result.subscription ) );
                dispatch( updatePlan( result.plan ) );

              }

        }
    }

    const handleValidateCode = () => console.log('validating');

    return {
        handleStartFreeTrial,
        openModal,
        handleModal,
        modalTitle,
        setModalTitle,
        loading,
        setLoading,
        handleValidateCode, 
        plan,
        auth,
        subscription
    }
}

export const ModalPremium = ({ handleModal, openModal, modalTitle, loading, handleValidateCode, auth, plan, subscription, handleStartFreeTrial }: ModalPremiumType) => {
    const [ planMode, setPlanMode ] = useState<"free" | "expired" | "proWithFreeTrial" | "proMonthly" | "proAnnual" | "proLifetime">( 'proMonthly' );
    const theme = useTheme();

    const handleChangeMode = (
        event: React.MouseEvent<HTMLElement>,
        newMode: "free" | "expired" | "proWithFreeTrial" | "proMonthly" | "proAnnual" | "proLifetime",
        ) => {
            setPlanMode(newMode);
        };
  

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
                {
                   ( plan.name === "proWithFreeTrial" || plan.name === "proMonthly" || plan.name === "proAnnual") && ( !subscription.isExpired ) && (
                        <>
                            <Typography
                                align="center"
                                variant="h4"
                                sx={{ mt: 3, fontWeight: 500, color: theme.palette.text.primary }}
                            >
                                ¡Ya eres Zoner Pro!
                            </Typography>
                            <Typography
                                align="center"
                                sx={{ mt: 3, color: theme.palette.text.primary }}
                            >
                                {
                                    plan.name === "proWithFreeTrial" ? 
                                    (`Tu prueba gratuita termina el día ${ 
                                        format( new Date( subscription.activeUntil ), 'dd/MMMM/yyyy', { locale: es } ) 
                                    }`) : (
                                        `¡Tu subscripción está activa!`
                                    )
                                }
                            </Typography>
                            {
                                plan.name === ("proAnnual" || "proMonthly" ) && (
                                    <>
                                        <Typography
                                            align="center"
                                            variant="caption"
                                            sx={{ mt: 3, color: theme.palette.text.secondary }}
                                        >
                                            Podrás administrar tu subscripción en tu cuenta de PayPal
                                        </Typography>{ ' ' }
                                        <Link variant="caption" color="secondary" target="_blank" href="https://www.paypal.com/es/smarthelp/article/%C2%BFc%C3%B3mo-puedo-cancelar-una-suscripci%C3%B3n-u-otros-pagos-autom%C3%A1ticos-faq2254">
                                            Ver como 
                                        </Link>
                                    </>
                                    
                                )
                            }
                       
                            <StyledButton
                                sx={{
                                    mt: 3
                                }}
                                variant="contained"
                                fullWidth
                                onClick={ handleModal }
                            >
                                ¡Continúa explorando!
                            </StyledButton>
                        </>
                    )
                }
                {
                    ( plan.name === "free" || subscription.isExpired ) && (
                        <>
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
                            {
                                planMode === 'proAnnual' && (
                                    <Typography
                                        align="center"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            textDecoration: 'line-through'
                                        }}
                                        variant="body2"
                                    >
                                        $588/año
                                    </Typography>
                                )
                            }

                            <Typography
                                align="center"
                                color="primary"
                                variant="h5"
                                id="modal-modal-description"
                                sx={{ mb: 3 }}
                            >
                                {
                                    planMode === 'proAnnual' ?
                                    '$294/año' : '$49/mes'
                                }
                            </Typography>
                            <ToggleButtonGroup
                                sx={{ position: 'relative', mb: 2 }}
                                color="primary"
                                value={ planMode }
                                exclusive
                                onChange={ handleChangeMode }
                                fullWidth
                                size="small"
                            >
                                <ToggleButton
                                    sx={{
                                        textTransform: 'none'
                                    }}
                                    value="proMonthly"
                                >
                                    Mensual
                                </ToggleButton>
                                <ToggleButton
                                    sx={{
                                        textTransform: 'none'
                                    }}
                                    
                                    value="proAnnual"
                                >
                                    Anual
                                </ToggleButton>
                                <Chip
                                    sx={{
                                        position: 'absolute',
                                        top: -10,
                                        right: -10
                                    }}
                                    size="small"
                                    label="-50% off"
                                />
                            </ToggleButtonGroup>
                            {
                                subscription.isExpired ? (
                                    <PaypalButtonComponent
                                        user={ auth.uid }
                                        planName={ planMode }
                                    />
                                ) : (
                                    <Grid spacing={1} container>
                                        {
                                            handleStartFreeTrial && (
                                                <Grid
                                                    xs={12}
                                                    item
                                                >
                                                    <StyledButton
                                                        variant="contained"
                                                        color="secondary"
                                                        fullWidth
                                                        startIcon={<img src={Premium} style={{ width: 12 }} alt="img-icon" />}
                                                        onClick={ handleStartFreeTrial }
                                                    >
                                                        ¡Probar gratis por 7 días!
                                                    </StyledButton>
                                                </Grid>
                                            )
                                        }
                                        
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
                                )
                            }
                  
                         </>
                    )
                }
                </Box>
                
                
            </Box>
        </Modal>
    )
}