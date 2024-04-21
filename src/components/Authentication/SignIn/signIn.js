import React, { useState } from 'react'
import {
  Card,
  Input,
  Form,
  Flex,
  Button,
} from 'antd'
import "./../Signup/SignUp.css"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const SignIn = () => {
  
  const [user, setUser] = useState({
    "email": "",
    "phone_no": "",
    "password": "",
  });

  const handleChange = () => {

  }

  const formRef = React.createRef();

  const handleSubmit = () => {

  }

  return (
    <div style={{ background: '' }}>
      <Card
        title="Log In" >
        <Form
          ref={formRef}
          onFinish={handleSubmit}
        >
          <Flex vertical={true} gap={"middle"}>
            <Input
              className=" input-style input  input-extras"
              placeholder="Enter Email"
              onChange={handleChange}
              variant="filled"
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
            <Input.Password
              className="input black input-style"
              placeholder="Password"
              onChange={handleChange}
              variant="filled"
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
              <span style={{ color: 'black', fontWeight: 'bolder' }}>Sign In</span>
            </Button>
          </Flex>
        </Form>
      </Card>
    </div>
  )
}

export default SignIn
