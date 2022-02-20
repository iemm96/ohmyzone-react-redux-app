import { Stepper, Step, StepLabel, Box, LinearProgress, Typography, Grid } from '@mui/material';

const StepperComponent = ( { actualStep, totalSteps }:{ actualStep:string | undefined, totalSteps:number } ) => {
    return(
        <Grid sx={{ alignItems: 'center' }} container>
            <Grid xs={ 9 } item>
                { actualStep &&<LinearProgress variant="determinate" value={ (parseInt(actualStep) / totalSteps ) * 100 } /> }
            </Grid>
            <Grid sx={{ justifyContent: 'right', display: 'flex' }} xs={ 3 } item>
                <Typography sx={{ opacity: 0.5 }} variant="caption">Paso { actualStep } de { totalSteps }</Typography>
            </Grid>
        </Grid>
    )
}

export default StepperComponent;