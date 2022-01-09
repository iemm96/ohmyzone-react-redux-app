import { createTheme } from "@mui/material/styles";

export const defaultTheme = createTheme({
    typography: {
        fontFamily: '"Poppins", sans-serif',
        button: {
            textTransform:'none',
            fontWeight: 700
        },
        h5: {
            fontWeight: 700
        },
        h6: {
            fontWeight: 700
        }
    },
    palette: {
        mode:'dark',
        primary: {
            light: '#000B57',
            main: '#4664F6',
            dark: '#0F0338'
        },
        secondary: {
            main: '#FF1177'
        }
    }
});