import { Container, Typography, Grid, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchRecord } from "../actions/fetchRecord";
import CircularProgressComponent from "../components/CircularProgressComponent";
import CurrentSubscription from "../components/CurrentSubscription";

const UserSubscription = () => {
    const { subscription } = useSelector( (state:any) => state );
    const theme = useTheme();
    const [ currentSubscription, setCurrentSubscription ] = useState<any>( null );

    useEffect(() => {
        getSubscription().then();
    },[]);

    const getSubscription = async () => {
        const subscriptionResult = await fetchRecord( 'subscriptions', subscription?.uid );
        setCurrentSubscription( subscriptionResult.subscription );
    }

    return(
        <Container>
            <Typography variant="caption" sx={{ color: theme.palette.text.primary }}>
                    Subscripción actual
            </Typography>
            {
                currentSubscription ? (
                    <Grid container>
                        <Grid item xs={ 12 }>
                            <CurrentSubscription data={ currentSubscription }/>
                        </Grid>
                    </Grid>
                ) : (
                    <CircularProgressComponent/>
                )
            }

        </Container>
    )
}

export default UserSubscription;