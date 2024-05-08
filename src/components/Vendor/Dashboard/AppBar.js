import React from 'react'
import {
    Toolbar, 
    Typography, 
    IconButton, 
  } from '@mui/material';
  import MenuIcon from '@mui/icons-material/Menu';
import { VENDOR_DRAWER_LIST } from '../../../utils/constants';

const AppBar = (props) => {
 console.log(props)
  return (
    <div>
        <AppBar position="fixed" open={props.open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            // onClick={() => {props.handleDrawerOpen()}}
            edge="start"
            sx={{
              marginLeft: 10,
            //   ...(props.open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
          {  props.tab ? VENDOR_DRAWER_LIST[props.tab].name:VENDOR_DRAWER_LIST[0].name}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default AppBar
