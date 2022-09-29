import Header from "./Header";
import { Outlet, useNavigate, useParams } from 'react-router-dom';
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
    const params = useParams();
    const { handleModal, openModal, modalTitle, handleStartFreeTrial, plan, auth , subscription } = useModalPremium();

    useEffect(() => {
        if( ui?.showModalPremium ) {
            handleModal();
        }
    },[ ui?.showModalPremium ])

    useEffect( ( ) => {
        validateJWT( params?.token ).then();
    }, [ ] );

    const validateJWT = async (token:string | undefined | null) => {
        
        if( !token ) {
            token = localStorage.getItem('token');
        }

        if( token ) {

            try {
                const result:any = await dispatch( startValidateJWT( token ) );
                if( result?.success === false ) {
                    localStorage.removeItem('token');
                    navigate('/');
                }
            }catch (e) {
                console.log(e);
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
                    plan={ plan }
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