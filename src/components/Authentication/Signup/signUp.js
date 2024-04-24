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
          style={{transform:'translate(0%,5%)'}}
        >
          <h1 style={{transform:'translate(52%,5%)'}}>Create your Account</h1>
          <Flex vertical={true} gap={"large"} style={{transform:'translate(25%,5%)'}}>
            <Row>
              <Col span={12}>
            <Row>
            <span>First Name <span style={{color:'red'}}>*</span></span>
            </Row>
            <Row>
            <Input
              label="First Name"
              className=" input-style input  input-extras"
              placeholder="First Name"
              onChange={handleChange}
              variant="filled"
              id={"name"}
              autoComplete='off'
              value={user["name"]}
              rules={[
                {
                  required: true,
                  message: "Please input valid email!",
                },
              ]}
            />
         
         </Row>
            </Col>
            <Col span={12}>
           <Row>
            <span>Last Name <span style={{color:'red'}}>*</span></span>
            </Row>
            <Row>
            <Input
              className=" input-style input  input-extras"
              placeholder="Last Name"
              onChange={handleChange}
              variant="filled"
              id={"name"}
              autoComplete='off'
              value={user["name"]}
            />
            </Row>
            </Col>
            </Row>
            <Row>
            <Col  span={12}>
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
            </Col>
              <Col  span={12}>
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
            </Col>
       </Row>
       <Row>
       <Col  span={12}>
        <Row>
       <span>Company Name <span style={{color:'red'}}>*</span></span>
       </Row>
            <Row>
            <Input
              className=" input-style input  input-extras"
              placeholder="Company Name"
              onChange={handleChange}
              variant="filled"
              id={"company_name"}
              autoComplete='off'
              value={user["company_name"]}
            />
            </Row>
       </Col>
        <Col  span={12}>
      <Row>
        <span>GST Number <span style={{color:'red'}}>*</span></span>
        </Row>
            <Row>
            <Input
              className=" input-style input  input-extras"
              placeholder="GST Number"
              onChange={handleChange}
              variant="filled"
              id={"gst_no"}
              autoComplete='off'
              value={user["gst_no"]}
            />
</Row>
<Row>
            <Checkbox
              checked={checked}
              disabled={disabled}
              onChange={onChange}
              style={{ marginRight: '5px' }}
            >
              I do not have a GST Number
            </Checkbox>
            </Row>
            </Col>
            </Row>
            <Row>
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
            <Col  span={12}>
  <Row>
            <span>Confirm Password <span style={{color:'red'}}>*</span></span>
            </Row>
            <Row>
            <Input.Password
              className="input black input-style"
              placeholder="Confirm Password"
              onChange={handleChange}
              id={"password"}
              variant="filled"
              value={user["password"]}
              autoComplete='off'
            />
            </Row>
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
