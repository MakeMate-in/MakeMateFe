import React, { useState, useMemo } from 'react';
import { Button, Flex, Modal, Form, Input, Tag, Typography } from 'antd';
import { PlusOutlined, CloseOutlined } from '@ant-design/icons';
import { updateAddressandContacts, getCompanyDetails, deleteCustomerDetail } from '../../../../../apis/Vendor/CompanyDetails'
import { notification } from 'antd';
import { getUserId } from '../../../../../utils/helper';
const Context = React.createContext({
    name: 'Default',
});


const Customer = (props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [customer, setcustomer] = useState({
        "name": ""
    })

    const [form] = Form.useForm()
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement) => {
        api.success({
            message: `Success`,
            description: <Context.Consumer>{({ name }) => `Customer Added Successfully`}</Context.Consumer>,
            placement,
        });
    };
    let contextValue = useMemo(
        () => ({
            name: 'Make Mate',
        }),
        [],
    );

    const openFailedNotification = (placement) => {
        api.error({
            message: `Something went wrong`,
            description: <Context.Consumer>{({ name }) => `Unable to add Customer `}</Context.Consumer>,
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
            description: <Context.Consumer>{({ name }) => `Customer deleted Successfully`}</Context.Consumer>,
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
            message: `Failed`,
            description: <Context.Consumer>{({ name }) => `Unable to delete Customer`}</Context.Consumer>,
            placement,
        });
    };
    contextValue = useMemo(
        () => ({
            name: 'Make Mate',
        }),
        [],
    );

    const showModal = () => {
        setIsModalOpen(true);
    };


    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChange = (event) => {
        setcustomer({ ...customer, [event.target.id]: event.target.value })
    }

    const handleFormSubmit = async () => {
        try {
            const USER_ID = getUserId()
            let params = {
                user: USER_ID
            }
            let data = {}
            data.customer_details = customer
            const res = await updateAddressandContacts(params, data)
            if (res.success) {
                const updatedData = await getCompanyDetails(params)
                if (updatedData.success) {
                    props.setcompanyDetails(updatedData.data)
                    openNotification('topRight');
                }
            }
            else {
                openFailedNotification('topRight');
            }
        }
        catch (err) {
            console.log(err)
        }
        setIsModalOpen(false)
    }

    const handleDelete = async (customerName) => {
        try {
            const USER_ID = getUserId()
            let params = {
                user: USER_ID
            }
        const res = await deleteCustomerDetail(params, customerName);
        if (res.success) {
            deleteNotification('topRight');
            const updatedData = await getCompanyDetails(params)
            if (updatedData.success) {
                props.setcompanyDetails(updatedData.data)
            }
        }
        else {
            deleteFailedNotification('topRight');
        }
        } catch (error) {
          console.error('Error deleting customer detail:', error);
        }
      }

    const colors = [
        '#3b5999','#55acee'
      ];
    
    const getTagColor = (index) => colors[index%2];

    return (
        <div>
            <Context.Provider value={contextValue}>
                {contextHolder}

                <Modal
                        title="Add Customer"
                        centered open={isModalOpen}
                        onOk={form.submit}
                        onCancel={handleCancel}
                    >

                        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
                            <Form.Item label="Customer Name" name="customerName"
                                rules={[{
                                    required: true,
                                    message: 'Please input Customer name!',
                                }
                                ]}
                            >
                                <Input
                                    className="custom-input"
                                    variant="filled"
                                    id="name"
                                    onChange={handleChange}
                                    value={customer["name"]}
                                    allowClear
                                />
                            </Form.Item>

                        </Form>
                    </Modal>
                
                <Flex vertical gap={15}>
                <Flex>
                    <div>
                    <Typography style={{ margin: '0px', fontSize:'25px', fontWeight:'600' }}>Share Your Key Customers</Typography>
                    <Typography style={{ margin: '0px', fontSize:'15px' }}>Add customers you have worked with so we can share your profile with similar set of new customers.</Typography>
                    </div>
                    <Button size='large' onClick={showModal} icon={<PlusOutlined />} iconPosition='start' style={{ fontWeight: 600, marginLeft: 'auto' }}>Add New Customer</Button>  
                </Flex>
                <Flex gap={"small"} wrap>
                    {props.CompanyDetails.customer_details != undefined ? props.CompanyDetails.customer_details.map((item, index) => {
                        return (
                            <Tag size='large' style={{ fontSize: '18px', fontFamily: 'none' }} color={getTagColor(index)} closable
                            closeIcon={<CloseOutlined onClick={() => handleDelete(item.name)} />}
                          >
                             {item.name}
                          </Tag>    
                        )
                    }) : ''}
                </Flex>
                </Flex>
            </Context.Provider>
        </div>
    )
}

export default Customer
