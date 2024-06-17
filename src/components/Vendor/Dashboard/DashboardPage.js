import { useState, useEffect } from 'react';
import { Card, Col, Statistic, Row, Flex, Tag, Carousel, ConfigProvider } from 'antd';
import { COMPANY_ID } from './../../../utils/constants';
import Machines from './../CompanyDetails/Machines/Machines';
import business_plan from './../../../assets/business_plan.svg';
import svg_experience from './../../../assets/svg_experience.svg';
import svg_projects from './../../../assets/svg_projects.svg';
import svg_customers from './../../../assets/svg_customers.svg';
import CustomerDetails from '../CompanyDetails/CustomerDetails/CustomerDetails';
import { getAllDetails } from '../../../apis/Vendor/CompanyDetails';
import { Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { rgb } from 'polished';
import './DashboardPage.css';
import { convertBufferToBinary } from '../../../utils/helper';

ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardPage = () => {
  const [AllDetails, setAllDetails] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const [srcList, setSrcList] = useState([]);

  useEffect(() => {
    const getAllDashboardDetails = async () => {
      let param = {
        companyId: COMPANY_ID,
      };
      const resp = await getAllDetails(param);
      setAllDetails(resp.data);

      let newSrcList = [];
      resp.data.plantImages.company_Images.map(async (item, i) => {
          let data = {
              name: "Image_"+i,
              src: convertBufferToBinary(item.image),
              type: 'image/png',
              id: i + 1
          }
          newSrcList.push(data)
      })
      setSrcList(newSrcList);

      setLoading(false);
    };

    getAllDashboardDetails();
  }, []);

  const colors = [
    'processing', 'success', 'error', 'warning', 'magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple',
  ];

  const pieChartColors = ['#9e0142', '#3288bd', '#5e4fa2', '#f46d43', '#d53e4f', '#fdae61', '#fee08b', '#e6f598', '#abdda4', '#66c2a5']
  const pieData = AllDetails ? {
    labels: AllDetails.infrastructureDetails.manpower.map(m => m.designation),
    datasets: [
      {
        label: 'Manpower',
        data: AllDetails.infrastructureDetails.manpower.map(m => m.count),
        backgroundColor: pieChartColors.slice(0, AllDetails.infrastructureDetails.manpower.length),
        hoverBackgroundColor: pieChartColors.slice(0, AllDetails.infrastructureDetails.manpower.length),
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

  const totalManpower = AllDetails ? AllDetails.infrastructureDetails.manpower.reduce((total, m) => total + m.count, 0) : 0;

  // Function to get a random color for Services Tags
  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  const carouselStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };


  return (
    <div style={{ overflow: 'auto', scrollbarWidth: 'none' }}>
      {loading ? (
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
          <Row gutter={16}>
            <Col span={16}>
              <Card>
                <Row>
                  <Col span={14}>
                    <h1 style={{ fontFamily: 'Cambria', marginBottom: '0' }}>Welcome, {AllDetails.companyDetails.company_name}</h1>
                    <p>{AllDetails.companyDetails.description}</p>
                    <p><strong>GSTN: </strong>{AllDetails.companyDetails.GST_no}</p>
                    <Flex>
                      <p><strong>Address: </strong><p style={{ margin: '0px' }}><b>{AllDetails.companyDetails.address[0].address_title}</b></p>
                        <p style={{ margin: '0px' }}>{AllDetails.companyDetails.address[0].address_line}</p>
                        <p style={{ margin: '0px' }}> {AllDetails.companyDetails.address[0].city}, {AllDetails.companyDetails.address[0].state}</p>
                        <p style={{ margin: '0px' }}>{AllDetails.companyDetails.address[0].country}, {AllDetails.companyDetails.address[0].pincode}</p></p>

                      <p><strong>Contact: </strong> <p style={{ margin: '0px' }}><b>{AllDetails.companyDetails.contact_person[0].name}</b></p>
                        <p style={{ margin: '0px' }}>Designation: {AllDetails.companyDetails.contact_person[0].designation} </p>
                        <p style={{ margin: '0px' }}>Email: {AllDetails.companyDetails.contact_person[0].email}</p>
                        <p style={{ margin: '0px' }}>Phone: {AllDetails.companyDetails.contact_person[0].mobile_no}</p></p>
                    </Flex>
                  </Col>
                  <Col span={10}>
                    <img src={business_plan} alt="" style={{ float: 'right' }} />
                  </Col>
                </Row>
              </Card>
              <Row gutter={16} style={{ marginTop: '10px', marginBottom: '10px' }}>
                <Col span={8}>
                  <Card size='small' hoverable>
                    <Row>
                      <Col span={16}>
                        <Statistic
                          title="Total Experience"
                          value={AllDetails.companyDetails.experience}
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
                          value={AllDetails.companyDetails.current_projects_no}
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
                          value={AllDetails.companyDetails.customer_details.length}
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

              <h2>Machine Details</h2>
              <Card size='small' style={{ overflow: 'auto', scrollbarWidth: 'none', height: '50vh' }}>
                <Machines />
              </Card>

              <h2>Customer Details</h2>
              <Card size='small' style={{ overflow: 'auto', scrollbarWidth: 'none', height: '50vh' }}>
                <CustomerDetails />
              </Card>
            </Col>
            <Col span={8}>
              <Card style={{ height: '100%' }}>
                <h2 style={{ margin: '0' }}>InfraStructure Details</h2>
                <Row gutter={16}>

                  <Col span={12}>
                    <Card size='small' hoverable style={{ borderRadius: "15px", marginTop: '5px' }}>
                      <Statistic
                        title="Plant Area"
                        value={AllDetails.infrastructureDetails.plant_area}
                        precision={2}
                        valueStyle={{
                          color: '#3f8600',
                        }}
                        suffix='sqm'
                      />
                    </Card>
                    <Card size='small' hoverable style={{ borderRadius: "15px", marginTop: '5px' }}>
                      <Statistic
                        title="Assembly Area"
                        value={AllDetails.infrastructureDetails.assembly_area}
                        precision={2}
                        valueStyle={{
                          color: '#3f8600',
                        }}
                        suffix='sqm'
                      />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card size='small' hoverable style={{ borderRadius: "15px", marginTop: '5px' }}>
                      <Statistic
                        title="Crane Tonnage"
                        value={AllDetails.infrastructureDetails.crane_tonnage}
                        precision={2}
                        valueStyle={{
                          color: '#3f8600',
                        }}
                      />
                    </Card>
                    <Card size='small' hoverable style={{ borderRadius: "15px", marginTop: '5px' }}>
                      <Statistic
                        title="Assembly Table"
                        value={AllDetails.infrastructureDetails.assembly_table}
                        valueStyle={{
                          color: '#3f8600',
                        }}
                      />
                    </Card>
                  </Col>
                </Row>

                <h2 style={{ margin: '0', marginTop: '10px' }}>Total Manpower: {totalManpower}</h2>
                <Card style={{ backgroundImage: business_plan }} id='pie' >
                  <Doughnut style={{ height: '40vh' }} data={pieData} options={pieOptions} />
                </Card>

                <h2 style={{ margin: '0', marginTop: '10px' }}>Services</h2>
                <Card>
                  <Flex gap="5px 2px" wrap>
                    {AllDetails.services.services.map((service, index) => (
                      <Tag size='large' key={index} style={{ fontSize: '18px', fontFamily: 'none' }} color={getRandomColor()}>
                        {service.service_name}
                      </Tag>
                    ))}
                  </Flex>
                </Card>

                <h2 style={{ margin: '0', marginTop: '10px' }}>Plant Images</h2>
                <Card>
                  <Carousel arrows dotPosition="left">
               
                    {srcList.map((item, i) => (
                           <div>
                           <img src={item.src} style={{ height: "40vh", width: "35vw" }} />
                       </div>
                        
                        ))}
                  </Carousel>
                </Card>

              </Card>
            </Col>
          </Row>
        </ConfigProvider>}
    </div>
  )
}

export default DashboardPage;
