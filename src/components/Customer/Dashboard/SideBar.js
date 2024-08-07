import { Layout, theme, Typography, Flex, Select, InputNumber, Button, Drawer, Row, Col } from 'antd';
import { CERTIFIATE_TYPES, MACHINE_TYPE, SERVICES_NAMES } from '../../../utils/helper';
const { Sider } = Layout;

const SERVICES = SERVICES_NAMES.map((item) => {
    return {
        label: item,
        value: item
    }
})

const CustomerSideBar = (props) => {
    const PLACEMENT = 'top'
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Drawer
            title="Filters"
            placement={PLACEMENT}
            // width={250}
            onClose={props.onClose}
            open={props.open}
            getContainer={false}
            height={200}
        >
            {/* <Sider  style={{ background: colorBgContainer, overflow: 'auto', scrollbarWidth: 'none', padding: '13px' }}> */}


            <Row>
                <Col span={5}>
                    <Typography style={{ fontSize: '20px', fontWeight: '400' }}>Experience</Typography>
                    <InputNumber
                        min={1}
                        id="experience"
                        value={props.filterData ? props.filterData["experience"] : ''}
                        size='large'
                        // variant="filled"
                        placeholder='Experience'
                        onChange={(e) => { props.handleChange("experience", e) }}
                        style={{ width: '60%' }}
                    />
                </Col>

                <Col span={5}>
                    <Typography style={{ fontSize: '20px', fontWeight: '400' }}>Certificate Type</Typography>
                    <Select
                        style={{ width: '60%' }}
                        id="name"
                        placeholder="Select Certificate"
                        size='large'
                        // variant="filled"
                        // value={item.name}
                        value={props.filterData ? props.filterData["certificate_type"] : undefined}
                        allowClear
                        onChange={(e) => { props.handleChange("certificate_type", e) }}
                        options={CERTIFIATE_TYPES}
                    />
                </Col>

                {/* <Divider /> */}

                <Col span={5}>
                    <Typography style={{ fontSize: '20px', fontWeight: '400' }}>Machine Type</Typography>
                    <Select size='large'
                        // variant="filled"
                        onChange={(e) => { props.handleChange("machine_types", e) }}
                        style={{ width: '60%' }}
                        mode="multiple"
                        value={props.filtersData["machine_types"]}
                        allowClear
                        placeholder='Select Machine Type'
                        options={MACHINE_TYPE}
                    />
                </Col>

                <Col span={5}>
                    <Typography style={{ fontSize: '20px', fontWeight: '400' }}>Plant Area</Typography>
                    <InputNumber
                        min={1}
                        id="plant_area"
                        size='large'
                        // variant="filled"
                        value={props.filterData ? props.filterData["plant_area"] : ''}
                        placeholder='Enter Plant Area'
                        onChange={(e) => { props.handleChange("plant_area", e) }}
                        style={{ width: '60%' }}
                    />
                </Col>
                <Col span={2}>
                    <Button type='primary'
                        className='flex items-center rounded-xl'
                        style={{
                            fontSize: '18px',
                            fontWeight: '500',
                            height: '40px',
                            background: '#FFD814',
                            color: 'black',
                            marginTop: '30px'
                        }}
                        onClick={() => { props.handleFilter() }}
                    >
                        Apply
                    </Button>
                </Col>
                <Col span={2}>
                    <Button type='primary'
                        className='flex items-center rounded-xl'
                        style={{
                            fontSize: '18px',
                            fontWeight: '500',
                            height: '40px',
                            background: '#F0F0F0',
                            color: 'black',
                            marginTop: '30px'
                        }}
                        onClick={() => { 
                            props.handleChange("experience", 0)
                            props.handleChange("plant_area", 0)
                            props.handleChange("machine_types", [])
                            props.handleChange("certificate_type", undefined)
                            props.handleFilter() 
                        }}
                    >
                        Reset
                    </Button>
                </Col>

            </Row>
            {/* </Sider> */}
        </Drawer>

    )
}

export default CustomerSideBar
