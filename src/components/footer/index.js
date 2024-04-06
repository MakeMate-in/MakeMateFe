import {Box, Grid , Typography} from "@mui/material";
import { Colors } from "../../styles/theme";
import { FooterTitle } from "../../styles/footer";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";


export default function Footer() {
    return (
        // <Box
        // sx={{
        //     background: Colors.shaft,
        //     color: Colors.white,
        //     p:{xs:4 ,md:10},
        //     pt:12,
        //     pb:12,
        //     fontSize:{xs:"12px",md:"14px"},
        // }}
        // style={{padding:'40px 0px 0px 0px'}}
        // >
            
        //     {/* <Grid container spacing={2} justifyContent="center">
        //     <Grid item md={6} lg={4}>
        //         <FooterTitle variant="body1">About Us</FooterTitle>
        //         {/* <Typography variant="caption2">
        //             We MakersMate are partners of your precision tooling. We help you in finding the best tool & die maker in your nearby location and that has the expertise of that product. 
        //             Our companies motto is to find and categories the available tool makers in there expertise to get them business as per there expertise from all over the locations. 
        //             Its easy to connect and fast.
        //         </Typography> */}
        //         <Box sx={{
        //             mt:4,
        //             color:Colors.dove_gray
        //         }}>
                    
        //         </Box>
        //     </Grid> */}
        //     <Facebook />
            
        //     </Grid>
        // </Box>
        <div>
            <Box
        sx={{
            background: Colors.shaft,
            color: Colors.white,
            p:{xs:4 ,md:10},
            pt:12,
            pb:12,
            fontSize:{xs:"12px",md:"14px"},
        }}
        style={{padding:'20px 20px 20px 20px'}}
        >
            <div style={{
                display:'flex',
                justifyContent:'space-between',
            }}>
                <div>
                <Typography>
                    About Us
                </Typography>
                </div>
                <div>
                <Typography>
                    Contact Us
                </Typography>
                </div>
                <div>
                <Typography>
                     Feedback
                </Typography>
                </div>
                <div>
                <Typography>
                    Careers
                </Typography>
                </div>
                <div>
                <Typography>
                    Office Address
                </Typography>
                </div>
            </div>
            <div style={{
                display:'flex',
                justifyContent:'center',
                paddingTop:'20px'
            }}>
                <Facebook/>
                <Twitter/>
                <LinkedIn/>
                <Instagram/>
                </div>
            </Box>
        </div>
    )
}