import { Layout, theme, Typography, Flex, Select, InputNumber, Button } from 'antd';
import { CERTIFIATE_TYPES, MACHINE_TYPE, SERVICES_NAMES } from '../../../utils/helper';
const { Sider } = Layout;

const SERVICES = SERVICES_NAMES.map((item) => {
    return {
        label: item,
        value: item
    }
})

const CustomerSideBar = (props) => {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Sider width={200} style={{ background: colorBgContainer, overflow: 'auto', scrollbarWidth: 'none', padding: '13px' }}>
            <Flex vertical gap={35}>
                <div>
                    <Typography style={{ fontSize: '20px', fontWeight: '400' }}>Experience</Typography>
                    <InputNumber
                        min={1}
                        id="experience"
                        value={props.filterData?props.filterData["experience"]:''}
                        size='large'
                        variant="filled"
                        placeholder='Experience'
                        onChange={(e) => {props.handleChange("experience",e)}}
                        style={{ width: '93%' }}
                    />
                </div>

                <div>
                    <Typography style={{ fontSize: '20px', fontWeight: '400' }}>Certificate Type</Typography>
                    <Select style={{ width: '93%' }}
                        id="name"
                        placeholder="Select Certificate"
                        size='large' variant="filled"
                        // value={item.name}
                        allowClear
                        onChange={(e) => {props.handleChange("certificate_type",e)}}
                        options={CERTIFIATE_TYPES}
                    />
                </div>

                {/* <Divider /> */}

                <div>
                    <Typography style={{ fontSize: '20px', fontWeight: '400' }}>Machine Type</Typography>
                    <Select size='large'
                        variant="filled"
                        onChange={(e) => {props.handleChange("machine_types",e)}}
                        style={{ width: '93%' }}
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
                        variant="filled"
                        placeholder='Enter Plant Area'
                        onChange={(e) => {props.handleChange("plant_area",e)}}
                        style={{ width: '93%' }}
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
                    onClick={() => {props.handleFilter()}}
                >
                    Apply
                </Button>


            </Flex>
        </Sider>
    )
}

export default CustomerSideBar
