import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { GoogleButton, useGoogleButton } from "./GoogleButton";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "@mui/icons-material";
const { REACT_APP_GOOGLE_CLIENT, REACT_APP_API_HOST } = process.env;

const LoginFooter = ({ backTo }:{ backTo?: string | undefined }) => {
    const navigate = useNavigate();
    const { signIn, loadingGoogle, setLoadingGoogle } = useGoogleButton({
        api_host: REACT_APP_API_HOST ? REACT_APP_API_HOST : '',
        googleClient: REACT_APP_GOOGLE_CLIENT ? REACT_APP_GOOGLE_CLIENT : ''
    });
      
    return(
        <Box sx={{
            pb: 2,
            width: '100%'
          }}>
            <Box mt={12} mb={4}>
              <Divider sx={{
                mb:1,
                "&.MuiDivider-root": {
                  "&::before": {
                    borderTop: "thin solid #AAAFB6"
                  },
                  "&::after": {
                    borderTop: "thin solid #AAAFB6"
                  }
                },
                "& .MuiDivider-wrapper": {
                  fontSize: 12,
                  color: '#AAAFB6'
                }
              }}>
                  O bien
              </Divider>
              <Grid item xs={12}>
                <GoogleButton signIn={ signIn } loadingGoogle={ loadingGoogle } setLoadingGoogle={ setLoadingGoogle } />
              </Grid>
            </Box>
            <Grid mb={4} container>
              <Grid item xs={12} justifyContent="center" display="flex">
                <Typography sx={{color: '#AAAFB6'}}>¿Aún no tienes cuenta?</Typography>
                <Button 
                    onClick={ 
                        () => navigate('/register') } 
                        sx={{p: 0, color: '#8A9DF9', fontWeight: 600, marginLeft:1}}
                    >
                        Regístrate
                    </Button>
              </Grid>
              {
                backTo && (
                    <Grid item xs={ 12 } my={4}>
                        <Grid item xs={12} justifyContent="center" display="flex">
                            <Button 
                                onClick={ () => navigate(backTo) }
                                sx={{color: '#4664F6'}}
                                startIcon={ <ChevronLeft/> }
                            >
                                Volver
                            </Button>
                        </Grid>
                    </Grid>
                )
              }
            </Grid>
        </Box>
    )
}

export default LoginFooter;