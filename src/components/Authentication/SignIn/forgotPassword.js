import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Flex, Button, Image, Input, Row, Form, Typography } from 'antd';
import { OPEN_ROUTES } from '../../../utils/constants'
import { useNavigate } from 'react-router-dom';
import { checkUser} from '../../../apis/authentication.';
import gojo from './../../images/3.jpg';
import OtpModal from '../OTP/otpModal';
import { notification } from 'antd';
import { forgotpassword, sendEmailOtp } from '../../../apis/authentication.';
const Context = React.createContext({
  name: 'Default',
});

const ForgotPassword = () => {
  const location = useLocation();
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isEmail, setIsEmail] = useState(null);

  const [user, setUser] = useState({
    uniqueField: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [api, contextHolder] = notification.useNotification();

  const [otpResponse, setotpResponse] = useState();
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
    setUser((prevState) => {
      const updatedUser = { ...prevState, [id]: value };
      setPasswordsMatch(updatedUser.newPassword === updatedUser.confirmPassword);
      return updatedUser;
    })
  }

  const handleSubmit = async () => {
    let isUser = await checkUser(user, 3);
    console.log('isUser response', isUser);
    if (isUser.success == false) {
      openFailedNotification('topRight', 'User does not Exist with Entered Email');
    }
    else{
    if(!passwordsMatch) {
      openFailedNotification('topRight', 'Passwords do not match');
      return
    }
    else{
      console.log('User data:', user);
      const res = await handleSendOTP();
      console.log('handleotp resp',res);
      if(res.Success == true) {
        console.log('forgot password res:',res);
      } 
      else {
        console.log("Failed Forgot password res:",res);
        openFailedNotification('topRight', res?.msg);
      }
  }
  }
};

  const handleOtpResponse = () => {
    setotpResponse(null);
  }

  const submitOTP = async (otp) => {
    if(otpResponse.otp == otp)
      {
        const res1 = await forgotpassword(user);
        if(res1.status == 200)
          {
            console.log("Password Changed successfully");
          }
          else {
            console.log('Error in password change');
          }
        api.success({
          message: 'Success',
          description: 'OTP verified successfully!',
          placement: 'topRight',
          onClose: () => navigate(OPEN_ROUTES.LOGIN),
        });
      }
      else {
        openFailedNotification('topRight', 'OTP verification failed. Please try again.');
      }
}

  const handleSendOTP = async () => {
    console.log('Sending OTP to:', user.uniqueField);
    try {
      const otpRes = await sendEmailOtp(user);
      setotpResponse(otpRes);
      return otpRes;
    } catch (err) {
      console.log(err);
      throw err;
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
      // onFinish={handleSubmit}
      >
        <h1 style={{textAlign:'center'}}>Forgot Password</h1>
            {/* <Title level={2}>Forgot Password</Title> */}
            <Form.Item name="uniqueField" label={"Email"} rules={[{ required: true, message: 'Please input your email!' }]}>
            <div>
            <Input placeholder="Email" id={'uniqueField'} variant="filled" autoComplete='on' value={user['uniqueField']} onChange={handleChange} />
            </div>
        </Form.Item>
        <Form.Item name="newPassword" label="New Password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder="New Password" variant="filled" onChange={handleChange} autoComplete='off' id={'newPassword'} value={user['newPassword']} />
          </Form.Item>

        <Form.Item name="confirmPassword" label="Confirm Password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder="Confirm Password" variant="filled" onChange={handleChange} autoComplete='off' id={'confirmPassword'} value={user['confirmPassword']} />
          </Form.Item>

            <Form.Item>
              <Button onClick={handleSubmit} type="primary" htmlType="submit" style={{ width: '400px', textAlign: 'center' }}>
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
      {otpResponse && <OtpModal otpRes={otpResponse} user={user} submitOTP={submitOTP} handleOtpResponse={handleOtpResponse} />} 
    </div>
    </div>
    </Context.Provider>
  );
}
export default ForgotPassword;

