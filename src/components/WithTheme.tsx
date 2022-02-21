import { useState, useEffect, useMemo } from 'react';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSelector } from 'react-redux';
import { PaletteMode } from '@mui/material';

type DefaultThemeType = {
    primaryMainLight: string;
    primaryMainDark: string;
    secondaryMain: string;
    backgroundLight: string;
    backgroundDark: string;
    paperDark: string;
    paperLight: string;
}

const Theme = (props:any) => {
    const { primaryMain, secondaryMain, background } = useSelector( (state:any) => state.theme );

    const { children } = props;
    const [ mode, setMode ] = useState<PaletteMode>( 'dark' );
    const [ theme, setTheme ] = useState<any>(null);
    const [ defaultTheme, setDefaultTheme ] = useState<DefaultThemeType>({
        primaryMainLight: '#4664F6',
        primaryMainDark: '#4664F6',
        secondaryMain: '#141B41',
        backgroundLight: '#F8FAFF',
        backgroundDark: '#010413',
        paperDark: '#030C3A',
        paperLight: '#C5CEFC',
    });

    useEffect(() => {
        setTheme(createTheme(getDesignTokens(mode)));
    },[ primaryMain ]);


    useEffect(() => {
       

        if( mode === 'light') {
            document.body.style.backgroundColor = background ? background : defaultTheme.paperLight;
        }else {
            document.body.style.backgroundColor = background ? background : defaultTheme.paperDark;
        }
    },[])

    const getDesignTokens = (mode: PaletteMode) => ({
        palette: {
            mode,
            ...(mode === 'light'
              ? {
                    // palette values for light mode
                    primary: {
                        main: primaryMain ? primaryMain : defaultTheme.primaryMainLight
                    },
                    secondary: {
                        main: secondaryMain ? secondaryMain : defaultTheme.secondaryMain,
                    },
                    background: {
                        default: background ? background : defaultTheme.backgroundLight,
                        paper: defaultTheme.paperLight,
                    },
                }
              : {
                    // palette values for light mode
                    primary: {
                        main: primaryMain ? primaryMain : defaultTheme.primaryMainDark
                    },
                    secondary: {
                        main: secondaryMain ? secondaryMain : defaultTheme.secondaryMain,
                    },
                    background: {
                        default: background ? background : defaultTheme.backgroundDark,
                        paper: defaultTheme.paperDark,
                    },
                }),
          },
    })
  
    return <ThemeProvider theme={theme ? theme : createTheme(getDesignTokens(mode))}>{children}</ThemeProvider>
  }
  
  export default function withTheme(Component:any) {
    return (props?:any) => (
        <Theme>
            <Component {...props}/>
        </Theme>
    )
  };