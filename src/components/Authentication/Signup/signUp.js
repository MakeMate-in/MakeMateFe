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
import { OPEN_ROUTES, ROLE } from '../../../utils/constants'
import { useNavigate } from 'react-router-dom';
import { validateForm } from '../../../utils/commons/validators'
import { EMAIL, MESSAGES } from '../../../utils/constants'
import { checkUser, getOtp } from '../../../apis/authentication.'
import { sendOTP } from '../../../apis/commonFunctions'
import OtpModal from '../OTP/otpModal'
import { signUp, verifyOtp } from '../../../apis/authentication.'



const SignUp = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    "first_name": "",
    "last_name": "",
    "email": "",
    "mobile_no": "",
    "password": "",
    "company_name": "",
    "GST_no": ""
  });
  const [checkPassword, setCheckPassword] = useState("")
  const [disabled, setDisabled] = useState(false);
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [otpResponse, setotpResponse] = useState({})

  const onChange = (e) => {
    setChecked(e.target.checked);
  }

  const handleChange = (event) => {
    setUser({ ...user, [event.target.id]: event.target.value })
  }

  const handlePhone = (value) => {
    setUser({ ...user, ['mobile_no']: value })
  }

  const handleOtpResponse = () => {
    setotpResponse({})
  }

  const formRef = React.createRef();

  const handleSubmit = async () => {
    console.log(user)
    if (validateForm(user, setUser, setErrors)) {
      let errors = {}
      // Form is valid, submit the data or perform further actions

      try {
        let isUser = await checkUser(user, 1)
        if (isUser.Status == 400) {
          if (isUser.msg.email != undefined) {
            errors.email = isUser.msg.email
          }
          if (isUser.msg.mobile_no != undefined) {
            errors.mobile_no = isUser.msg.mobile_no
          }
          if (isUser.msg.GST_no != undefined) {
            errors.GST_no = isUser.msg.GST_no
          }
          setErrors(errors);
        }
        else {
          try {
            const otpRes = await sendOTP(user["mobile_no"])
            console.log(otpRes)
            setotpResponse(otpRes)
          }
          catch (err) {
            throw err
          }
        }

      }
      catch (err) {
        throw err
      }
    } else {
      // Form is invalid, handle errors or display error messages
      console.log('Form validation failed');
    }

  }


  const submitOTP = async (otp) => {
    let data={}
    data.mobile_no = user["mobile_no"]
    data.otp = otp
    const res = await verifyOtp(data)
    if (res.Status === MESSAGES.SUCCESS) {
      console.log(user)
        try{
        let user_created = await signUp(user,ROLE.VENDOR)
        console.log(user_created)
       
        navigate(OPEN_ROUTES.MAIN_PAGE)
        }
        catch(err){
          console.log(err)
          return err
        }
      }
      else {
        errors.otp = res.msg
        setErrors(errors)
      }
    setotpResponse({})

}

  return (
    <div style={{ background: '' }}>
      <Flex>
        <Image src={gojo} style={{ height: '46rem', width: '30rem' }} />
        <Form
          ref={formRef}
          onFinish={handleSubmit}
          style={{ transform: 'translate(0%,5%)' }}
        >
          <h1 style={{ transform: 'translate(52%,5%)' }}>Create your Account</h1>
          <Flex vertical={true} gap={"large"} style={{ transform: 'translate(25%,5%)' }}>
            <Row>
              <Col span={12}>
                <Row>
                  <span>First Name <span style={{ color: 'red' }}>*</span></span>
                </Row>
                <Row>
                  <Input
                    label="First Name"
                    className=" input-style input  input-extras"
                    placeholder="First Name"
                    onChange={handleChange}
                    variant="filled"
                    id={"first_name"}
                    autoComplete='off'
                    value={user["first_name"]}
                  />

                </Row>
              </Col>
              <Col span={12}>
                <Row>
                  <span>Last Name <span style={{ color: 'red' }}>*</span></span>
                </Row>
                <Row>
                  <Input
                    className=" input-style input  input-extras"
                    placeholder="Last Name"
                    onChange={handleChange}
                    variant="filled"
                    id={"last_name"}
                    autoComplete='off'
                    value={user["last_name"]}
                  />
                </Row>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Row>
                  <span>Email <span style={{ color: 'red' }}>*</span></span>
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
              <Col span={12}>
                <Row>
                  <span>Mobile No. <span style={{ color: 'red' }}>*</span></span>

                </Row>
                <Row>
                  <PhoneInput
                    country='in'
                    regions={'asia'}
                    id="mobile_no"
                    onChange={handlePhone}
                  />
                </Row>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Row>
                  <span>Company Name <span style={{ color: 'red' }}>*</span></span>
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
              <Col span={12}>
                <Row>
                  <span>GST Number <span style={{ color: 'red' }}>*</span></span>
                </Row>
                <Row>
                  <Input
                    className=" input-style input  input-extras"
                    placeholder="GST Number"
                    onChange={handleChange}
                    variant="filled"
                    id={"GST_no"}
                    autoComplete='off'
                    value={user["GST_no"]}
                    disabled={checked}
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
              <Col span={12}>
                <Row>
                  <span>Password <span style={{ color: 'red' }}>*</span></span>
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
                  <span>Confirm Password <span style={{ color: 'red' }}>*</span></span>
                </Row>
                <Row>
                  <Input.Password
                    className="input black input-style"
                    placeholder="Confirm Password"
                    onChange={(e) => { setCheckPassword(e.target.value) }}
                    id={"password"}
                    variant="filled"
                    value={checkPassword}
                    autoComplete='off'
                  />
                </Row>
              </Col>
            </Row>
            <Button

              type="primary"
              htmlType="submit"
              className="button-submit button-style"
            // disabled={user["name"].length === 0 || user["uniqueField"].length === 0 || user["password"].length === 0 || user["handle"].length === 0 || !checked}
            >
              <span style={{ color: 'black', fontWeight: 'bolder' }}>Sign Up</span>
            </Button>
            <Flex>
              <p style={{ margin: '0px' }}>Already have an account ?   </p>
              <span onClick={() => { navigate(OPEN_ROUTES.LOGIN) }} style={{ color: 'rgb(29, 155, 240)' }}>
                Log In
              </span>
            </Flex>
          </Flex>
        </Form>
        {
          otpResponse.Status == MESSAGES.SUCCESS &&
           <OtpModal otpRes={otpResponse} user={user} submitOTP={submitOTP}  handleOtpResponse={handleOtpResponse} />
        }
      </Flex>
    </div>
  )
}

export default SignUp
