import { useState } from 'react'
import {
    Modal,
    ConfigProvider,
    theme,
    Button,
    Row,
    Col,
    Input
} from 'antd'
import EmailIcon from '@mui/icons-material/Email';
import OTPInput, { ResendOTP } from "otp-input-react";


const OtpModal = (props) => {

    const [modal1, setmodal1] = useState(true)
    const [otp, setOtp] = useState('')


  

    return (
        <div>
            <ConfigProvider
                theme={{
                    token: {
                        // Seed Token
                        colorPrimary: 'rgb(29, 155, 240)',
                        colorBgMask: 'rgba(91, 112, 131, 0.4)',
                        // Alias Token
                        // colorBgContainer: '#f6ffed',

                    },
                    algorithm: theme.defaultAlgorithm,
                    Input: {
                        colorPrimary: '#eb2f96',
                        algorithm: true, // Enable algorithm
                    }
                }}>
                <Modal
                    centered
                    open={modal1}
                    onCancel={() => {
                      props.handleOtpResponse()
                    }}
                    className="modalStyle"
                    width={600}
                    footer={null}
                >
                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Row>
                            <EmailIcon style={{ color: 'blue', fontSize: '80px' }} />
                        </Row>
                        <Row>
                            <p style={{ fontSize: '30px', margin: '0px' }}>Please Verify Your Account</p>
                        </Row>
                        <Row>
                            <p style={{ fontSize: '15px', margin: '0px' }}>
                                We have sent a SMS to <b>{props.user.mobile_no}</b><br />with your vericfication Code
                            </p>
                        </Row>
                        <Row>

<OTPInput value={otp} onChange={setOtp} autoFocus OTPLength={6} otpType="number" disabled={false}  style={{margin:'20px 0px 10px 0px'}} />

                        </Row>
                        <Row>
                            <Button  
                             className="button-submit otp-button-style"
                             onClick={() => {props.submitOTP(otp)}}
                             >
                                Verify
                            </Button>
                        </Row>
                        <p>Didn't recieve the code? <a>Try again</a> </p>
                    </Col>
                </Modal>
            </ConfigProvider>
        </div>
    )
}

export default OtpModal
