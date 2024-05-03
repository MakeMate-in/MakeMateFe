import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import p1 from '../landingpage/Assets/p1.png';

const Products = () => {
  return (
    <Container sx={{ marginTop:'6rem', textAlign:'center', marginBottom:'2rem'}}>
      <Typography sx={{
        fontSize:'3rem',
        fontWeight:'bold',
        padding:'0.5rem 1rem'}}>
            Our Products
      </Typography>

      <Box sx={{display:'flex',
              flexDirection:'row',
              flexWrap:'wrap',
              justifyContent:'center',
              width:'100%',
              textAlign:'centre',
              gap:'1rem',
              marginBottom:'2rem'
      }}>
        <Box sx={{
          transition:'1s',
          '&:hover':{
            transfrom:'scale(2)'
          }
        }}>
          <img src={p1} alt='product 1 pic'
          style={{width:'15rem', height:'auto', borderRadius:'2rem'}}/>
          <Typography sx={{width:'10rem',}}>Product name</Typography>
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
            Buy
          </Button>
        </Box>

        <Box sx={{
          transition:'1s',
          '&:hover':{
            transfrom:'scale(2)'
          }
        }}>
          <img src={p1} alt='product 1 pic'
          style={{width:'15rem', height:'auto', borderRadius:'2rem'}}/>
          <Typography sx={{width:'10rem',}}>Product name</Typography>
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
            Buy
          </Button>
        </Box>

        <Box sx={{
          transition:'1s',
          '&:hover':{
            transfrom:'scale(2)'
          }
        }}>
          <img src={p1} alt='product 1 pic'
          style={{width:'15rem', height:'auto', borderRadius:'2rem'}}/>
          <Typography sx={{width:'10rem',}}>Product name</Typography>
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
            Buy
          </Button>
        </Box>

        <Box sx={{
          transition:'1s',
          '&:hover':{
            transfrom:'scale(2)'
          }
        }}>
          <img src={p1} alt='product 1 pic'
          style={{width:'15rem', height:'auto', borderRadius:'2rem'}}/>
          <Typography sx={{width:'10rem',}}>Product name</Typography>
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
            Buy
          </Button>
        </Box>

      </Box>
    </Container>
  )
}

export default Products;
