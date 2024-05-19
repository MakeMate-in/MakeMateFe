import { Card, Col, Row, ConfigProvider, Modal, Form, Input, Button, Image, Flex } from 'antd';
import { useState, useEffect } from 'react';
import { CitySelect, CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { getCompanyDetails, updateAddressandContacts, deleteElement } from '../../../apis/Vendor/CompanyDetails';
import { USER_ID } from '../../../utils/constants';
import del from './../../../assets/del.png'
import pen from './../../../assets/pen.png'
import ContactDetails from './ContactDetails';

const AddressDetails = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [contactModalOpen, setContactModalOpen] = useState(false);

    const [countryid, setCountryid] = useState(0);
    const [stateid, setstateid] = useState(0);
    const [CompanyDetails, setcompanyDetails] = useState({})

    const [address, setAddress] = useState({
        "address_title": "",
        "address_line": "",
        "country": "",
        "state": "",
        "city": "",
        "pincode": ""
    });

    const handleChange = (event) => {
        setAddress({ ...address, [event.target.id]: event.target.value })
    }

    useEffect(() => {
        const getCompany = async () => {
            let param = {
                user: USER_ID
            }
            const resp = await getCompanyDetails(param)
            setcompanyDetails(resp.data)
        }

        getCompany()
    }, [])

    const handleDelete = async (item) => {
        try{
            let param ={
                user: USER_ID
            }
            let data = {}
            data.key = "address"
            data.keyId = item._id
            const res = await deleteElement(param,data)
            if(res.success){
                const updatedData = await getCompanyDetails(param)
                if (updatedData.success) {
                    setcompanyDetails(updatedData.data)
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
            data.address = address
            const res = await updateAddressandContacts(params, data)
            if (res.success) {
                const updatedData = await getCompanyDetails(params)
                if (updatedData.success) {
                    setcompanyDetails(updatedData.data)
                }
            }
            else {
                //Toast
            }
        }
        catch (err) {
            console.log(err)
        }
        setModalOpen(false)
    }

    console.log(CompanyDetails)

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
                                {
                                    CompanyDetails.address != undefined ? CompanyDetails.address.map((item) => {
                                        return (
                                            <div style={{ marginBottom: '20px' }}>
                                                <Flex justify='space-between' >
                                                    <p style={{ margin: '0px' }}>{item.address_title}</p>
                                                    <Flex gap="small">
                                                        <div onClick={() => {handleDelete(item)}}>
                                                        <img src={del} alt="My Icon" style={{ width: '30px', height: '30px' }} />
                                                        </div>
                                                        <div>
                                                        <img src={pen} alt="My Icon" style={{ width: '30px', height: '30px' }} />
                                                        </div>
                                                    </Flex>
                                                </Flex>
                                                {/* <Image src={del}/> <Image src={pen}/> */}
                                                <p style={{ margin: '0px' }}>{item.address_line}, {item.city}</p>
                                                <p style={{ margin: '0px' }}>{item.state}, {item.country}</p>
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
                                // okText="Save"
                                // onOk={() => setModalOpen(false)}
                                // onCancel={() => setModalOpen(false)}
                                // onOk={() => toggleModal(0, false)}
                                width={700}
                            >
                                <Form
                                    layout="vertical"
                                    onFinish={handleFormSubmit}
                                >
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Address Title"
                                                name="addressTitle"
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
                                                label="Country"
                                                name="country"
                                            // rules={[{ required: true, message: 'Field 2 is required' }]}
                                            >

                                                <CountrySelect
                                                    onChange={(e) => {
                                                        console.log(e)
                                                        setAddress({ ...address, ["country"]: e.name })
                                                        setCountryid(e.id);
                                                    }}
                                                    placeHolder="Select Country"

                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label="City"
                                                name="city"
                                            // rules={[{ required: true, message: 'City is required' }]}
                                            >
                                                <CitySelect
                                                    countryid={countryid}
                                                    stateid={stateid}
                                                    onChange={(e) => {
                                                        setAddress({ ...address, ["city"]: e.name })
                                                        console.log(e);
                                                    }}
                                                    placeHolder="Select City"
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
                                            // rules={[{ required: true, message: 'State is required' }]}
                                            >
                                                <StateSelect
                                                    countryid={countryid}
                                                    onChange={(e) => {
                                                        setAddress({ ...address, ["state"]: e.name })
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
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Save and Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </Card>
                    </Col>
                    <Col span={12}>

                        <ContactDetails CompanyDetails={CompanyDetails} setcompanyDetails={setcompanyDetails}/>
                    </Col>
                </Row>
            </div>

        </ConfigProvider>
    )
}

export default AddressDetails