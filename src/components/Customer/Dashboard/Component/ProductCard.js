import React from 'react'
import { Carousel, Flex, Typography, Button, Rate, Badge, Tag } from 'antd';
import './ProductCard.css'
import { bg1 } from '../../../../utils/colorGradient';
import { useNavigate } from 'react-router-dom';
import { OPEN_ROUTES } from '../../../../utils/constants';
import { getRandomRansomValue } from '../../../../utils/helper';


const ProductCard = (props) => {

  const navigate = useNavigate()

  const handleConnet = () => {
    navigate(OPEN_ROUTES.PRODUCT_DETAILS + props.data.company_data._id)
  }

  const random_val = getRandomRansomValue(3, 5)

  return (

    <div className='mb-8'>
      <Carousel autoplay>
        {props.data.images && props.data.images.map((image, index) => {
          return (
            <div key={index} className='bg-gray-500 rounded-2xl object-cover aspect-square container-fluid'>
              <img src={image} alt={`Slide ${index}`} className='rounded-2xl object-cover aspect-squuare' style={{ height: "100%" }} />
            </div>
          )
        }
        )}
      </Carousel>
      {
        props.data.Certificstes && props.data.Certificstes.map((item) => {
          return (<Badge.Ribbon text={item.fileName} />)
        })
      }
      <Flex vertical gap={5}>
        <Typography style={{ fontSize: '24px', fontWeight: '400' }}>{props.data.product_name}</Typography>
        <Flex gap={2}>
          {random_val}
          <Rate defaultValue={random_val} allowHalf disabled/>
        </Flex>
        <Flex vertical>
          <Typography style={{ fontSize: '20px', fontWeight: '400' }}>{props.data.company_data.company_name}, </Typography>
          <Typography style={{ fontSize: '18px', fontWeight: '400', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{props.data.company_data.description}</Typography>
        </Flex>
       
      <Flex>
        <Tag style={{background:'#CC0C39', width:'35%', display:'flex', alignItems:'center', justifyContent:'center', textOverflow:'ellipsis'}}>
        <Typography style={{color:'white', fontWeight:'500'}}>Experience: {props.data.company_data.experience}</Typography>
        </Tag>

        <Tag style={{background:'#CC0C39', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Typography style={{color:'white', fontWeight:'500'}}>Plant Area: {props.data.infrastructuredetails.plant_area}</Typography>
        </Tag>
        </Flex>

        {/* {
          props.data.services.map((item) => {
            if (item.services.service_type == "Inhouse") {
              return (<Typography >{item.services.service_name}</Typography>)
            }
          })
        }
        {
          props.data.services.map((item) => {
            if (item.services.service_type == "Outsourced") {
              return (<Typography >{item.services.service_name}</Typography>)
            }
          })
        } */}
        <Flex>
          {
            props.data.machine_details.map((item) => {
              return (<Tag style={{ background: 'purple', color: 'white' }} >{item.machine_type}</Tag>)
            })
          }
        </Flex>

        <Flex vertical gap={20}>
          <Button type='primary'
            className='flex items-center rounded-full'
            style={{
              fontSize: '18px',
              fontWeight: '500',
              height: '40px',
              background: '#FFD814',
              color:'black'
            }}

            onClick={handleConnet}
          >
            Connect
          </Button>
          {/* <Button type='primary'
          style={{ fontSize: '18px', fontWeight: '600', height: '40px', display: 'flex', alignItems: 'center', background: bg1 }}>Feedback</Button> */}
        </Flex>
      </Flex>
    </div>
  )
}

export default ProductCard
