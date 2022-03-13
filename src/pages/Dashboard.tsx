import { Container, Grid, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchRecords } from '../actions/fetchRecords';
import { useSelector, useDispatch } from 'react-redux';
import SavedZone from '../components/SavedZone';
import { useNavigate } from 'react-router-dom';
import StyledButton from '../styled/StyledButton';
import { Add } from '@mui/icons-material';
import Premium from '../assets/icons/premium.svg';
import { ModalPremium, useModalPremium } from '../components/ModalPremium';
import { clearSelectedZone } from '../actions/zones';
import { clearSelectedTheme } from '../actions/themes';

const Dashboard = () => {
    const { uid, plan } = useSelector( (state:any) => state.auth );
    const [ userZones, setUserZones ] = useState<any>([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { handleModal, openModal } = useModalPremium();

    useEffect(() => {
        dispatch( clearSelectedTheme() )
        dispatch( clearSelectedZone() );
        getRecords().then();
    }, [ uid ]);

    const getRecords = async () => {

        if( uid ) {
            const { zones } = await fetchRecords( `zones/byUser/${ uid }` );

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
            <ModalPremium
                handleModal={ handleModal }
                openModal={ openModal }
                modalTitle={ "Es momento de ser un Zoner Pro para crear Zones ilimitados" }
            />
            <Container maxWidth="md">
                <Grid justifyContent="right" container>
                    <Grid item>
                        <StyledButton
                            startIcon={ <Add/> }
                            variant="contained"
                            color="secondary"
                            endIcon={ <img src={ Premium } style={{ width: 12 }} alt="img-icon" /> }
                            onClick={  plan === 'free' ? () => handleModal() : () => navigate('/zones/new/1') }
                        >
                            Crear nuevo Zone
                        </StyledButton>
                    </Grid>
                </Grid>
                <Grid sx={{ mt: 2 }} spacing={ 2 } container>
                    { userZones.length > 0 && userZones.map((item:any,index:number) => (
                        <Grid key={ index } xs={ 12 } item>
                            <SavedZone
                                data={ item }
                                getZones={ getRecords }
                            />
                        </Grid>
                    )) }
                    
                </Grid>
            </Container>
        </Paper>
    )
}

export default Dashboard;