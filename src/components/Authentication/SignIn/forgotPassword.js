import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Flex, Button, Image, Input, Row, Form, Typography } from 'antd';
import { OPEN_ROUTES } from '../../../utils/constants'
import { useNavigate } from 'react-router-dom';
import { MESSAGES } from '../../../utils/constants';
import gojo from './../../images/3.jpg';
import { sendOTP } from '../../../apis/commonFunctions'
import OtpModal from '../OTP/otpModal';
import PhoneInput from 'react-phone-input-2';
import { notification } from 'antd';
import { ROLE } from '../../../utils/constants';
import { forgotpassword } from '../../../apis/authentication.';
const { Title } = Typography;
const Context = React.createContext({
  name: 'Default',
});

const ForgotPassword = () => {
  const location = useLocation();
  const [isEmail, setIsEmail] = useState(true);

  const [user, setUser] = useState({
    uniqueField: '',
    newPassword: '',
    confirmPassword: '',
    isEmail: true,
    role: ROLE.VENDOR
  })

  const [api, contextHolder] = notification.useNotification();

  const [otpResponse, setotpResponse] = useState({})
  const formRef = React.createRef();

  const navigate = useNavigate();

  const handleToggle = () => {
    setIsEmail(!isEmail)
    setUser((prevState) => ({
      uniqueField: '',
      password: '',
      isEmail: !prevState.isEmail,
    }))
  }

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

  const openFailedNotification = (placement,msg) => {
    api.error({
      message: `Something went wrong`,
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

  const handleChange = (e) => {
    const { id, value } = e.target
    setUser((prevState) => ({
      ...prevState,
      [id]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User data:', user);
    if(!isEmail){
      user.uniqueField = user.uniqueField.substring(2);
    }

    const res = forgotpassword (user);
    console.log(res)

    if (res.success) {
           openNotification('topRight')
           navigate(OPEN_ROUTES.LOGIN)
          } else {
            openFailedNotification('topRight', res.msg);
          }
  };

  const handleOtpResponse = () => {
    setotpResponse({})
  }

  const submitOTP = async (otp) => {
    // let data={}
    // data.mobile_no = user["mobile_no"]
    // data.otp = otp
    // const res = await verifyOtp(data)
    // if (res.Status === MESSAGES.SUCCESS) {
    //   console.log(user)
    //     try{
    //     let user_created = await signUp(user,ROLE.VENDOR)
    //     console.log(user_created)
       
    //     navigate(OPEN_ROUTES.MAIN_PAGE)
    //     }
    //     catch(err){
    //       console.log(err)
    //       return err
    //     }
    //   }
    //   else {
    //     errors.otp = res.msg
    //     setErrors(errors)
    //   }
    // setotpResponse({})

}

  const handleSendOTP = async () => {
    console.log('Sending OTP to:', user.uniqueField);
    try {
            const otpRes = await sendOTP(user["uniqueField"])
            console.log(otpRes)
            setotpResponse(otpRes)
          }
          catch (err) {
            throw err
          }
  };
  

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}
    <div style={{ display: 'flex' }}>
      <div style={{  }}>
        <Image src={gojo} style={{ height: '46rem', width: '30rem' }} />
      </div>
      <div style={{margin: 'auto', alignItems: 'center', justifyContent: 'center'}}>
      <Form onSubmit={handleSubmit} 
      layout="vertical"
      onFinish={handleSubmit}
      >
        <h1 style={{textAlign:'center'}}>Forgot Password</h1>
            {/* <Title level={2}>Forgot Password</Title> */}
            <Form.Item name="emailOrMobile" label={isEmail?"Email":"Mobile No."} rules={[{ required: true, message: 'Please input your email!' }]}>
          {isEmail ? (
            <div>
            <Input placeholder="Email" id={'uniqueField'} variant="filled" autoComplete='on' value={user['uniqueField']} onChange={handleChange} />
            <a onClick={handleToggle} style={{float:'right'}}>{isEmail ? 'Switch to Number' : 'Switch to Email'}</a>
            </div>
          ) : (
            <div>
            <PhoneInput placeholder="Mobile Number" country="in" regions={'asia'} value={user['uniqueField']} inputStyle={{width:'400px'}}
              onChange={(value) => handleChange({ target: { id: 'uniqueField', value } })} rules={[{ required: true, message: 'Please input your mobile no.!' }]}
              inputProps={{
                name: 'phone',
                required: true,
                autoFocus: true,
              }}
              style={{ width: '400px'} }
              />
             <a onClick={handleToggle} style={{float:'right'}}>{isEmail ? 'Switch to Number' : 'Switch to Email'}</a>
            </div>
          )}
        </Form.Item>
        

        <Form.Item name="new_password" label="New Password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder="New Password" variant="filled" onChange={handleChange} autoComplete='off' id={'new_password'} value={user['newPassword']} />
          </Form.Item>

        <Form.Item name="confirm_password" label="Confirm Password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder="Confirm Password" variant="filled" onChange={handleChange} autoComplete='off' id={'confirm_password'} value={user['confirmPassword']} />
          </Form.Item>

            <Form.Item>
              <Button onClick={handleSendOTP} type="primary" htmlType="submit" style={{ width: '400px', textAlign: 'center' }}>
                Submit
              </Button>
            </Form.Item>
            <Flex>
              <p style={{ margin: '0px' }}>Go back to&nbsp;  </p>
              <span onClick={() => { navigate(OPEN_ROUTES.LOGIN) }} style={{ color: 'rgb(29, 155, 240)' }}>
                Login
              </span>
            </Flex>
      </Form>
      {
          otpResponse.Status == MESSAGES.SUCCESS &&
           <OtpModal otpRes={otpResponse} user={user} submitOTP={submitOTP}  handleOtpResponse={handleOtpResponse} />
        }
    </div>
    </div>
    </Context.Provider>
  );
};

export default ForgotPassword;

