import { Box, styled } from "@mui/system";
import { Colors } from "../theme";
import { Typography } from "@mui/material";



export const PromotionsContainer = styled(Box)(({theme})=>({
    [theme.breakpoints.up('md')]:{
        padding: '20px 0px 20px 0px',
    },
    display:'flex',
    justifyContent: 'center',
    alignItems:'center',
    padding:'10px 0px 10px 0px',
    overflow:'hidden',
    background: Colors.black,
    
}));

export const MessageText = styled(Typography)(({theme})=>({
    fontFamily: '"Montez","cursive"',
    [theme.breakpoints.up('md')]:{
        fontSize: '3rem',
    },
    fontSize: '1.5rem',
    color: Colors.white,
    
}));