import React, { useState, useMemo } from 'react';
import { Flex, Button, Image, Input, Row, Form, Typography, Col } from 'antd';
import { OPEN_ROUTES } from '../../../utils/constants'
import { useNavigate } from 'react-router-dom';
import { checkUser } from '../../../apis/authentication.';
import gojo from './../../../assets/forgotpassword.avif'
import OtpModal from '../OTP/otpModal';
import { notification } from 'antd';
import { forgotpassword, sendEmailOtp } from '../../../apis/authentication.';
import { bg1 } from '../../../utils/colorGradient';
const Context = React.createContext({
  name: 'Default',
});

const ForgotPassword = () => {
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

  const openFailedNotification = (placement, msg) => {
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
    else {
      if (!passwordsMatch) {
        openFailedNotification('topRight', 'Passwords do not match');
        return
      }
      else {
        const res = await handleSendOTP();
        if (res.Success == true) {
          console.log('forgot password res:', res);
        }
        else {
          console.log("Failed Forgot password res:", res);
          openFailedNotification('topRight', res?.msg);
        }
      }
    }
  };

  const handleOtpResponse = () => {
    setotpResponse(null);
  }

  const submitOTP = async (otp) => {
    if (otpResponse.otp == otp) {
      const res1 = await forgotpassword(user);
      if (res1.status == 200) {
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
    <div>
      <Flex gap={100}>
        <img src={gojo} style={{ height: '45rem', width: '40rem' }} />

        <Flex align='center' justify='center' vertical>
          <Flex vertical justify='center' align='center'>
            <Col>
              <div className="demo-logo" style={{ fontWeight: '700', fontSize: '2rem' }}>🛠MAKERS MATE</div>
            </Col>
            <Typography style={{ fontSize: '20px', color: 'grey' }} >Forgot Password</Typography>
          </Flex>

          <Form onSubmit={handleSubmit}
            layout="vertical"
          >
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
              <Button onClick={handleSubmit} type="primary" htmlType="submit" style={{ width: '400px', textAlign: 'center', background: bg1 }}>
                <Typography style={{ fontSize: '18px', color: 'white' }}>Submit </Typography>
              </Button>
            </Form.Item>
            <Flex justify='center'>
              <Typography style={{ fontSize: '15px', color: 'black' }}>Go back to&nbsp;
                <span onClick={() => { navigate(OPEN_ROUTES.LOGIN) }} style={{ color: 'rgb(29, 155, 240)', cursor:'pointer' }}>
                  Login
                </span>
              </Typography>


            </Flex>
          </Form>
          {otpResponse && <OtpModal otpRes={otpResponse} user={user} submitOTP={submitOTP} handleOtpResponse={handleOtpResponse} />}
        </Flex>
      </Flex>
    </div>
  );
}
export default ForgotPassword;

