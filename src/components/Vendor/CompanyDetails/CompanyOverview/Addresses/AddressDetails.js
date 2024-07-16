import React, { useState, useEffect, useMemo } from 'react';
import { Card, Col, Row, ConfigProvider, Modal, Form, Input, Flex, Button, Rate } from 'antd';
import { getCompanyDetails, updateAddressandContacts, deleteElement, updatePrimaryAddressContacts } from '../../../../../apis/Vendor/CompanyDetails';
import del from './../../../../../assets/del.png'
import ContactDetails from './ContactDetails';
import { notification } from 'antd';
import { getUserId, openNotificationWithIcon, reorderArray } from '../../../../../utils/helper';
import { useNavigate } from 'react-router-dom';
import { OPEN_ROUTES } from '../../../../../utils/constants';
const Context = React.createContext({
    name: 'Default',
});

const AddressDetails = (props) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [form] = Form.useForm()
    const navigate = useNavigate()

    const [address, setAddress] = useState({
        "address_title": "",
        "address_line": "",
        "country": "",
        "state": "",
        "city": "",
        "pincode": ""
    });

    const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement,msg) => {
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
            description:  `Address deleted Successfully`,
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
            description: `Unable to delete Address`,
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
        setAddress({ ...address, [event.target.id]: event.target.value })
    }

    const getCompany = async () => {
        const USER_ID = getUserId()
        let param = {
            user: USER_ID
        }
        try {
            const resp = await getCompanyDetails(param)
            props.setcompanyDetails(resp.data)
        }
        catch (err) {
            openFailedNotification('topRight', 'Unable to fetch Company Details')
        }
    
    }

    useEffect(() => {
        getCompany()
    }, [])

    const handleDelete = async (item) => {
        try {
            const USER_ID = getUserId()
            let param = {
                user: USER_ID
            }
            let data = {}
            data.key = "address"
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
            openFailedNotification('topRight', `Unable to delete Address `);
            console.log(err)
        }
    }


    const handleFormSubmit = async () => {
        try {
            const USER_ID = getUserId()
            let params = {
                user: USER_ID
            }
            let data = {}
            data.address = address
            const res = await updateAddressandContacts(params, data)
            if (res.success) {
                const updatedData = await getCompanyDetails(params)
                if (updatedData.success) {
                    props.setcompanyDetails(updatedData.data)
                    openNotification('topRight',`Address Added Successfully`);
                }
            }
            else {
                if (res.response.status == 401) {
                    res.response.data.errors.forEach(error => {
                      openNotificationWithIcon("error", error.msg);
                    });
                    navigate(OPEN_ROUTES.CUSTOMER_DASHBOARD)
                  }
                  else {
                    openFailedNotification('topRight', `Unable to add Address `);
                  }
                
            }
        }
        catch (err) {
            openFailedNotification('topRight', `Unable to add Address `);
            console.log(err)
        }
        setModalOpen(false)
    }



    const changeAddressPrimary = async (starValue, index, item) => {
        try{
            const USER_ID = getUserId()
            let params = {
                user: USER_ID
            }

            let addresses = [...props.CompanyDetails.address]
            const newAddresses = reorderArray(addresses,index,0);
            let data = {}
            data.address = newAddresses
            const res = await updatePrimaryAddressContacts(params,data)
            if (res.success) {
                const updatedData = await getCompanyDetails(params)
                if (updatedData.success) {
                    props.setcompanyDetails(updatedData.data)
                    openNotification('topRight','Primary Address has been Updates Successfully');
                }
            }
            else {
                openFailedNotification('topRight', `Unable to Update Address `);
            }
        }
        catch(err){
            openFailedNotification('topRight', `Unable to Update Address `)
        }
    }


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
                <Context.Provider value={contextValue}>
                    {contextHolder}
                    <Row gutter={20}>
                        <Col span={12}>
                            <Card style={{ height: '25rem', overflow: 'hidden' }}>
                                <h3 style={{ margin: '0', color: 'rgba(22, 119, 255)' }}>Addresses</h3>
                                <hr style={{ background: 'rgba(22, 119, 255)', height: '2px' }} />
                                <div style={{ height: '18rem', overflow: 'auto', scrollbarWidth: 'thin' }}>
                                    {
                                        props.CompanyDetails.address != undefined ? props.CompanyDetails.address.map((item, index) => {
                                            let starValue=0;
                                            if(index===0) {
                                                starValue=1;
                                            }
                                            return (
                                                <div style={{ marginBottom: '20px',background:index==0?'aliceblue':'' }}>
                                                    <Flex justify='space-between'>

                                                        <Flex vertical>
                                                            <p style={{ margin: '0px' }}><b>{item.address_title}</b></p>
                                                            <p style={{ margin: '0px' }}>{item.address_line}</p>
                                                            <p style={{ margin: '0px' }}> {item.city}, {item.state}</p>
                                                            <p style={{ margin: '0px' }}>{item.country}, {item.pincode}</p>
                                                        </Flex>
                                                        <Flex gap={20}>
                                                        <Button type="text" style={{padding:'0px'}} >
                                                            <Rate count={1} value={starValue} onChange={() => {changeAddressPrimary(starValue, index, item)}}/>
                                                        </Button>
                                                        <Button type="text" onClick={() => { handleDelete(item) }} style={{padding:'0px'}}>
                                                            <img src={del} alt="My Icon" style={{ width: '30px', height: '30px' }} />
                                                        </Button>
                                                        </Flex>
                                                       
                                                    </Flex>


                                                </div>
                                            )
                                        }) : ''
                                    }
                                </div>

                                <h3 style={{ margin: 0, cursor: 'pointer', color: 'rgba(22, 119, 255)' }} onClick={() => setModalOpen(true)}>+ Add New Address</h3>
                                <Modal
                                    title="Add New Address"
                                    centered
                                    open={modalOpen}
                                    okText="Save"
                                    onOk={form.submit}
                                    onCancel={() => setModalOpen(false)}
                                    width={700}
                                >
                                    <Form
                                        layout="vertical"
                                        form={form}
                                        onFinish={handleFormSubmit}
                                    >
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Address Title"
                                                    name="addressTitle"
                                                    rules={[{ required: true, message: 'Address Title is required' }]}
                                                >
                                                    <Input
                                                        className="custom-input"
                                                        variant="filled"
                                                        id="address_title"
                                                        onChange={handleChange}
                                                        value={address["address_title"]}
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    label="City"
                                                    name="city"
                                                    rules={[{ required: true, message: 'City is required' }]}
                                                >
                                                    <Input
                                                        className="custom-input"
                                                        variant="filled"
                                                        id="city"
                                                        onChange={handleChange}
                                                        value={address["city"]}
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Country"
                                                    name="country"
                                                    rules={[{ required: true, message: 'Country is required' }]}
                                                >
                                                    <Input
                                                        className="custom-input"
                                                        variant="filled"
                                                        id="country"
                                                        onChange={handleChange}
                                                        value={address["country"]}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item
                                                    label="Address Line"
                                                    name="address_line"
                                                    rules={[{ required: true, message: 'Address Line is required' }]}
                                                >
                                                    <Input
                                                        className="custom-input"
                                                        variant="filled"
                                                        id="address_line"
                                                        onChange={handleChange}
                                                        value={address["address_line"]}
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    label="State"
                                                    name="state"
                                                    rules={[{ required: true, message: 'State is required' }]}
                                                >
                                                    <Input
                                                        className="custom-input"
                                                        variant="filled"
                                                        id="state"
                                                        onChange={handleChange}
                                                        value={address["state"]}
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Pin Code"
                                                    name="pincode"
                                                    rules={[{ required: true, message: 'Pin Code is required' }]}
                                                >
                                                    <Input
                                                        className="custom-input"
                                                        variant="filled"
                                                        id="pincode"
                                                        onChange={handleChange}
                                                        value={address["pincode"]}
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
                                </Modal>
                            </Card>
                        </Col>
                        <Col span={12}>

                            <ContactDetails {...props} />
                        </Col>
                    </Row>
                </Context.Provider>
            </div>

        </ConfigProvider>
    )
}

export default AddressDetails