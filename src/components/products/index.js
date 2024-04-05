import { Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { products } from "../../data";
import { Container } from "@mui/system";
import SingleProduct from "./SingleProduct";
import SingleProductDesktop from "./SingleProductDestop";


export default function Products(){
    const theme = useTheme();
    const matches= 
        useMediaQuery(theme.breakpoints.down('md'));
    const renderProducts = products.map(product=>(
       <Grid item 
       key={product.id} 
       xs={2}
       sm={4}
       md={4}
       display="flex"
       flexDirection={"colum"}
       alignItems="center">
        {matches? (
            <SingleProductDesktop product={product} matches={matches}/>
        ):(
            <SingleProduct product={product} matches={matches}/>
        )}
        

       </Grid>

    ));

    return (
        <Container>
            <Grid
            container
            spacing={{xs:2, md:3}}
            justifyContent={"center"}
            sx={{margin: '20px 4px 10px 4px'}}
            columns={{xs:4,sm:8,md:12}}>
                {renderProducts}
            </Grid>
        </Container>
    );
}