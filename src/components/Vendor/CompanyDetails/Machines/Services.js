import { useState } from 'react'
import { ROW_COLUMNS } from '../../../../utils/helper'
import { Flex, Select, InputNumber, Form, Row, Col, Button } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea'


const Services = () => {

  const [inputs, setInputs] = useState([{ serviceName: "", serviceType: "", supplierDetails: "" }]);

  const handleAddInput = () => {
    setInputs([...inputs, { serviceName: "", serviceType: "", supplierDetails: "" }]);
  };

  const handleManpowerChange = (event, index, id) => {
    // if(id=='supplierDetails'){
    //   let onChangeValue = [...inputs];
    // onChangeValue[index][id] = event;
    // setInputs(onChangeValue);
    // }
    console.log(event);
    let onChangeValue = [...inputs];
    onChangeValue[index][id] = id=="supplierDetails"?event.target.value : event;
    setInputs(onChangeValue);
  };

  const handleDeleteInput = (index) => {
    const newArray = [...inputs];
    newArray.splice(index, 1);
    setInputs(newArray);
  };

  return (
    // <div>
    //     {ROW_COLUMNS.map((item) => {
    //         return(
    //          <Flex>
    //             <p>{item}</p>
    //             <Select style={{width:'500px'}}/>
    //             <TextArea/>
    //          </Flex>   
    //         )
    //     })}
    // </div>
    <Form layout="vertical">
      <h3>Working Process for Mold Development</h3>
      {inputs.map((item, index) => (
        <Flex vertical key={index}>
          <Row gutter={16}>
            <Col span={7}>
              <Form.Item label='Service Name'>
                <Select style={{ width: '100%' }}
                  id="serviceName"
                  placeholder="Please select"
                  size='large' variant="filled"
                  value={item.serviceName}
                  allowClear
                  onChange={(event) => handleManpowerChange(event, index, "serviceName")}
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
              {index === inputs.length - 1 && (
                <a onClick={() => handleAddInput()} style={{ fontSize: '16px' }}>Add Manpower</a>
              )}
            </Col>
            <Col span={7}>
              <Form.Item label='Service Type'>
                <Select style={{ width: '100%' }}
                  id="serviceType" allowClear
                  placeholder="Please select"
                  size='large' variant="filled"
                  value={item.serviceType}
                  onChange={(event) => handleManpowerChange(event, index, "serviceType")}
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
                  onChange={(event) => handleManpowerChange(event, index, 'supplierDetails')}
                  name="supplierDetails"
                  id="supplierDetails"
                  size='large'
                  variant="filled" allowClear
                  value={item.supplierDetails}
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

      {/* <div className="body"> {JSON.stringify(inputs)} </div> */}

    </Form>
  )
}

export default Services
