import React from 'react'
import { Row, Col, Card, Statistic, Typography } from 'antd'

const InfraDashboard = (props) => {
    let AllDetails = props.AllDetails
    return (
    <div>
              <Typography style={{ margin: '0', fontSize:'30px', fontWeight:'600' }}>InfraStructure Details</Typography>
                <Row gutter={16}>

                  <Col span={12}>
                    <Card size='small' hoverable style={{ borderRadius: "15px", marginTop: '5px' }}>
                      <Statistic
                        title="Plant Area"
                        value={AllDetails.infrastructureDetails?AllDetails.infrastructureDetails.plant_area:0}
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
                        value={AllDetails.infrastructureDetails?AllDetails.infrastructureDetails.assembly_area:0}
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
                        value={AllDetails.infrastructureDetails?AllDetails.infrastructureDetails.crane_tonnage:0}
                        precision={2}
                        valueStyle={{
                          color: '#3f8600',
                        }}
                      />
                    </Card>
                    <Card size='small' hoverable style={{ borderRadius: "15px", marginTop: '5px' }}>
                      <Statistic
                        title="Assembly Table"
                        value={AllDetails.infrastructureDetails?AllDetails.infrastructureDetails.assembly_table:0}
                        valueStyle={{
                          color: '#3f8600',
                        }}
                      />
                    </Card>
                  </Col>
                </Row>
                
                
    </div>
  )
}

export default InfraDashboard
