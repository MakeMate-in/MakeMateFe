import React, { useState, useMemo } from 'react'
import {
  Card,
  Input,
  Form,
  Flex,
  Button,
  Checkbox,
  Image,
  Row,
  Col,
  notification,
  ConfigProvider,
  Typography
} from 'antd'
import "./SignUp.css"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { OPEN_ROUTES, ROLE } from '../../../utils/constants'
import { useNavigate } from 'react-router-dom';
import { validateForm } from '../../../utils/commons/validators'
import { EMAIL, MESSAGES } from '../../../utils/constants'
import { checkUser, customerSignUp, getOtp } from '../../../apis/authentication.'
import { sendOTP } from '../../../apis/commonFunctions'
import OtpModal from '../OTP/otpModal'
import { signUp, verifyOtp } from '../../../apis/authentication.'
import { SESSION_STORAGE_ITEMS, getRole, initializeUserValues } from '../../../utils/helper'
// import business_plan from './../../../assets/business_plan.svg'
import business_plan from './../../../assets/customer.jpg'
import { bg1 } from '../../../utils/colorGradient'
import { LinearProgress } from '@material-ui/core'
import logo from './../../../assets/logo.png';

const SignUp = () => {
  const navigate = useNavigate();


  const [api, contextHolder] = notification.useNotification();
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
  const [role, setRole] = useState(ROLE.VENDOR)
  const [loading, setLoading] = useState(false)


  const openNotification = (placement, message) => {
    api.success({
      message: `Success`,
      description: message,
      placement,
    });
  };
  let contextValue = useMemo(
    () => ({
      name: 'Make Mate',
    }),
    [],
  );

  const openFailedNotification = (placement, message) => {
    api.error({
      message: `Something went wrong`,
      description: message,
      placement,
    });
  };
  contextValue = useMemo(
    () => ({
      name: 'Make Mate',
    }),
    [],
  );

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
    if (validateForm(user, setUser, setErrors, checked, checkPassword, role)) {
      let errors = {}
      // Form is valid, submit the data or perform further actions

      try {
        let isUser = await checkUser(user, 1)
        if (isUser.Status == "ERROR") {
          if (isUser.msg.email != undefined) {
            errors.email = isUser.msg.email
            openFailedNotification('topRight', errors.email)
          }
          if (isUser.msg.mobile_no != undefined) {
            errors.mobile_no = isUser.msg.mobile_no
            openFailedNotification('topRight', errors.mobile_no)
          }
          if (isUser.msg.GST_no != undefined) {
            errors.GST_no = isUser.msg.GST_no
            openFailedNotification('topRight', errors.GST_no)
          }
          setErrors(errors);

        }
        else {
          setLoading(true)
          try {
            const otpRes = await sendOTP(user["email"], true)
            setLoading(false)
            setotpResponse(otpRes)
          }
          catch (err) {
            setLoading(false)
            openFailedNotification('topRight', 'Unable to Signup')
            // throw err
          }
        }

      }
      catch (err) {
        // console.log(err)
        openFailedNotification('topRight', 'Unable to Signup')
        // throw err
      }
    } else {
      // Form is invalid, handle errors or display error messages
      Object.keys(errors).map((item) => {
        openFailedNotification('topRight', errors[item])
      })

    }

  }


  const submitOTP = async (otp) => {
    setLoading(true)
    let data = {}
    data.check = user["email"]
    data.otp = otp
    data.verification_key = otpResponse.response
    const res = await verifyOtp(data, true)
    console.log(res)
    if (res.Status === MESSAGES.SUCCESS) {
      try {
        let res;
        if (role == ROLE.VENDOR) {
          res = await signUp(user, role)
        }
        else {
          res = await customerSignUp(user, role)
        }

        if (res.success) {
          setotpResponse({})
          sessionStorage.setItem(SESSION_STORAGE_ITEMS.TOKEN, res.token);
          initializeUserValues(res.token)
          openNotification('topRight', "User is Signed Up ")
          getRole() == ROLE.VENDOR ? navigate(OPEN_ROUTES.DIGITAL_FACTORY) : navigate(OPEN_ROUTES.CUSTOMER_DASHBOARD)
        } else {
          openFailedNotification('topRight', res.msg);
          // throw new Error('Login failed')
        }

      }
      catch (err) {
        setLoading(false)
        openFailedNotification('topRight', 'Unable to Signup')
        // return err
      }
    }
    else {
      errors.otp = res.msg
      setErrors(errors)
      navigate(OPEN_ROUTES.SIGNUP)
    }
    setLoading(false)

  }

  const changeRole = (role) => {
    setRole(role)
  }

  return (
    <div style={{ background: '' }}>
      <ConfigProvider>
        {contextHolder}
        {loading ? <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <LinearProgress style={{ width: '50%' }} />
        </div> :
          <Flex>
            <img src={business_plan} style={{ height: '100%', width: '45%' }} />

            <Flex vertical align='center' justify='center' gap={10}>
              <Flex vertical justify='center' align='center'>
                
                  <img src={logo} alt='Makers Mate' onClick={() => {navigate(OPEN_ROUTES.PARENT_ROUTE)}} style={{ height:'70%', width:'90%', cursor:'pointer' }}/>
                
                {/* <Typography style={{ fontSize: '20px', color: 'grey' }} >Create Account</Typography> */}
              </Flex>
              <Flex vertical gap={25}>
                <Flex gap="large" justify='center' align='flex-end' >
                  <Card style={{ background: role == ROLE.VENDOR ? bg1 : '', cursor: 'pointer' }} onClick={() => { changeRole(ROLE.VENDOR) }}>
                    {/* <img src={business_plan} style={{ height: '5rem', width: '5rem' }} /> */}
                    <Typography style={{ margin: '0', fontSize: '20px', fontWeight: '600' }}>Vendor Signup</Typography>
                  </Card>
                  <Card style={{ background: role == ROLE.CUSTOMER ? bg1 : '', cursor: 'pointer' }} onClick={() => { changeRole(ROLE.CUSTOMER) }}>
                    {/* <Image src={SignUpImage} style={{ height: '1rem', width: '1rem' }} /> */}

                    <Typography style={{ margin: '0', fontSize: '20px', fontWeight: '600' }}>Customer Signup</Typography>

                  </Card>
                </Flex>
              </Flex>


              {ROLE.VENDOR == role ?

                //Vendor

                <Form
                  layout="vertical"
                  ref={formRef}
                  onFinish={handleSubmit}
                // style={{ transform: 'translate(30%,5%)' }}
                >

                  <Flex vertical >
                    <Row>
                      <Col span={12}>
                        <Form.Item
                          label="First Name"
                          name="first_name"
                          rules={[{ required: true, message: 'First Name is required' }]}
                        >
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
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Last Name"
                          name="last_name"
                          rules={[{ required: true, message: 'Last Name is required' }]}
                        >
                          <Input
                            className=" input-style input  input-extras"
                            placeholder="Last Name"
                            onChange={handleChange}
                            variant="filled"
                            id={"last_name"}
                            autoComplete='off'
                            value={user["last_name"]}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <Form.Item
                          label="Email"
                          name="email"
                          rules={[{ required: true, message: 'Email is required' }]}
                        >
                          <Input
                            className=" input-style input  input-extras"
                            placeholder="Email"
                            onChange={handleChange}
                            id={"email"}
                            variant="filled"
                            autoComplete='off'
                            value={user["email"]}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Mobile No."
                          name="mobile_no"
                          rules={[{ required: true, message: 'Mobile No. is required' }]}
                        >
                          <PhoneInput
                            country='in'
                            regions={'asia'}
                            id="mobile_no"
                            onChange={handlePhone}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <Form.Item
                          label="Company Name"
                          name="comapny_name"
                          rules={[{ required: true, message: 'Company Name is required' }]}
                        >
                          <Input
                            className=" input-style input  input-extras"
                            placeholder="Company Name"
                            onChange={handleChange}
                            variant="filled"
                            id={"company_name"}
                            autoComplete='off'
                            value={user["company_name"]}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="GST Number"
                          name="GST_no"
                        // style={{margin:'0px'}}
                        //  rules={[{ required: true, message: 'GST Number is required' }]}
                        >
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
                        </Form.Item>

                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <Form.Item
                          label="Password"
                          name="password"
                          rules={[{ required: true, message: 'Password is required' }]}
                        >
                          <Input.Password
                            className="input black input-style"
                            placeholder="Password"
                            onChange={handleChange}
                            id={"password"}
                            variant="filled"
                            value={user["password"]}
                            autoComplete='off'
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          label="Confirm Password"
                          name="checkPassword"
                          rules={[{ required: true, message: 'Confirm Password is required' }]}
                        >
                          <Input.Password
                            className="input black input-style"
                            placeholder="Confirm Password"
                            onChange={(e) => { setCheckPassword(e.target.value) }}
                            id={"password"}
                            variant="filled"
                            value={checkPassword}
                            autoComplete='off'
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Flex vertical justify='center' align='center'>
                      <Button type="primary" htmlType="submit" style={{ width: '400px', textAlign: 'center', fontWeight: '500', background: bg1 }}>
                        Sign Up
                      </Button>
                      <Flex style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Typography style={{ fontSize: '15px', color: 'black' }}>Already have an account?&nbsp;
                          <a onClick={() => { navigate(OPEN_ROUTES.LOGIN) }}>Log In</a>
                        </Typography>
                      </Flex>
                    </Flex>
                  </Flex>
                </Form> :

                //  Customer
                <Form
                  layout='vertical'
                  ref={formRef}
                  onFinish={handleSubmit}
                // style={{ transform: 'translate(30%,5%)' }}
                >
                  <Flex vertical={true}>
                    <Row>
                      <Col span={12}>
                        <Form.Item
                          label="First Name"
                          name="first_name"
                          rules={[{ required: true, message: 'First Name is required' }]}
                        >
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

                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Last Name"
                          name="kast_name"
                          rules={[{ required: true, message: 'Last Name is required' }]}
                        >
                          <Input
                            className=" input-style input  input-extras"
                            placeholder="Last Name"
                            onChange={handleChange}
                            variant="filled"
                            id={"last_name"}
                            autoComplete='off'
                            value={user["last_name"]}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <Form.Item
                          label="Email"
                          name="email"
                          rules={[{ required: true, message: 'Email is required' }]}
                        >
                          <Input
                            className=" input-style input  input-extras"
                            placeholder="Email"
                            onChange={handleChange}
                            id={"email"}
                            variant="filled"
                            autoComplete='off'
                            value={user["email"]}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Mobile No."
                          name="mobile_no"
                          rules={[{ required: true, message: 'Mobile No. is required' }]}
                        >
                          <PhoneInput
                            country='in'
                            regions={'asia'}
                            id="mobile_no"
                            onChange={handlePhone}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <Form.Item
                          label="Password"
                          name="password"
                          rules={[{ required: true, message: 'Password is required' }]}
                        >

                          <Input.Password
                            className="input black input-style"
                            placeholder="Password"
                            onChange={handleChange}
                            id={"password"}
                            variant="filled"
                            value={user["password"]}
                            autoComplete='off'
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Cofirm Password"
                          name="checkPassword"
                          rules={[{ required: true, message: 'Confirm Password is required' }]}
                        >
                          <Input.Password
                            className="input black input-style"
                            placeholder="Confirm Password"
                            onChange={(e) => { setCheckPassword(e.target.value) }}
                            id={"password"}
                            variant="filled"
                            value={checkPassword}
                            autoComplete='off'
                          />
                        </Form.Item>
                      </Col>
                    </Row>


                    <Flex vertical justify='center' align='center'>
                      <Button type="primary" htmlType="submit" style={{ width: '400px', textAlign: 'center', fontWeight: '500', background: bg1 }}>
                        Sign Up
                      </Button>
                      <Flex style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Typography style={{ fontSize: '18px', color: 'black' }}>Already have an account?&nbsp;
                          <a onClick={() => { navigate(OPEN_ROUTES.LOGIN) }}>Log In</a>
                        </Typography>
                      </Flex>

                    </Flex>
                  </Flex>
                </Form>
              }



              {loading ? <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <LinearProgress style={{ width: '50%' }} />
              </div> :
                otpResponse.Status == MESSAGES.SUCCESS &&
                <OtpModal otpRes={otpResponse} user={user} submitOTP={submitOTP} handleOtpResponse={handleOtpResponse} />
              }

            </Flex>
          </Flex>}
      </ConfigProvider>
    </div>
  )
}

export default SignUp
