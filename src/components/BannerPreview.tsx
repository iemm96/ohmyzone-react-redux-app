import { useTheme, styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Grid, Avatar, Typography } from '@mui/material';

const BannerPreview = ({ data }:{ data:any }) => {
    const theme = useTheme();

    const StyledBackgroundContainer = styled('div')(({theme}) => ({
        backgroundImage: `url(${ data.backgroundImage })`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        backgroundSize: 'cover',
        
        position: 'absolute',
        zIndex: 0,
        height: 500,
        width: '100%',
        [theme.breakpoints.up('md')]: {
            backgroundSize: '100%',
        },
    }));

    const StyledTraslucidLayer = styled('div')(() => ({
        backgroundColor: 'rgba(0,0,0,0.2)',
        height: 500,
        width: '100%',
        position: 'absolute',
        zIndex: 1
    }));

    return(
        <Box sx={{
            position: 'fixed',
            zIndex: 0,
            width: '100%',
            height: 500,
            top: 50,
        }}>
            <StyledTraslucidLayer/>
            <StyledBackgroundContainer/>
            <Container
                sx={{
                    padding: '2rem 0',
                    display:'flex',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        padding: '1.5rem',
                        zIndex: 1
                    }}
                >
                    <Grid alignItems="center" direction="column" spacing={1} container>
                        <Grid item xs={12}>
                            <Avatar 
                                sx={{
                                    height: 100,
                                    width: 100,
                                    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                                }}
                                alt="Logo brand" 
                                src={ data.profileImage }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography color="secondary" align="center" variant="h5">{ data.title }</Typography>
                        </Grid>
                        { data.subtitle &&
                        <Grid item xs={12}>
                            <Typography color="primary"  align="center" variant="h6">{ data.subtitle }</Typography>
                        </Grid>}
                        <Grid item xs={12}>
                            <Typography color="secondary"  align="center">{ data.description }</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    )

}

export default BannerPreview;