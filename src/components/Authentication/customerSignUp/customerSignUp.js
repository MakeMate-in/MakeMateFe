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
  Col,
  notification
} from 'antd'
import "./customerSignUp.css"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import gojo from './../../images/3.jpg'
import { OPEN_ROUTES, ROLE } from '../../../utils/constants'
import { useNavigate } from 'react-router-dom';
import { validateForm } from '../../../utils/commons/validators'
import { EMAIL, MESSAGES } from '../../../utils/constants'
import { checkUser, customerSignUp, getOtp } from '../../../apis/authentication.'
import { sendOTP } from '../../../apis/commonFunctions'
import OtpModal from '../OTP/otpModal'
import { signUp, verifyOtp } from '../../../apis/authentication.'



const CustomerSignUp = () => {
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();
  const [user, setUser] = useState({
    "first_name": "",
    "last_name": "",
    "email": "",
    "mobile_no": "",
    "password": "",
  });
  const [checkPassword, setCheckPassword] = useState("")
  const [disabled, setDisabled] = useState(false);
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [otpResponse, setotpResponse] = useState({})

  const openNotification = () => {
    api.open({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      className: 'custom-class',
      style: {
        width: 600,
      },
    });
  };

  const onChange = (e) => {
    setChecked(e.target.checked);
  }

  const handleChange = (event) => {
    setUser({ ...user, [event.target.id]: event.target.value })
  }

  const handlePhone = (value) => {
    // console.log(value)
    setUser({ ...user, ['mobile_no']: value })
  }

  const handleOtpResponse = () => {
    setotpResponse({})
  }

  const formRef = React.createRef();

  const handleSubmit = async () => {
    // console.log(user)
    if (validateForm(user, setUser, setErrors, checked, checkPassword)) {
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
          setErrors(errors);

        }
        else {
          try {
            const otpRes = await sendOTP(user["email"],true)
            // console.log(otpRes)
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
      console.log(errors)
      openNotification(errors)
    }

  }


  const submitOTP = async (otp) => {
    let data={}
    data.check = user["email"]
    data.otp = otp
    data.verification_key = otpResponse.response
    const res = await verifyOtp(data,true)
    if (res.Status === MESSAGES.SUCCESS) {
        try{
        let user_created = await customerSignUp(user,ROLE.CUSTOMER)
        console.log(user_created)
       
        navigate(OPEN_ROUTES.CUSTOMER_DASHBOARD)
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
       {contextHolder}
      <Flex>
        <Image src={gojo} style={{ height: '46rem', width: '30rem' }} />
    
        {
          otpResponse.Status == MESSAGES.SUCCESS &&
           <OtpModal otpRes={otpResponse} user={user} submitOTP={submitOTP}  handleOtpResponse={handleOtpResponse} />
        }

      </Flex>
    </div>
  )
}

export default CustomerSignUp
