import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import {
  Card,
  Input,
  Form,
  Flex,
  Button,
  Checkbox,
  Image,
  Row,
  Col
} from 'antd'
import "../Signup/SignUp.css"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import gojo from './../../images/3.jpg'
import ForgotPassword from '../SignIn/forgotPassword'

const SignIn = () => {

  const [isEmail, setIsEmail] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const [user, setUser] = useState({
    
    "email": "",
    "phone_no": "",
    "password": "",
    "isEmail": false,
  });
  const [disabled, setDisabled] = useState(false);
  const [checked, setChecked] = useState(false);


  const onChange = () => {

  }

  const handleChange = () => {
  }

  const formRef = React.createRef();

  const handleSubmit = () => {

  }

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  }

  const handleToggle = () => {
    setIsEmail(!isEmail);
  }

  return (
    <div style={{ background: '' }}>
           <Flex gap={"small"}>
          <Image src={gojo} style={{height:'46rem', width:'30rem'}}/>
        <Form
          ref={formRef}
          onFinish={handleSubmit}
          style={{transform:'translate(0%,5%)'}}
        >
          <h1 style={{transform:'translate(64%,5%)'}}>Log In</h1>
          <Flex vertical={true} gap={"large"} style={{transform:'translate(25%,5%)'}}>

          { isEmail?
          (<Col span={12}>
            <Row>
              <span>Email <span style={{color:'red'}}>*</span></span>
            </Row>
            <Row>
              <Input
                className="input-style input input-extras"
                placeholder="Email"
                onChange={handleChange}
                id={"email"}
                variant="filled"
                autoComplete='off'
                // value={user["email"]}  {Commented this line because user was not able to enter email due to this line}
              />
            </Row>
            <Row style={{ marginTop: '10px' }}>
            <Button onClick={handleToggle}>
          {isEmail ? 'Switch to Number' : 'Switch to Email'}
        </Button>
            </Row>
          </Col>):
              (<Col  span={12}>
                <Row>
              <span>Mobile No. <span style={{color:'red'}}>*</span></span>
            
            </Row>
            <Row>
            <PhoneInput
              country='in'
              regions={'asia'}
              inputProps={{
                name: 'phone',
                required: true,
                autoFocus: true
              }}
            />
            </Row>
            <Row style={{ marginTop: '10px' }}>
            <Button onClick={handleToggle}>
          {isEmail ? 'Switch to Number' : 'Switch to Email'}
        </Button>
            </Row>
            </Col>)
            }
             <Col  span={12}>
              <Row>
            <span>Password <span style={{color:'red'}}>*</span></span>  
            </Row>
            <Row>

            <Input.Password
              className="input black input-style"
              placeholder="Password"
              onChange={handleChange}
              id={"password"}
              variant="filled"
              value={user["password"]}
              autoComplete='off'
            />
          </Row>
            </Col>

            <Col span={12}>
            <Row>
              <Checkbox checked={rememberMe} onChange={handleRememberMeChange}>Remember Me</Checkbox>
            </Row>
          </Col>


            <Col span={12}>
              <Row>
                <Button type="link">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </Button>
              </Row>
            </Col>

            <Col span={12}>
              <Row>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="button-submit button-style"
                  style={{
                    color: 'white',
                    backgroundColor: 'rgb(239, 243, 244)',
                  }}
                >
                  <span style={{ color: 'black', fontWeight: 'bolder' }}>Sign Up</span>
                </Button>
              </Row>
            </Col>

          </Flex>
        </Form>
      </Flex>
      <Routes>
        <Route path="/forgot-password" component={ForgotPassword} />
      </Routes>
    </div>
  )
}

export default SignIn
