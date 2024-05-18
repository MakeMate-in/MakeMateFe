import React, {useState, useEffect} from 'react'
import { Col, Row, Form, Input, Button } from 'antd';
import './../Dashboard/Dashboard.css'
import { getCompanyDetails, updateCompanyDetails } from '../../../apis/Vendor/CompanyDetails';
import { USER_ID } from '../../../utils/constants';

const BasicDetails = (props) => {


  const [basicDetails, setBasicDetails] = useState({
    "description": "",
    "company_name": "",
    "GST_no": "",
    "experience": "",
    "current_projects_no": ""
  });

  const handleChange = (event) => {
    setBasicDetails({ ...basicDetails, [event.target.id]: event.target.value })
  }

  const handleFormSubmit = async() => {
    props.onSaveandSubmit();
    console.log(basicDetails)
    // try{
    // let params = {
    //   // user: localStorage.get(USER_ID)
    //   user: USER_ID
    // }
    // const res = await updateCompanyDetails(params,basicDetails)
    // if(res.success){
    //   const updatedData = await getCompanyDetails(params)
    //   console.log(updatedData)
    //   // props.onSaveandSubmit();
    // }
    // else{
    //   //Toast
    // }
    // console.log(res)
    // }
    // catch(err){
    //   console.log(err)
    // }
  }


  return (
    <Form
      layout="vertical"
      onFinish={handleFormSubmit}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Row gutter={16} align="middle">
            <Col span={8}>
              <Form.Item label="Company Logo">
                <div className="company-logo">
                  <img src="https://via.placeholder.com/150" alt="Company Logo" />
                </div>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="About Us" name="aboutUs">
                <Input.TextArea 
                rows={4}  
                placeholder='Provide your company description and an overview of your company'
                id={"description"}
                onChange={handleChange}
                autoComplete='off'
                value={basicDetails["description"]}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Company Name"
            name="companyName"
            rules={[{ required: true, message: 'Company Name is required' }]}
          >
            <Input 
            className="custom-input" 
            variant="filled"
            placeholder="Enter your Company Name"
            id={"company_name"}
            onChange={handleChange}
            autoComplete='off'
            value={basicDetails["company_name"]}
            />
          </Form.Item>
          <Form.Item
            label="Total Experience (in Years)"
            name="totalExperience"
            rules={[{ required: true, message: 'Total Experience is required' }]}
          >
            <Input 
            className="custom-input" 
            variant="filled"
            placeholder="Enter your Total Experience"
            id={"experience"}
            autoComplete='off'
            onChange={handleChange}
            value={basicDetails["experience"]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="GST"
            name="gst"
            rules={[{ required: true, message: 'GST is required' }]}
          >
            <Input 
            className="custom-input" 
            variant="filled"
            placeholder="Enter your GST No."
            id={"GST_no"}
            autoComplete='off'
            onChange={handleChange}
            value={basicDetails["GST_no"]}
            />
          </Form.Item>
          <Form.Item
            label="Current Running Project"
            name="currentRunningProject"
            rules={[{ required: true, message: 'Current Running Project is required' }]}
          >
            <Input
            className="custom-input" 
            variant="filled"
            placeholder="Enter your Current Running Project"
            id={"current_projects_no"}
            autoComplete='off'
            onChange={handleChange}
            value={basicDetails["current_projects_no"]}
            />
          </Form.Item>
        </Col>
      </Row>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save and Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default BasicDetails