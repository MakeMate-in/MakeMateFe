import React, { useState } from 'react'
import { Space, Table, Input, Button, Modal, Form, Row, Col, InputNumber, ConfigProvider } from 'antd';

const Machines = () => {

    const [modalOpen, setModalOpen] = useState(false);

    const columns = [
        {
            title: 'Machine Type',
            dataIndex: 'type',
            key: 'type',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Make',
            dataIndex: 'make',
            key: 'make',
        },
        {
            title: 'Bed Size(in mm)',
            dataIndex: 'bedSize',
            key: 'bedSize',
        },
        {
            title: 'Spindle RPM (max)',
            dataIndex: 'rpm',
            key: 'rpm',
        },
        {
            title: 'No. of Axis',
            dataIndex: 'axis',
            key: 'axis',
        },
        {
            title: 'Manufacturing Year',
            dataIndex: 'year',
            key: 'year',
        },
        {
            title: 'Image',
            key: 'image',
            render: (_, record) => (
                <Space size="large">
                    <a>View</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];
    const data = [
        {
            key: '1',
            type: 'John Brown',
            make: 32,
            bedSize: '800 X 300',
            rpm: 1500,
            axis: 3,
            year: 2019
        },
        {
            key: '1',
            type: 'John Brown',
            make: 32,
            bedSize: '800 X 300',
            rpm: 1500,
            axis: 3,
            year: 2019
        },
        {
            key: '1',
            type: 'John Brown',
            make: 32,
            bedSize: '800 X 300',
            rpm: 1500,
            axis: 3,
            year: 2019
        },
        {
            key: '1',
            type: 'John Brown',
            make: 32,
            bedSize: '800 X 300',
            rpm: 1500,
            axis: 3,
            year: 2019
        },
        {
            key: '1',
            type: 'John Brown',
            make: 32,
            bedSize: '800 X 300',
            rpm: 1500,
            axis: 3,
            year: 2019
        },
        {
            key: '1',
            type: 'John Brown',
            make: 32,
            bedSize: '800 X 300',
            rpm: 1500,
            axis: 3,
            year: 2019
        },
        {
            key: '1',
            type: 'John Brown',
            make: 32,
            bedSize: '800 X 300',
            rpm: 1500,
            axis: 3,
            year: 2019
        },
        {
            key: '1',
            type: 'John Brown',
            make: 32,
            bedSize: '800 X 300',
            rpm: 1500,
            axis: 3,
            year: 2019
        },
        {
            key: '1',
            type: 'John Brown',
            make: 32,
            bedSize: '800 X 300',
            rpm: 1500,
            axis: 3,
            year: 2019
        },
        {
            key: '1',
            type: 'John Brown',
            make: 32,
            bedSize: '800 X 300',
            rpm: 1500,
            axis: 3,
            year: 2019
        },
        {
            key: '1',
            type: 'John Brown',
            make: 32,
            bedSize: '800 X 300',
            rpm: 1500,
            axis: 3,
            year: 2019
        },
    ];


    return (

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '60vh' }}>
            <ConfigProvider
                theme={{
                    components: {
                        InputNumber: {
                            controlWidth: 200
                        },
                    },
                }}
            >
                <div >
                    <Table columns={columns} dataSource={data} scroll={{ y: 265 }} />
                </div>
                <div style={{ marginTop: 'auto' }}>
                    <Button type="primary" onClick={() => setModalOpen(true)}>
                        + Add Machine
                    </Button>
                    <Modal
                        title="Add Machine"
                        centered
                        open={modalOpen}
                        onOk={() => setModalOpen(false)}
                        onCancel={() => setModalOpen(false)}
                    >
                        <Form layout="vertical">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Machine Type"
                                        name="type"
                                        rules={[{ required: true, message: 'Machine Type is required' }]}>
                                        <Input
                                            className="custom-input"
                                            variant="filled"
                                            id="type"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Make"
                                        name="make"
                                        rules={[{ required: true, message: 'Make is required' }]}>
                                        <Input
                                            className="custom-input"
                                            variant="filled"
                                            id="make"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="No. of Axis"
                                        name="axis"
                                        rules={[{ required: true, message: 'No. of Axis is required' }]}>
                                        <InputNumber min={1} id="axis" size='large' variant="filled"/>
                                    </Form.Item>
                                    <Form.Item
                                        label="Machine Type"
                                        name="type"
                                        rules={[{ required: true, message: 'Machine Type is required' }]}>
                                        <Input
                                            className="custom-input"
                                            variant="filled"
                                            id="type"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Modal>
                </div>
            </ConfigProvider>
        </div>
    )
}

export default Machines