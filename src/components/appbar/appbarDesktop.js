import { ListItemButton, ListItemText } from "@mui/material";
import { AppbarContainer, AppbarHeader, MyList } from "../../styles/appbar";
import SearchIcon from "@mui/icons-material/Search" 
import Actions from "./actions"


export default function AppbarDesktop({matches}){

   

    return (
        
        <AppbarContainer>
            <AppbarHeader>MAKER-MATE</AppbarHeader>
            <MyList type="row">
                <ListItemText primary="Home" />
                <ListItemText primary="Shop" />
                <ListItemText primary="About Us" />
                <ListItemText primary="Login" />
                <ListItemButton>
                    <SearchIcon/>
                </ListItemButton>
            </MyList>
            <Actions matches={matches}/>
        </AppbarContainer>
        
    );
}