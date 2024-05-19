import React from 'react'
import { Card, Col, Row, ConfigProvider, Modal, Form, Input, Button, Image, Flex } from 'antd';
import { useState, useEffect } from 'react';
import { CitySelect, CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { getCompanyDetails, updateAddressandContacts } from '../../../apis/Vendor/CompanyDetails';
import { USER_ID } from '../../../utils/constants';
import del from './../../../assets/del.png'
import pen from './../../../assets/pen.png'
import { Icon } from '@mui/material';


const ContactDetails = (props) => {

    const [contactModalOpen, setContactModalOpen] = useState(false);
    const [contact, setContact] = useState({
        "name": "",
        "designation": "",
        "mobile_no": "",
        "email": ""
    });

    const handleChange = (event) => {
        setContact({ ...contact, [event.target.id]: event.target.value })
    }

    const handleDelete = async () => {

    }

    const handleFormSubmit = async () => {
        console.log(contact)
        try {
            let params = {
                user: USER_ID
            }
            let data = {}
            data.contact_person = contact
            const res = await updateAddressandContacts(params, data)
            if (res.success) {
                const updatedData = await getCompanyDetails(params)
                if (updatedData.success) {
                    props.setcompanyDetails(updatedData.data)
                }
            }
            else {
                //Toast
            }
        }
        catch (err) {
            console.log(err)
        }
        setContactModalOpen(false)
    }


    return (
        <div>
            <Card style={{ height: '25rem', overflow: 'hidden' }}>
                <h3 style={{ margin: '0', color: 'rgba(22, 119, 255)' }}>Contacts</h3>
                <hr style={{ background: 'rgba(22, 119, 255)', height: '2px' }} />
                <div style={{ height: '18rem', overflow: 'auto', scrollbarWidth: 'thin' }}>
                    {
                        props.CompanyDetails.contact_person != undefined ? props.CompanyDetails.contact_person.map((item) => {
                            return (
                                <div style={{ marginBottom: '20px' }}>
                                    <Flex justify='space-between' >
                                        <p style={{ margin: '0px' }}>{item.name}, {item.designation}</p>
                                        <Flex gap="small">
                                            <div onClick={handleDelete}>
                                                <img src={del} alt="My Icon" style={{ width: '30px', height: '30px' }} />
                                            </div>
                                            <div>
                                                <img src={pen} alt="My Icon" style={{ width: '30px', height: '30px' }} />
                                            </div>
                                        </Flex>
                                    </Flex>
                                    {/* <Image src={del}/> <Image src={pen}/> */}
                                    <p style={{ margin: '0px' }}>{item.email}</p>
                                    <p style={{ margin: '0px' }}>{item.mobile_no}</p>
                                </div>
                            )
                        }) : ''
                    }
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
                        <Form
                            layout="vertical"
                            onFinish={handleFormSubmit}
                        >
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Name"
                                        name="name"
                                        rules={[{ required: true, message: 'Name is required' }]}>
                                        <Input
                                            className="custom-input"
                                            variant="filled"
                                            id="name"
                                            onChange={handleChange}
                                            value={contact["name"]}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Email" name="email">
                                        <Input
                                            className="custom-input"
                                            variant="filled"
                                            id="email"
                                            onChange={handleChange}
                                            value={contact["email"]}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Mobile No."
                                        name="mobile_no"
                                        rules={[{ required: true, message: 'Mobile Number is required' }]}
                                    >
                                        <Input
                                            className="custom-input"
                                            variant="filled"
                                            id="mobile_no"
                                            onChange={handleChange}
                                            value={contact["mobile_no"]}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Designation"
                                        name="designation"
                                        rules={[{ required: true, message: 'Designation is required' }]}
                                    >
                                        <Input
                                            className="custom-input"
                                            variant="filled"
                                            id="designation"
                                            onChange={handleChange}
                                            value={contact["designation"]}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Save and Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
            </Card>
        </div>
    )
}

export default ContactDetails
