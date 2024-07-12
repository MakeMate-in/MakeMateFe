import React, { useEffect } from 'react'
import { Card, Flex, Avatar, Typography } from 'antd'
import business_plan from './../../../../../assets/business_plan.svg'
import { convertBufferToBinary } from '../../../../../utils/helper'


const BasicCompanyDetails = (props) => {
  let AllDetails = props.AllDetails
  let url = convertBufferToBinary(AllDetails.companyDetails.company_logo)
  const colors1 = ['#6253E1', '#04BEFE'];
  const colors2 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
  const colors3 = ['#40e495', '#30dd8a', '#2bb673'];
  let bg1 = `linear-gradient(116deg,  ${colors3.join(', ')})`
  let bg2 = `linear-gradient(90deg,  ${colors2.join(', ')})`
  let bg3 = `linear-gradient(135deg, ${colors1.join(', ')})`

  return (
    <Card style={{ marginBottom: '20px', background:bg3}}>
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
