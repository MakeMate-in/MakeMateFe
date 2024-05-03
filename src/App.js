<<<<<<< Updated upstream
import { ThemeProvider} from '@mui/material/styles'; 
import AppRoutes from './routes/AppRoutes';

function App() {
  return (

    <AppRoutes/>
=======
//import AppRoutes from './routes/AppRoutes';
import { Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import Header from './components/landingpage/Header';
import Valueproposition from './components/landingpage/Valueproposition';
import Products from './components/landingpage/Products';

const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat'
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Box style={{
        background: 'linear-gradient(#FFA17F, #00223E)',
        color: 'rgb(255,255,255)',
        backgroundColor: 'transparent',
        minHeight: '100vh', 
        padding: '20px', 
      }}>
        {/* <AppRoutes/> */}

       <Header/>
       <Valueproposition/>
       <Products/>
      </Box>
    </ThemeProvider>
>>>>>>> Stashed changes
  );
}

export default App;
