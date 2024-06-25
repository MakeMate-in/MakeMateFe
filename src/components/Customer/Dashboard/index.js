import React from 'react'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Sider } = Layout;
const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `Customer Login ${key}`,
}));

const CustomerDashboard = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{height: '100vh'}}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          items={items1}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
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
