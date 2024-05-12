import { Box, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <footer>
      <Box sx={{
        textAlign:'center',
        padding:'1rem',
        lineHeight:'3rem',
        backgroundColor:'#333',
        borderRadius:'20px'
      }}>
        <Typography sx={{fontWeight:'bold', fontSize:'2rem'}}>
          About Us
        </Typography>
        <Typography>
          &copy; {new Date().getFullYear()} Maker-Mate. All right reserved
        </Typography>
        <Typography>
          Noida,Delhi
        </Typography>
        <Typography>
          +91 0123 456 789
        </Typography>
        <Typography>
          info@email.com
        </Typography>
      </Box>
    </footer>
  )
}

export default Footer
