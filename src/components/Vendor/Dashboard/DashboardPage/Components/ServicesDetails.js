import { Typography, Flex, Card, Tag, Empty } from 'antd'
import { SERVICES_NAMES } from '../../../../../utils/helper'
import { bg4 } from '../../../../../utils/colorGradient'
import { useEffect, useState } from 'react'

const ServicesDetails = (props) => {
    let AllDetails = props.AllDetails
    const [inhouseCount, setInhouseCount] = useState(0)
    const [outboundCount, setOutboundCount] = useState(0)
    const colors = ['#3b5999','#55acee'];

      useEffect(() => {
        let inhous=0,out=0;
        if(AllDetails && AllDetails.services && AllDetails.services.services.length>0){
          AllDetails.services.services.map((item) => {
            if(item.service_type && item.service_type=="Inhouse") {
              inhous=inhous+1;
            }
            else if(item.service_type && item.service_type=="Outsorced"){
              out=out+1;
            }
          })
          setInhouseCount(inhous)
          setOutboundCount(out)
        }
      },[])

      console.log(AllDetails)
    
      const getTagColor = (index) => colors[index%2];


  return (
    <div>
       <Typography style={{ margin: '0', marginTop: '10px', fontSize:'20px', fontWeight:'600' }}>Services</Typography>
                {AllDetails && AllDetails.services && AllDetails.services.services.length>0 && (inhouseCount!=0 || outboundCount!=0)?<Card style={{overflow:'auto'
                  // , background:bg4
                  }}>
                {AllDetails && AllDetails.services && AllDetails.services.services.length>0?<Typography style={{ margin: '0', fontSize:'18px', fontWeight:'500' }}>Inhouse</Typography>:''}
                  <Flex gap="5px 2px" wrap>
                  {AllDetails && AllDetails.services && AllDetails.services.services.length>0 && inhouseCount!=0? AllDetails.services.services.map((service, index) => 
                  {
                     if(service.service_type=="Inhouse")
                    {
                     return  <Tag size='large' key={index} style={{ fontSize: '18px', fontFamily: 'none' }} color={getTagColor(index)}>
                       {service.service_name}
                      </Tag>
                    }
                  
                    }):''} 
                  </Flex>
                  {AllDetails && AllDetails.services && AllDetails.services.services.length>0 && outboundCount!=0?
                   <Typography style={{ margin: '0', marginTop: '10px', fontSize:'18px', fontWeight:'500' }}>Outsorced</Typography>:''}
                  <Flex gap="5px 2px" wrap>
                  {AllDetails && AllDetails.services && AllDetails.services.services.length>0 ? AllDetails.services.services.map((service, index) => 
                  {
                     if(service.service_type=="Outsorced")
                    {
                     return  <Tag size='large' key={index} style={{ fontSize: '18px', fontFamily: 'none' }} color={getTagColor(index)}>
                       {service.service_name}
                      </Tag>
                    }
                  
                    }):''} 
                  </Flex>


                </Card>: <Card><Empty /></Card>}
    </div>
  )
}

export default ServicesDetails
