import { createTheme } from '@mui/material/styles';

export const defaultTheme = createTheme({
    typography: {
        button: {
            textTransform:'none',
        },
    },
    palette: {
        mode:'light',
        primary: {
            light: '#000B57',
            main: '#4664F6',
            dark: '#0F0338'
        }
    }
});