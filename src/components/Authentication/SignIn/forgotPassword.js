import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useLocation } from 'react-router-dom';

const { Title } = Typography;

const ForgotPassword = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    uniqueField: location.state?.uniqueField || '',
    newPassword: '',
    confirmPassword: '',
    otp: '',
  });


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here
    console.log('Form data:', formData);
  };

  const handleSendOTP = () => {
    // Implement logic to send OTP to the provided email or phone number
    console.log('Sending OTP to:', formData.uniqueField);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <Title level={2}>Forgot Password</Title>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Email or Phone Number">
          <Input
            id="uniqueField"
            value={formData.uniqueField}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="New Password">
          <Input.Password
            id="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Confirm Password">
          <Input.Password
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Verify OTP">
          <Input
            id="otp"
            value={formData.otp}
            onChange={handleChange}
          />
          <Button onClick={handleSendOTP} style={{ marginTop: '10px' }}>Send OTP</Button>
        </Form.Item>
        <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="primary" htmlType="submit">
          Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
