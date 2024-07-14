import React, { useState, useRef } from 'react'
import { Button, Layout, theme, AutoComplete, Input, Row, Flex } from 'antd';
import "./../../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

const { Header, Content, Sider } = Layout;

const CustomerContent = () => {

    
  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    }
  ];
  
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

  return (
         <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow: 'auto',
              scrollbarWidth: 'thin'
            }}
          >

          </Content>
  )
}

export default CustomerContent
