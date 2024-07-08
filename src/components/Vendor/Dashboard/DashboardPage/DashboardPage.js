import { useState, useEffect } from 'react';
import { Card, Col, Statistic, Row, Flex, Tag, Carousel, ConfigProvider, Typography } from 'antd';
import Machines from '../../CompanyDetails/Machines/Machines';
import business_plan from './../../../../assets/business_plan.svg';
import svg_experience from './../../../../assets/svg_experience.svg';
import svg_projects from './../../../../assets/svg_projects.svg';
import svg_customers from './../../../../assets/svg_customers.svg';
import CustomerDetails from '../../CompanyDetails/CustomerDetails/CustomerDetails';
import { getAllDetails } from '../../../../apis/Vendor/CompanyDetails';
import { Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './DashboardPage.css';
import { convertBufferToBinary, getCopanyId } from '../../../../utils/helper';
import BasicCompanyDetails from './Components/BasicCompanyDetails';
import { notification } from 'antd';
import InfraDashboard from './Components/InfraDashboard';
import ContactDetails from './Components/ContactDetails';
import ServicesDetails from './Components/ServicesDetails';


ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardPage = () => {
  const [AllDetails, setAllDetails] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [api] = notification.useNotification();

  const [srcList, setSrcList] = useState([]);

  const openFailedNotification = (placement, message) => {
    api.error({
      message: `Something went wrong`,
      description: message,
      placement,
    });
  };


  const getAllDashboardDetails = async () => {
    const COMPANY_ID = getCopanyId()
    let param = {
      companyId: COMPANY_ID,
    };
    try {
      const resp = await getAllDetails(param);

      console.log(resp)
      setAllDetails(resp.data);

      let newSrcList = [];
      if (resp.data.plantImages) {
        resp.data.plantImages.company_Images.map(async (item, i) => {
          let data = {
            name: "Image_" + i,
            src: convertBufferToBinary(item.image),
            type: 'image/png',
            id: i + 1
          }
          newSrcList.push(data)
        })
        setSrcList(newSrcList);
      }
      setLoading(false);
    }
    catch (err) {
      console.log(err)
      if (err.response.status != 401) {
        openFailedNotification('topRight', "Unable to Fetch Details")
      }
    }
  };

  useEffect(() => {
    getAllDashboardDetails();
  }, []);


  const pieChartColors = ['#9e0142', '#3288bd', '#5e4fa2', '#f46d43', '#d53e4f', '#fdae61', '#fee08b', '#e6f598', '#abdda4', '#66c2a5']


  const pieData = AllDetails ? {
    labels: AllDetails?.infrastructureDetails?.manpower.map(m => m.designation),
    datasets: [
      {
        label: 'Manpower',
        data: AllDetails?.infrastructureDetails?.manpower.map(m => m.count),
        backgroundColor: pieChartColors.slice(0, AllDetails?.infrastructureDetails?.manpower.length),
        hoverBackgroundColor: pieChartColors.slice(0, AllDetails?.infrastructureDetails?.manpower.length),
      },
    ],
  } : {
    labels: [],
    datasets: [
      {
        label: 'Manpower',
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  const totalManpower = AllDetails ? AllDetails?.infrastructureDetails?.manpower.reduce((total, m) => total + m.count, 0) : 0;



  return (
    <div style={{ overflow: 'auto', scrollbarWidth: 'none' }}>
      {AllDetails == undefined ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '84vh' }}>
          <div class="spinner-square">
            <div class="square-1 square"></div>
            <div class="square-2 square"></div>
            <div class="square-3 square"></div>
          </div>
        </div>
      ) :
        <ConfigProvider
          theme={{
            components: {
              Statistic: {
                titleFontSize: 20
              },
            },
          }}
        >

          <Row gutter={16} style={{ marginTop: '10px' }}>
            <Col span={16}>
              <Row gutter={16}>
                <Card style={{Height:'40%'}}>
                  <Carousel arrows dotPosition="left">

                    {srcList.map((item, i) => (
                      <div>
                        <img src={item.src} style={{ height: "40vh", width: "100%" }} />
                      </div>

                    ))}
                  </Carousel>
                </Card>
              </Row>

              <Row gutter={16} style={{ marginTop: '10px', marginBottom: '10px' }}>
                <Col span={8}>
                  <Card size='small' hoverable>
                    <Row>
                      <Col span={16}>
                        <Statistic
                          title="Total Experience"
                          value={AllDetails?.companyDetails?.experience}
                          valueStyle={{
                            color: '#3f8600',
                            fontWeight: 600,
                            fontSize: '28px'
                          }}
                          suffix="Years"
                        />
                      </Col>
                      <Col span={8}>
                        <img src={svg_experience} alt="" style={{ float: 'right' }} />
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card size='small' hoverable>
                    <Row>
                      <Col span={16}>
                        <Statistic
                          title="No. of Projects"
                          value={AllDetails?.companyDetails?.current_projects_no}
                          valueStyle={{
                            color: '#3f8600',
                            fontWeight: 600,
                            fontSize: '28px'
                          }}
                        />
                      </Col>
                      <Col span={8}>
                        <img src={svg_projects} alt="" style={{ float: 'right' }} />
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col span={8}>
                  <Card size='small' hoverable>
                    <Row>
                      <Col span={16}>
                        <Statistic
                          title="Customer Details"
                          value={AllDetails?.companyDetails?.customer_details.length}
                          valueStyle={{
                            color: '#3f8600',
                            fontWeight: 600,
                            fontSize: '28px'
                          }}
                        />
                      </Col>
                      <Col span={8}>
                        <img src={svg_customers} alt="" style={{ float: 'right' }} />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>

              <Typography style={{ margin: '0', marginTop: '10px', fontSize: '20px', fontWeight: '600' }}>Machine Details</Typography>
              <Card size='small' style={{ overflow: 'auto', scrollbarWidth: 'none', height: '50vh' }}>
                <Machines />
              </Card>

              <Typography style={{ margin: '0', marginTop: '10px', fontSize: '20px', fontWeight: '600' }}>Customer Details</Typography>
              <Card size='small' style={{ overflow: 'auto', scrollbarWidth: 'none', height: '50vh' }}>
                <CustomerDetails />
              </Card>

            </Col>


            <Col span={8}>

              <BasicCompanyDetails AllDetails={AllDetails} />


              <Card style={{ height: '100%' }}>

                <ContactDetails AllDetails={AllDetails} />

                <InfraDashboard AllDetails={AllDetails} />

                <Typography style={{ margin: '0', marginTop: '10px', fontSize: '20px', fontWeight: '600' }}>Total Manpower: {totalManpower}</Typography>
                <Card style={{ backgroundImage: business_plan }} id='pie' >
                  <Doughnut style={{ height: '40vh' }} data={pieData} options={pieOptions} />
                </Card>

                <ServicesDetails />



              </Card>
            </Col>
          </Row>
        </ConfigProvider>}
    </div>
  )
}

export default DashboardPage;
