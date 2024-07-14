import React, { useState, useEffect, useMemo } from 'react';
import { Card, Col, Row, Modal, Form, Input, Flex, Button, Rate } from 'antd';
import "react-country-state-city/dist/react-country-state-city.css";
import { deleteElement, getCompanyDetails, updateAddressandContacts, updateElement, updatePrimaryAddressContacts } from './../../../../../apis/Vendor/CompanyDetails';
import { MESSAGES } from './../../../../../utils/constants';
import del from './../../../../../assets/del.png'
import { notification } from 'antd';
import { getUserId, reorderArray } from '../../../../../utils/helper';
const Context = React.createContext({
    name: 'Default',
});


const ContactDetails = (props) => {

    const [contactModalOpen, setContactModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [contact, setContact] = useState({
        "name": "",
        "designation": "",
        "mobile_no": "",
        "email": ""
    });


    let initialValues2 = {
        "name": "",
        "designation": "",
        "mobile_no": "",
        "email": ""
    };
    const [updateContact, setUpdateContact] = useState({})
    const [modalHeading, setModalHeading] = useState(MESSAGES.ADD)

    const [loading, setIsLoading] = useState(false)
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement, msg) => {
        api.success({
            message: `Success`,
            description: msg,
            placement,
        });
    };
    let contextValue = useMemo(
        () => ({
            name: 'Make Mate',
        }),
        [],
    );

    const openFailedNotification = (placement, msg) => {
        api.error({
            message: `Something went wrong`,
            description: msg,
            placement,
        });
    };
    contextValue = useMemo(
        () => ({
            name: 'Make Mate',
        }),
        [],
    );

    const deleteNotification = (placement) => {
        api.success({
            message: `Success`,
            description: `Contact Details deleted Successfully`,
            placement,
        });
    };
    contextValue = useMemo(
        () => ({
            name: 'Make Mate',
        }),
        [],
    );

    const deleteFailedNotification = (placement) => {
        api.error({
            message: `Success`,
            description: `Unable to delete Contact Details`,
            placement,
        });
    };
    contextValue = useMemo(
        () => ({
            name: 'Make Mate',
        }),
        [],
    );

    const handleChange = (event) => {
        setContact({ ...contact, [event.target.id]: event.target.value })
    }

    const handleDelete = async (item) => {
        try {
            const USER_ID = getUserId()
            let param = {
                user: USER_ID
            }
            let data = {}
            data.key = "contact_person"
            data.keyId = item._id
            const res = await deleteElement(param, data)
            if (res.success) {
                const updatedData = await getCompanyDetails(param)
                if (updatedData.success) {
                    props.setcompanyDetails(updatedData.data)
                    deleteNotification('topRight');
                }
            }
            else {
                deleteFailedNotification('topRight');
            }

        }
        catch (err) {
            deleteFailedNotification('topRight');
            console.log(err)
        }
    }

    useEffect(() => {
        if (contactModalOpen) {
            setIsLoading(true)
        }
        else {
            setIsLoading(false)
        }

    }, [contactModalOpen])

    const handleFormSubmit = async () => {
        try {
            const USER_ID = getUserId()
            let params = {
                user: USER_ID
            }
            let data = {}
            let res
            if (modalHeading == MESSAGES.ADD) {
                data.contact_person = contact
                res = await updateAddressandContacts(params, data)

            }
            else {
                data.key = "contact_person"
                data.keyId = updateContact._id
                data.keyData = contact
                res = await updateElement(params, data)
            }
            if (res.success) {
                const updatedData = await getCompanyDetails(params)
                if (updatedData.success) {
                    props.setcompanyDetails(updatedData.data)
                    openNotification('topRight', `Contact Details Added Successfully`);
                }
            }
            else {
                openFailedNotification('topRight', `Unable to add Contact Details `);
            }
        }
        catch (err) {
            openFailedNotification('topRight', `Unable to add Contact Details `)
            console.log(err)
        }
        setContactModalOpen(false)
    }


    const handleEdit = (item, type) => {
        if (type === MESSAGES.ADD) {
            setContact({
                "name": "",
                "designation": "",
                "mobile_no": "",
                "email": ""
            });
            setModalHeading(type);
            setContactModalOpen(true);
        } else {
            setContact({
                ...contact,
                ["name"]: item.name,
                ["designation"]: item.designation,
                ["email"]: item.email,
                ["mobile_no"]: item.mobile_no
            });
            setUpdateContact(item);
            setModalHeading(type);
            setContactModalOpen(true);
        }
    }

    const handleInitialValues = () => {
        let data = {
            "name": updateContact && updateContact["name"] && modalHeading == MESSAGES.EDIT ? updateContact["name"] : "",
            "designation": "",
            "mobile_no": "",
            "email": ""
        }
        return data
    }

    const changeAddressPrimary = async (starValue, index, item) => {
        try {
            const USER_ID = getUserId()
            let params = {
                user: USER_ID
            }

            let contacts = [...props.CompanyDetails.contact_person]
            const newContacts = reorderArray(contacts, index, 0);
            let data = {}
            data.contact_person = newContacts
            const res = await updatePrimaryAddressContacts(params, data)
            if (res.success) {
                const updatedData = await getCompanyDetails(params)
                if (updatedData.success) {
                    props.setcompanyDetails(updatedData.data)
                    openNotification('topRight', 'Primary Address has been Updates Successfully');
                }
            }
            else {
                openFailedNotification('topRight', `Unable to Update Address `);
            }
        }
        catch (err) {
            openFailedNotification('topRight', `Unable to Update Address `)
        }
    }



    return (
        <div>
            <Context.Provider value={contextValue}>
                {contextHolder}
                <Card style={{ height: '25rem', overflow: 'hidden' }}>
                    <h3 style={{ margin: '0', color: 'rgba(22, 119, 255)' }}>Contacts</h3>
                    <hr style={{ background: 'rgba(22, 119, 255)', height: '2px' }} />
                    <div style={{ height: '18rem', overflow: 'auto', scrollbarWidth: 'thin' }}>
                        {
                            props.CompanyDetails.contact_person != undefined ? props.CompanyDetails.contact_person.map((item, index) => {
                                let starValue = 0;
                                if (index === 0) {
                                    starValue = 1;
                                }

                                return (
                                    <div style={{ marginBottom: '20px',background:index==0?'aliceblue':'' }}>
                                        <Flex justify='space-between' >

                                            <Flex vertical>
                                                <p style={{ margin: '0px' }}><b>{item.name}</b></p>
                                                <p style={{ margin: '0px' }}>Designation: {item.designation} </p>
                                                <p style={{ margin: '0px' }}>Email: {item.email}</p>
                                                <p style={{ margin: '0px' }}>Phone: {item.mobile_no}</p>
                                            </Flex>

                                            <Flex gap={20}>
                                                <Button type="text" style={{ padding: '0px' }} >
                                                    <Rate count={1} value={starValue} onChange={() => { changeAddressPrimary(starValue, index, item) }} />
                                                </Button>

                                                <Button type="text" onClick={() => { handleDelete(item) }}>
                                                    <img src={del} alt="My Icon" style={{ width: '30px', height: '30px' }} />
                                                </Button>
                                            </Flex>
                                        </Flex>


                                    </div>
                                )
                            }) : ''
                        }
                    </div>

                    <h3 style={{ margin: 0, cursor: 'pointer', color: 'rgba(22, 119, 255)' }} onClick={() => { handleEdit(initialValues2, MESSAGES.ADD) }}>+ Add New Contact</h3>
                    <Modal
                        title={modalHeading == MESSAGES.ADD ? "Add New Contact" : "Edit Contact"}
                        centered
                        open={contactModalOpen}
                        okText="Save"
                        onOk={form.submit}
                        onCancel={() => {
                            setContactModalOpen(false)
                            setUpdateContact(undefined);
                        }}
                        width={700}
                    >
                        <div>

                            {loading == true ?
                                <Form
                                    layout="vertical"
                                    form={form}
                                    initialValues={handleInitialValues}
                                    onFinish={handleFormSubmit}
                                >
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Name"
                                                name="name"
                                                rules={[{ required: true, message: 'Name is required', warningOnly: modalHeading == MESSAGES.EDIT ? true : false }]}>
                                                <Input
                                                    className="custom-input"
                                                    variant="filled"
                                                    id="name"
                                                    onChange={handleChange}
                                                    value={contact["name"]}

                                                // value={"Vaibhav"}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label="Email"
                                                name="email"
                                                rules={[{ required: true, message: 'Email is required' }]}
                                            >
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
                                                rules={[{ required: true, message: 'Mobile Number is required', warningOnly: modalHeading == MESSAGES.EDIT ? true : false }]}
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
                                                rules={[{ required: true, message: 'Designation is required', warningOnly: modalHeading == MESSAGES.EDIT ? true : false }]}
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

                                </Form> : ''}
                        </div>
                    </Modal>
                </Card>
            </Context.Provider>
        </div>
    )
}

export default ContactDetails
