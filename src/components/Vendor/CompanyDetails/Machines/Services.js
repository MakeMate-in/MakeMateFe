import React, { useState, useEffect, useMemo } from 'react'
import { SERVICES_NAMES, getCopanyId } from '../../../../utils/helper'
import { Flex, Form, Row, Col, Button, Radio, Space } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { addServiceDetails, getServiceDetails } from '../../../../apis/Vendor/ServiceDetails';
import {  notification } from 'antd';
import { deepEqual } from '../../../../utils/helper';
import { NOTIFICATION_MESSAGES } from '../../../../utils/locale';
const Context = React.createContext({
  name: 'Default',
});


const Services = (props) => {

  function getInput(){
  const all_services = SERVICES_NAMES.map((item) => {
    return {
      service_name: item,
      service_type: undefined,
      supplier_details: ""
    }
  })
  return all_services
}

  const [inputs, setInputs] = useState(getInput());
  const [api, contextHolder] = notification.useNotification();
  const [allvalues,setallValues] = useState(undefined)
  const colors1 = ['#6253E1', '#04BEFE'];

  const openNotification = (placement,msg) => {
    api.success({
      message: `Success`,
      description: msg,
      placement,
    });
  };
  let contextValue = useMemo(
    () => ({
      name: 'Make Mate',
    }),
    [],
  );

  const openFailedNotification = (placement,msg) => {
    api.error({
      message: `Something went wrong`,
      description: msg,
      placement,
    });
  };
  contextValue = useMemo(
    () => ({
      name: 'Make Mate',
    }),
    [],
  );




  const fetchServices = async () => {
    try {
      const  COMPANY_ID = getCopanyId()
      let res = await getServiceDetails(COMPANY_ID)
      if (res.success) {
        const services = res.documents[0].services
        setInputs([...services])
        const deepCopy = JSON.parse(JSON.stringify(services));
        setallValues([...deepCopy])
      }
      else {
        openFailedNotification('topRight',NOTIFICATION_MESSAGES.FETCH_SERVICES_ERROR)
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
    onChangeValue[index][id] = event.target.value;
    setInputs(onChangeValue);
  };

  const handleFormSubmit = async () => {
    try {
      const  COMPANY_ID = getCopanyId()
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
        fetchServices()
        openNotification('topRight', NOTIFICATION_MESSAGES.UPDATE_SERVICES_SUCCESS);
        }
        
        props.onSaveAndSubmit();
      }
      else {
        openFailedNotification('topRight', NOTIFICATION_MESSAGES.UPDATE_SERVICES_ERROR);
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
        <Flex vertical gap="large">
        {inputs.map((item, index) => (
            <Row gutter={16}>
              <Col span={7}>
                    <p>{item.service_name}</p>       
              </Col>
              <Col span={7}>
      <Radio.Group  onChange={(event) => handleManpowerChange(event, index, "service_type")}  value={item.service_type}>
      <Space direction="vertical">
        <Radio value={"Outsorced"}>Outsourced</Radio>
        <Radio value={"Inhouse"}>Inhouse</Radio>
      </Space>
    </Radio.Group>
              </Col>
              <Col span={7}>
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
              </Col>
            </Row>
        ))}

</Flex>

        <Form.Item style={{ bottom: '-9%', position: 'absolute', right: '-1%' }}>
          <Button type="primary" htmlType="submit" style={{ fontSize: '18px', fontWeight: '600', height: '40px', background: `linear-gradient(135deg, ${colors1.join(', ')})` }}>
            Save & Continue
          </Button>
        </Form.Item>

      </Form>
    </Context.Provider>
  )
}

export default Services
