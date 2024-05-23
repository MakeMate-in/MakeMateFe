import { useState, useEffect } from 'react';
import { Card, Col, Row, Steps, Button, Tabs, Progress, Flex, Collapse } from 'antd';
import './../Dashboard/Dashboard.css';
import './DigitalFactory.css'
import InfraDetails from '../CompanyDetails/Machines';
import { STEP_TAB_MAP, STEP_TAB_MAP_2, STEPS_HEADINGS } from './../../../utils/constants';
import CompanyDetails from '../CompanyDetails/CompanyDetails';


const { Step } = Steps;

const DigitalFactory = () => {

  const [current, setCurrent] = useState(0);
  const [currentSub, setCurrentSub] = useState(0);
  const { TabPane } = Tabs;
  const [CompanyDetails, setcompanyDetails] = useState({})
  const [percent,setPercent] = useState(0)

  useEffect(() => {
    const getCompany = async () => {
        let param = {
            user: USER_ID
        }
        const resp = await getCompanyDetails(param)
        setcompanyDetails(resp.data)
    }

    getCompany()
}, [])

useEffect(() => {
    const CalculatePercentage = async () => {
      let per = 0;
      if(CompanyDetails.company_name!=undefined && CompanyDetails.company_name!=='')per=per+10
      if(CompanyDetails.address!=undefined && CompanyDetails.address.kength>0) per=per+10
      if(CompanyDetails.contact_person!=undefined && CompanyDetails.contact_person.kength>0) per=per+10
      if(CompanyDetails.customer_details!=undefined && CompanyDetails.customer_details.length>0) per=per+10
      if(CompanyDetails.product_details!=undefined && CompanyDetails.product_details.length>0) per=per+10
   
      setPercent(per)
    }

   CalculatePercentage()

},[CompanyDetails])

  const onSaveAndSubmit = () => {
    if (currentSub == 3) {
      setCurrent(current + 1);
    } else {
      setCurrentSub(currentSub + 1);
    }
  };


  const onChange = (value) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  const onChangeSub = (value) => {
    console.log('onChangeSub:', value);
    setCurrentSub(value);
  };

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
          <Card bordered hoverable style={{ height: '39rem', overflow: 'auto', scrollbarWidth: 'thin' }}>
            <Flex vertical style={{ alignItems: 'center' }}>
              <div>
                <h4>Return to Dashboard</h4>
                <Progress strokeWidth={13} type="dashboard" percent={percent} size={150} gapDegree={150} />
              </div>
              <div style={{ margin: '0' }}>
                <Steps direction="vertical" current={current}
                  onChange={onChange}>
                  <Step title={STEPS_HEADINGS[0]} description={<Collapse
                    items={[{ key: '1', children: <StepDropdown /> }]}
                  />} />
                  {/* <Collapse
                    items={[{ key: '1',label:'Company', children: <Step title={STEPS_HEADINGS[0]} description={<StepDropdown />} /> }]}
                  /> */}
                  <Step title={STEPS_HEADINGS[1]} description="Add your machineries" />
                  <Step title={STEPS_HEADINGS[2]} description="This is a description." />
                  {/* <Step title="Services" description="Your Business Related Info" /> */}
                  <Step title={STEPS_HEADINGS[3]} description="Woah, we are here" />
                </Steps>
              </div>
            </Flex>
          </Card>
        </Col>
        <Col span={18}>
          <Card bordered hoverable style={{ height: '39rem', overflow: 'auto', scrollbarWidth: 'thin', position: 'relative' }}>
            <div>
              <h2 style={{ marginTop: '0' }}>{STEPS_HEADINGS[current]}</h2>
              <hr />
              {current == 0 ? <CompanyDetails onSaveAndSubmit={onSaveAndSubmit} currentSub={currentSub} onChangeTab={onChangeTab} /> : ''}

              {currentSub != 0 ? <div style={{ bottom: '0', position: 'absolute' }}>
                <Button type='primary' form='form1' onClick={onSaveAndSubmit}>Save and Submit</Button>
              </div> : ''}
            </div>

          </Card>
        </Col>
      </Row >
    </div >


  )
}

export default DigitalFactory