import { ThemeProvider} from '@mui/material/styles'; 
import { Box, Container,Typography } from '@mui/material';
import { useEffect } from 'react';
import theme from './styles/theme';
import Appbar from './components/appbar';
import Banner from './components/Banner';
import Promotions from './components/promotions';
import Products from './components/products';
import Footer from './components/footer';
import AppRoutes from './routes/AppRoutes';


function App() {
  

  return (
    <ThemeProvider theme={theme}>


    <AppRoutes/>

      


      </ThemeProvider>
  );
}


export default App;
