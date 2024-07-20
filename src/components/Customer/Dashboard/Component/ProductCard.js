import React from 'react'
import { Carousel, Flex, Typography, Button, Rate, Badge, Tag } from 'antd';
import './ProductCard.css'
import { bg1 } from '../../../../utils/colorGradient';

// const ProductCard = ( props ) => {
//   console.log(props)
//   return (
//     <Card className='h-1/3'>
//     <Flex>
//     <div className="w-1/4 h-1/3" style={{}}>
//       <Carousel autoplay>
//         {props.data.images && props.data.images.map((image, index) => 
//         {
//           return (
//           <div key={index} className="relative h-full">
//             <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
//           </div>
//         )
//         }
//         )}
//       </Carousel>
//     </div>
//     <div className="w-1/2 p-4">
//       <h2 className="text-2xl font-bold mb-2">{props.data.product_name}</h2>
//       {/* <p className="text-gray-700">{props.companyDetails.description}</p> */}
//     </div>
//   </Flex>
//   </Card>
//   )
// }

// export default ProductCard


const ProductCard = (props) => {
  console.log(props)
  return (

    <div>
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
      <Flex gap={10}>
        <Typography >{props.data.company_data.company_name}, </Typography>
        <Typography >{props.data.company_data.description}</Typography>
      </Flex>
      <Rate />
      <br />
      <Typography >Experience: {props.data.company_data.experience}</Typography>
      <Typography >Plant Area: {props.data.infrastructuredetails.plant_area}</Typography>

      {
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
      }
      <Flex>
        {

          props.data.machine_details.map((item) => {
            return (<Tag style={{ background: 'purple', color: 'white' }} >{item.machine_type}</Tag>)

          })
        }
      </Flex>

      <Flex vertical gap={20}>
        <Button type='primary' style={{ fontSize: '18px', fontWeight: '600', height: '40px', display: 'flex', alignItems: 'center', background: bg1 }}>Connect</Button>
        <Button type='primary'
          style={{ fontSize: '18px', fontWeight: '600', height: '40px', display: 'flex', alignItems: 'center', background: bg1 }}>Feedback</Button>
      </Flex>
      </Flex>
    </div>
  )
}

export default ProductCard
