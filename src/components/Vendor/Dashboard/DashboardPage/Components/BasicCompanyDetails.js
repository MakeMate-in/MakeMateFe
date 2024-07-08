import React from 'react'
import {Card, Row, Col, Flex} from 'antd'
import business_plan from './../../../../../assets/business_plan.svg'


const BasicCompanyDetails = (props) => {
    let AllDetails = props.AllDetails
  return (
    <Card style={{marginBottom:'20px'}}>
                <Row>
                  <Col span={14}>
                  
                    <h4 style={{ fontFamily: 'Cambria', marginBottom: '0' }}>Company Name: {AllDetails?.companyDetails?.company_name}</h4>
                    <p><b>About:</b> {AllDetails?.companyDetails?.description}</p>
                    <p><strong>GSTN: </strong>{AllDetails?.companyDetails?.GST_no}</p>
                   
                  </Col>
                  {/* <Col span={10}>
                    <img src={business_plan} alt="" style={{ float: 'right' }} />
                  </Col> */}
                </Row>
              </Card>
  )
}

export default BasicCompanyDetails
