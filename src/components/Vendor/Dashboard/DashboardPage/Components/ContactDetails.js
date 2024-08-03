import React, { useState } from 'react'
import { Flex, Card, Typography } from 'antd'
import ReactCardFlip from 'react-card-flip';
import MailIcon from '@mui/icons-material/Mail';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PersonIcon from '@mui/icons-material/Person';
import GradeIcon from '@mui/icons-material/Grade';
import FlagIcon from '@mui/icons-material/Flag';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { bg1, bg2,bg5, bg4 } from '../../../../../utils/colorGradient';

const ContactDetails = (props) => {
  let AllDetails = props.AllDetails

  const [isFlipped, setisFlipped] = useState(false)

  return (
    <div style={{marginBottom:'15px'}}>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
    
        <Card style={{ background: bg4, cursor:'pointer' }} onClick={() => { setisFlipped(!isFlipped) }}>
          <Typography style={{ margin: '0', fontSize: '18px', fontWeight: '600' }}><u>Contact Details</u></Typography>
          <div>
            {AllDetails?.companyDetails?.contact_person && AllDetails?.companyDetails?.contact_person.length > 0 && (

              <Flex gap={5} vertical>
                 <Flex align='center' gap={5}><PersonIcon/> <p style={{ margin: '0px' }}>  {AllDetails.companyDetails.contact_person[0].name}</p></Flex>
                 <Flex align='center' gap={5}><GradeIcon/> <p style={{ margin: '0px' }}>  {AllDetails.companyDetails.contact_person[0].designation}</p></Flex>
                 <Flex align='center' gap={5}><PhoneAndroidIcon/> <p style={{ margin: '0px' }}>  {AllDetails.companyDetails.contact_person[0].mobile_no}</p></Flex>
                 <Flex align='center' gap={5}><MailIcon/> <p style={{ margin: '0px' }}>  {AllDetails.companyDetails.contact_person[0].email}</p></Flex>
              </Flex>
            )}
          </div>
        </Card>


        <Card style={{ background: bg4  , cursor:'pointer'}} onClick={() => { setisFlipped(!isFlipped) }}>
          <Typography style={{ margin: '0', fontSize: '18px', fontWeight: '600' }}><u>Address Details</u></Typography>
          <div>
            {AllDetails?.companyDetails?.address && AllDetails?.companyDetails?.address.length > 0 && (
              <Flex vertical gap={5}>
                  <Flex align='center' gap={5}><MapsHomeWorkIcon/> <p style={{ margin: '0px' }}>{AllDetails.companyDetails.address[0].address_title}</p></Flex>
                  <Flex align='center' gap={5}><ImportContactsIcon/> <p style={{ margin: '0px' }}>{AllDetails.companyDetails.address[0].address_line}</p></Flex>
                  <Flex align='center' gap={5}><LocationCityIcon/> <p style={{ margin: '0px' }}>{AllDetails.companyDetails.address[0].city}, {AllDetails.companyDetails.address[0].state}</p></Flex>
                  <Flex align='center' gap={5}><FlagIcon/> <p style={{ margin: '0px' }}>{AllDetails.companyDetails.address[0].country}, {AllDetails.companyDetails.address[0].pincode}</p></Flex>
              </Flex>

            )}
          </div>
        </Card>
      </ReactCardFlip>
    </div>
  )
}

export default ContactDetails
