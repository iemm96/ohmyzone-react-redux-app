import { Container, Grid, Paper, Typography, useTheme, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchRecords } from '../actions/fetchRecords';
import { useSelector, useDispatch } from 'react-redux';
import SavedZone from '../components/SavedZone';
import { useNavigate, useParams } from 'react-router-dom';
import StyledButton from '../styled/StyledButton';
import { Add } from '@mui/icons-material';
import Premium from '../assets/icons/premium.svg';
import { clearSelectedZone } from '../actions/zones';
import { clearSelectedTheme } from '../actions/themes';
import { showModalPremium, updateUi } from '../actions/ui';

const Dashboard = () => {
    const { auth, subscription, plan } = useSelector( (state:any) => state );
    const [ userZones, setUserZones ] = useState<any>([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const theme = useTheme();
    const params = useParams();

    useEffect(() => {
        if( params?.token ) {

        }
    },[ ]);
    useEffect(() => {
        dispatch( clearSelectedTheme() )
        dispatch( clearSelectedZone() );
        getRecords().then();
    }, [ auth.uid ]);

    const getRecords = async () => {

        if( auth.uid ) {
            const { zones } = await fetchRecords( `zones/byUser/${ auth.uid }` );

            if( zones ) {

                if( zones.length === 0 ) {
                    navigate( '/zones/new/1' );
                    return;
                }

                setUserZones( zones );
            }

        }
    }

    return (
        <Paper
            elevation={ 0 }
        >
            <Container maxWidth="md">
                {
                   ( ( auth.zonesCounter <= plan?.maxZones ))  && (
                        <Stack direction="row" justifyContent={params?.token ? 'space-between' : 'right'}>
                            {
                                params?.token && (
                                    <Stack>
                                        <Typography color="text.primary" variant="h6">
                                            ¡Bienvenido a OhMyZone!
                                        </Typography>
                                        <Typography color="text.secondary" variant="caption">
                                            ¡Ahora podrás continuar editando tu Zone!
                                        </Typography>
                                    </Stack>
                                )
                                
                            }       
                                <StyledButton
                                    startIcon={ <Add/> }
                                    variant="contained"
                                    color="secondary"
                                    endIcon={ !plan?.isPremium && <img src={ Premium } style={{ width: 12 }} alt="img-icon" /> }
                                    onClick={ ( ( !plan.isPremium ) || ( subscription.isExpired  ) ) ?
                                    () => dispatch( updateUi({
                                        modalPremium: true,
                                        titleModalPremium: "¡Es momento de ser un Zoner pro, para crear un nuevo Zone!" 
                                    }))
                                    :
                                    () => navigate('/zones/new/1')
                                }
                                >
                                    Crear nuevo Zone
                                </StyledButton>
                        </Stack>
                    )
                }
                
                <Grid sx={{ mt: 2 }} spacing={ 2 } container>
                    { userZones.length > 0 && userZones.map((item:any,index:number) => (
                        <Grid key={ index } xs={ 12 } item>
                            <SavedZone
                                data={ item }
                                getZones={ getRecords }
                                isLocked={ subscription?.isExpired }
                            />
                        </Grid>
                    )) }
                </Grid>
                {
                    ( auth.zonesCounter >= plan?.maxZones  ) && (
                        <Typography
                            sx={{
                                mt: 2,
                                color: theme.palette.text.secondary
                            }}
                        >
                            Haz alcanzado el número máximo de Zones disponibles para tu cuenta
                        </Typography>
                    )
                }
                
            </Container>
        </Paper>
    )
}

export default Dashboard;