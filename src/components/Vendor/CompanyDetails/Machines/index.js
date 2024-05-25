import React from 'react'
import { Row, Tabs } from 'antd'
import Certificates from '../Certificates';
import { STEP_TAB_MAP } from '../../../../utils/constants';
import Machines from './Machines';

const InfraDetails = (props) => {

    const items = [
        {
            key: '1',
            label: 'Machines',
            children: <Machines/>,
        },
        {
            key: '2',
            label: 'Certificates',
            children: <Certificates {...props} />,
        },
        {
            key: '3',
            label: 'Certificates',
            children: <Certificates {...props} />,
        },
    ]

    return (
        <div>
            <Row>
                <div style={{ width: '100%' }}>
                    <Tabs defaultActiveKey="1" items={items} onChange={props.onChangeTab} size='large' activeKey={STEP_TAB_MAP[props.currentSub]} />
                </div>
            </Row>
        </div>
    )
}

export default InfraDetails