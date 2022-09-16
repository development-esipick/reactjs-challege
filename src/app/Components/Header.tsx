import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';

import { useThemeContext } from '../context/theme-context'

export default function ButtonAppBar() {
    const { themeMode, handleThemeMode } = useThemeContext()

    const currentTheme = useTheme();


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar >
                    <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "left" }}>
                        Where in the World ?
                    </Typography>
                    <div>
                        {themeMode} mode
                        <IconButton sx={{ ml: 1 }} onClick={handleThemeMode} color="inherit">
                            {currentTheme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>

        </Box>
    );
}
