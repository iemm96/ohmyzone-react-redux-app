import React, { useImperativeHandle } from 'react'
import { Box } from '@mui/system';
import { usePalette } from 'react-palette';

export const ColorPaletteImage = React.forwardRef((props:any,ref:any) => {
    const { data, loading } = usePalette(props.src);

    useImperativeHandle(ref,() => ({
        updatePalette: () => {
            props.setPrimaryColor(data.vibrant);
            props.setSecondaryColor(data.lightVibrant);
        }})
    )
    

    return (
        <div >
            {!loading && 
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
            </Box>}
        </div>
    )
}
)
