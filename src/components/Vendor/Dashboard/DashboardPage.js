import { Card, Col, Statistic, Row } from 'antd'
import Machines from './../CompanyDetails/Machines/Machines';
import { ArrowUpOutlined } from '@ant-design/icons';
import business_plan from './../../../assets/business_plan.svg'

const DashboardPage = () => {
  return (
    <div style={{ overflow: 'auto', scrollbarWidth: 'none' }}>
      <Row gutter={16}>
        <Col span={16}>
          <Card style={{ backgroundImage: business_plan }}>
            <h1 style={{ fontFamily: 'Cambria' }}>Welcome, John Doe</h1>
            <img src={business_plan} alt="" style={{ float: 'right' }} />
          </Card>
          <Row gutter={16} style={{ marginTop: '10px', marginBottom: '10px' }}>
            <Col span={8}>
              <Card size='small' hoverable>
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
            <Col span={8}><Card hoverable></Card></Col>
            <Col span={8}><Card hoverable></Card></Col>
          </Row>

          <h2 style={{ margin: '0' }}>Machine Details</h2>
          <Card size='small' style={{ overflow: 'auto', scrollbarWidth: 'none' }}>
            <Machines />
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ height: '100%', background: '#E8E8E8' }}>
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
                    valueStyle={{
                      color: '#3f8600',
                    }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                  />
                </Card>
              </Col>
            </Row>

            <h3 style={{ margin: '0', marginTop: '10px' }}>Services</h3>
            <Card style={{ backgroundImage: business_plan }}>
              <h1 style={{ fontFamily: 'Cambria' }}>Welcome, John Doe</h1>
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
