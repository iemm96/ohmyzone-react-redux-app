import { Grid, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import SavedLink from './SavedLink';
import Box from '@mui/material/Box';
import withTheme from './WithTheme';
import { useTheme } from '@mui/material/styles';

const MainContentZone = ({ data }:{ data:any }) => {
    const theme = useTheme();
    
    return(
        <Paper
            sx={{
                mt: 50,
                backgroundColor: theme.palette.background.paper,
                height: 'auto',
                width: '100%',
                position: 'relative',
                borderRadius: '20px 20px 0 0'
            }}
            
        >
            <Container>
                <Grid container>
                    { data.map( ( itemCategory:any, indexCategory:number ) => (
                        itemCategory.links?.length && itemCategory.links?.length > 0 && 
                        <div key={indexCategory}>
                        <Typography sx={{ mb: 1 }} variant="h6"> 
                            { itemCategory.title && itemCategory.title }
                        </Typography>
                        { itemCategory.links?.map( (itemLink:any, indexLink:number) => (
                            
                            <Box key={indexLink} sx={{ position: 'relative' }}>
                                <SavedLink data={ itemLink } disableEdit/>
                            </Box>
                            
                        ))}
                        </div> 
                    ))}
                </Grid>
            </Container>
        </Paper>
    )
}

export default withTheme(MainContentZone);