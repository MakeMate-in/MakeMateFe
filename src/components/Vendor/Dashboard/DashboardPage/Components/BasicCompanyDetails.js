import React from 'react'
import {Card, Row, Col, Flex} from 'antd'
import business_plan from './../../../../../assets/business_plan.svg';
import { getRole, getUserEmail, getUserName } from '../../../../../utils/helper';


const BasicCompanyDetails = (props) => {
   const USER_DETAIL = {
    name: getUserName()?getUserName():"",
    email: getUserEmail()?getUserEmail():"",
    role: getRole()?getRole():""
  };
    let AllDetails = props.AllDetails
  return (
    <Card>
                <Row>
                  <Col span={14}>
                    <h1 style={{ fontFamily: 'Cambria', marginBottom: '0' }}>Welcome, {USER_DETAIL.name}</h1>
                    <h4 style={{ fontFamily: 'Cambria', marginBottom: '0' }}>Company Name: {AllDetails?.companyDetails?.company_name}</h4>
                    <p><b>About:</b> {AllDetails?.companyDetails?.description}</p>
                    <p><strong>GSTN: </strong>{AllDetails?.companyDetails?.GST_no}</p>
                    {AllDetails?.companyDetails?.address && AllDetails?.companyDetails?.address.length > 0 && (
                    <Flex>
                      <p><strong>Address: </strong><p style={{ margin: '0px' }}><b>{AllDetails.companyDetails.address[0].address_title}</b></p>
                        <p style={{ margin: '0px' }}>{AllDetails.companyDetails.address[0].address_line}</p>
                        <p style={{ margin: '0px' }}> {AllDetails.companyDetails.address[0].city}, {AllDetails.companyDetails.address[0].state}</p>
                        <p style={{ margin: '0px' }}>{AllDetails.companyDetails.address[0].country}, {AllDetails.companyDetails.address[0].pincode}</p></p>
                        </Flex>
                        )}
                        {AllDetails?.companyDetails?.contact_person && AllDetails?.companyDetails?.contact_person.length > 0 && (
                          <Flex>
                      <p><strong>Contact: </strong> <p style={{ margin: '0px' }}><b>{AllDetails.companyDetails.contact_person[0].name}</b></p>
                        <p style={{ margin: '0px' }}>Designation: {AllDetails.companyDetails.contact_person[0].designation} </p>
                        <p style={{ margin: '0px' }}>Email: {AllDetails.companyDetails.contact_person[0].email}</p>
                        <p style={{ margin: '0px' }}>Phone: {AllDetails.companyDetails.contact_person[0].mobile_no}</p></p>
                    </Flex>
                        )}
                  </Col>
                  <Col span={10}>
                    <img src={business_plan} alt="" style={{ float: 'right' }} />
                  </Col>
                </Row>
              </Card>
  )
}

export default BasicCompanyDetails
