import Header from "./Header";
import { Outlet, useNavigate } from 'react-router-dom';
import withTheme from './WithTheme';
import { useEffect } from 'react';
import { startValidateJWT } from '../actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from "@mui/system";
import { ModalPremium, useModalPremium } from './ModalPremium';

const DashboardLayout = () => {
    const { ui } = useSelector( (state:any) => state );
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { handleModal, openModal, modalTitle, handleStartFreeTrial, subscription, auth  } = useModalPremium();

    useEffect(() => {
        if( ui?.showModalPremium ) {
            handleModal();
        }
    },[ ui?.showModalPremium ])

    useEffect( ( ) => {
        validateJWT().then();
    }, [ ] );

    const validateJWT = async () => {
        
        let token:string | null = localStorage.getItem('token');

        if( token ) {
            const result = await dispatch( startValidateJWT(token) );

            console.log( result );
            /*
            dispatch( updateSubscription({
                current: 
            }));*/

            if(!result) {
                //navigate('/');    
            }
        }else{
            navigate('/');
        }
    }

    return(
        <>
            <Header/>
                <ModalPremium
                    subscription={ subscription }
                    modalTitle={ modalTitle }
                    handleModal={ handleModal }
                    openModal={ openModal }
                    handleStartFreeTrial={ handleStartFreeTrial }
                    auth={ auth }
                />
            <Box sx={{ mt: 12 }}>
                <Outlet />                
            </Box>
        </>
    )
}

export default withTheme( DashboardLayout );