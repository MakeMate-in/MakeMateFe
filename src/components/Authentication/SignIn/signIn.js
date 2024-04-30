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
import "../Signup/SignUp.css"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import gojo from './../../images/3.jpg'

const SignIn = () => {
  
  const [user, setUser] = useState({
    
    "email": "",
    "phone_no": "",
    "password": "",
    "isEmail": false
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
          style={{transform:'translate(0%,5%)'}}
        >
          <h1 style={{transform:'translate(64%,5%)'}}>Log In</h1>
          <Flex vertical={true} gap={"large"} style={{transform:'translate(25%,5%)'}}>
   
          { user["isEmail"]?
           ( <Col  span={12}>
              <Row>
            <span>Email <span style={{color:'red'}}>*</span></span>
            </Row>
            <Row>
            <Input
              className=" input-style input  input-extras"
              placeholder="Email"
              onChange={handleChange}
              id={"email"}
              variant="filled"
              autoComplete='off'
              value={user["email"]}
            />
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

export default SignIn
