import { useState, useEffect } from 'react';
import { Card, Col, Row, Steps, Button, Progress, Flex, Collapse, ConfigProvider, Typography } from 'antd';
import './../Dashboard/Dashboard.css';
import './DigitalFactory.css'
import InfraDetails from '../CompanyDetails/Machines';
import { STEP_TAB_MAP_2, STEP_TAB_MAP_INFRA_2, STEPS_HEADINGS, PER_COUNT, PER_INFRA_COUNT } from './../../../utils/constants';
import CompanyDetailsComp from '../CompanyDetails/CompanyOverview/CompanyDetails';
import { getAllDetails, getCompanyDetails } from '../../../apis/Vendor/CompanyDetails';
import CustomerDetails from '../CompanyDetails/CustomerDetails/CustomerDetails';
import { checkButtonRequired, getCopanyId, getUserId, openNotificationWithIcon } from '../../../utils/helper';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { OPEN_ROUTES } from '../../../utils/constants'
import Completed from '../CompanyDetails/Completed/Completed';
import { NOTIFICATION_MESSAGES } from '../../../utils/locale';
import { notification } from 'antd';
import { connect } from 'react-redux';
import { setProgress } from '../../../actions/allAction';


const { Step } = Steps;

const DigitalFactory = (props) => {

  const [current, setCurrent] = useState(0);
  const [currentSub, setCurrentSub] = useState(0);
  const [currentInfraSub, setCurrentInfraSub] = useState(0);
  const [CompanyDetails, setcompanyDetails] = useState(undefined)
  const [MachineDetails, setMachineDetails] = useState({})
  const [InfrastructureDetails, setInfrastructureDetails] = useState({})
  const [customerDetails, setCustomerDetails] = useState({})
  const [AllDetails, setAllDetails] = useState(undefined);
  const [percent, setPercent] = useState(0)
  const [plantImagesCount, setPlantImagesCount] = useState(0)
  const [certificateCount, setCertificateCount] = useState(0)
  const navigate = useNavigate()

  const colors1 = ['#6253E1', '#04BEFE'];

  const [api] = notification.useNotification();

  const backToDashboard = () => {
    if(props.progress<=90){
      openNotificationWithIcon('error',"Please Complete Profile.","Progress Bar should be above 90 Percent","")
    }
    else{
      navigate(OPEN_ROUTES.VENDOR_DASHBOARD)
    }
   
  }

  const openFailedNotification = (placement, message) => {
    api.error({
        message: `Something went wrong`,
        description: message,
        placement,
    });
};



  const getCompany = async () => {

    try{
      const  COMPANY_ID = getCopanyId()
    let param_1 = {
      companyId: COMPANY_ID
    }
    const respAll = await getAllDetails(param_1);
    setAllDetails(respAll.data);
  }
  catch(err){
    openFailedNotification('topRight', NOTIFICATION_MESSAGES.ERROR_FETCH_DETAILS)
  }
  }


  const setAllData = async (respAll) => {


    if (respAll.data.images) {
      setPlantImagesCount(respAll.data.images.length);
    }
    if (respAll.data.certificates && respAll.data.certificates.certificates) {
      setCertificateCount(respAll.data.certificates.certificates.length);
    }

    setCustomerDetails(respAll.data.productDetails);
    
    setMachineDetails(respAll.data.machineDetails);
    
    setInfrastructureDetails(respAll.data.infrastructureDetails);
    
    setAllDetails(respAll.data);

  }

  const getCompanyData = async () => {
    const USER_ID = getUserId();
    const  COMPANY_ID = getCopanyId()
  
    let param = { user: USER_ID };
    let param_1 = { companyId: COMPANY_ID };
  
    try {
      // Run both API calls in parallel
      const [resp, respAll] = await Promise.all([
        getCompanyDetails(param),
        getAllDetails(param_1)
      ]);
  
  
      setcompanyDetails(resp.data);

      setAllData(respAll)
  
    } catch (err) {
      openFailedNotification('topRight', NOTIFICATION_MESSAGES.ERROR_FETCH_DETAILS);
    }
  };

  useEffect(() => {
    getCompanyData()
    console.log(CompanyDetails)
  }, [])


  useEffect(() => {
    getCompany()
  }, [CompanyDetails])


  const CalculatePercentage = async () => {
    let per = 0;

    // if ( (InfrastructureDetails && InfrastructureDetails.manpower !== undefined && InfrastructureDetails.manpower !== null )) per = per + 5
    
    if (AllDetails?.companyDetails?.company_name !== undefined && AllDetails?.companyDetails?.company_name !== '') per = per + 10

    if (CompanyDetails?.company_logo !== undefined && CompanyDetails?.company_logo.data.length>0) per = per + PER_COUNT
    
    if (CompanyDetails?.description !== undefined && CompanyDetails.description !== '') per = per + 10

    if (AllDetails?.companyDetails?.address !== undefined && AllDetails?.companyDetails.address?.length > 0) per = per + 8

    if (AllDetails?.companyDetails?.contact_person !== undefined && AllDetails?.companyDetails?.contact_person.length > 0) per = per + 8

    // if (AllDetails?.companyDetails?.customer_details !== undefined && AllDetails?.companyDetails?.customer_details.length > 0) per = per + 3

    // if (AllDetails?.companyDetails?.product_details !== undefined && AllDetails?.companyDetails?.product_details.length > 0) per = per + 3

    if (certificateCount>0) per = per + PER_COUNT

    if ( (InfrastructureDetails && InfrastructureDetails.assembly_area !== undefined && InfrastructureDetails.assembly_area !== null) && InfrastructureDetails?.assembly_area !== '') per = per + PER_INFRA_COUNT

    if ((InfrastructureDetails && InfrastructureDetails.assembly_table !== undefined && InfrastructureDetails.assembly_table !== null) && InfrastructureDetails?.assembly_table !== '') per = per + PER_INFRA_COUNT

    if ( (InfrastructureDetails && InfrastructureDetails.design_softwares !== undefined && InfrastructureDetails.design_softwares !== null) && InfrastructureDetails?.design_softwares !== '') per = per + PER_INFRA_COUNT

    if ( (InfrastructureDetails && InfrastructureDetails.surface_table !== undefined && InfrastructureDetails.surface_table !== null) && InfrastructureDetails?.surface_table !== '') per = per + PER_INFRA_COUNT

    if ( (InfrastructureDetails && InfrastructureDetails.CMM !== undefined && InfrastructureDetails.CMM !== null) && InfrastructureDetails?.CMM !== '') per = per + PER_INFRA_COUNT

    if ( (InfrastructureDetails && InfrastructureDetails.crane_tonnage !== undefined && InfrastructureDetails.crane_tonnage !== null) && InfrastructureDetails?.crane_tonnage > 0) per = per + PER_INFRA_COUNT

    if ( (InfrastructureDetails && InfrastructureDetails.plant_area !== undefined && InfrastructureDetails.plant_area !== null) && InfrastructureDetails?.plant_area !== '') per = per + PER_INFRA_COUNT

    

    if (MachineDetails !== undefined && MachineDetails.length>0) per = per + PER_COUNT

    if (customerDetails !== undefined && customerDetails.length>0) per = per + PER_COUNT

    if (plantImagesCount>0) per = per + PER_COUNT


    setPercent(per)
    if(per!=props.progress)
    props.setProgress(per)
  }

  useEffect(() => {
    CalculatePercentage()

  }, [CompanyDetails,InfrastructureDetails,MachineDetails, plantImagesCount, customerDetails, AllDetails, certificateCount])

  const onSaveAndSubmit = () => {
    const CURRENT_SUB = 2
    if (current === 0 && currentSub < CURRENT_SUB) {
      setCurrentSub(currentSub + 1);
    } else if (current === 0 && currentSub === CURRENT_SUB) {
      setCurrent(current + 1);
      setCurrentInfraSub(0);
    } else if (current === 1 && currentInfraSub < 3) {
      setCurrentInfraSub(currentInfraSub + 1);
    } 
    else if (current===3){
      setCurrent(0)
      setCurrentSub(0)
      setCurrentInfraSub(0)
    }
    else {
      setCurrent(current + 1);
    }
  };


  const onChange = (value) => {
    setCurrent(value);
  };

  const onChangeSub = (value) => {
    setCurrentSub(value);
  };

  const onChangeInfraSub = (value) => {
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
          // {
          //   title: 'Additional Information'
          // },
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
            title: 'Infrastructure Details'
          },
          {
            title: 'Machines'
          },
          {
            title: 'Services'
          },
          {
            title: 'Plant Images'
          }
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
                scrollbarWidth: 'none'
              }}>
              <Flex vertical>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <h4 style={{cursor:'pointer'}} onClick={backToDashboard}><LeftOutlined /> Return to Dashboard</h4>
                  <Progress strokeWidth={13} type="dashboard" percent={props.progress} size={150} gapDegree={150} />
                </div>
                <div style={{ margin: '0' }}>
                  <Steps direction="vertical" current={current}
                    onChange={onChange}>
                    <Step title={<span><Typography style={{ margin: '0px', fontSize:'18px', fontWeight:'600' }}>{STEPS_HEADINGS[0]}</Typography> <Collapse ghost items={[{ key: '1', label: 'Provide Company Details', children: <StepDropdown /> }]}
                    /></span>} />
                    <Step title={<Typography style={{ margin: '0px', fontSize:'18px', fontWeight:'600' }}>{STEPS_HEADINGS[1]}</Typography>} description={<Collapse ghost
                      items={[{ key: '1', label: 'Machines & Business Info', children: <StepDropdownMachines /> }]}
                    />} />
                    <Step title={<Typography style={{ margin: '0px', fontSize:'18px', fontWeight:'600' }}>{STEPS_HEADINGS[2]}</Typography>} description="Create a list of Customers" />
                    <Step title={<Typography style={{ margin: '0px', fontSize:'18px', fontWeight:'600' }}>{STEPS_HEADINGS[3]}</Typography>} description="Woah, we are here" />
                  </Steps>
                </div>
              </Flex>
            </Card>
          </Col>
          <Col span={18}>
            <Card bordered hoverable style={{
              height: '39rem',
              overflow: 'auto',
              scrollbarWidth: 'none', position: 'relative'
            }}>
              <div>
              {<Typography style={{ margin: '0px', fontSize:'18px', fontWeight:'620' }}>{STEPS_HEADINGS[current]}</Typography>}
                <hr />
                {CompanyDetails && current === 0 && <CompanyDetailsComp onSaveAndSubmit={onSaveAndSubmit} currentSub={currentSub} onChangeTab={onChangeTab} CompanyDetails={CompanyDetails} setcompanyDetails={setcompanyDetails} setCertificateCount={setCertificateCount} certificateCount={certificateCount}/>}
                {current === 1 ? <InfraDetails onSaveAndSubmit={onSaveAndSubmit} currentSub={currentInfraSub} onChangeTab={onChangeInfraTab} MachineDetails={MachineDetails} setMachineDetails={setMachineDetails} InfrastructureDetails={InfrastructureDetails} setInfrastructureDetails={setInfrastructureDetails} setPlantImagesCount={setPlantImagesCount} /> : ''}
                {current === 2 ? <CustomerDetails onSaveAndSubmit={onSaveAndSubmit} currentSub={currentInfraSub} onChangeTab={onChangeInfraTab} customerDetails={customerDetails} setCustomerDetails={setCustomerDetails} /> : ''}
                {current === 3 ? <Completed percent={props.progress} onSaveAndSubmit={onSaveAndSubmit} /> :''} 
              </div>

            </Card>
            {checkButtonRequired(current, currentSub, currentInfraSub) ?

              <div style={{ bottom: '1%', position: 'absolute', right: '2%' }}>
                <Button type='primary' form='form1' onClick={onSaveAndSubmit} style={{ fontSize: '18px', fontWeight: '600', height: '40px', display: 'flex', alignItems: 'center', background:`linear-gradient(135deg, ${colors1.join(', ')})`}}>Save & Continue</Button>
              </div>

              : ''}
          </Col>
        </Row >
      </div >

    </ConfigProvider>
  )
}

const mapStateToProps = (state) => {
  return {
      progress: state.allReducer.progress
  }
}

const mapDispatchToProps = {
  setProgress
}

export default connect(mapStateToProps, mapDispatchToProps)(DigitalFactory)
