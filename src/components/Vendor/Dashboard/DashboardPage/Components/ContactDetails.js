import React from 'react'
import { Flex, Card, Typography } from 'antd'

const ContactDetails = (props) => {
    let AllDetails = props.AllDetails
  return (
    <div>
        <Typography style={{ margin: '0', fontSize:'25px', fontWeight:'600' }}>Contact Details</Typography>
    <Card  >
        <div>
         {AllDetails?.companyDetails?.address && AllDetails?.companyDetails?.address.length > 0 && (
                    <Flex>
                      <p><strong>Address: </strong><p style={{ margin: '0px' }}><b>{AllDetails.companyDetails.address[0].address_title}</b></p>
                        <p style={{ margin: '0px' }}>{AllDetails.companyDetails.address[0].address_line}</p>
                        <p style={{ margin: '0px' }}> {AllDetails.companyDetails.address[0].city}, {AllDetails.companyDetails.address[0].state}</p>
                        <p style={{ margin: '0px' }}>{AllDetails.companyDetails.address[0].country}, {AllDetails.companyDetails.address[0].pincode}</p></p>
                        </Flex>
                        )}
</div>
<div>
                        {AllDetails?.companyDetails?.contact_person && AllDetails?.companyDetails?.contact_person.length > 0 && (
                          <Flex>
                      <p><strong>Contact: </strong> <p style={{ margin: '0px' }}><b>{AllDetails.companyDetails.contact_person[0].name}</b></p>
                        <p style={{ margin: '0px' }}>Designation: {AllDetails.companyDetails.contact_person[0].designation} </p>
                        <p style={{ margin: '0px' }}>Email: {AllDetails.companyDetails.contact_person[0].email}</p>
                        <p style={{ margin: '0px' }}>Phone: {AllDetails.companyDetails.contact_person[0].mobile_no}</p></p>
                    </Flex>
                        )}
                        </div>
    </Card>
    </div>
  )
}

export default ContactDetails
