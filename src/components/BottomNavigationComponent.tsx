import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { AccountBox, ColorLens, Home, Interests, Link } from '@mui/icons-material';
export const useBottomNavigationComponent = () => {
    const [ currentNav, setCurrentNav ] = React.useState(0);

    return {
        currentNav,
        setCurrentNav
    }
}

type BottomNavigationComponentProps = {
    currentNav: number;
    setCurrentNav: any;
}

export const BottomNavigationComponent = ( { currentNav, setCurrentNav }:BottomNavigationComponentProps ) => {
    

    return(
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 20 }} elevation={ 4 }>
            <BottomNavigation
                showLabels
                value={ currentNav }
                onChange={(event, newValue) => {
                    setCurrentNav(newValue);
                }}
            >
                <BottomNavigationAction label="Inicio" icon={<Home/>} />
                <BottomNavigationAction label="Portada" icon={<AccountBox />} />
                <BottomNavigationAction label="Botones" icon={<Interests/>} />
                <BottomNavigationAction label="Enlaces" icon={<Link/>} />
                <BottomNavigationAction label="Temas" icon={<ColorLens/>} />
           
            </BottomNavigation>
        </Paper>
    )
}
