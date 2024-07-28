import React from 'react'
import { Carousel, Typography, Button, Rate, Badge, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { OPEN_ROUTES } from '../../../../utils/constants';
import { getRandomRansomValue } from '../../../../utils/helper';
import './ProductCard.css';

const ProductCard = (props) => {
  const navigate = useNavigate();
  const handleConnect = () => {
    navigate(OPEN_ROUTES.PRODUCT_DETAILS + props.data.company_data._id);
  }

  const random_val = getRandomRansomValue(3, 5);

  return (
    <div className='bg-white p-4 rounded-lg shadow-md overflow-hidden flex flex-col mb-2'>
      <Carousel autoplay className='rounded-lg overflow-hidden mb-2'>
        {props.data.images && props.data.images.map((image, index) => (
          <div key={index} className='aspect-square bg-gray-200'>
            <img src={image} alt={`Slide ${index}`} className='object-cover w-full h-full' />
          </div>
        ))}
      </Carousel>
      <div className='p-2 flex flex-col gap-2'>
        {props.data.Certificstes && props.data.Certificstes.map((item, index) => (
          <Badge.Ribbon key={index} text={item.fileName} />
        ))}
        <div>
          <Typography.Title level={4}>{props.data.product_name}</Typography.Title>
          <div className='flex items-center gap-1'>
            <span className='text-lg'>{random_val}</span>
            <Rate defaultValue={random_val} allowHalf disabled />
          </div>
        </div>
        <div>
          <Typography.Text className='font-semibold text-lg'>{props.data.company_data.company_name}</Typography.Text>
          <Typography.Paragraph ellipsis className='text-gray-600'>{props.data.company_data.description}</Typography.Paragraph>
        </div>
        <div className='flex flex-wrap gap-1'>
          <Tag color='red' className='flex items-center justify-center'>
            Experience: {props.data.company_data.experience}
          </Tag>
          <Tag color='red' className='flex items-center justify-center'>
            Plant Area: {props.data.infrastructuredetails.plant_area}
          </Tag>
        </div>
        <div className='flex flex-wrap gap-1'>
          {props.data.machine_details.map((item, index) => {
            return (index < 3 ? <Tag key={index} color='purple'>{item.machine_type}</Tag> : '')
          })}
        </div>
        <Button
          type='primary'
          className='mt-4'
          style={{
            fontSize: '18px',
            fontWeight: '500',
            height: '40px',
            background: '#FFD814',
            color: 'black'
          }}
          onClick={handleConnect}
        >
          View Profile
        </Button>
      </div>
    </div>
  )
}

export default ProductCard
