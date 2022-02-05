import { useState } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";


const Theme = (props:any) => {
    const { children } = props;
    const [darkMode,setDarkMode] = useState<Boolean>(true);

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: '#F77F00',
            },
            secondary: {
                main: darkMode ? '#003049' : '#F8FAFF',
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