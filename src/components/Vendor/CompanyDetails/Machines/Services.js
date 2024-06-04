import { useState, useEffect } from 'react'
import { ROW_COLUMNS } from '../../../../utils/helper'
import { Flex, Select, Form, Row, Col, Button } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea'
import { addServiceDetails, getServiceDetails } from '../../../../apis/Vendor/ServiceDetails';
import { COMPANY_ID } from '../../../../utils/constants';


const SERVICE_NAMES = ROW_COLUMNS.map((item) => {
  let data = {}
  data.label = item
  data.value = item
  return data
})


const Services = () => {

  const [inputs, setInputs] = useState([{ service_name: undefined, service_type: undefined, supplier_details: "" }]);

  const handleAddInput = () => {
    setInputs([...inputs, { service_name: undefined, service_type: undefined, supplier_details: "" }]);
  };


  const fetchServices = async() => {
    try{

      let res = await getServiceDetails(COMPANY_ID)
      if(res.success){
          const services = res.documents[0].services
          console.log(services)
        setInputs([...services])
        }
        else {
          // handleAddInput()
        }
    } 
    catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    fetchServices()
  },[])


  const handleManpowerChange = (event, index, id) => {
    let onChangeValue = [...inputs];
    onChangeValue[index][id] = id==="supplier_details"?event.target.value : event;
    setInputs(onChangeValue);
  };

  const handleDeleteInput = (index) => {
    const newArray = [...inputs];
    newArray.splice(index, 1);
    setInputs(newArray);
  };

  const handleFormSubmit = async () => {
    try{
      let params= {
        company_id:COMPANY_ID
      }
      const res = await addServiceDetails(params,inputs)
      if(res.success){
        // fetchServices()
      }
    }
    catch(err){
      console.log(err)
    }
  }


  return (
    <Form layout="vertical" onFinish={handleFormSubmit}>
      <h3>Working Process for Mold Development</h3>
      {inputs.map((item, index) => (
        <Flex vertical key={index}>
          <Row gutter={16}>
            <Col span={7}>
              <Form.Item label='Service Name'>
                <Select style={{ width: '100%' }}
                  id="service_name"
                  placeholder="Please select"
                  size='large' variant="filled"
                  value={item.service_name}
                  allowClear
                  onChange={(event) => handleManpowerChange(event, index, "service_name")}
                  options={SERVICE_NAMES}
                />
              </Form.Item>
              {index === inputs.length - 1 && (
                <a onClick={() => handleAddInput()} style={{ fontSize: '16px' }}>+ Add Services</a>
              )}
            </Col>
            <Col span={7}>
              <Form.Item label='Service Type'>
                <Select style={{ width: '100%' }}
                  id="service_type" allowClear
                  placeholder="Please select"
                  size='large' variant="filled"
                  value={item.service_type}
                  onChange={(event) => handleManpowerChange(event, index, "service_type")}
                  options={[
                    {
                      value: 'Outsourced',
                      label: 'Outsourced',
                    },
                    {
                      value: 'Inhouse',
                      label: 'Inhouse',
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item label='Supplier Details'>
                <TextArea
                  placeholder="Enter Supplier Details"
                  onChange={(event) => handleManpowerChange(event, index, 'supplier_details')}
                  name="supplierDetails"
                  id="supplierDetails"
                  size='large'
                  variant="filled" allowClear
                  value={item.supplier_details}
                  style={{ width: '100%' }}
                  autoSize={{
                    maxRows: 6,
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={3}>
              {inputs.length > 1 && (
                <Form.Item label="Delete">
                  <DeleteTwoTone onClick={() => handleDeleteInput(index)} twoToneColor="#F5222D" style={{ fontSize: '20px' }} />
                </Form.Item>
              )}
            </Col>
          </Row>
        </Flex>
      ))}

<Button type="primary" htmlType="submit">
          Save and Submit
        </Button>
      
    </Form>
  )
}

export default Services
