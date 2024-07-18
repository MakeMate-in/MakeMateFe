import React from 'react'
import { Layout, theme, Carousel, Card, Flex} from 'antd';

const ProductCard = ( props ) => {
  console.log(props)
  return (
    <Card className='h-1/3'>
    <Flex>
    <div className="w-1/4 h-1/3" style={{}}>
      <Carousel autoplay>
        {props.data.images && props.data.images.map((image, index) => 
        {
          console.log(image)
          return (
          <div key={index} className="relative h-full">
            <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
          </div>
        )
        }
        )}
      </Carousel>
    </div>
    <div className="w-1/2 p-4">
      <h2 className="text-2xl font-bold mb-2">{props.data.product_name}</h2>
      {/* <p className="text-gray-700">{props.companyDetails.description}</p> */}
    </div>
  </Flex>
  </Card>
  )
}

export default ProductCard
