import {useState} from 'react'
import { Button, Flex, Modal, Form, Input, Avatar } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { USER_ID } from '../../../../../utils/constants';
import { updateAddressandContacts,getCompanyDetails } from '../../../../../apis/Vendor/CompanyDetails'
import randomColor from 'randomcolor'


const Projects = (props) => {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [project,setproject] = useState({
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
      setproject({ ...project, [event.target.id]: event.target.value })
    }

    const handleFormSubmit = async () => {
        try {
            let params = {
                user: USER_ID
            }
            let data = {}
            data.product_details = project
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
                    <h2 style={{ margin: '0' }}>Projects</h2>
                    <p style={{ margin: '0' }}>Add Projects</p>
                </div>
                <Button size='large' icon={<PlusOutlined />}  onClick={showModal} iconPosition='start' style={{ fontWeight: 600, marginLeft: 'auto' }}>Add New Project</Button>
              
                <Modal 
                title="Add Customer" 
                centered open={isModalOpen} 
                onOk={form.submit} 
                onCancel={handleCancel}
                >

                    <Form form={form} onFinish={handleFormSubmit} layout="vertical">
                        <Form.Item label="Project Name" name="projectname"
                            rules={[{
                                required: true,
                                message: 'Please input Project Name!',
                            }
                            ]}
                        >
                            <Input
                                className="custom-input"
                                variant="filled"
                                id="name"
                                onChange={handleChange}
                                value={project["name"]}
                            />
                        </Form.Item>

                    </Form>
                </Modal>
           
            </Flex>
            <Flex>
            {props.CompanyDetails.product_details!=undefined?props.CompanyDetails.product_details.map((item) => {
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

export default Projects