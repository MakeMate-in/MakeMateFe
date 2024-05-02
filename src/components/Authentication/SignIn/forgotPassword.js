import React, { useState } from 'react';
import { Flex, Button, Checkbox, Image, Row, Col, Input, Form,Typography } from 'antd'
import { useLocation } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2'
const { Title } = Typography;

const ForgotPassword = () => {
  const [isEmail, setIsEmail] = useState(true)
  const location = useLocation();
  const [user, setUser] = useState({
    uniqueField: location.state?.uniqueField || '',
    newPassword: '',
    confirmPassword: '',
    otp: '',
  });
  const [formData,setFormData] = useState({
    uniqueField: location.state?.uniqueField || '',
    newPassword: '',
    confirmPassword: '',
    otp: '',
  });


  const handleForgotPassword = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uniqueField: formData.uniqueField,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
          otp: formData.otp,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to reset password');
      }
  
      console.log('Password reset successful');
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };
  

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  const handleSendOTP = () => {
    console.log('Sending OTP to:', formData.uniqueField);
  };

  const handleToggle = () => {
    setIsEmail(!isEmail)
    setUser((prevState) => ({
      uniqueField: '',
      password: '',
      isEmail: !prevState.isEmail,
    }))
  }

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <Title level={2}>Forgot Password</Title>
      {isEmail ? (
        <Col span={24}>
          <Row>
            <span>Email <span style={{ color: 'red' }}>*</span></span>
          </Row>
          <Row>
            <Input
              className="input-style input input-extras"
              placeholder="Email"
              onChange={handleChange}
              id={'uniqueField'}
              variant="filled"
              autoComplete="off"
              value={formData.uniqueField}
            />
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <Button onClick={handleToggle}>
              {isEmail ? 'Switch to Number' : 'Switch to Email'}
            </Button>
          </Row>
        </Col>
      ) : (
        <Col span={30}>
          <Row>
            <span>Mobile No. <span style={{ color: 'red' }}>*</span></span>
          </Row>
          <Row>
            <PhoneInput
              country="in"
              regions={'asia'}
              value={formData.uniqueField}
              onChange={(value) => handleChange({ target: { id: 'uniqueField', value } })}
              inputProps={{
                name: 'phone',
                required: true,
                autoFocus: true,
              }}
            />
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <Button onClick={handleToggle}>
              {isEmail ? 'Switch to Number' : 'Switch to Email'}
            </Button>
          </Row>
        </Col>
      )}
      <Row>
        <Col span={24}>
          <span>New Password</span>
          <Input.Password
            id="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <span>Confirm Password</span>
          <Input.Password
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <span>Verify OTP</span>
          <Input
            id="otp"
            value={formData.otp}
            onChange={handleChange}
          />
          <Button onClick={handleSendOTP} style={{ marginTop: '10px' }}>Send OTP</Button>
        </Col>
      </Row>
      <Row style={{ justifyContent: 'center' }}>
        <Button onClick={handleForgotPassword} type="primary" htmlType="submit">
          Submit
        </Button>
      </Row>
    </div>
  )};
  
  
export default ForgotPassword;
