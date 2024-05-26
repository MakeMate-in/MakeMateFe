import React from 'react'
import {Row, Tabs} from 'antd'
import BasicDetails from '../CompanyDetails/BasicDetails';
import AdditionalInfo from '../CompanyDetails/AdditionalInfo';
import Certificates from './Certificates/Certificates';
import AddressDetails from '../CompanyDetails/AddressDetails';
import { STEP_TAB_MAP, STEP_TAB_MAP_2, STEPS_HEADINGS } from './../../../utils/constants';

const CompanyDetailsComp = (props) => {

  const items = [
    {
      key: '1',
      label: 'Basic Details',
      children: <BasicDetails {...props} />,
    },
    {
      key: '2',
      label: 'Addresses & Contacts',
      children: <AddressDetails {...props}/>,
    },
    {
      key: '3',
      label: 'Certificates',
      children: <Certificates {...props}/>,
    },
    {
      key: '4',
      label: 'Additional Information',
      children: <AdditionalInfo {...props}/>,
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

export default CompanyDetailsComp
