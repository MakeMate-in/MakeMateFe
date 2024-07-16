import React, { useState, useRef } from 'react'
import { Button, Layout, theme, AutoComplete, Input, Row, Flex } from 'antd';
import { useNavigate } from 'react-router-dom'
import "./../../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import CustomerHeader from './Header';
import CustomerSideBar from './SideBar';
import CustomerContent from './Content';

const { Header, Content, Sider } = Layout;
const { Option } = AutoComplete;

const CustomerDashboard = () => {

  const navigate = useNavigate()




  const availableOptions = [
    'Option1',
    'Option2',
    'Option3',
    'Option4',
    'Option5'
  ];

  const [options, setOptions] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);


  const handleSearch = (value) => {
    const filteredOptions = availableOptions.filter(option =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setOptions(value ? filteredOptions : []);
  };

  const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    width: '50%',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };


  return (
    <Layout style={{ height: '100vh' }}>

    {/* Header */}
      <CustomerHeader handleSearch={handleSearch} options={options}/>

      <Layout>

      {/* Side Bar */}
      {/* <CustomerSideBar/> */}

        <Layout
          style={{
            padding: '0 20px 20px',
          }}
        >
      <CustomerContent/>
       
        </Layout>
      </Layout>
    </Layout>
  )
}

export default CustomerDashboard
