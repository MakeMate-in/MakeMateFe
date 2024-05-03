import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import ai from '../landingpage/Assets/ai.png';


const Header = () => {
  return (
    <Box sx={{ marginTop: '6rem', padding: '1rem', maxWidth: '100%', overflow: 'hidden' }}>
      <Typography sx={{ fontSize: '3rem', textAlign: 'center',
        '@media(max-width: 442px)': {
          fontSize: '1.5rem'
        }
      }}>
        Welcome To MAKERS-MATE
      
      <Typography sx={{fontSize: '1rem', textAlign: 'center', 
        marginBottom: '1rem',
        '@media(max-width: 442px)': {
          fontSize: '1rem'
        }
      }}>
        CONNECT with US
      </Typography>
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignText: 'center',
        marginTop:'3rem',
      }}>
        <Box sx={{ 
         backgroundImage: `url(${ai})`,
         width:'100%',}}>

          <Typography>
            Our company's motto is to find and categorize the available tool makers in their expertise to get them business as per their expertise from all over the locations.
            It's easy to connect and fast.
          </Typography>

          <Button sx={{
            backgroundColor: '#003eff',
            color: 'white',
            transition: 'transform 0.3s',
            marginTop: '1rem',
            '&:hover': {
              transform: 'scale(1.05)',
              backgroundImage: 'linear-gradient(to right, blue, green)'
            }
          }}>
            WE CONNECT
          </Button>

          <Button sx={{
            backgroundColor: '#003eff',
            color: 'white',
            transition: 'transform 0.3s',
            marginTop: '1rem',
            marginLeft: '0.5rem', // Added margin to the left
            '&:hover': {
              transform: 'scale(1.05)',
              backgroundImage: 'linear-gradient(to right, blue, green)'
            }
          }}>
            WE SELL
          </Button>
          {/* <Box>
             <img src={ai}
            alt='Pic of ui'
            style={{
                maxWidth: '100%',
                maxHeight: '100%',
                marginTop:'1rem'
            }}/>
          </Box>  */}
          {/* <Image src={ai} alt="My image" width={1000} height="100" >

          </Image> */}

        </Box>

      </Box>

    </Box>
  )
}

export default Header
