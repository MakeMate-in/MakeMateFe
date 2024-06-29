import React, { useState, useRef } from 'react'
import { Button, Layout, theme, AutoComplete, Input, Row, Flex } from 'antd';
import { useNavigate } from 'react-router-dom'
import { OPEN_ROUTES } from '../../../utils/constants'
import "./../../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

const { Header, Content, Sider } = Layout;
const { Option } = AutoComplete;

const CustomerDashboard = () => {

  const navigate = useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const login = () => {
    navigate(OPEN_ROUTES.LOGIN)
  }

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

  const handleSelect = (value) => {
    console.log("Selected:", value);
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

  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/1000/600/",
    },
    {
      original: "https://media.macphun.com/img/uploads/customer/blog/2063/16862172056481a1f590ac84.26256392.jpeg?q=85&w=840",
      thumbnail: "https://media.macphun.com/img/uploads/customer/blog/2063/16862172056481a1f590ac84.26256392.jpeg?q=85&w=840",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/1000/600/",
    },
  ];

  return (
    <Layout style={{ height: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div className="demo-logo" style={{ color: '#fff', fontWeight: '700', fontSize: '1.5rem' }}>🛠MAKERS MATE</div>

        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
          <AutoComplete
            popupMatchSelectWidth={252}
            style={{
              width: 400,
              marginRight: '20px'
            }}
            options={options.map(option => ({ value: option }))}
            onSelect={handleSelect}
            onSearch={handleSearch}
            size="large"
          >
            <Input.Search size="large" placeholder="Search by company, product, or customer" enterButton="Search" onSearch={handleSelect} />
          </AutoComplete>
          <Button onClick={login} size='large' style={{ marginLeft: 'auto' }}>Sign Up/Login</Button>
        </div>
      </Header>
      <Layout>
        <Sider
          width={300}
          style={{
            background: colorBgContainer,
          }}
        >
          <h1>Filters</h1>

        </Sider>
        <Layout
          style={{
            padding: '0 20px 20px',
          }}
        >
          <h1>Heading</h1>
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
            <div style={{ display: 'flex', borderStyle:'ridge' }}>
              <div style={{ flex: '0 0 40%', marginRight: '20px', borderStyle:'ridge' }}>
                <ImageGallery items={images} thumbnailPosition='right' showFullscreenButton={false} showPlayButton={false} />
              </div>
              <div style={{ flex: '1' }}>
                <h2>Product Details</h2>
                <p> product details</p>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default CustomerDashboard
