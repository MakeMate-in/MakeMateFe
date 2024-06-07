import React, { useState, useEffect, useMemo } from 'react'
import { Form, Row, Col, InputNumber, Select, Button, Flex, Card } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons';
import { addInfraDetails, getInfraDetails } from '../../../../apis/Vendor/InfrastructureDetails';
import { COMPANY_ID } from '../../../../utils/constants';

import { notification } from 'antd';
const Context = React.createContext({
  name: 'Default',
});


const DESIGN_SOFTWARE_OPTIONS = [{
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

const MANPOWER_DESIGNATION = [
  {
    value: 'Project Engineer',
    label: 'Project Engineer',
  },
  {
    value: 'Design Team',
    label: 'Design Team',
  },
  {
    value: 'Programming Team',
    label: 'Programming Team',
  },
  {
    value: 'CNC Operator',
    label: 'CNC Operator',
  },

  {
    value: 'EDM Operator',
    label: 'EDM Operator',
  },
  {
    value: 'Diefitter',
    label: 'Diefitter',
  },
  {
    value: 'Quality Person',
    label: 'Quality Person',
  }
]

const InfraStructureDetails = (props) => {

  const [InfraStructureDetails, setInfraStructureDetails] = useState({
    "plant_area": "",
    "assembly_area": "",
    "assembly_table": "",
    "design_softwares": [],
    "surface_table": "",
    "CMM": "",
    "crane_tonnage": "",
    "manpower": []
  })

  const [inputs, setInputs] = useState([{ designation: undefined, count: "" }]);
  const [isLoading, setisLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
    api.success({
      message: `Success`,
      description: <Context.Consumer>{({ name }) => `Infrastructure Details Updated Successfully`}</Context.Consumer>,
      placement,
    });
  };
  let contextValue = useMemo(
    () => ({
      name: 'Make Mate',
    }),
    [],
  );

  const openFailedNotification = (placement) => {
    api.error({
      message: `Something went wrong`,
      description: <Context.Consumer>{({ name }) => `Unable to update Infrastructure Details `}</Context.Consumer>,
      placement,
    });
  };
  contextValue = useMemo(
    () => ({
      name: 'Make Mate',
    }),
    [],
  );


  const fetchInfraDetails = async () => {
    try {
      const InfraDetails = await getInfraDetails(COMPANY_ID)
      console.log(InfraDetails)
      if (InfraDetails.success && InfraDetails.count === 1) {
        setInfraStructureDetails({ ...InfraDetails.documents[0] })
        setInputs([...InfraDetails.documents[0].manpower])
      }
      setisLoading(true)
    }
    catch (err) {
      console.log(err)
    }
  }



  useEffect(() => {
    fetchInfraDetails()
  }, [])

  useEffect(() => {
    setInfraStructureDetails({ ...InfraStructureDetails, ["manpower"]: inputs })
  }, [inputs])

  const handleAddInput = () => {
    setInputs([...inputs, { designation: undefined, count: "" }]);
  };


  const handleManpowerChange = (event, index, id) => {
    let onChangeValue = [...inputs];
    onChangeValue[index][id] = event;
    setInputs(onChangeValue);
  };

  const handleDeleteInput = (index) => {
    const newArray = [...inputs];
    newArray.splice(index, 1);
    setInputs(newArray);
  };


  const handleChange = (value, id) => {
    setInfraStructureDetails({ ...InfraStructureDetails, [id]: value })
  }

  const handleFormSubmit = async () => {
    try {
      let params = {
        company_id: COMPANY_ID
      }
      const res = await addInfraDetails(params, InfraStructureDetails)
      if (res.success) {
        fetchInfraDetails()
        openNotification('topRight')
        props.onSaveAndSubmit();
      }
      else {
        openFailedNotification('topRight');
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div style={{ overflow: 'auto', scrollbarWidth: 'none' }}>
        {isLoading === true ?
          <Form layout="vertical" onFinish={handleFormSubmit} >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Area of plant (in sq meters)"
                  name="plantArea"
                // rules={[{ required: true, message: 'Area of plant is required' }]}
                >
                  <InputNumber
                    min={1}
                    id="plantArea"
                    size='large'
                    variant="filled"
                    placeholder='Enter Area of plant'
                    value={InfraStructureDetails["plant_area"]}
                    defaultValue={InfraStructureDetails["plant_area"]}
                    onChange={(e) => { handleChange(e, "plant_area") }}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                {isLoading == true ? <Form.Item
                  label="Number of Assembly table"
                  name="assembly_table">
                  <InputNumber
                    min={1}
                    id="assembly_table"
                    size='large'
                    variant="filled"
                    placeholder='Enter Number of Assembly table'
                    value={InfraStructureDetails["assembly_table"]}
                    defaultValue={InfraStructureDetails["assembly_table"]}
                    onChange={(e) => { handleChange(e, "assembly_table") }}
                    style={{ width: '100%' }}
                  />
                </Form.Item> : ''}
                <Form.Item label="Surface Table">
                  <Select style={{ width: '100%' }} allowClear
                    size='large' variant="filled" placeholder="Enter Surface Table"
                    onChange={(e) => { handleChange(e, "surface_table") }}
                    value={InfraStructureDetails["surface_table"]}
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
                    value={InfraStructureDetails["crane_tonnage"]}
                    defaultValue={InfraStructureDetails["crane_tonnage"]}
                    onChange={(e) => { handleChange(e, "crane_tonnage") }}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Assembly area (in sq meters)"
                  name="assemblyArea"
                // rules={[{ required: true, message: 'Assembly area is required' }]}
                >
                  <InputNumber
                    min={1}
                    id="assemblyArea"
                    size='large'
                    variant="filled"
                    placeholder='Enter Assembly Area'
                    value={InfraStructureDetails["assembly_area"]}
                    onChange={(e) => { handleChange(e, "assembly_area") }}
                    defaultValue={InfraStructureDetails["assembly_area"]}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
                <Form.Item label="Design Softwares">
                  <Select mode="multiple" allowClear
                    id="softwares" name="softwares"
                    style={{
                      width: '100%',
                    }}
                    value={InfraStructureDetails["design_softwares"]}
                    placeholder="Please select Design Softwares"
                    options={DESIGN_SOFTWARE_OPTIONS}
                    onChange={(e) => { handleChange(e, "design_softwares") }}
                    size='large'
                    variant="filled"
                  />
                </Form.Item>
                <Form.Item label="CMM">
                  <Select style={{ width: '100%' }} allowClear
                    size='large' variant="filled" placeholder="Enter CMM"
                    onChange={(e) => { handleChange(e, "CMM") }}
                    value={InfraStructureDetails["CMM"]}
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
                        <Select style={{ width: '100%' }} allowClear
                          id="designation"
                          placeholder="Please select"
                          size='large' variant="filled"
                          value={item.designation}
                          onChange={(event) => handleManpowerChange(event, index, "designation")}
                          options={MANPOWER_DESIGNATION}
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
            <Form.Item style={{ bottom: '-6%', position: 'absolute', right: '-1%' }}>
              <Button type="primary" htmlType="submit" style={{ fontSize: '18px', fontWeight: '600', height: '40px' }}>
                Save & Continue
              </Button>
            </Form.Item>
          </Form>
          : ''}
      </div>
    </Context.Provider>
  )
}

export default InfraStructureDetails
