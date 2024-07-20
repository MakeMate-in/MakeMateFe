import React from 'react'
import { Layout, theme, Carousel, Card, Flex, Image, Typography, Button, Rate } from 'antd';
import './ProductCard.css'

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
              <img src={image} alt={`Slide ${index}`} className='rounded-2xl object-cover aspect-squuare' fluid />
            </div>
          )
        }
        )}
      </Carousel>
             <Typography className="text-2xl font-bold mb-2">{props.data.product_name}</Typography>
             <Typography className="text-2xl font-bold mb-2">{props.data.company_data.company_name}</Typography>
             <Typography >{props.data.company_data.description}</Typography>
             <Typography >{props.data.company_data.current_projects_number}</Typography>
             <Typography >{props.data.company_data.experience}</Typography>
             <Typography >{props.data.infrastructuredetails.plant_area}</Typography>
             {
              props.data.Certificstes && props.data.Certificstes.map((item) => {
              return  (<Typography >{item.fileName}</Typography>)
              })
             }
             {
              props.data.services.map((item) => {
                if(item.services.service_type=="Inhouse"){
                  return (<Typography >{item.services.service_name}</Typography>)
                }
              })
             }
              {
              props.data.services.map((item) => {
                if(item.services.service_type=="Outsourced"){
                  return (<Typography >{item.services.service_name}</Typography>)
                }
              })
             }
             {
              props.data.machine_details.map((item) => {
                  return (<Typography >{item.machine_type}</Typography>)
                
              })
             }
             <Rate/>
             <hr/>
             <Flex vertical>
             <Button>Connect</Button>
             <Button>FeedBack</Button>
             </Flex>
    </div>
  )
}

export default ProductCard
