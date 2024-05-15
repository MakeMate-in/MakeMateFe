import React from 'react'
import { Col, Row, Form, Input, Button } from 'antd';
import './../Dashboard/Dashboard.css'

const BasicDetails = () => {
  return (
    <Form
      layout="vertical"
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
                <Input.TextArea rows={4}  placeholder='Provide your company description and an overview of your company'/>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Field 1"
            name="field1"
            rules={[{ required: true, message: 'Field 1 is required' }]}
          >
            <Input className="custom-input" variant="filled"/>
          </Form.Item>
          <Form.Item
            label="Field 2"
            name="field2"
            rules={[{ required: true, message: 'Field 2 is required' }]}
          >
            <Input className="custom-input" variant="filled"/>
          </Form.Item>
          <Form.Item
            label="Field 3"
            name="field3"
            rules={[{ required: true, message: 'Field 3 is required' }]}
          >
            <Input className="custom-input" variant="filled"/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Field 4"
            name="field4"
            rules={[{ required: true, message: 'Field 4 is required' }]}
          >
            <Input className="custom-input" variant="filled"/>
          </Form.Item>
          <Form.Item
            label="Field 5"
            name="field5"
            rules={[{ required: true, message: 'Field 5 is required' }]}
          >
            <Input className="custom-input" variant="filled"/>
          </Form.Item>
          <Form.Item
            label="Field 6"
            name="field6"
            rules={[{ required: true, message: 'Field 6 is required' }]}
          >
            <Input className="custom-input" variant="filled"/>
          </Form.Item>
        </Col>
      </Row>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default BasicDetails