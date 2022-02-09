import Header from "./Header";
import { Outlet, useNavigate } from 'react-router-dom';
import withTheme from './WithTheme';
import { useEffect } from 'react';
import { startValidateJWT } from '../actions/auth';
import { useDispatch } from 'react-redux';

const DashboardLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect( ( ) => {
        validateJWT().then();
    }, [ ] );

    const validateJWT = async () => {
        
        let token:string | null = localStorage.getItem('token');

        if(token) {
            const result = await dispatch( startValidateJWT(token) );
            if(!result) {
                navigate('/');    
            }
        }else{
            navigate('/');
        }
    }

    return(
        <>
            <Header/>
            <Outlet />
        </>
    )
}

export default withTheme( DashboardLayout );