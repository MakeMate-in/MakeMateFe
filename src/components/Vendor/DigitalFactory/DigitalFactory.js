import { useState } from 'react';
import { Divider, } from '@mui/material';
import { Card, Col, Row, Steps, Button, Tabs } from 'antd';
import './../Dashboard/Dashboard.css';
import { forms } from '../CompanyDetails/CompanyDetails.js';
import './DigitalFactory.css'
import BasicDetails from '../CompanyDetails/BasicDetails';

const { Step } = Steps;

const DigitalFactory = () => {

  const [selectedOption, setSelectedOption] = useState(null);
  const [buttonLabels, setButtonLabels] = useState(['Basic Details', 'Addresses & Contacts', 'C', 'D']); // Initial button labels
  const [current, setCurrent] = useState(0);
  const [currentSub, setCurrentSub] = useState(0);
  const { TabPane } = Tabs;


  const handleOptionChange = (index) => {
    setSelectedOption(index);
  };

  const renderForm = () => {
    if (selectedOption !== null && forms[selectedOption]) {
      return forms[selectedOption].content;
    }
    return null;
  };

  const handleButtonNameChange = () => {
    setButtonLabels(['E', 'F', 'G', 'H']);
  };

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
      label: 'BasicDetails',
      children: <BasicDetails/>,
    },
    {
      key: '2',
      label: 'Addresses & Contacts',
      children: <BasicDetails/>,
    },
    {
      key: '3',
      label: 'Additional Information',
      children: <BasicDetails/>,
    },
  ]

  const onChangeTab = (key) => {
    console.log(key);
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
            title: 'Finished'
          },
          {
            title: 'In Progress'
          },
          {
            title: 'Waiting'
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
            {/* Button to change button names */}
            <Button onClick={handleButtonNameChange}>Change Button Names</Button>

            <div>


              <Divider />

              <Steps direction="vertical" current={current}
                onChange={onChange}>
                <Step title='Step 1' description={<StepDropdown />} />
                <Step title="In Progress" description="This is a description." />
                <Step title="Waiting" description="This is a description." />
              </Steps>
            </div>

          </Card>
        </Col>
        <Col span={18}>
          <Card bordered hoverable style={{ height: '39rem', overflow: 'auto', scrollbarWidth: 'thin' }}>
            <div>
              <h2 style={{ marginTop: '0' }}>Company Overview</h2>
              <hr />
              {/* <Row style={{ justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
                
                {buttonLabels.map((label, index) => (
                  <Button key={index} type={selectedOption == index ? 'primary' : 'default'} onClick={() => handleOptionChange(index)}>
                    {label}
                  </Button>
                ))}
              </Row> */}
              <Row>
              <div style={{width:'100%'}}>
                <Tabs defaultActiveKey="1" items={items} onChange={onChangeTab} size='large' />
              </div>
              


              </Row>
              {/* <div>
                {renderForm()}
              </div> */}
            </div>
          </Card>
        </Col>
      </Row>
    </div>


  )
}

export default DigitalFactory