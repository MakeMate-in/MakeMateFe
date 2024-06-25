import React from 'react'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom'
import { OPEN_ROUTES } from '../../../utils/constants'


const { Header, Content, Sider } = Layout;

const CustomerDashboard = () => {

  const navigate = useNavigate()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const login = () => {
    navigate(OPEN_ROUTES.LOGIN)
  }


  return (
    <Layout style={{height: '100vh'}}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div className="demo-logo" style={{color:'#fff', fontWeight:'700', fontSize:'1.5rem'}}>MAKERS MATE</div>
        {/* <Menu
          theme="dark"
          mode="horizontal"
          items={items1}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        /> */}
        <Button onClick={login} size='large' style={{ marginLeft: 'auto' }}>Sign Up/Login</Button>
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
            HELLO
           </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default CustomerDashboard
