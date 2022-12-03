import { createTheme } from '@mui/material/styles';

export const defaultTheme = createTheme({
    typography: {
        button: {
            textTransform:'none',
        },
    },
    palette: {
        mode:'dark',
        primary: {
            light: '#8A9DF9',
            main: '#4664F6',
            dark: '#0F0338'
        }
    }
});