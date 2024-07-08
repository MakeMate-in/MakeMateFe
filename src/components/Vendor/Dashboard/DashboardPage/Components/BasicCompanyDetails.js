import React, { useEffect } from 'react'
import { Card, Flex, Avatar, Typography } from 'antd'
import business_plan from './../../../../../assets/business_plan.svg'
import { convertBufferToBinary } from '../../../../../utils/helper'


const BasicCompanyDetails = (props) => {
  let AllDetails = props.AllDetails
  console.log(AllDetails.companyDetails)
  let url = convertBufferToBinary(AllDetails.companyDetails.company_logo)

  return (
    <Card style={{ marginBottom: '20px', border:'2px solid green' }}>
    <Flex gap={"large"}>
          <Avatar alt="User"
            src={url}
            size={100} />
  <Flex vertical>
          <Typography style={{ fontFamily: 'Cambria', marginBottom: '0', fontSize:'25px', fontWeight:'600' }}> {AllDetails?.companyDetails?.company_name}</Typography>
          <Typography> {AllDetails?.companyDetails?.description}</Typography>

          </Flex>
          </Flex>
    </Card>
  )
}

export default BasicCompanyDetails
