import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import { AccountBox, ColorLens, Home, Link } from '@mui/icons-material';
import { BottomNavigationComponent, useBottomNavigationComponent } from '../components/BottomNavigationComponent';
import withTheme from '../components/WithTheme';
import PreviewSection from './zoneForm/PreviewSection';
import CoverSection from './zoneForm/CoverSection';
import { Container } from '@mui/material';
import { LinksSection } from './zoneForm/LinksSection';
import ThemeSection from './zoneForm/ThemeSection';

const ZoneDashboard = () => {
    const  { currentNav, setCurrentNav } = useBottomNavigationComponent();

    return(
        <Box>
            <Container>
                {
                    currentNav === 0 && (
                        <>
                            <PreviewSection/>
                        </>
                    )
                }
                {
                    currentNav === 1 && (
                        <>
                            <CoverSection fullForm/>
                        </>
                    )
                }
                {
                    currentNav === 2 && (
                        <>
                            <LinksSection/>
                        </>
                    )
                }
                {
                    currentNav === 3 && (
                        <>
                            <ThemeSection/>
                        </>
                    )
                }
            </Container>
            
            <BottomNavigationComponent
                currentNav={ currentNav }
                setCurrentNav={ setCurrentNav }
            />
        </Box>
    )
}

export default withTheme( ZoneDashboard );