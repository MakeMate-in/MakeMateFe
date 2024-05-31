import React from 'react'
import { Row, Tabs } from 'antd'
import Certificates from '../CompanyOverview/Certificates/Certificates';
import { STEP_TAB_MAP } from '../../../../utils/constants';
import Machines from './Machines';
import Services from './Services';
import InfraStructureDetails from './InfraStructureDetails';


const InfraDetails = (props) => {

    const items = [
        {
            key: '1',
            label: 'Machines',
            children: <Machines/>,
        },
        {
            key: '2',
            label: 'Infra Details',
            children: <InfraStructureDetails />,
        },
        {
            key: '3',
            label: 'Services',
            children: <Services />,
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