import  { useState } from 'react';
import { Divider,} from '@mui/material';
import { Card, Col, Row, Steps, Button } from 'antd';
import './../Dashboard/Dashboard.css';
import { forms } from '../CompanyDetails/CompanyDetails.js';

const { Step } = Steps;

const DigitalFactory = () => {

  const [selectedOption, setSelectedOption] = useState(null);
  const [buttonLabels, setButtonLabels] = useState(['Basic Details', 'Addresses & Contacts', 'C', 'D']); // Initial button labels
  const [current, setCurrent] = useState(0);
  const [currentSub, setCurrentSub] = useState(0);



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
        <Card bordered hoverable style={{ height: '39rem', overflow: 'auto', scrollbarWidth: 'thin'}}>
          <div>
            <h2 style={{ marginTop: '0' }}>Company Overview</h2>
            <hr />
            <Row style={{ justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
              {/* Render buttons dynamically */}
              {buttonLabels.map((label, index) => (
                <Button key={index} type={selectedOption == index ? 'primary' : 'default'} onClick={() => handleOptionChange(index)}>
                  {label}
                </Button>
              ))}
            </Row>
            <div>
            {renderForm()}
            </div>
          </div>
        </Card>
      </Col>
    </Row>
  </div>

    
  )
}

export default DigitalFactory