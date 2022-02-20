import withTheme from '../../components/WithTheme';
import { Container, Paper } from '@mui/material';
import { useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import PreviewSection from './PreviewSection';
import CoverSection from './CoverSection';
import StepperComponent from '../../components/StepperComponent';
import SocialIconsSection from './SocialIconsSection';
import { LinksSection } from './LinksSection';
import { useEffect } from 'react';
import ThemeSection from './ThemeSection';
  
const ZoneForm = () => {
    
    const params = useParams();
    const theme = useTheme();

    useEffect(() => {
        document.body.style.backgroundColor = theme.palette.secondary.main;
    })

    return (
        <> 
            <Paper 
                sx={{
                    pt: 10,
                    height: '100%',
                    backgroundColor: theme.palette.secondary.main,
                    borderRadius: 0
                }}
                elevation={ 0 }
            >
                <Container maxWidth="sm">
                    <StepperComponent actualStep={ params.part } totalSteps={ 4 } />
                    
                    { params.part === '1' && <CoverSection/> }
                    
                    { params.part === '2' && <SocialIconsSection prev={ 1 } next={ 3 }/> }

                    { params.part === '3' && <LinksSection prev={ 2 } next={ 4 }/> }

                    { params.part === '5' && <PreviewSection/> }
                </Container>

                { params.part === '4' && <ThemeSection prev={ 3 } next={ 5 }/> }
            </Paper>
        </>
    )
};

export default withTheme( ZoneForm );
