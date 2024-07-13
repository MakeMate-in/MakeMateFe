import React, { useState, useMemo } from 'react'
import { Flex, Button, Checkbox, Image, Input, Form, Typography, Row, Col } from 'antd'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
// import gojo from './../../../assets/Login.jpg'
import gojo from './../../../assets/Login5.jpg'
import { useNavigate } from 'react-router-dom'
import { OPEN_ROUTES, ROLE } from '../../../utils/constants'
import { login } from '../../../apis/authentication.'

import { notification } from 'antd';
// import business_plan from './../../../assets/customer.jpg'
import { SESSION_STORAGE_ITEMS, getRole, initializeUserValues } from '../../../utils/helper'
import { bg1 } from '../../../utils/colorGradient'
const Context = React.createContext({
  name: 'Default',
});



const SignIn = () => {
  const [isEmail, setIsEmail] = useState(true)
  const [rememberMe, setRememberMe] = useState(false)
  const [user, setUser] = useState({
    uniqueField: '',
    password: '',
    isEmail: true,
    role: ROLE.VENDOR
  })


  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
    api.success({
      message: `Success`,
      description: "Logged In !!",
      placement,
    });
  };
  let contextValue = useMemo(
    () => ({
      name: 'Make Mate',
    }),
    [],
  );

  const openFailedNotification = (placement, msg) => {
    api.error({
      message: `Something went wrong! Try Again`,
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


  const navigate = useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target
    setUser((prevState) => ({
      ...prevState,
      [id]: value
    }))
  }

  const handleSubmit = async () => {
    console.log('User data:', user);
    if (!isEmail) {
      user.uniqueField = user.uniqueField.substring(2);
    }


    const res = await login(user)

    if (res.success) {
      sessionStorage.setItem(SESSION_STORAGE_ITEMS.TOKEN, res.token);
      initializeUserValues(res.token)
      openNotification('topRight')
      if (getRole() == ROLE.VENDOR) {
        navigate(OPEN_ROUTES.VENDOR_DASHBOARD)
      }
      else {
        navigate(OPEN_ROUTES.CUSTOMER_DASHBOARD)
      }
    } else {
      openFailedNotification('topRight', res.msg);
      // throw new Error('Login failed')
    }
  }

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked)
  }

  const handleToggle = () => {
    setIsEmail(!isEmail)
    setUser((prevState) => ({
      uniqueField: '',
      password: '',
      isEmail: !prevState.isEmail,
    }))
  }

  const handleForgotPasswordClick = () => {
    navigate(OPEN_ROUTES.FORGOTPASSWORD, { state: { uniqueField: user.uniqueField } })
  }

  return (
    <div >
      <Row gutter={200}>
        <Col>
          <img src={gojo} style={{ height: '45rem', width: '45rem' }} />
        </Col>
        <Flex vertical gap={30} justify='center' align='center'>
          <Flex vertical justify='center' align='center' gap={30}>
            <div className="demo-logo" style={{ fontWeight: '700', fontSize: '2rem', marginTop: '70px' }}>🛠MAKERS MATE</div>
            <Flex vertical justify='center' align='center'>
              <h1 style={{ margin: '0px' }}>Welcome back!</h1>
              <Typography style={{ fontSize: '20px', color: 'grey' }} >Log In</Typography>
            </Flex>
          </Flex>
          <Form
            layout="vertical"
            initialValues={{ remember: rememberMe }}
            onFinish={handleSubmit}
          // style={{ width: '400px'}}
          >
            <Form.Item name="emailOrMobile" label={isEmail ? "Email" : "Mobile No."} rules={[{ required: true, message: 'Please input your email!' }]}>
              {isEmail ? (
                <div>
                  <Input placeholder="Email" id={'uniqueField'} variant="filled" autoComplete='on' value={user['uniqueField']} onChange={handleChange} />
                  <a onClick={handleToggle} style={{ float: 'right' }}>{isEmail ? 'Switch to Number' : 'Switch to Email'}</a>
                </div>
              ) : (
                <div>
                  <PhoneInput placeholder="Mobile Number" country="in" regions={'asia'} value={user['uniqueField']} inputStyle={{ width: '400px' }}
                    onChange={(value) => handleChange({ target: { id: 'uniqueField', value } })} rules={[{ required: true, message: 'Please input your mobile no.!' }]}
                    inputProps={{
                      name: 'phone',
                      required: true,
                      autoFocus: true,
                    }}
                    style={{ width: '400px' }}
                  />
                  <a onClick={handleToggle} style={{ float: 'right' }}>{isEmail ? 'Switch to Number' : 'Switch to Email'}</a>
                </div>
              )}
            </Form.Item>

            <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password placeholder="Password" variant="filled" onChange={handleChange} autoComplete='off' id={'password'} value={user['password']} />
            </Form.Item>
            <Form.Item>
              <Checkbox onChange={handleRememberMeChange} style={{ float: 'left' }}>Remember me</Checkbox>
              <a href="#" onClick={handleForgotPasswordClick} style={{ float: 'right' }}>Forgot password?</a>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '400px', textAlign: 'center', background:bg1 }}>
                <Typography style={{ fontSize: '18px', color: 'white' }}>Log In </Typography>
              </Button>
            </Form.Item>

            <Flex style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Typography style={{ fontSize: '15px', color: 'black' }}>Don't have an account?&nbsp;
                <a onClick={() => { navigate(OPEN_ROUTES.SIGNUP) }}>Sign Up</a>
              </Typography>
            </Flex>

          </Form>

        </Flex>
      </Row>
    </div>
  )
}

export default SignIn

