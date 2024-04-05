import { Divider, ListItemButton, ListItemIcon } from "@mui/material";
import {ActionIconContainerMobile,ActionIconContainerDestop, MyList } from "../../styles/appbar";
import  ShoppingCartIcon  from "@mui/icons-material/ShoppingCart";
import FavouriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import { Colors } from "../../styles/theme";


export default function Action({matches}){

     const Component = matches 
    ? ActionIconContainerMobile
    : ActionIconContainerDestop;

    return (
        <Component>
            <MyList type="row">
            <ListItemButton
            sx={{
                justifyContent:"center"
            }} 
            >
                <ListItemIcon
                sx={{
                    display:"flex",
                    justifyContent:"center",
                    color: matches && Colors.secondary,
                }}
                >
                    <ShoppingCartIcon/>
                    </ListItemIcon>
            </ListItemButton>
            <Divider orientation="vertical" flexItem/>
            <ListItemButton
            sx={{
                justifyContent:"center"
            }} 
            >
                <ListItemIcon
                sx={{
                    display:"flex",
                    justifyContent:"center",
                    color: matches && Colors.secondary,
                }}
                >
                    <FavouriteIcon/>
                    </ListItemIcon>
            </ListItemButton>
            <Divider orientation="vertical" flexItem/>
            <ListItemButton
            sx={{
                justifyContent:"center"
            }} 
            >
                <ListItemIcon
                sx={{
                    display:"flex",
                    justifyContent:"center",
                    color: matches && Colors.secondary,
                }}
                >
                    <PersonIcon/>
                    </ListItemIcon>
            </ListItemButton>
            <Divider orientation="vertical" flexItem/>
            </MyList>
        </Component>
        
    )
}