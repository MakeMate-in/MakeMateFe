import { Box, Typography } from '@mui/material'
import React from 'react'

const Valueproposition = () => {
  return (
    <Box sx={{ marginTop:'6rem', textAlign:'center', marginBottom:'2rem'}}>
      <Typography sx={{
        fontSize:'3rem',
        fontWeight:'bold',
        padding:'0.5rem 1rem',
      }} >
        Our Value Proposition
        </Typography> 

        <Box sx={{marginTop:'1rem',
            backgroundColor:' #001526',
            padding: '2rem',
            borderRadius:'10px',
            boxShadow:'0px 4px 10px rgba(0,0,0,0.3)',

        }}>
            <Typography variant='h5' sx={{fontWeight:'bold', marginBottom:'1rem' }}>
            High-Quality Products
            <Typography sx={{fontSize:'1.1rem', color:'#CCCCCC'}}>
                We MakersMate are partners of your precision tooling. We help you in finding the best tool & die maker in your nearby location and that has the expertise of that product. 
            </Typography>
            </Typography>

            <Typography variant='h5' sx={{fontWeight:'bold', marginBottom:'1rem',marginTop:'1rem'}}>
            Elevate your Business with us
            <Typography sx={{fontSize:'1.1rem', color:'#CCCCCC'}}>
            Our companies motto is to find and categories the available tool makers in there expertise to get them business as per there expertise from all over the locations. 
            Its easy to connect and fast.
            </Typography>
            </Typography>

            <Typography variant='h5' sx={{fontWeight:'bold', marginBottom:'1rem',marginTop:'1rem'}}>
            Build-Fast.Learn-Fast
            <Typography sx={{fontSize:'1.1rem', color:'#CCCCCC'}}>
            By partnering with us and leveraging our network, your business can accelerate its growth trajectory by swiftly iterating on ideas, embracing innovation, and adapting to market dynamics through a collaborative learning environment.
            </Typography>
            </Typography>



        </Box>
      
    </Box>
  )
}

export default Valueproposition
