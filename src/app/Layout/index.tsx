import React from 'react'
import { OwnProps } from '../utils/types';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Header from '../Components/Header'
import { useThemeContext } from '../context/theme-context'

// #252525

const AppLayout: React.FC<OwnProps> = (props: OwnProps) => {
    const { themeMode } = useThemeContext()
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: themeMode,
                    primary: {
                        main: themeMode === 'light' ? 'hsl(0, 0%, 98%)' : 'hsl(209, 23%, 22%)',
                    },
                    secondary: {
                        main: themeMode === 'light' ? 'hsl(209, 23%, 22%)' : '#ffffff',
                    },
                    ...(themeMode === 'dark' && {
                        background: {
                            default: "hsl(207, 26%, 17%)",
                            paper: "hsl(209, 23%, 22%)",
                        }
                    }),
                    ...(themeMode === 'light' && {
                        background: {
                            default: "hsl(0, 0%, 98%)",

                        }
                    })
                },
                typography: {

                },
                components: {
                    MuiButtonBase: {
                        styleOverrides: {
                            root: {
                                backgroundColor: themeMode === 'light' ? '#ffffff' : 'hsl(209, 23%, 22%) !important'
                            }
                        }
                    },
                    MuiTypography: {
                        styleOverrides: {
                            root: {
                                color: themeMode === 'light' ? "hsl(200, 15%, 8%) !important" : "hsl(0, 0%, 100%) !important",
                                fontFamily: "'Roboto', sans-serif;"
                            },
                            h1: {
                                fontWeight: 800,
                            },
                            body1: {
                                fontSize: 14,
                                fontWeight: 600
                            },
                        }
                    }
                }
            }),
        [themeMode],
    );
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header />
                {props.children}
            </ThemeProvider>
        </>
    )
}

export default AppLayout