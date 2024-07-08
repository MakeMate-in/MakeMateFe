import React from 'react'
import { Typography, Flex, Card, Tag } from 'antd'

const ServicesDetails = (props) => {
    let AllDetails = props.AllDetails

    const colors = [
        'processing', 'success', 'error', 'warning', 'magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple',
      ];
    

    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  return (
    <div>
       <Typography style={{ margin: '0', marginTop: '10px', fontSize:'20px', fontWeight:'600' }}>Services</Typography>
                <Card>
                  <Flex gap="5px 2px" wrap>
                    {AllDetails?.services?AllDetails.services.services.map((service, index) => (
                      <Tag size='large' key={index} style={{ fontSize: '18px', fontFamily: 'none' }} color={getRandomColor()}>
                        {service.service_name}
                      </Tag>
                    )):''}
                  </Flex>
                </Card>
    </div>
  )
}

export default ServicesDetails
