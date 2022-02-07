import { Button, Typography } from "@mui/material";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();
    const { name } = useSelector( ( state:any ) => state.auth );

    useEffect(() => {

    },[]);

    return(
        <>
            <Typography>
                ¡Bienvenido! { name }
                crea tu OhMyZone en segundos!
            </Typography>
            <Button
                variant="contained"
                onClick={ () => navigate( '/zones/new/1' ) }
            >
                ¡Comenzar!
            </Button>
        </>
    )
}

export default Welcome;