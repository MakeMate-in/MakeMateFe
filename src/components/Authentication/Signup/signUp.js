import React, { useState } from 'react'
import {
  Card,
  Input,
  Form,
  Flex,
  Button,
  Checkbox
} from 'antd'
import "./SignUp.css"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

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
      <Card
        title="Create your Account" >
        <Form
          ref={formRef}
          onFinish={handleSubmit}
        >
          <Flex vertical={true} gap={"middle"}>
            <Input
              className=" input-style input  input-extras"
              placeholder="Enter Name"
              onChange={handleChange}
              id={"name"}
              autoComplete='off'
              value={user["name"]}
            />
            <Input
              className=" input-style input  input-extras"
              placeholder="Enter Email"
              onChange={handleChange}
              id={"email"}
              autoComplete='off'
              value={user["email"]}
            />
            <PhoneInput
              country='in'
              regions={'asia'}
              inputProps={{
                name: 'phone',
                required: true,
                autoFocus: true
              }}
            />
            <Input
              className=" input-style input  input-extras"
              placeholder="Enter Company Name"
              onChange={handleChange}
              id={"company_name"}
              autoComplete='off'
              value={user["company_name"]}
            />
            <Input
              className=" input-style input  input-extras"
              placeholder="Enter GST Number"
              onChange={handleChange}
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
            <Input.Password
              className="input black input-style"
              placeholder="Password"
              onChange={handleChange}
              id={"password"}
              value={user["password"]}
              autoComplete='off'
            />
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
      </Card>
    </div>
  )
}

export default SignUp
