import React, { useState,useEffect } from 'react';
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
import { Col } from 'antd';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { AppBar, Drawer, DrawerHeader } from './Drawer.tsx';
import { OPEN_ROUTES, VENDOR_DRAWER_LIST } from '../../../utils/constants';
import './Dashboard.css';
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { logOut } from '../../../apis/authentication..js';
import Profile from '../Profile/Profile.js';
import { connect } from 'react-redux';
import { setProgress } from '../../../actions/allAction.js';
import { openNotificationWithIcon } from '../../../utils/helper.js';

const Dashboard = (props) => {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [tab, setTab] = useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    const list = VENDOR_DRAWER_LIST.filter((item) => {
      return item.route===window.location.pathname
    })
    setTab(list[0].id)
    },[window.location.pathname])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const selectTab = (e,item) => {
    if(item.id==0 && props.progress<=90){
      openNotificationWithIcon('error',"Please Complete Profile.","Progress Bar should be above 90 Percent","")
    }
    else{
    setTab(item.id);
    }
  };

  const getLogout = async () => {
    try{
      await logOut()
      sessionStorage.clear();
      navigate(OPEN_ROUTES.PARENT_ROUTE)
    }
    catch(err){
      console.log(err)
    }
  }


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} 
      // style={{background:'#001529'}}
      >
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
      <Box style={{  marginLeft:open?'0px':'53px', position: 'absolute' }}>
        <Col>
        <div className="demo-logo" style={{  fontWeight: '700', fontSize: '1.5rem' }}>🛠MAKERS MATE</div>
        </Col>
        </Box>
        <Box style={{ width: '100%', textAlign: 'center', position: 'absolute' }}>
          <Typography variant="h5" noWrap component="div" style={{fontWeight: '550'}}>
            {tab ? VENDOR_DRAWER_LIST[tab].name : VENDOR_DRAWER_LIST[0].name}
          </Typography>
        </Box>
        <Box style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
         <Profile />
        </Box>
      </Toolbar>
    </AppBar>


      <Drawer variant="permanent" open={open} elevation="16">
        <DrawerHeader>
          {
          !open? (  <IconButton
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
          </IconButton>)
          :
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
          }
        </DrawerHeader>
        <Divider />
        <List>
          {VENDOR_DRAWER_LIST.map((item, index) => {
          return( item.name==="Logout"?
          (<ListItem key={index} disablePadding sx={{ display: 'block' }} onClick={getLogout}>
          <ListItemButton  sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }} >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center',}}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>)
          :(<Link to={(item.id==0 && props.progress<=90)?VENDOR_DRAWER_LIST[tab].route:item.route} style={{ color: "inherit", textDecoration: "inherit" }} >  
            <ListItem key={index} disablePadding sx={{ display: 'block' }} onClick={(e) => {selectTab(e,item)}}>
              <ListItemButton  sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }} >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center',}}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            </Link>))
})}  
        </List>
      </Drawer>
   
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{ backgroundColor: '#f0f2f5' }}>
      <DrawerHeader />
          <Outlet />
      </Box>



    </Box>
  );
}


const mapStateToProps = (state) => {
  return {
      progress: state.allReducer.progress
  }
}

const mapDispatchToProps = {
  setProgress
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)