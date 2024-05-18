import { Card, Col, Row, ConfigProvider, Modal, Form, Input } from 'antd';
import { useState } from 'react';

const AddressDetails = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [contactModalOpen, setContactModalOpen] = useState(false);

    return (

        <ConfigProvider
            theme={{
                components: {
                    Modal: {
                        titleFontSize: 20
                    },
                },
            }}
        >
            <div>
                <Row gutter={20}>
                    <Col span={12}>
                        <Card style={{ height: '25rem', overflow: 'hidden' }}>
                            <h3 style={{ margin: '0', color: 'rgba(22, 119, 255)' }}>Addresses</h3>
                            <hr style={{ background: 'rgba(22, 119, 255)', height: '2px' }} />
                            <div style={{ height: '18rem', overflow: 'auto', scrollbarWidth: 'thin' }}>
                                --- Address here ---
                            </div>

                            <h3 style={{ margin: 0, cursor: 'pointer', color: 'rgba(22, 119, 255)' }} onClick={() => setModalOpen(true)}>+ Add New Address</h3>
                            <Modal
                                title="Add New Address"
                                centered
                                open={modalOpen}
                                okText="Save"
                                onOk={() => setModalOpen(false)}
                                onCancel={() => setModalOpen(false)}
                                width={700}
                            >
                                <Form layout="vertical">
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Address Title"
                                                name="addressTitle"
                                            >
                                                <Input className="custom-input" variant="filled" />
                                            </Form.Item>
                                            <Form.Item
                                                label="Field 2"
                                                name="field2"
                                                rules={[{ required: true, message: 'Field 2 is required' }]}
                                            >
                                                <Input className="custom-input" variant="filled" />
                                            </Form.Item>
                                            <Form.Item
                                                label="Field 2"
                                                name="field2"
                                                rules={[{ required: true, message: 'Field 2 is required' }]}
                                            >
                                                <Input className="custom-input" variant="filled" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Address Line"
                                                name="addressLine"
                                                rules={[{ required: true, message: 'Field 4 is required' }]}
                                            >
                                                <Input className="custom-input" variant="filled" />
                                            </Form.Item>
                                            <Form.Item
                                                label="Field 5"
                                                name="field5"
                                                rules={[{ required: true, message: 'Field 5 is required' }]}
                                            >
                                                <Input className="custom-input" variant="filled" />
                                            </Form.Item>
                                            <Form.Item
                                                label="Field 2"
                                                name="field2"
                                                rules={[{ required: true, message: 'Field 2 is required' }]}
                                            >
                                                <Input className="custom-input" variant="filled" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </Modal>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card style={{ height: '25rem', overflow: 'hidden' }}>
                            <h3 style={{ margin: '0', color: 'rgba(22, 119, 255)' }}>Contacts</h3>
                            <hr style={{ background: 'rgba(22, 119, 255)', height: '2px' }} />
                            <div style={{ height: '18rem', overflow: 'auto', scrollbarWidth: 'thin' }}>
                                Contacts

                            </div>

                            <h3 style={{ margin: 0, cursor: 'pointer', color: 'rgba(22, 119, 255)' }} onClick={() => setContactModalOpen(true)}>+ Add New Contact</h3>
                            <Modal
                                title="Add New Address"
                                centered
                                open={contactModalOpen}
                                okText="Save"
                                onOk={() => setContactModalOpen(false)}
                                onCancel={() => setContactModalOpen(false)}
                                width={700}
                            >hi</Modal>
                        </Card>
                    </Col>
                </Row>
            </div>

        </ConfigProvider>
    )
}

export default AddressDetails