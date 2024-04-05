import { IconButton } from "@mui/material";
import { AppbarContainer, AppbarHeader } from "../../styles/appbar";
import Action from "./actions";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

export default function AppbarMobile({matches}){

    return (
        <AppbarContainer>
            <IconButton>
                <MenuIcon/>
            </IconButton>
            <AppbarHeader textAlign={"center"} variant="h4">
                MAKER-MATE
            </AppbarHeader>
            <IconButton>
                <SearchIcon/>
            </IconButton>
            <Action matches={matches}/>
        </AppbarContainer>
    );
}