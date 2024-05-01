import React, {useState} from 'react'
import {
    Modal,
    ConfigProvider,
    theme
} from 'antd'
import { useNavigate } from 'react-router-dom'



const OtpModal = (props) => {
    const [modal1, setmodal1] = useState(true)
    

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
          algorithm: theme.darkAlgorithm,
          Input: {
            colorPrimary: '#eb2f96',
            algorithm: true, // Enable algorithm
          }
        }}>
        <Modal
          centered
          open={modal1}
          onCancel={() => {
            setmodal1(false)
          }}
          className="modalStyle"
          width={600}
          footer={null}
        ></Modal>
   </ConfigProvider>
    </div>
  )
}

export default OtpModal
