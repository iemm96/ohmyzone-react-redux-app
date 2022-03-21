import Box from '@mui/material/Box';
import { BottomNavigationComponent, useBottomNavigationComponent } from '../components/BottomNavigationComponent';
import withTheme from '../components/WithTheme';
import PreviewSection from './zoneForm/PreviewSection';
import CoverSection from './zoneForm/CoverSection';
import { Container, useTheme, useMediaQuery, Grid } from '@mui/material';
import { LinksSection } from './zoneForm/LinksSection';
import ThemeSection from './zoneForm/ThemeSection';
import ZonePhonePreview from '../components/ZonePhonePreview';
import SocialIconsSection from './zoneForm/SocialIconsSection';

const ZoneDashboard = () => {
    const theme = useTheme();
    const  { currentNav, setCurrentNav } = useBottomNavigationComponent();
    const mediaQuery = useMediaQuery(theme.breakpoints.up('md'));

    return(
        <Box>
            <Container>
                <Grid container justifyContent="center">
                    <Grid  xs={ 12 } md={ 6 } item>
                        {
                            currentNav === 0 && (
                                <>
                                    <PreviewSection fullForm/>
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
                                    <SocialIconsSection fullForm/>
                                </>
                            )
                        }
                        {
                            currentNav === 3 && (
                                <>
                                    <LinksSection fullForm/>
                                </>
                            )
                        }
                        {
                            currentNav === 4 && (
                                <>
                                    <ThemeSection fullForm/>
                                </>
                            )
                        }
                        
                    </Grid>
                    {
                        (mediaQuery && currentNav !== 0 ) && (
                            <Grid md={ 6 } item>
                                <ZonePhonePreview/>
                            </Grid>
                        )
                    }
                </Grid>
                
            </Container>
            
            <BottomNavigationComponent
                currentNav={ currentNav }
                setCurrentNav={ setCurrentNav }
            />
        </Box>
    )
}

export default withTheme( ZoneDashboard );