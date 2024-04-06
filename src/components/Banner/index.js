import { Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BannerContainer, BannerContent, BannerDescription, BannerImage, BannerShopButton, BannerTitle } from '../../styles/banner';
import { Image } from 'antd';
import Banner1 from './Banner.jpg'


export default function Banner(){

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <BannerContainer>
            {/* <BannerImage src=""/> */}
            <Image
          alt=""
          width={400}
          height={400}
          src={Banner1}
          style={{ marginRight: '0px' }}
        />
            <BannerContent>
                <Typography variant='h6'>Huge Collection</Typography>
                <BannerTitle variant='h2' >Tools </BannerTitle>

                <BannerDescription variant='subtitle'>
                We help you in finding the best tool & die maker in your nearby location and that has the expertise of that product. 
                Our companies motto is to find and categories the available tool makers in there expertise to get them business as per there expertise from all over the locations. 
                Its easy to connect and fast.
                </BannerDescription>
                <BannerShopButton color='primary'>Shop Now</BannerShopButton>
            </BannerContent>
           
        
        </BannerContainer>
       
    );
}