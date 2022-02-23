import React, { useImperativeHandle } from 'react'
import { Box } from '@mui/system';
import { usePalette } from 'react-palette';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTheme } from '../actions/themes';

export const ColorPaletteImage = React.forwardRef((props:any,ref:any) => {
    const { data, loading } = usePalette(props.src);
    const dispatch = useDispatch();

    useEffect(() => {
        if(data && !loading) {
            props.setCurrentPalette({
                vibrant: data.vibrant,
                lightVibrant: data.lightVibrant,
                darkVibrant: data.darkVibrant,
                muted: data.muted,
                lightMuted: data.lightMuted,
                darkMuted: data.darkMuted
            });
        }
    },[data]);

    useImperativeHandle(ref,() => ({
        updatePalette: () => {
            props.setCurrentPalette({
                vibrant: data.vibrant,
                lightVibrant: data.lightVibrant,
                darkVibrant: data.darkVibrant,
                muted: data.muted,
                lightMuted: data.lightMuted,
                darkMuted: data.darkMuted
            });
            
            if( 
                data

            ) {
                dispatch( updateTheme( 
                    data
                    ) );
            }

    
        }})
    );
    
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
