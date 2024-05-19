import React, { useState, useEffect } from 'react'
import { Col, Row, Form, Input, Button, Image, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './../Dashboard/Dashboard.css'
import { getCompanyDetails, updateCompanyDetails } from '../../../apis/Vendor/CompanyDetails';
import { USER_ID } from '../../../utils/constants';


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const BasicDetails = (props) => {


  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState();
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChangeLogo = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );


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
   
    console.log(basicDetails)
    try{
    let params = {
      // user: localStorage.get(USER_ID)
      user: USER_ID
    }
    const res = await updateCompanyDetails(params,basicDetails)
    if(res.success){
      const updatedData = await getCompanyDetails(params)
      console.log(updatedData)
      if(updatedData.success){
      props.onSaveAndSubmit();
      }
      else{
        //Toast
      }
    }
    else{
      //Toast
    }
    console.log(res)
    }
    catch(err){
      console.log(err)
    }
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
                  {/* <img src="https://via.placeholder.com/150" alt="Company Logo" /> */}

                  <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-circle"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChangeLogo}
                  >
                    {fileList && fileList.length >= 1 ? null : uploadButton}
                  </Upload>
                  {previewImage && (
                    <Image
                      wrapperStyle={{
                        display: 'none',
                      }}
                      preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                      }}
                      src={previewImage}
                    />
                  )}
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