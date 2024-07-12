import React, { useState } from 'react'
import { Flex, Card, Typography } from 'antd'
import ReactCardFlip from 'react-card-flip';

const ContactDetails = (props) => {
  let AllDetails = props.AllDetails
  const colors1 = ['#6253E1', '#04BEFE'];
  const colors2 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
  const colors3 = ['#40e495', '#30dd8a', '#2bb673'];
  let bg1 = `linear-gradient(116deg,  ${colors3.join(', ')})`
  let bg2 = `linear-gradient(90deg,  ${colors2.join(', ')})`
  let bg3 = `linear-gradient(135deg, ${colors1.join(', ')})`

  const [isFlipped, setisFlipped] = useState(false)

  return (
    <div style={{marginBottom:'15px'}}>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <Card style={{ background: bg1, cursor:'pointer' }} onClick={() => { setisFlipped(!isFlipped) }}>
          <Typography style={{ margin: '0', fontSize: '18px', fontWeight: '600' }}>Contact Details</Typography>
          <div>
            {AllDetails?.companyDetails?.contact_person && AllDetails?.companyDetails?.contact_person.length > 0 && (

              <Flex>
                <p> <p style={{ margin: '0px' }}><b>{AllDetails.companyDetails.contact_person[0].name}</b></p>
                  <p style={{ margin: '0px' }}>Designation: {AllDetails.companyDetails.contact_person[0].designation} </p>
                  <p style={{ margin: '0px' }}>Email: {AllDetails.companyDetails.contact_person[0].email}</p>
                  <p style={{ margin: '0px' }}>Phone: {AllDetails.companyDetails.contact_person[0].mobile_no}</p></p>
              </Flex>
            )}
          </div>
        </Card>


        <Card style={{ background: bg2  , cursor:'pointer'}} onClick={() => { setisFlipped(!isFlipped) }}>
          <Typography style={{ margin: '0', fontSize: '18px', fontWeight: '600' }}>Address Details</Typography>
          <div>
            {AllDetails?.companyDetails?.address && AllDetails?.companyDetails?.address.length > 0 && (
              <Flex>
                <p><p style={{ margin: '0px' }}><b>{AllDetails.companyDetails.address[0].address_title}</b></p>
                  <p style={{ margin: '0px' }}>{AllDetails.companyDetails.address[0].address_line}</p>
                  <p style={{ margin: '0px' }}> {AllDetails.companyDetails.address[0].city}, {AllDetails.companyDetails.address[0].state}</p>
                  <p style={{ margin: '0px' }}>{AllDetails.companyDetails.address[0].country}, {AllDetails.companyDetails.address[0].pincode}</p></p>
              </Flex>

            )}
          </div>
        </Card>
      </ReactCardFlip>
    </div>
  )
}

export default ContactDetails
