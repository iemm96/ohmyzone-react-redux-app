import { Box, CircularProgress } from '@mui/material';

const CircularProgressComponent = () => (
    <Box
        sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 400,
        }}
    >
        <CircularProgress/>
    </Box>
)

export default CircularProgressComponent;