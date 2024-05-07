import React,{useState} from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box, 
  Toolbar, 
  List, 
  CssBaseline, 
  Typography, 
  Divider, 
  IconButton, 
  ListItem, 
  ListItemButton,
  ListItemIcon, 
  ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { AppBar, Drawer, DrawerHeader } from './Drawer.tsx';
import { VENDOR_DRAWER_LIST } from '../../../utils/constants';



const Dashboard = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [tab,setTab] = useState(0)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const selectTab = (e) => {
    console.log(e.target.key);
    setTab(e.target.key);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginLeft: 10,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
          {tab ? VENDOR_DRAWER_LIST[tab].name:VENDOR_DRAWER_LIST[0].name}
          </Typography>
        </Toolbar>
      </AppBar>


      <Drawer variant="permanent" open={open} elevation="16">
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {VENDOR_DRAWER_LIST.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}  onClick={selectTab}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
               
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
       
      </Box>
    </Box>
  );
}

export default Dashboard
