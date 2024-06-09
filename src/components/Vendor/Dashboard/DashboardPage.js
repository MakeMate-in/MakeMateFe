import { useState, useEffect } from 'react';
import { Card, Col, Statistic, Row, Flex, Tag } from 'antd'
import {COMPANY_ID} from './../../../utils/constants';
import Machines from './../CompanyDetails/Machines/Machines';
import { ArrowUpOutlined } from '@ant-design/icons';
import business_plan from './../../../assets/business_plan.svg'
import CustomerDetails from '../CompanyDetails/CustomerDetails/CustomerDetails';
import { getAllDetails } from '../../../apis/Vendor/CompanyDetails';

const DashboardPage = () => {

  const [AllDetails, setAllDetails] = useState({})

  useEffect(() => {
    const getAllDashboardDetails = async () => {
      let param = {
        companyId: COMPANY_ID
      }
      const resp = await getAllDetails(param)
      console.log(JSON.stringify(resp.data))
      setAllDetails(resp.data)
    }

    getAllDashboardDetails()
  }, [])

  const tagsData = ['processing', 'success', 'error', 'warning', 'magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple',];

  const colors = ['processing', 'success', 'error', 'warning', 'magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple',];

  // Function to get a random color for Services Tags
  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  return (
    <div style={{ overflow: 'auto', scrollbarWidth: 'none' }}>
      <Row gutter={16}>
        <Col span={16}>
          <Card style={{ backgroundImage: business_plan }}>
            <Row>
              <Col span={14}>
                <h1 style={{ fontFamily: 'Cambria', marginBottom: '0' }}>Welcome, John Doe</h1>
                <span>This is the description about the company</span>
                <h4>GSTN: ABCD1234</h4>
                <h4>Address: 001, ABCD NAGAR, PQR MARG, ZXCV COLONY, TAMIL NADU, INDIA, 00000</h4>
                <h4>CONTACT: ABCD1234</h4>
              </Col>
              <Col span={10}>
                <img src={business_plan} alt="" style={{ float: 'right' }} />
              </Col>
            </Row>
          </Card>
          <Row gutter={16} style={{ marginTop: '10px', marginBottom: '10px' }}>
            <Col span={8}>
              <Card size='small' hoverable>
                <Statistic
                  title="Total Experience"
                  value={11.28}
                  precision={2}
                  valueStyle={{
                    color: '#3f8600',
                  }}
                  prefix={<ArrowUpOutlined />}
                  suffix="Years"
                />
              </Card>
            </Col>
            <Col span={8}><Card hoverable>Projects</Card></Col>
            <Col span={8}><Card hoverable>Total Customers</Card></Col>
          </Row>

          <h2>Machine Details</h2>
          <Card size='small' style={{ overflow: 'auto', scrollbarWidth: 'none', height: '50vh' }}>
            <Machines />
          </Card>

          <h2>Customer Details</h2>
          <Card size='small' style={{ overflow: 'auto', scrollbarWidth: 'none', height: '50vh' }}>
            <CustomerDetails />
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ height: '100%', background: 'beige' }}>
            <h3 style={{ margin: '0' }}>InfraStructure Details</h3>
            <Row gutter={16}>

              <Col span={12}>
                <Card size='small' hoverable style={{ borderRadius: "15px", marginTop: '5px' }}>
                  <Statistic
                    title="Active"
                    value={11.28}
                    precision={2}
                    valueStyle={{
                      color: '#3f8600',
                    }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                  />
                </Card>
                <Card size='small' hoverable style={{ borderRadius: "15px", marginTop: '5px' }}>
                  <Statistic
                    title="Active"
                    value={11.28}
                    precision={2}
                    valueStyle={{
                      color: '#3f8600',
                    }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card size='small' hoverable style={{ borderRadius: "15px", marginTop: '5px' }}>
                  <Statistic
                    title="Active"
                    value={11.28}
                    precision={2}
                    valueStyle={{
                      color: '#3f8600',
                    }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                  />
                </Card>
                <Card size='small' hoverable style={{ borderRadius: "15px", marginTop: '5px' }}>
                  <Statistic
                    title="Active"
                    value={11.28}
                    precision={2}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                  />
                </Card>
              </Col>
            </Row>

            <h3 style={{ margin: '0', marginTop: '10px' }}>Services</h3>
            <Card>
              <Flex gap="5px 2px" wrap>
                {tagsData.map((tag, index) => (
                  <Tag size='large' key={index} style={{ fontSize: '18px', fontFamily: 'none' }} color={getRandomColor()}>
                    {tag}
                  </Tag>
                ))}
              </Flex>
            </Card>

            <h3 style={{ margin: '0', marginTop: '10px' }}>Total Manpower</h3>
            <Card style={{ backgroundImage: business_plan }}>
              <h1 style={{ fontFamily: 'Cambria' }}>Welcome, John Doe</h1>
              <img src={business_plan} alt="" style={{ float: 'right' }} />
            </Card>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DashboardPage
