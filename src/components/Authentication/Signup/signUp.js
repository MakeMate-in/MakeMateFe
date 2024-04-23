import React, { useState } from 'react'
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
import "./SignUp.css"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import gojo from './../../images/3.jpg'

const SignUp = () => {
  
  const [user, setUser] = useState({
    "name": "",
    "email": "",
    "phone_no": "",
    "password": "",
    "company_name": "",
    "gst_no": ""
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

  return (
    <div style={{ background: '' }}>
          <Flex>
          <Image src={gojo} style={{height:'46rem', width:'30rem'}}/>
        <Form
          ref={formRef}
          onFinish={handleSubmit}
          style={{transform:'translate(0%,15%)'}}
        >
          <h1 style={{transform:'translate(52%,5%)'}}>Create your Account</h1>
          <Flex vertical={true} gap={"middle"} style={{transform:'translate(25%,10%)'}}>
            <Row>
              <Col span={12}>
            <Input
              className=" input-style input  input-extras"
              placeholder="Your Name"
              onChange={handleChange}
              variant="filled"
              id={"name"}
              autoComplete='off'
              value={user["name"]}
            />
            </Col>
            <Col  span={12}>
            <Input
              className=" input-style input  input-extras"
              placeholder="Your Email"
              onChange={handleChange}
              id={"email"}
              variant="filled"
              autoComplete='off'
              value={user["email"]}
            />
            </Col>
            </Row>
            <Row>
              <Col  span={12}>
            <PhoneInput
              country='in'
              regions={'asia'}
              inputProps={{
                name: 'phone',
                required: true,
                autoFocus: true
              }}
            />
            </Col>
            <Col  span={12}>
            <Input
              className=" input-style input  input-extras"
              placeholder="Your Company Name"
              onChange={handleChange}
              variant="filled"
              id={"company_name"}
              autoComplete='off'
              value={user["company_name"]}
            />
       </Col>
       </Row>
       <Row>
        <Col  span={12}>
        <Flex vertical={true}>
            <Input
              className=" input-style input  input-extras"
              placeholder="GST Number"
              onChange={handleChange}
              variant="filled"
              id={"gst_no"}
              autoComplete='off'
              value={user["gst_no"]}
            />

            <Checkbox
              checked={checked}
              disabled={disabled}
              onChange={onChange}
              style={{ marginRight: '5px' }}
            >
              I do not have a GST Number
            </Checkbox>
            </Flex>
            </Col>
            <Col  span={12}>
            <Input.Password
              className="input black input-style"
              placeholder="Password"
              onChange={handleChange}
              id={"password"}
              variant="filled"
              value={user["password"]}
              autoComplete='off'
            />
            </Col>
            </Row>
            <Button

              type="primary"
              htmlType="submit"
              className="button-submit button-style"
              style={{
                color: 'white',
                backgroundColor: 'rgb(239, 243, 244)',
              }}
            // disabled={user["name"].length === 0 || user["uniqueField"].length === 0 || user["password"].length === 0 || user["handle"].length === 0 || !checked}
            >
              <span style={{ color: 'black', fontWeight: 'bolder' }}>Sign Up</span>
            </Button>
          </Flex>
        </Form>
        </Flex>
    </div>
  )
}

export default SignUp
