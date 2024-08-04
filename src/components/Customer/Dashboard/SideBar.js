import { Layout, theme, Typography, Flex, Select, InputNumber, Button, Drawer } from 'antd';
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


                <Flex gap={125} align='center'>
                    <div>
                        <Typography style={{ fontSize: '20px', fontWeight: '400' }}>Experience</Typography>
                        <InputNumber
                            min={1}
                            id="experience"
                            value={props.filterData ? props.filterData["experience"] : ''}
                            size='large'
                            // variant="filled"
                            placeholder='Experience'
                            onChange={(e) => { props.handleChange("experience", e) }}
                            style={{ width: '93%' }}
                        />
                    </div>

                    <div>
                        <Typography style={{ fontSize: '20px', fontWeight: '400' }}>Certificate Type</Typography>
                        <Select 
                        // style={{ width: '93%' }}
                            id="name"
                            placeholder="Select Certificate"
                            size='large' 
                            // variant="filled"
                            // value={item.name}
                            allowClear
                            onChange={(e) => { props.handleChange("certificate_type", e) }}
                            options={CERTIFIATE_TYPES}
                        />
                    </div>

                    {/* <Divider /> */}

                    <div>
                        <Typography style={{ fontSize: '20px', fontWeight: '400' }}>Machine Type</Typography>
                        <Select size='large'
                            // variant="filled"
                            onChange={(e) => { props.handleChange("machine_types", e) }}
                            style={{ width: '100%' }}
                            mode="multiple"
                            allowClear
                            placeholder='Select Machine Type'
                            options={MACHINE_TYPE}
                        />
                    </div>

                    <div>
                        <Typography style={{ fontSize: '20px', fontWeight: '400' }}>Plant Area</Typography>
                        <InputNumber
                            min={1}
                            id="plant_area"
                            size='large'
                            // variant="filled"
                            placeholder='Enter Plant Area'
                            onChange={(e) => { props.handleChange("plant_area", e) }}
                            style={{ width: '100%' }}
                        />
                    </div>

                    <Button type='primary'
                        className='flex items-center rounded-full'
                        style={{
                            fontSize: '18px',
                            fontWeight: '500',
                            height: '40px',
                            background: '#FFD814',
                            color: 'black'
                        }}
                        onClick={() => { props.handleFilter() }}
                    >
                        Apply
                    </Button>


                </Flex>
            {/* </Sider> */}
        </Drawer>

    )
}

export default CustomerSideBar
