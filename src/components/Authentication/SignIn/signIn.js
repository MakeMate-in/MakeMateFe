import React, { useState } from 'react'
import { Flex, Button, Checkbox, Image, Row, Col, Input, Form } from 'antd'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import gojo from './../../images/3.jpg'
import { useNavigate } from 'react-router-dom'
import { OPEN_ROUTES } from '../../../utils/constants'

const SignIn = () => {
  const [isEmail, setIsEmail] = useState(true)
  const [rememberMe, setRememberMe] = useState(false)
  const [user, setUser] = useState({
    uniqueField: '',
    password: '',
    isEmail: true,
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target
    setUser((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  const handleSubmit = () => {
    console.log('User data:', user)
    fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Login successful')
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
    <div style={{ background: '' }}>
      <Flex gap={'small'} justifyContent="center">
        <Image src={gojo} style={{ height: '46rem', width: '30rem' }} />
        <Form style={{ transform: 'translate(0%,5%)' }} onFinish={handleSubmit}>
          <h1 style={{ transform: 'translate(64%,5%)' }}>Log In</h1>
          <Flex vertical={true} gap={'large'} style={{ transform: 'translate(25%,5%)' }}>
            {isEmail ? (
              <Col span={12}>
                <Row>
                  <span>
                    Email <span style={{ color: 'red' }}>*</span>
                  </span>
                </Row>
                <Row>
                  <Input
                    className="input-style input input-extras"
                    placeholder="Email"
                    onChange={handleChange}
                    id={'uniqueField'}
                    variant="filled"
                    autoComplete="off"
                    value={user['uniqueField']}
                  />
                </Row>
                <Row style={{ marginTop: '10px' }}>
                  <Button onClick={handleToggle}>{isEmail ? 'Switch to Number' : 'Switch to Email'}</Button>
                </Row>
              </Col>
            ) : (
              <Col span={12}>
                <Row>
                  <span>
                    Mobile No. <span style={{ color: 'red' }}>*</span>
                  </span>
                </Row>
                <Row>
                  <PhoneInput
                    country="in"
                    regions={'asia'}
                    value={user['uniqueField']}
                    onChange={(value) => handleChange({ target: { id: 'uniqueField', value } })}
                    inputProps={{
                      name: 'phone',
                      required: true,
                      autoFocus: true,
                    }}
                  />
                </Row>
                <Row style={{ marginTop: '10px' }}>
                  <Button onClick={handleToggle}>{isEmail ? 'Switch to Number' : 'Switch to Email'}</Button>
                </Row>
              </Col>
            )}
            <Col span={12}>
              <Row>
                <span>
                  Password <span style={{ color: 'red' }}>*</span>
                </span>
              </Row>
              <Row>
                <Input.Password
                  className="input black input-style"
                  placeholder="Password"
                  onChange={handleChange}
                  id={'password'}
                  variant="filled"
                  value={user['password']}
                  autoComplete="off"
                />
              </Row>
            </Col>

            <Col span={12}>
              <Row>
                <Checkbox checked={rememberMe} onChange={handleRememberMeChange}>
                  Remember Me
                </Checkbox>
              </Row>
            </Col>

            <Flex>
              <span onClick={handleForgotPasswordClick} style={{ color: 'rgb(29, 155, 240)' }}>
                Forgot Password?
              </span>
            </Flex>

            <Col span={12}>
              <Row>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="button-submit button-style"
                  style={{
                    color: 'white',
                    backgroundColor: 'rgb(239, 243, 244)',
                  }}
                >
                  <span style={{ color: 'black', fontWeight: 'bolder' }}>Sign Up</span>
                </Button>
              </Row>
            </Col>
          </Flex>
        </Form>
      </Flex>
    </div>
  )
}

export default SignIn
