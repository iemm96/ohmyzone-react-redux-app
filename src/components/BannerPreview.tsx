import { useTheme, styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Grid, Avatar, Typography, IconButton } from '@mui/material';
import { Email, Phone, Facebook, Instagram } from '@mui/icons-material';

const BannerPreview = ({ data, backgroundImageUrl }:{ data:any, backgroundImageUrl?:string }) => {
    const theme = useTheme();

    console.log( backgroundImageUrl )
    const StyledBackgroundContainer = styled('div')(({theme}) => ({
        backgroundImage: `url(${ backgroundImageUrl })`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top',
        backgroundSize: 'cover',
        
        position: 'absolute',
        zIndex: 0,
        height: 500,
        width: '100%',
    }));

    const StyledTraslucidLayer = styled('div')(() => ({
        backgroundColor: 'rgba(0,0,0,0.3)',
        height: 500,
        width: '100%',
        position: 'absolute',
        zIndex: 1
    }));

    return(
        <Box sx={{
            position: 'fixed',
            zIndex: 0,
            width: 320,
            height: 500,
            backgroundColor: theme.palette.background.default          
        }}>
            {
            backgroundImageUrl && 
                <>
                    <StyledTraslucidLayer/>
                    <StyledBackgroundContainer/>
                </>
            }
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
                        zIndex: 1,
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
                            <Typography align="center" variant="h5">{ data.title ? data.title : 'Título de tu Zone' }</Typography>
                        </Grid>
                        { data.subtitle &&
                        <Grid item xs={12}>
                            <Typography align="center" variant="h6">{ data.subtitle }</Typography>
                        </Grid>}
                        <Grid item xs={12}>
                            <Typography align="center">{ data.description }</Typography>
                        </Grid>
                    </Grid>
                    <Grid sx={{ justifyContent: 'center' }} container spacing={2}>
                        { data?.socialLinks?.phone &&
                            <Grid item>
                                <IconButton sx={{
                                    backgroundColor: theme.palette.primary.main
                                }} aria-label="mail">
                                    <Phone fontSize="medium" />
                                </IconButton>
                            </Grid>
                        }
                        { data?.socialLinks?.email && (
                            <Grid item>
                                <IconButton
                                sx={{
                                    backgroundColor: theme.palette.primary.main
                                }}
                                aria-label="mail">
                                    <Email fontSize="medium" />
                                </IconButton>
                            </Grid>
                        )}
                        { data?.socialLinks?.facebook && (
                            <Grid item>
                                <IconButton
                                sx={{
                                    backgroundColor: theme.palette.primary.main
                                }}
                                aria-label="mail">
                                    <Facebook fontSize="medium" />
                                </IconButton>
                            </Grid>
                        )}
                        {  data?.socialLinks?.instagram && (
                            <Grid item>
                                <IconButton
                                sx={{
                                    backgroundColor: theme.palette.primary.main
                                }} aria-label="mail">
                                    <Instagram fontSize="medium" />
                                </IconButton>
                            </Grid>
                        )}
                        
                    </Grid>
                </Box>
            </Container>
        </Box>
    )

}

export default BannerPreview;