import React from 'react'
import { Layout, theme, Typography, Flex, Slider, Divider, Select, InputNumber } from 'antd';
import "./../../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import { CERTIFIATE_TYPES, MACHINE_TYPE, SERVICES_NAMES } from '../../../utils/helper';

const { Header, Content, Sider } = Layout;

const SERVICES = SERVICES_NAMES.map((item) => {
    return {
        label: item,
        value: item
    }
})

const CustomerSideBar = () => {

    const handleChange = () => {

    }

    const marks = {
        0: '0',
        100: '100'
    };

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Sider width={300} style={{ background: colorBgContainer, overflow: 'auto', scrollbarWidth: 'none', padding: '13px' }}>
            <Flex vertical>
                <div>
                    <Typography style={{ fontSize: '20px', fontWeight: '400' }}>Experience</Typography>
                    <Slider marks={marks} defaultValue={37} />
                </div>

                <Divider />

                <div>
                    <Typography style={{ fontSize: '20px', fontWeight: '400' }}>Certificate Type</Typography>
                    <Select style={{ width: '93%' }}
                        id="name"
                        placeholder="Select Certificate"
                        size='large' variant="filled"
                        // value={item.name}
                        allowClear
                        onChange={handleChange}
                        options={CERTIFIATE_TYPES}
                    />
                </div>

                <Divider />

                <div>
                    <Typography style={{ fontSize: '20px', fontWeight: '400' }}>Machine Type</Typography>
                    <Select size='large'
                        variant="filled"
                        onChange={handleChange}
                        style={{ width: '93%' }}
                        mode="multiple"
                        allowClear
                        placeholder='Select Machine Type'
                        options={MACHINE_TYPE}
                    />
                </div>

                <Divider />

                <div>
                    <Typography style={{ fontSize: '20px', fontWeight: '400' }}>Plant Area</Typography>
                    <InputNumber
                        min={1}
                        id="plantArea"
                        size='large'
                        variant="filled"
                        placeholder='Enter Plant Area'
                        onChange={handleChange()}
                        style={{ width: '93%' }}
                    />
                </div>

                <Divider />

                <div>
                    <Typography style={{ fontSize: '20px', fontWeight: '400' }}>Services</Typography>

                    <Flex vertical gap={20}>
                    <div>
                        <Typography style={{ fontSize: '15px', fontWeight: '400' }}>Outsourced</Typography>
                        <Select style={{ width: '93%' }}
                            id="name"
                            placeholder="Select Outsourced Services"
                            size='large' variant="filled"
                            mode="multiple"
                            // value={item.name}
                            allowClear
                            onChange={handleChange}
                            options={SERVICES}
                        />
                    </div>

                    <div>
                        <Typography style={{ fontSize: '15px', fontWeight: '400' }}>Inhouse</Typography>
                        <Select style={{ width: '93%' }}
                            id="name"
                            mode="multiple"
                            placeholder="Select Inhouse Services"
                            size='large' variant="filled"
                            // value={item.name}
                            allowClear
                            onChange={handleChange}
                            options={SERVICES}
                        />
                    </div>
                    </Flex>

                </div>

            </Flex>
        </Sider>
    )
}

export default CustomerSideBar
