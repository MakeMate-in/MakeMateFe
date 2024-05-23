import React from 'react'
import {Row, Tabs} from 'antd'
import BasicDetails from '../CompanyDetails/BasicDetails';
import AdditionalInfo from '../CompanyDetails/AdditionalInfo';
import Certificates from '../CompanyDetails/Certificates';
import AddressDetails from '../CompanyDetails/AddressDetails';
import { STEP_TAB_MAP, STEP_TAB_MAP_2, STEPS_HEADINGS } from './../../../utils/constants';

const CompanyDetails = (props) => {

  const items = [
    {
      key: '1',
      label: 'Basic Details',
      children: <BasicDetails onSaveAndSubmit={props.onSaveAndSubmit} />,
    },
    {
      key: '2',
      label: 'Addresses & Contacts',
      children: <AddressDetails />,
    },
    {
      key: '3',
      label: 'Certificates',
      children: <Certificates />,
    },
    {
      key: '4',
      label: 'Additional Information',
      children: <AdditionalInfo />,
    },
  ]

  return (
    <div>
      <Row>
        <div style={{ width: '100%' }}>
          <Tabs defaultActiveKey="1" items={items} onChange={props.onChangeTab} size='large' activeKey={STEP_TAB_MAP[props.currentSub]} />
        </div>
      </Row>
    </div>
  )
}

export default CompanyDetails
