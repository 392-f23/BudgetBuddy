import React from 'react'
import logo  from '../assets/budget buddy.png'
import { AppBar, Box, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';


function Header() {
    const theme = useTheme();
    const primaryColor = theme.palette.primary[1];
    const secondaryColor = theme.palette.primary[2];
  return (
    <Box>
        <AppBar position="static">
            <Toolbar variant="dense" style={{display: 'flex', alignSelf: 'center'}}>
                {/* todo: add this back once it's functional */}
                {/* <IconButton edge="start" color="" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon style={{ backgroundColor: primaryColor, color: secondaryColor, padding: '8px', borderRadius: '25px' }} />
                </IconButton> */}
                <Box style={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
                    <Typography variant="h4" component="div" style={{color: secondaryColor}}>
                        BudgetBuddy 
                    </Typography>
                    <Typography variant="" component="div" style={{color: secondaryColor}}>
                        Welcome back David! 
                    </Typography>
                </Box>
                <Box
                    component="img"
                    src={logo}
                    width="125px"
                    height="100px"
                >
                </Box>
                
            </Toolbar>
        </AppBar>
    </Box>
    
  )
}

export default Header