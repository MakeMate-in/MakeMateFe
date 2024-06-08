import React from 'react'
import { Row, Tabs } from 'antd'
import { STEP_TAB_MAP } from '../../../../utils/constants';
import Machines from './Machines';
import Services from './Services';
import InfraStructureDetails from './InfraStructureDetails';
import PlantImages from './PlantImages';


const InfraDetails = (props) => {

    const items = [
        {
            key: '1',
            label: 'Infrastructure Details',
            children: <InfraStructureDetails {...props} />,
        },
        {
            key: '2',
            label: 'Machines',
            children: <Machines {...props} />,
        },
        {
            key: '3',
            label: 'Services',
            children: <Services {...props} />,
        },
        {
            key: '4',
            label: 'Plant Images',
            children: <PlantImages  {...props} />,
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