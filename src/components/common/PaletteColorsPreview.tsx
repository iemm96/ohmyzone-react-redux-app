import { Box } from '@mui/system';

const PaletteColorsPreview = ({data}:{data:any}) => {
    return(
        <Box sx={{padding: '1rem 0'}} display="flex" justifyContent="space-evenly">
            <Box sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: data.vibrant
            }}/>
            <Box sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: data.muted
            }}/>
            <Box sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: data.lightMuted
            }}/>
            <Box sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: data.darkVibrant
            }}/>
            <Box sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: data.lightVibrant
            }}/>
            <Box sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    backgroundColor: data.darkMuted
            }}/>
        </Box>
    )
}

export default PaletteColorsPreview;
