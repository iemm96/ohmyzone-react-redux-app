import withTheme from '../../components/WithTheme';
import { Container, Paper, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import PreviewSection from './PreviewSection';
import CoverSection from './CoverSection';
import StepperComponent from '../../components/StepperComponent';
import SocialIconsSection from './SocialIconsSection';
import { LinksSection } from './LinksSection';
import ThemeSection from './ThemeSection';
import { useDispatch } from 'react-redux';
  
const ZoneForm = () => {
    
    const params = useParams();
    const theme = useTheme();
    const mediaQuery = useMediaQuery(theme.breakpoints.up('md'));

    return (
        <> 
            <Paper 
                sx={{
                    pt: 10,
                    height: '100%',
                    borderRadius: 0
                }}
                elevation={ 0 }
            >
                <Container maxWidth="lg">
                    { params.part === '5' ? <PreviewSection/> : (
                        <Grid sx={{ justifyContent: 'center' }} container>
                            <Grid md={ 6 } item>
                                <StepperComponent actualStep={ params.part } totalSteps={ 4 } />

                                { params.part === '1' && <CoverSection/> }
                            
                                { params.part === '2' && <SocialIconsSection prev={ 1 } next={ 3 }/> }

                                { params.part === '3' && <LinksSection prev={ 2 } next={ 4 }/> }

                                { params.part === '4' && <ThemeSection prev={ 3 } next={ 5 }/> }

                            </Grid>
                            {
                                mediaQuery && (
                                    <Grid md={ 6 } item>
                                        <PreviewSection/>
                                    </Grid>
                                )
                            }
                        </Grid>
                    )}
                </Container>
            </Paper>
        </>
    )
};

export default withTheme( ZoneForm );
