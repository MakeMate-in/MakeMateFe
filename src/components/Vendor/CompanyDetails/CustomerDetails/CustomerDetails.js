import React, { useState, useEffect } from 'react'
import { Table, Input, Button, Modal, Form, Row, Col, InputNumber, ConfigProvider, DatePicker, Select, Upload, Space, Popover } from 'antd';
import { COMPANY_ID } from '../../../../utils/constants';
import { addProductDetails, getProductDetails, deleteProductDetails} from '../../../../apis/Vendor/ProductDetails';
import { DeleteTwoTone } from '@ant-design/icons';


const CustomerDetails = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [form] = Form.useForm();
    const { Option } = Select;
    const [CustomerDetails, setCustomerDetails] = useState()
    const [Customer, setCustomer] = useState({
        "customer_name": "",
        "product_name": "",
        "part_material": "",
        "tool_material": "",
        "no_of_cavity": "",
        "runner": "",
        "tool_tonnage": "",
        "manufacturing_year": ""
    })

    let [CustomerData, setCustomerData] = useState([]);

    const fetchCustomerDetails = async () => {
        let params = { company_id: COMPANY_ID }
        const customers = await getProductDetails(params)
        console.log("Customers", customers.data);
        if (customers.success) {
            if (customers) {
                let data = [];
                if (customers.count > 0) {
                    if(customers.data)
                        {
                        data = customers.data.map((customer, i) => {
                            let customerObj = {
                                key: i + 1,
                                id: customer._id,
                                customer_name: customer.customer_name,
                                product_name: customer.product_name,
                                part_material: customer.part_material,
                                tool_material: customer.tool_material,
                                no_of_cavity: customer.no_of_cavity,
                                runner: customer.runner,
                                tool_tonnage: customer.tool_tonnage,
                                manufacturing_year: customer.manufacturing_year
                        }
                        return customerObj
                    })
                }
                else{
                    console.log("Errorrrr in fetch")
                }
                }
                setCustomerData([...data]);
            }

        }
    };

    const handleDeleteInput = async (record) => {
        try {
            let params = {
                product_id: record.id
            }
            console.log(record.id);
            const res = await deleteProductDetails(params)
            if (res.success) {
                fetchCustomerDetails()
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const Customer_COLUMNS = [
        {
            title: 'Customer Name',
            dataIndex: 'customer_name',
            key: 'customer_name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Product Name',
            dataIndex: 'product_name',
            key: 'product_name',
        },
        {
            title: 'Part Material',
            dataIndex: 'part_material',
            key: 'part_material',
        },
        {
            title: 'Tool Material',
            dataIndex: 'tool_material',
            key: 'tool_material',
        },
        {
            title: 'No of Cavity',
            dataIndex: 'no_of_cavity',
            key: 'no_of_cavity',
        },
        {
            title: 'Runner',
            dataIndex: 'runner',
            key: 'runner',
        },
        {
            title: 'Tool Tonnage',
            dataIndex: 'tool_tonnage',
            key: 'tool_tonnage',
        },
        {
            title: 'Manufacture Year',
            dataIndex: 'manufacturing_year',
            key: 'manufacturing_year',
        },
        {
            title: 'Tool Image',
            key: 'tool_image',
            render: (_, record) => (
                <Space size="large">
                    <a>View</a>
                </Space>
            ),
        },
        {
            title: 'Product Image',
            key: 'product_image',
            render: (_, record) => (
                <Space size="large">
                    <a>View</a>
                    <Popover content='Delete'>
                        <DeleteTwoTone onClick={() => handleDeleteInput(record)} twoToneColor="#F5222D" style={{ fontSize: '20px' }} />
                    </Popover>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        fetchCustomerDetails()
    }, [])

    const handleInputNumber = (id, value) => {
        setCustomer({ ...Customer, [id]: value })
    }

    const onChangeYear = (dateString) => {
        setCustomer({ ...Customer, ["manufacturing_year"]: dateString.$y })
    };

    const handleChange = (e) => {
        setCustomer({ ...Customer, [e.target.id]: e.target.value })
    }

    const handleChangeType = (id, value) => {
        setCustomer({ ...Customer, [id]: value })
    };

    const handleFormSubmit = async () => {
        try {
            let params = {
                company_id: COMPANY_ID
            }
            const res = await addProductDetails(params,Customer)
            if (res.success) {
                fetchCustomerDetails()
                setCustomer({})
            }
            else {
            }
            setModalOpen(false)
        }
        catch (err) {
            console.log(err)
        }
    }

        return (
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '60vh' }}>
                <ConfigProvider
                    theme={{
                        components: {
                            InputNumber: {
                                controlWidth: 319
                            }
                        },
                    }}
                >

            <div >
                <Table columns={Customer_COLUMNS} dataSource={CustomerData} scroll={{ y: 265 }} />
            </div>
            <div style={{ marginTop: 'auto' }}>
            <Button type="primary" onClick={() => setModalOpen(true)}>
                + Add Customer
            </Button>
            <Modal
                title="Add Customer Details"
                centered
                open={modalOpen}
                okText="Save"
                onOk={form.submit}
                onCancel={() => setModalOpen(false)}
                width={750}
            >
                <Form layout="vertical" onFinish={handleFormSubmit} form={form}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Customer Name" name="customer_name" rules={[{ required: true, message: 'Customer Name is required' }]}>
                                <Input
                                    className="custom-input"
                                    variant="filled"
                                    id="customer_name"
                                    placeholder='Enter Customer Name'
                                    value={Customer["customer_name"]}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                            <Form.Item label="Product Name" name="product_name" rules={[{ required: true, message: 'Product Name is required' }]}>
                                <Input
                                    className="custom-input"
                                    variant="filled"
                                    id="product_name"
                                    placeholder='Enter Product Name'
                                    value={Customer["product_name"]}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                            </Col>
                            <Col span={12}>
                            <Form.Item label="Part Material" name="part_material" rules={[{ required: true, message: 'Material is required' }]}>
                                <Input
                                    className="custom-input"
                                    variant="filled"
                                    id="part_material"
                                    placeholder='Enter Part Material'
                                    value={Customer["part_material"]}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                            <Form.Item label="Tool Material" name="tool_material" rules={[{ required: true, message: 'Tool Material is required' }]}>
                                <Input
                                    className="custom-input"
                                    variant="filled"
                                    id="tool_material"
                                    placeholder='Enter Tool Material'
                                    value={Customer["tool_material"]}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                            </Col>
                            <Col span={12}>
                            <Form.Item
                                label="No of Cavity"
                                name="no_of_cavity"
                                rules={[{ required: true, message: 'No. of Cavity is required' }]}>
                                <InputNumber
                                    min={1}
                                    size='large'
                                    variant="filled"
                                    style={{width: '93%'}}
                                    placeholder='Enter No of Cavity'
                                    value={Customer["no_of_cavity"]}
                                    onChange={(e) => { handleInputNumber("no_of_cavity", e) }}
                                />
                            </Form.Item>
                            <Form.Item label="Runner" name="runner" rules={[{ required: true, message: 'Runner is required' }]}>
                                <Input
                                    className="custom-input"
                                    variant="filled"
                                    id="runner"
                                    placeholder='Enter Runner'
                                    value={Customer["runner"]}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                            </Col>
                            <Col span={12}>
                            <Form.Item
                                label="Tool Tonnage"
                                name="tool_tonnage"
                                rules={[{ required: true, message: 'Tool tonnage is required' }]}>
                                <InputNumber
                                    min={1}
                                    size='large'
                                    variant="filled"
                                    style={{width: '93%'}}
                                    placeholder='Enter Tool Tonnage'
                                    value={Customer["tool_tonnage"]}
                                    onChange={(e) => { handleInputNumber("tool_tonnage", e) }}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Manufacture Year"
                                name="manufacturing_year"
                                rules={[{ required: true, message: 'Year is required' }]}>
                                <DatePicker
                                    onChange={onChangeYear}
                                    id="manufacturing_year"
                                    picker="manufacturing_year"
                                    placeholder='Select Manufacturing Year'
                                    size="large"
                                    variant="filled"
                                    value={Customer["manufacturing_year"]}
                                    style={{ width: '93%' }}
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

    export default CustomerDetails