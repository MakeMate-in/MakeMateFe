import { useState } from 'react'
import { Form, Row, Col, InputNumber, Input, Select, Button, Flex, Popover, Card } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons';


const InfraStructureDetails = () => {

  const [InfraStructureDetails, setInfraStructureDetails] = useState({
    "plant_area": "",
    "assembly_area": "",
    "assembly_table": "",
    "softwares": "",
    "surface_table": "",
    "cmm": "",
    "tonnage": "",
    "designation": "",
    "count": ""
  })

  const [inputs, setInputs] = useState([{ designation: "", count: "" }]);

  const handleAddInput = () => {
    setInputs([...inputs, { designation: "", count: "" }]);
  };

  const handleManpowerChange = (event, index, id) => {
    console.log(event);
    let onChangeValue = [...inputs];
    onChangeValue[index][id] = event;
    setInputs(onChangeValue);
  };

  const handleDeleteInput = (index) => {
    const newArray = [...inputs];
    newArray.splice(index, 1);
    setInputs(newArray);
  };



  const options = [{
    label: 'PTC Creo',
    value: 'PTC Creo',
  },
  {
    label: 'Catia',
    value: 'Catia'
  },
  {
    label: 'UX',
    value: 'UX'
  }];

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  return (
    <Card style={{ overflow: 'auto', scrollbarWidth: 'none' }}>
      <Form layout="vertical" >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Area of plant (in sq meters)"
              name="plantArea"
              rules={[{ required: true, message: 'Area of plant is required' }]}>
              <InputNumber
                min={1}
                id="plantArea"
                size='large'
                variant="filled"
                placeholder='Enter Area of plant'
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item
              label="Number of Assembly table"
              name="assemblyNumber">
              <InputNumber
                min={1}
                id="assemblyNumber"
                size='large'
                variant="filled"
                placeholder='Enter Number of Assembly table'
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item label="Surface Table">
              <Select style={{ width: '100%' }}
                size='large' variant="filled" placeholder="Enter Surface Table"
                options={[
                  {
                    value: 'Yes',
                    label: 'Yes',
                  },
                  {
                    value: 'No',
                    label: 'No',
                  },
                ]}
              />
            </Form.Item>
            <Form.Item
              label="Crane Tonnage (In Ton)"
              name="craneTonnage">
              <InputNumber
                min={1}
                id="craneTonnage"
                size='large'
                variant="filled"
                placeholder='Enter Crane Tonnage (In Ton)'
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Assembly area (in sq meters)"
              name="assemblyArea"
              rules={[{ required: true, message: 'Assembly area is required' }]}>
              <InputNumber
                min={1}
                id="assemblyArea"
                size='large'
                variant="filled"
                placeholder='Enter Assembly Area'
                onChange={handleChange}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item label="Design Softwares">
              <Select mode="multiple" allowClear
                id="softwares" name="softwares"
                style={{
                  width: '100%',
                }}
                placeholder="Please select Design Softwares"
                options={options}
                onChange={handleChange}
                size='large'
                variant="filled"
              />
            </Form.Item>
            <Form.Item label="CMM">
              <Select style={{ width: '100%' }}
                size='large' variant="filled" placeholder="Enter CMM"
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
        </Row>

        <div>
          <h3>Total Manpower</h3>
          {inputs.map((item, index) => (
            <Flex vertical key={index}>
              <Row gutter={16}>
                <Col span={10}>
                  <Form.Item label='Designation'>
                    <Select style={{ width: '100%' }}
                      id="designation"
                      placeholder="Please select"
                      size='large' variant="filled"
                      value={item.designation}
                      onChange={(event) => handleManpowerChange(event, index, "designation")}
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
                <Col span={10}>
                  <Form.Item label='Count'>
                    <InputNumber
                      name="count"
                      id="count"
                      size='large'
                      variant="filled"
                      placeholder='Enter Manpower Count'
                      value={item.count}
                      onChange={(event) => handleManpowerChange(event, index, 'count')}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={4}>
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

        </div>
      </Form>
    </Card>
  )
}

export default InfraStructureDetails
