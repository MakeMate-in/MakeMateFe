import React from 'react'
import { Card, Col, Row, Modal, Form, Input, Flex } from 'antd';
import { useState, useEffect } from 'react';
import "react-country-state-city/dist/react-country-state-city.css";
import { deleteElement, getCompanyDetails, updateAddressandContacts, updateElement } from './../../../../../apis/Vendor/CompanyDetails';
import { MESSAGES, USER_ID } from './../../../../../utils/constants';
import del from './../../../../../assets/del.png'
import pen from './../../../../../assets/pen.png'
import { Icon } from '@mui/material';


const ContactDetails = (props) => {

    const [contactModalOpen, setContactModalOpen] = useState(false);
    const [form] = Form.useForm()
    const [contact, setContact] = useState({
        "name": "",
        "designation": "",
        "mobile_no": "",
        "email": ""
    });
    const empty={
        "name": "",
        "designation": "",
        "mobile_no": "",
        "email": ""
    }
    const [updateContact,setUpdateContact] = useState({})
    const [modalHeading,setModalHeading] = useState(MESSAGES.ADD)

    const handleChange = (event) => {
        setContact({ ...contact, [event.target.id]: event.target.value })
    }

    const handleDelete = async (item) => {
        try{
            let param ={
                user: USER_ID
            }
            let data = {}
            data.key = "contact_person"
            data.keyId = item._id
            const res = await deleteElement(param,data)
            if(res.success){
                const updatedData = await getCompanyDetails(param)
                if (updatedData.success) {
                    props.setcompanyDetails(updatedData.data)
                }
            }
            else{
                //Toast
            }
            
        }
        catch(err){
            console.log(err)
        }
    }

    const handleFormSubmit = async () => {
        try {
            let params = {
                user: USER_ID
            }
            let data = {}
            let res
            console.log(modalHeading)
            if(modalHeading==MESSAGES.ADD)
{
                data.contact_person = contact
            res = await updateAddressandContacts(params, data)

        }
        else{
            data.key="contact_person"
            data.keyId=updateContact._id
            data.keyData=contact
            res = await updateElement(params, data)
        }
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



    const handleEdit = (item,type) => {
        console.log(item)
        setModalHeading(type)
        setUpdateContact(item)
        setContact({
            ...contact, 
            ["name"]:item.name,
            ["designation"]:item.designation,
            ["email"]:item.email,
            ["mobile_no"]: item.mobile_no})
        setContactModalOpen(true)
    }
    console.log(contact)

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
                                            <div onClick={() => {handleDelete(item)}}>
                                                <img src={del} alt="My Icon" style={{ width: '30px', height: '30px' }} />
                                            </div>
                                            <div onClick = {() => {handleEdit(item,MESSAGES.EDIT)}}>
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

                <h3 style={{ margin: 0, cursor: 'pointer', color: 'rgba(22, 119, 255)' }} onClick={() => {handleEdit(empty,MESSAGES.ADD)}}>+ Add New Contact</h3>
                <Modal
                    title= {modalHeading==MESSAGES.ADD?"Add New Contact":"Edit Contact"}
                    centered
                    open={contactModalOpen}
                    okText="Save"
                    onOk={form.submit}
                    onCancel={() => setContactModalOpen(false)}
                    width={700}
                >
                    <div>
                        <Form
                            layout="vertical"
                            form={form}
                            onFinish={handleFormSubmit}
                        >
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Name"
                                        name="name"
                                        rules={[{ required: true, message: 'Name is required', warningOnly: modalHeading==MESSAGES.EDIT?true:false }]}>
                                        <Input
                                            className="custom-input"
                                            variant="filled"
                                            id="name"
                                            onChange={handleChange}
                                            value={contact["name"]}
                                            defaultValue={contact["name"]}
                                            // value={"Vaibhav"}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Email" name="email">
                                        <Input
                                            className="custom-input"
                                            variant="filled"
                                            id="email"
                                            onChange={handleChange}
                                            value={contact["email"]}
                                            defaultValue={contact["email"]}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Mobile No."
                                        name="mobile_no"
                                        rules={[{ required: true, message: 'Mobile Number is required',  warningOnly: modalHeading==MESSAGES.EDIT?true:false }]}
                                    >
                                        <Input
                                            className="custom-input"
                                            variant="filled"
                                            id="mobile_no"
                                            onChange={handleChange}
                                            value={contact["mobile_no"]}
                                            defaultValue={contact["mobile_no"]}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Designation"
                                        name="designation"
                                        rules={[{ required: true, message: 'Designation is required',  warningOnly: modalHeading==MESSAGES.EDIT?true:false }]}
                                    >
                                        <Input
                                            className="custom-input"
                                            variant="filled"
                                            id="designation"
                                            onChange={handleChange}
                                            value={contact["designation"]}
                                            defaultValue={contact["designation"]}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                            {/* <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Save and Submit
                                </Button>
                            </Form.Item> */}
                        </Form>
                    </div>
                </Modal>
            </Card>
        </div>
    )
}

export default ContactDetails
