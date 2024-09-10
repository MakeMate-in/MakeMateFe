import React, { useState, useEffect, useMemo } from 'react'
import { Form, Row, Col, InputNumber, Select, Button, Flex, Card } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons';
import { addInfraDetails, getInfraDetails } from '../../../../apis/Vendor/InfrastructureDetails';
import { deepEqual, getCopanyId } from '../../../../utils/helper';

import { notification } from 'antd';
const Context = React.createContext({
  name: 'Default',
});


const DESIGN_SOFTWARE_OPTIONS = [
  {
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
},
{
  label: 'Others',
  value: 'Others',
},
];

const MANPOWER_DESIGNATION = [
  {
    value: 'Project Engineer',
    label: 'Project Engineer',
  },
  {
    value: 'Designer',
    label: 'Designer',
  },
  {
    value: 'Programmer',
    label: 'Programmer',
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
  },
  {
    value: 'Polishing Expert',
    label: 'Polishing Expert',
  },
  {
    value: 'Wirecut Operator',
    label: 'Wirecut Operator',
  },
  {
    value: 'Welding Expert',
    label: 'Welding Expert',
  },
  {
    value: 'Miscellaneous',
    label: 'Miscellaneous',
  }
]

const InfraStructureDetails = (props) => {

  const [InfraStructureDetails, setInfraStructureDetails] = useState({
    "plant_area": "",
    "assembly_area": "",
    "assembly_table": "",
    "design_softwares": [],
    "surface_table": undefined,
    "CMM": undefined,
    "crane_tonnage": "",
    "manpower": []
  })
  const [allvalues, setallValues] = useState(undefined)
  let SELECCT_INPUTS = [];

  const [inputs, setInputs] = useState([{ designation: undefined, count: "" }]);
  const [isLoading, setisLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [ManpowerSelected, setManpowerSelected] = useState([])
  let selectedManpower = []

  const colors1 = ['#6253E1', '#04BEFE'];

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
      const COMPANY_ID = getCopanyId()
      const InfraDetails = await getInfraDetails(COMPANY_ID)
      if (InfraDetails.success && InfraDetails.count === 1) {
        props.setInfrastructureDetails(InfraDetails.documents[0])
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
    inputs.map((item) => {
      if (item.designation != null && item.designation != undefined) {
        selectedManpower.push(item.designation)
      }
    })
    setManpowerSelected(selectedManpower)
  };

  const handleDeleteInput = (index) => {
    const newArray = [...inputs];
    newArray.splice(index, 1);
    setInputs(newArray);
    newArray.map((item) => {
      if (item.designation != null && item.designation != undefined) {
        selectedManpower.push(item.designation)
      }
    })
    setManpowerSelected(selectedManpower)
  };


  const handleChange = (value, id) => {
    setInfraStructureDetails({ ...InfraStructureDetails, [id]: value })
  }

  const handleValuechange = (changedValues, allValues) => {
    setallValues(allValues)
  }

  const handleFormSubmit = async () => {
    try {
      const COMPANY_ID = getCopanyId()
      let params = {
        company_id: COMPANY_ID
      }
      let equal = deepEqual(allvalues, InfraStructureDetails)
      let res;
      if (!equal) {
        res = await addInfraDetails(params, InfraStructureDetails)
      }
      if ((res && res.success) || equal) {
        if (!equal) {
          fetchInfraDetails()
          openNotification('topRight')
        }
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

  const getOptions = async () => {
    let selected_designations = inputs.map(item => item.designation)
    console.log(selected_designations)
    SELECCT_INPUTS = MANPOWER_DESIGNATION
    SELECCT_INPUTS.map((item, index) => {
      if (selected_designations.includes(item.value)) {
        SELECCT_INPUTS.slice(index + 1)
      }
    })
    console.log(SELECCT_INPUTS)
    return SELECCT_INPUTS
  }

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
      <div style={{ overflow: 'auto', scrollbarWidth: 'none' }}>
        {isLoading === true ?
          <Form
            layout="vertical"
            onFinish={handleFormSubmit}
            onValuesChange={handleValuechange}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Area of plant (in sq. foot)"
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
                  label="Assembly area (in sq. foot)"
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
                        // options={MANPOWER_DESIGNATION}
                        >
                          <Select.Option value="Project Engineer" disabled={ManpowerSelected.includes("Project Engineer")}>Project Engineer</Select.Option>
                          <Select.Option value="Designer" disabled={ManpowerSelected.includes("Designer")}>Designer</Select.Option>
                          <Select.Option value="Programmer" disabled={ManpowerSelected.includes("Programmer")}>Programmer</Select.Option>
                          <Select.Option value="CNC Operator" disabled={ManpowerSelected.includes("CNC Operator")}>CNC Operator</Select.Option>
                          <Select.Option value="EDM Operator" disabled={ManpowerSelected.includes("EDM Operator")}>EDM Operator</Select.Option>
                          <Select.Option value="Diefitter" disabled={ManpowerSelected.includes("Diefitter")}>Diefitter</Select.Option>
                          <Select.Option value="Quality Person" disabled={ManpowerSelected.includes("Quality Person")}>Quality Person</Select.Option>
                          <Select.Option value="Polishing Expert" disabled={ManpowerSelected.includes("Polishing Expert")}>Polishing Expert</Select.Option>
                          <Select.Option value="Welding Expert" disabled={ManpowerSelected.includes("Welding Expert")}>Welding Expert</Select.Option>
                          <Select.Option value="Wirecut Operator" disabled={ManpowerSelected.includes("Wirecut Operator")}>Wirecut Operator</Select.Option>
                          <Select.Option value="Miscellaneous" disabled={ManpowerSelected.includes("Miscellaneous")}>Miscellaneous</Select.Option>
                        </Select>
                      </Form.Item>
                      {index === inputs.length - 1 && (
                        <a onClick={() => handleAddInput()} style={{ fontSize: '16px', fontWeight: '600' }}>+ Add Manpower</a>
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
              <Button type="primary" htmlType="submit" style={{ fontSize: '18px', fontWeight: '600', height: '40px', background: `linear-gradient(135deg, ${colors1.join(', ')})` }}>
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
