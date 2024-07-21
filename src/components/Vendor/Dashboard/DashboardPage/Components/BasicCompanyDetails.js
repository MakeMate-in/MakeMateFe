import React, { useEffect } from 'react'
import { Card, Flex, Avatar, Typography } from 'antd'
import business_plan from './../../../../../assets/business_plan.svg'
import { convertBufferToBinary } from '../../../../../utils/helper'
import { bg3 } from '../../../../../utils/colorGradient'


const BasicCompanyDetails = (props) => {
  let AllDetails = props.AllDetails

  let url 
  if(AllDetails && AllDetails.companyDetails && AllDetails.companyDetails.company_logo)
url = `data:image/png;base64,${AllDetails.companyDetails.company_logo}`;

  return (
    <Card style={{ marginBottom: '20px', background: bg3 }}>
      <Flex gap={"large"}>
        <Avatar alt="User"
          src={url}
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
