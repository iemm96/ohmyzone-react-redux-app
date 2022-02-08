import withTheme from '../../components/WithTheme';
import Header from '../../components/Header';
import { Container, Paper } from '@mui/material';
import { useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import PreviewSection from './PreviewSection';
import CoverSection from './CoverSection';
import StepperComponent from '../../components/StepperComponent';
import SocialIconsSection from './SocialIconsSection';
  
const ZoneForm = () => {
    
    const params = useParams();
    const theme = useTheme();

    return (
        <>
            <Header/>
            <Paper 
                sx={{
                    pt: 10,
                    height: '100vh',
                    backgroundColor: theme.palette.secondary.main
                }}
                elevation={ 0 }
            >
                <Container maxWidth="sm">
                    <StepperComponent actualStep={ params.part } totalSteps={ 4 } />
                    { params.part === '1' && <CoverSection/> }
                    
                    { params.part === '2' && <SocialIconsSection prev={ 1 } next={ 2 }/> }

                    { params.part === '4' && <PreviewSection/> }
                </Container>
            </Paper>
        </>
    )
};

export default withTheme( ZoneForm );
