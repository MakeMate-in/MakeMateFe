import React from 'react'
import { Typography, Flex, Card, Tag } from 'antd'
import { SERVICES_NAMES } from '../../../../../utils/helper'
import { bg4 } from '../../../../../utils/colorGradient'

const ServicesDetails = (props) => {
    let AllDetails = props.AllDetails
  console.log(AllDetails.services)
    const colors = [
        'processing', 'success', 'error', 'warning', 'magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple',
      ];
    

    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  return (
    <div>
       <Typography style={{ margin: '0', marginTop: '10px', fontSize:'20px', fontWeight:'600' }}>Services</Typography>
                <Card style={{overflow:'auto', background:bg4}}>
                <Typography style={{ margin: '0', fontSize:'18px', fontWeight:'500' }}>Inhouse</Typography>
                  <Flex gap="5px 2px" wrap>
                  {AllDetails?.services?AllDetails.services.services.map((service, index) => 
                  {
                     if(service.service_type=="Inhouse")
                    {
                     return  <Tag size='large' key={index} style={{ fontSize: '18px', fontFamily: 'none' }} color={getRandomColor()}>
                       {service.service_name}
                      </Tag>
                    }
                  
                    }):''} 
                  </Flex>
                  <Typography style={{ margin: '0', marginTop: '10px', fontSize:'18px', fontWeight:'500' }}>Outsorced</Typography>
                  <Flex gap="5px 2px" wrap>
                  {AllDetails?.services?AllDetails.services.services.map((service, index) => 
                  {
                     if(service.service_type=="Outsorced")
                    {
                     return  <Tag size='large' key={index} style={{ fontSize: '18px', fontFamily: 'none' }} color={getRandomColor()}>
                       {service.service_name}
                      </Tag>
                    }
                  
                    }):''} 
                  </Flex>


                </Card>
    </div>
  )
}

export default ServicesDetails
