import { AppBar, IconButton, ThemeProvider, Toolbar, createTheme,styled,Button, ListItemText, Drawer, List, ListItemButton } from '@mui/material'
import React, { useState } from 'react'
import {Menu as MenuIcon} from '@mui/icons-material'

import './navbar.css';
import { OPEN_ROUTES } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

// import l1 from '../landingpage/Assets/logo.png'

const theme =createTheme({
  palette:{
    mode:'dark',
  }
});

const StyledButton  = styled(Button)({
            marginLeft:'1rem',
            padding:'0.5rem 1rem',
            borderRadius:'1rem',
            border:0,
            color: 'white',
            fontweight:'bold',
            transition:'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
              backgroundImage: 'linear-gradient(to bottom, blue, black)',
}
})

const Navbar = () => {
  const[isDrawerOpen, setIsDrawerOpen]= useState(false)
   const navigate = useNavigate();

  const toggleDrawer=()=>{
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <ThemeProvider theme={theme}>
  <AppBar position='fixed'>
    <Toolbar>
      {/* <img src={l1} alt="Logo" className="logo" /> */}
      {/* <div style={{flexGrow: 1}} />  */}
      <IconButton color='inherit' onClick={toggleDrawer}>
        <MenuIcon className='menu'/>
      </IconButton>
      <div className='nav-button'>
        <StyledButton>Home</StyledButton>
        <StyledButton>Shop</StyledButton>
        <StyledButton>Basket</StyledButton>
        <StyledButton>Checkout</StyledButton>
        <StyledButton onClick={() => {
            navigate(OPEN_ROUTES.SIGNUP)
          }}>Supplier Login</StyledButton>
        <StyledButton onClick={() => { navigate(OPEN_ROUTES.CUSTOMER_SIGNUP) }}>
          Customer Login </StyledButton>
        
      </div>
    </Toolbar>
  </AppBar>

  <Drawer anchor='left' open={isDrawerOpen} onClose={toggleDrawer}>
    <List>
      <ListItemButton>
        <ListItemText primary='Home'/>
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary='Shop'/>
      </ListItemButton>
      <ListItemButton>
        <ListItemText primary='Login'/>
      </ListItemButton>
    </List>
  </Drawer>
</ThemeProvider>

  )
}

export default Navbar
