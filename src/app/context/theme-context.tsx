import { PaletteMode } from '@mui/material';
import React, { createContext, useContext, useState } from 'react'
import { OwnProps } from '../utils/types';

const ThemeContext = createContext<themeContextType>({ themeMode: "light", handleThemeMode() { } });



export const ThemeProvider: React.FC<OwnProps> = (props: OwnProps) => {
    const [themeMode, setTheme] = useState<'light' | 'dark'>("light");

    const handleThemeMode = () => {
        setTheme((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    }
    const value: themeContextType = {
        themeMode,
        handleThemeMode
    }
    return <ThemeContext.Provider value={value}>{props.children}</ThemeContext.Provider>
}

export function useThemeContext() {
    return useContext(ThemeContext)
}

interface themeContextType {
    themeMode: PaletteMode;
    handleThemeMode?: () => void;
}