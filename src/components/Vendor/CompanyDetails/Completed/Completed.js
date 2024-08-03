import { Result, Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { OPEN_ROUTES } from '../../../../utils/constants'


const Completed = (props) => {
    const colors1 = ['#6253E1', '#04BEFE'];
    const colors2 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
const colors3 = ['#40e495', '#30dd8a', '#2bb673'];
let bg1 =  `linear-gradient(116deg,  ${colors3.join(', ')})`
let bg2 = `linear-gradient(90deg,  ${colors2.join(', ')})`
let bg3 = `linear-gradient(135deg, ${colors1.join(', ')})`

const navigate = useNavigate()
    return (
    <div>
        {props.percent>90?
        <Result
         status="success"
         title="Completed"
         subTitle="Digital Factory is Completed. Click Below Button to view Profile"
         extra={[
            <div style={{display:'flex', justifyContent:'center'    }}>
            <Button type='primary' form='form1' onClick={() => {
                 navigate(OPEN_ROUTES.VENDOR_DASHBOARD)
            }} style={{ fontSize: '18px', fontWeight: '600', height: '40px', display: 'flex', alignItems: 'center', background: bg1}}>See Profile</Button>
            </div>
         ]}
        />:
        <Result
        status="403"
        title="Incomplete"
        subTitle={<div>To access the dashboard, your profile needs to be at least 90% complete<br/>Please complete your Digital Factory profile</div>}
        extra={  
            <div style={{display:'flex', justifyContent:'center'    }}>
            <Button type='primary' form='form1' onClick={props.onSaveAndSubmit} style={{ fontSize: '18px', fontWeight: '600', height: '40px', display: 'flex', alignItems: 'center', background: bg3}}>Complete Factory</Button>
            </div>
            }
        />
        }
    </div>
  )
}

export default Completed
