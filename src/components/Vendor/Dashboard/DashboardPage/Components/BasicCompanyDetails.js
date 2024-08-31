import React, { useEffect } from 'react'
import { Card, Flex, Avatar, Typography } from 'antd'
import { bg3 } from '../../../../../utils/colorGradient'
import { UserOutlined } from '@ant-design/icons';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';


const BasicCompanyDetails = (props) => {
  let AllDetails = props.AllDetails

  let url 
  if(AllDetails && AllDetails.companyDetails && AllDetails.companyDetails.company_logo)
url = `data:image/png;base64,${AllDetails.companyDetails.company_logo}`;
  return (
    <Card style={{ marginBottom: '20px', background: bg3 }}>
      <Flex gap={"large"}>
        <Avatar 
        alt={<BusinessOutlinedIcon />}
          src={url!=undefined?url:<BusinessOutlinedIcon sx={{fontSize:80}}/>}
          size={100} />
        <Flex vertical>
          <Typography style={{ fontFamily: 'Cambria', marginBottom: '0', fontSize: '25px', fontWeight: '600' }}> {AllDetails?.companyDetails?.company_name}</Typography>
          <div className='scrollable-div'><Typography> {AllDetails?.companyDetails?.description}</Typography></div>

        </Flex>
      </Flex>
    </Card>
  )
}

export default BasicCompanyDetails
