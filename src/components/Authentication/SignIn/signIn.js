import { useState } from 'react'
import { Flex, Button, Checkbox, Image, Input, Form } from 'antd'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import gojo from './../../images/3.jpg'
import { useNavigate } from 'react-router-dom'
import { OPEN_ROUTES } from '../../../utils/constants'
import "./signIn.css"


const SignIn = () => {
  const [isEmail, setIsEmail] = useState(true)
  const [rememberMe, setRememberMe] = useState(false)
  const [user, setUser] = useState({
    uniqueField: '',
    password: '',
    isEmail: true
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target
    setUser((prevState) => ({
      ...prevState,
      [id]: value
    }))
  }

  const handleSubmit = () => {
    console.log('User data:', user);
    if(!isEmail){
      user.uniqueField = user.uniqueField.substring(2);
    }
    fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Login successful');
          navigate(OPEN_ROUTES.MAIN_PAGE)
        } else {
          throw new Error('Login failed')
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked)
  }

  const handleToggle = () => {
    setIsEmail(!isEmail)
    setUser((prevState) => ({
      uniqueField: '',
      password: '',
      isEmail: !prevState.isEmail,
    }))
  }

  const handleForgotPasswordClick = () => {
    navigate(OPEN_ROUTES.FORGOTPASSWORD, { state: { uniqueField: user.uniqueField } })
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{  }}>
        <Image src={gojo} style={{ height: '46rem', width: '30rem' }} />
      </div>
      <div style={{margin: 'auto', alignItems: 'center', justifyContent: 'center'}}>
      <Form
        layout="vertical"
        initialValues={{ remember: rememberMe }}
        onFinish={handleSubmit}
        style={{ width: '400px'}}
      >
        <h1 style={{textAlign:'center'}}>Log In</h1>
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

        <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password placeholder="Password" variant="filled" onChange={handleChange} autoComplete='off' id={'password'} value={user['password']} />
          </Form.Item>
          <Form.Item>
          <Checkbox onChange={handleRememberMeChange} style={{float: 'left'}}>Remember me</Checkbox>
          <a href="#" onClick={handleForgotPasswordClick} style={{float: 'right'}}>Forgot password?</a>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '400px', textAlign: 'center' }}>
            Log In
          </Button>
        </Form.Item>

        <Form.Item>
          <Flex style={{alignItems:'center', justifyContent:'center'}}>
          <p style={{ margin: '0px' }}>Don't have an account?&nbsp;</p>
          <a onClick={() => { navigate(OPEN_ROUTES.SIGNUP) }}>Sign Up</a>
          </Flex>
        </Form.Item>
      </Form>
      </div>
    </div>
  )
}

export default SignIn

