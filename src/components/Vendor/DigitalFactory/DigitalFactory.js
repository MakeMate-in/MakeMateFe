import { useState } from 'react';
import { Divider, } from '@mui/material';
import { Card, Col, Row, Steps, Button, Tabs } from 'antd';
import './../Dashboard/Dashboard.css';
import AddressDetails from '../CompanyDetails/AddressDetails';
import './DigitalFactory.css'
import BasicDetails from '../CompanyDetails/BasicDetails';
import AdditionalInfo from '../CompanyDetails/AdditionalInfo';
import Certificates from '../CompanyDetails/Certificates';
import {STEP_TAB_MAP, STEP_TAB_MAP_2} from './../../../utils/constants'

const { Step } = Steps;

const DigitalFactory = () => {

  
  const [current, setCurrent] = useState(0);
  const [currentSub, setCurrentSub] = useState(0);
  const { TabPane } = Tabs;

  const onChange = (value) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  const onChangeSub = (value) => {
    console.log('onChangeSub:', value);
    setCurrentSub(value);
  };


  const items = [
    {
      key: '1',
      label: 'Basic Details',
      children: <BasicDetails/>,
    },
    {
      key: '2',
      label: 'Addresses & Contacts',
      children: <AddressDetails/>,
    },
    {
      key: '3',
      label: 'Certificates',
      children: <Certificates/>,
    },
    {
      key: '4',
      label: 'Additional Information',
      children: <AdditionalInfo/>,
    },
  ]

  const onChangeTab = (key) => {
    setCurrentSub(STEP_TAB_MAP_2[key]);
  };

  const StepDropdown = () => {
    return (
      <Steps
        progressDot
        direction='vertical'
        current={currentSub}
        onChange={onChangeSub}
        items={[
          {
            title: 'Basic Details'
          },
          {
            title: 'Addresses & Contacts'
          },
          {
            title: 'Certificates'
          },
          {
            title: 'Additional Information'
          },
        ]}
      />
    );
  };

  return (

    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Card title="Card title" bordered hoverable style={{ height: '39rem' }}>
            
            <div>
              <Steps direction="vertical" current={current}
                onChange={onChange}>
                <Step title='Company Overview'  description={<StepDropdown />} />
                <Step title="Machines" description="Add your machineries" />
                <Step title="Customer Details" description="This is a description." />
                <Step title="Services" description="Your Business Related Info" />
                <Step title="Photos" description="This is a description." />
                <Step title="Complete" description="Woah, we are here" />
              </Steps>
            </div>

          </Card>
        </Col>
        <Col span={18}>
          <Card bordered hoverable style={{ height: '39rem', overflow: 'auto', scrollbarWidth: 'thin' }}>
            <div>
              <h2 style={{ marginTop: '0' }}>Company Overview</h2>
              <hr />
              <Row>
              <div style={{width:'100%'}}>
                <Tabs defaultActiveKey="1" items={items} onChange={onChangeTab} size='large' activeKey={STEP_TAB_MAP[currentSub]}/>
              </div>
              


              </Row>
            
            </div>
          </Card>
        </Col>
      </Row>
    </div>


  )
}

export default DigitalFactory