import { ThemeProvider} from '@mui/material/styles'; 
import { Box, Container,Typography } from '@mui/material';
import { useEffect } from 'react';
import theme from './styles/theme';
import Appbar from './components/appbar';
import Banner from './components/Banner';
import Promotions from './components/promotions';
import Products from './components/products';
import Footer from './components/footer';


function App() {
  
  useEffect(()=>{
    document.title = "Home Page";
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ background: '#fff' }}>

         <Appbar/>
         <Banner/>
         <Promotions/>
         <Box display="flex" justifyContent={"center"} sx={{p: 4}}>
          <Typography variant='h4'>Our Products</Typography>
         </Box>
         <Products/>
         <Footer/>


      </Container>
      </ThemeProvider>
  );
}


export default App;
