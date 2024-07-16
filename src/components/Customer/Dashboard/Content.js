import React, { useState, useRef } from 'react'
import { Layout, theme, Carousel, Card} from 'antd';
import "./../../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import ProductCard from './Component/ProductCard';
import Login1 from './../../../assets/Login.jpg'
import Login2 from './../../../assets/Login.jpg'
import Login3 from './../../../assets/Login.jpg'
import Login4 from './../../../assets/Login.jpg'

const { Header, Content, Sider } = Layout;

const cardsData = [
  {
    images: [
   Login1,
   Login2,
   Login3,
   Login4
    ],
    title: 'Card Title 1',
    description: 'This is the description for card 1.',
  },
  {
    images: [
      Login1,
      Login2,
      Login3,
      Login4
    ],
    title: 'Card Title 2',
    description: 'This is the description for card 2.',
  },
  // Add more cards as needed
];


const CustomerContent = () => {

  
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

  return (
         <Content
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow: 'auto',
              scrollbarWidth: 'thin'
            }}
          >
            <div className='gap-4'>
       {cardsData.map((card, index) => (
        <ProductCard
          key={index}
          images={card.images}
          title={card.title}
          description={card.description}
        />
      ))}
      </div>
          </Content>
  )
}

export default CustomerContent
