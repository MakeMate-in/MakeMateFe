import { useState, useEffect } from 'react';
import { Card, Col, Row, Steps, Button, Progress, Flex, Collapse, ConfigProvider } from 'antd';
import './../Dashboard/Dashboard.css';
import './DigitalFactory.css'
import InfraDetails from '../CompanyDetails/Machines';
import { STEP_TAB_MAP_2, STEP_TAB_MAP_INFRA_2 , STEPS_HEADINGS, USER_ID, PER_COUNT } from './../../../utils/constants';
import CompanyDetailsComp from '../CompanyDetails/CompanyOverview/CompanyDetails';
import { getCompanyDetails} from '../../../apis/Vendor/CompanyDetails';
// import CustomerDetails from '../CompanyDetails/CustomerDetails/CustomerDetails';


const { Step } = Steps;

const DigitalFactory = () => {

  const [current, setCurrent] = useState(0);
  const [currentSub, setCurrentSub] = useState(0);
  const [currentInfraSub, setCurrentInfraSub] = useState(0);
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
      if(CompanyDetails.company_name!==undefined && CompanyDetails.company_name!=='')per=per+PER_COUNT
    
      if(CompanyDetails.address!==undefined && CompanyDetails.address.length>0) per=per+PER_COUNT
    
      if(CompanyDetails.contact_person!==undefined && CompanyDetails.contact_person.length>0) per=per+PER_COUNT
    
      if(CompanyDetails.customer_details!==undefined && CompanyDetails.customer_details.length>0) per=per+PER_COUNT
    
      if(CompanyDetails.product_details!==undefined && CompanyDetails.product_details.length>0) per=per+PER_COUNT
    
      setPercent(per)
    }

   CalculatePercentage()

},[CompanyDetails])

  const onSaveAndSubmit = () => {
    if (currentSub === 3) {
      setCurrent(current + 1);
    } else {
      setCurrentSub(currentSub + 1);
    }

    if (currentInfraSub === 2) {
      setCurrent(current + 1);
    } else {
      setCurrentInfraSub(currentSub + 1);
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

  const onChangeInfraSub = (value) => {
    console.log('onChangeSub:', value);
    setCurrentInfraSub(value);
  };

  const onChangeTab = (key) => {
    setCurrentSub(STEP_TAB_MAP_2[key]);
  };

  const onChangeInfraTab = (key) => {
    setCurrentInfraSub(STEP_TAB_MAP_INFRA_2[key]);
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


  const StepDropdownMachines = () => {
    return (
      <Steps
        progressDot
        direction='vertical'
        current={currentInfraSub}
        onChange={onChangeInfraSub}
        items={[
          {
            title: 'Machines'
          },
          {
            title: 'Infrastructure Details'
          },
          {
            title: 'Services'
          },
        ]}
      />
    );
  };
  return (
<ConfigProvider
  theme={{
    components: {
      Collapse: {
        /* here is your component tokens */
        headerPadding: '0px',
        contentPadding: '0px'
      },
    },
  }}
>
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Card bordered hoverable 
          style={{ 
            height: '39rem', 
            overflow: 'auto', 
            // overflow:'hidden', 
            scrollbarWidth: 'none' }}>
            <Flex vertical
            //  style={{ alignItems: 'center' }}
             >
              <div  style={{ display:'flex', flexDirection:'column', alignItems: 'center' }}>
                <h4>Return to Dashboard</h4>
                <Progress strokeWidth={13} type="dashboard" percent={percent} size={150} gapDegree={150} />
              </div>
              <div style={{ margin: '0' }}>
                <Steps direction="vertical" current={current}
                  onChange={onChange}>
                  <Step title={<span>{STEPS_HEADINGS[0]} <Collapse ghost items={[{ key: '1',  label:'This is Description',children: <StepDropdown /> }]}
                  /></span>} />
                  <Step title={STEPS_HEADINGS[1]} description={<Collapse ghost
                    items={[{ key: '1', label:'This is Description',children: <StepDropdownMachines /> }]}
                  />} />
                  <Step title={STEPS_HEADINGS[2]} description="This is a description." />
                  <Step title={STEPS_HEADINGS[3]} description="Woah, we are here" />
                </Steps>
              </div>
            </Flex>
          </Card>
        </Col>
        <Col span={18}>
          <Card bordered hoverable style={{ height: '39rem', 
          overflow: 'auto',
           scrollbarWidth: 'none', position: 'relative' }}>
            <div>
              <h2 style={{ marginTop: '0' }}>{STEPS_HEADINGS[current]}</h2>
              <hr />
              {current === 0 ? <CompanyDetailsComp onSaveAndSubmit={onSaveAndSubmit} currentSub={currentSub} onChangeTab={onChangeTab} CompanyDetails={CompanyDetails} setcompanyDetails={setcompanyDetails}/> : ''}
              {current === 1 ? <InfraDetails onSaveAndSubmit={onSaveAndSubmit} currentSub={currentInfraSub} onChangeTab={onChangeInfraTab} /> : ''}
              {/* {current == 2 ? <CustomerDetails onSaveAndSubmit={onSaveAndSubmit} currentSub={currentInfraSub} onChangeTab={onChangeInfraTab} /> : ''} */}
            </div>

          </Card>
          { current!==0 || currentSub !== 0 ?
              
              <div style={{ bottom: '1%', position: 'absolute',right:'2%' }}>
                <Button type='primary' form='form1' onClick={onSaveAndSubmit} style={{fontSize:'18px', fontWeight:'600', height:'40px', display:'flex', alignItems:'center'}}>Save & Continue</Button>
              </div> 
              
              : ''}
        </Col>
      </Row >
    </div >

    </ConfigProvider>
  )
}

export default DigitalFactory