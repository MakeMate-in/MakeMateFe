import { Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import Header from '../landingpage/Header';
import Valueproposition from '../landingpage/Valueproposition';
import Products from '../landingpage/Products';
import ContactForm from '../landingpage/ContactForm';
import Footer from '../landingpage/Footer';
import Navbar from '../landingpage/Navbar';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat'
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box style={{
        background: 'linear-gradient(#000046, #190a05)',
        color: 'rgb(255,255,255)',
        backgroundColor: 'transparent',
        minHeight: '100vh', 
        padding: '20px', 
      }}>
        <Navbar/>
       <Header/>
       <Valueproposition/>
       <Products/>
       <ContactForm/>
       <Footer/>
      </Box>
    </ThemeProvider>
  );
}
export default App;