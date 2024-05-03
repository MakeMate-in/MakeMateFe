import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React from 'react'

const ContactForm = () => {
  return (
    <Container sx={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        minHeight:'100vh',
    }}>
        <Typography sx={{
            fontSize:'3rem',
            textAlign:'center',
            marginBottom:'2rem',
        }}>
           Contact Us 
        </Typography>
        <Box component='form' sx={{
            display:'flex',
            flexDirection:'column',
            marginTop:'2rem',
            width:'30rem',

        }}>
            <TextField label="Name" name='name' fullWidth required
            sx={{marginBottom:'1rem'}}
            InputLabelProps={{style:{color:'white'}}}
            InputProps={{style:{color:'white'}}}  />

        <TextField label="Email" name='email' fullWidth required
            sx={{marginBottom:'1rem'}}
            InputLabelProps={{style:{color:'white'}}}
            InputProps={{style:{color:'white'}}}  />

        <Button sx={{
            backgroundColor:'blue',
            color:'white',
           transition: 'transform 0.3s',
            marginTop: '1rem',
            marginLeft: '0.5rem', // Added margin to the left
            '&:hover': {
              transform: 'scale(1.05)',
              backgroundImage: 'linear-gradient(to right, blue, green)'
            }
        }}>
            Submit
        </Button>

        </Box>
      
    </Container>
  )
}

export default ContactForm
