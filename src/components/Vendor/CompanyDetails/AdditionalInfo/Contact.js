import {useState} from 'react'
import { Button, Flex, Modal, Form, Input, Avatar } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { USER_ID } from '../../../../utils/constants';
import { updateAddressandContacts,getCompanyDetails } from './../../../../apis/Vendor/CompanyDetails'
import randomColor from 'randomcolor'


const Customer = (props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [customer,setcustomer] = useState({
      "name": ""
    })

    const [form] = Form.useForm()
  
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
                }
            }
            else {
                //Toast
            }
        }
        catch (err) {
            console.log(err)
        }
        setIsModalOpen(false)
    }


    return (
        <div>
            <Flex>
                <div>
                    <h2 style={{ margin: '0' }}>Key Customers you have Worked With</h2>
                    <p style={{ margin: '0' }}>Add customers you have worked with so we can share your profile with similar set of new customers.</p>
                </div>
                <Button size='large' onClick={showModal} icon={<PlusOutlined />} iconPosition='start' style={{ fontWeight: 600, marginLeft: 'auto' }}>Add New Customer</Button>
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
                                message: 'Please input your username!',
                            }
                            ]}
                        >
                            <Input
                                className="custom-input"
                                variant="filled"
                                id="name"
                                onChange={handleChange}
                                value={customer["name"]}
                            />
                        </Form.Item>

                    </Form>
                </Modal>
            </Flex>
            <Flex gap={"large"}>
            {props.CompanyDetails.customer_details!=undefined?props.CompanyDetails.customer_details.map((item) => {
                return (
                    <Flex vertical>
                    <Avatar style={{ backgroundColor: randomColor() , color: 'white' }}>{item.name.substring(0,1)}</Avatar>
                    <p>{item.name}</p>
                    </Flex>
                    )
            }):''}
            </Flex>
        </div>
    )
}

export default Customer
