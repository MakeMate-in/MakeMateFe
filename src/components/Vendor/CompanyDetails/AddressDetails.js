import { Card, Col, Row, ConfigProvider, Modal, Form, Input } from 'antd';
import { useState } from 'react';
import { CitySelect, CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const AddressDetails = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [contactModalOpen, setContactModalOpen] = useState(false);

    const [countryid, setCountryid] = useState(0);
    const [stateid, setstateid] = useState(0);

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
                                                label="Country"
                                                name="country"
                                                rules={[{ required: true, message: 'Field 2 is required' }]}
                                            >

                                                <CountrySelect
                                                    onChange={(e) => {
                                                        setCountryid(e.id);
                                                    }}
                                                    placeHolder="Select Country"
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label="City"
                                                name="city"
                                                rules={[{ required: true, message: 'City is required' }]}
                                            >
                                                <CitySelect
                                                    countryid={countryid}
                                                    stateid={stateid}
                                                    onChange={(e) => {
                                                        console.log(e);
                                                    }}
                                                    placeHolder="Select City"
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Address Line"
                                                name="addressLine"
                                                rules={[{ required: true, message: 'Address Line is required' }]}
                                            >
                                                <Input className="custom-input" variant="filled" />
                                            </Form.Item>
                                            <Form.Item
                                                label="State"
                                                name="state"
                                                rules={[{ required: true, message: 'State is required' }]}
                                            >
                                                <StateSelect
                                                    countryid={countryid}
                                                    onChange={(e) => {
                                                        setstateid(e.id);
                                                    }}
                                                    placeHolder="Select State"
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label="Pin Code"
                                                name="pincode"
                                                rules={[{ required: true, message: 'Pin Code is required' }]}
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
                                title="Add New Contact"
                                centered
                                open={contactModalOpen}
                                okText="Save"
                                onOk={() => setContactModalOpen(false)}
                                onCancel={() => setContactModalOpen(false)}
                                width={700}
                            >
                                <div>
                                                        hi
                                </div>
                            </Modal>
                        </Card>
                    </Col>
                </Row>
            </div>

        </ConfigProvider>
    )
}

export default AddressDetails