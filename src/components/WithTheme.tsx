import { useState } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from 'react-redux';


const Theme = (props:any) => {
    const { primaryMain, secondaryMain } = useSelector( (state:any) => state.theme );

    const { children } = props;
    const [ darkMode,setDarkMode ] = useState<Boolean>(true);

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: primaryMain ? primaryMain : '#F77F00',
            },
            secondary: {
                main: secondaryMain ? secondaryMain : '#F8FAFF',
            },
        },
    })
  
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  }
  
  export default function withTheme(Component:any) {
    return (props?:any) => (
        <Theme>
            <Component {...props}/>
        </Theme>
    )
  };