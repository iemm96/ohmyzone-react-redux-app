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
    const { vibrant, lightVibrant, lightMuted, darkMuted, muted, darkVibrant, mode: modeState } = useSelector( (state:any) => state.theme );

    const { children } = props;
    const [ mode, setMode ] = useState<PaletteMode>( 'dark' );
    const [ theme, setTheme ] = useState<any>(null);
    const defaultTheme:DefaultThemeType = {
        primaryMainLight: '#4664F6',
        primaryMainDark: '#4664F6',
        secondaryMain: '#6EFAFB',
        backgroundLight: '#F8FAFF',
        backgroundDark: '#010413',
        paperDark: '#030C3A',
        paperLight: '#C5CEFC',
    };

    useEffect(() => {
        setMode( modeState ? modeState : 'dark' );
        setTheme(createTheme(getDesignTokens(modeState)));

        if( modeState === 'light') {
            document.body.style.backgroundColor = lightVibrant ? lightVibrant : defaultTheme.paperLight;
        }else {
            document.body.style.backgroundColor = darkVibrant ? darkVibrant : defaultTheme.paperDark;
        }

    },[ modeState, lightVibrant, darkVibrant ]);
    
    useEffect(() => {
        setTheme(createTheme(getDesignTokens(mode)));
    },[ lightMuted, darkMuted, muted, darkVibrant, lightVibrant, vibrant ]);


    useEffect(() => {
       
        if( mode === 'light') {
            document.body.style.backgroundColor = darkMuted ? darkMuted : defaultTheme.paperLight;
        }else {
            document.body.style.backgroundColor = darkVibrant ? darkVibrant : defaultTheme.paperDark;
        }
    },[ darkVibrant ])

    const getDesignTokens = (mode: PaletteMode) => ({
        palette: {
            mode,
            ...(mode === 'light'
              ? {
                    // palette values for light mode
                    primary: {
                        main: vibrant ? vibrant : defaultTheme.primaryMainLight
                    },
                    secondary: {
                        main: muted ? muted : defaultTheme.secondaryMain,
                    },
                    background: {
                        default: lightMuted ? lightMuted : defaultTheme.backgroundLight,
                        paper: lightVibrant ? lightVibrant : defaultTheme.paperLight,
                    },
                }
              : {
                    // palette values for dark mode
                    primary: {
                        main: vibrant ? vibrant : defaultTheme.primaryMainDark
                    },
                    secondary: {
                        main: muted ? muted : defaultTheme.secondaryMain,
                    },
                    background: {
                        default: darkMuted ? darkMuted : defaultTheme.backgroundDark,
                        paper: darkVibrant ? darkVibrant : defaultTheme.paperDark
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