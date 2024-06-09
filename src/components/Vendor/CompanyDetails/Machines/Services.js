import React, { useState, useEffect, useMemo } from 'react'
import { ROW_COLUMNS } from '../../../../utils/helper'
import { Flex, Select, Form, Row, Col, Button } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea'
import { addServiceDetails, getServiceDetails } from '../../../../apis/Vendor/ServiceDetails';
import { COMPANY_ID } from '../../../../utils/constants';
import { deepEqual } from '../../../../utils/helper';
import {  notification } from 'antd';
const Context = React.createContext({
  name: 'Default',
});


const SERVICE_NAMES = ROW_COLUMNS.map((item) => {
  let data = {}
  data.label = item
  data.value = item
  return data
})


const Services = (props) => {

  const [inputs, setInputs] = useState([{ service_name: undefined, service_type: undefined, supplier_details: "" }]);
  const [api, contextHolder] = notification.useNotification();
  const [allvalues,setallValues] = useState(undefined)

  const openNotification = (placement) => {
    api.success({
      message: `Success`,
      description: <Context.Consumer>{({ name }) => `Services Updated Successfully`}</Context.Consumer>,
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
      description: <Context.Consumer>{({ name }) => `Unable to add Services `}</Context.Consumer>,
      placement,
    });
  };
  contextValue = useMemo(
    () => ({
      name: 'Make Mate',
    }),
    [],
  );

  const deleteNotification = (placement) => {
    api.info({
      message: `Data Deleted`,
      description: <Context.Consumer>{({ name }) => `Services deleted Successfully`}</Context.Consumer>,
      placement,
    });
  };
  contextValue = useMemo(
    () => ({
      name: 'Make Mate',
    }),
    [],
  );


  const handleAddInput = () => {
    setInputs([...inputs, { service_name: undefined, service_type: undefined, supplier_details: "" }]);
  };



  const fetchServices = async () => {
    try {

      let res = await getServiceDetails(COMPANY_ID)
      if (res.success) {
        const services = res.documents[0].services
        setInputs([...services])
        const deepCopy = JSON.parse(JSON.stringify(services));
        setallValues([...deepCopy])
      }
      else {
        // handleAddInput()
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])


  const handleManpowerChange = (event, index, id) => {
    let onChangeValue = [...inputs];
    onChangeValue[index][id] = id === "supplier_details" ? event.target.value : event;
    setInputs(onChangeValue);
  };

  const handleDeleteInput = (index) => {
    // deleteNotification('topRight');
    const newArray = [...inputs];
    newArray.splice(index, 1);
    setInputs(newArray);
  };

  const handleFormSubmit = async () => {
    try {
      let params = {
        company_id: COMPANY_ID
      }
      let equal = deepEqual(allvalues, inputs) || allvalues == undefined
      let res;
      if(!equal){
       res = await addServiceDetails(params, inputs)
      }
      if ((res && res.success) || equal) {
        if(!equal){
        // fetchServices()
        openNotification('topRight');
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



  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
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

        <Form.Item style={{ bottom: '-9%', position: 'absolute', right: '-1%' }}>
          <Button type="primary" htmlType="submit" style={{ fontSize: '18px', fontWeight: '600', height: '40px' }}>
            Save & Continue
          </Button>
        </Form.Item>

      </Form>
    </Context.Provider>
  )
}

export default Services
