import React, { useState, useRef } from 'react'
import { Button, Layout, theme, AutoComplete, Input, Carousel, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom'
import { OPEN_ROUTES } from '../../../utils/constants'

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
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  const slides = [
    { id: 0, content: '1' },
    { id: 1, content: '2' },
    { id: 2, content: '3' },
    { id: 3, content: '4' },
  ];

  const handleThumbnailClick = (index) => {
    setCurrentSlide(index);
    carouselRef.current.goTo(index);
  };

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
          width={400}
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
            <Row>
              <Col span={4}>
                {slides.map(slide => (
                  <div
                    key={slide.id}
                    style={{
                      cursor: 'pointer',
                      padding: '10px',
                      border: currentSlide === slide.id ? '2px solid #1890ff' : '2px solid transparent',
                    }}
                    onClick={() => handleThumbnailClick(slide.id)}
                  >
                    <img
                      src={`/path/to/your/thumbnails/${slide.id}.jpg`}
                      alt={`Slide ${slide.content}`}
                      style={{ width: '100%' }}
                    />
                  </div>
                ))}
              </Col>
              <Col span={20}>
                <Carousel
                  ref={carouselRef}
                  arrows
                  infinite={false}
                  beforeChange={(from, to) => setCurrentSlide(to)}
                  dots={false}
                  initialSlide={currentSlide}
                >
                  {slides.map(slide => (
                    <div key={slide.id}>
                      <h3 style={contentStyle}>{slide.content}</h3>
                    </div>
                  ))}
                </Carousel>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default CustomerDashboard
