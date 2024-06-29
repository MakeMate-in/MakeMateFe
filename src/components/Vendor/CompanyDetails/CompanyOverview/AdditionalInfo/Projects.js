import React, { useState, useEffect, useMemo} from 'react';
import { Button, Flex, Modal, Form, Input, Avatar } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { updateAddressandContacts,getCompanyDetails } from '../../../../../apis/Vendor/CompanyDetails'
import randomColor from 'randomcolor'
import { notification} from 'antd';
import { getUserId } from '../../../../../utils/helper';
const Context = React.createContext({
    name: 'Default',
  });

const Projects = (props) => {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [project,setproject] = useState({
      "name": ""
    })

    const [form] = Form.useForm()
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement) => {
        api.success({
        message: `Success`,
        description: <Context.Consumer>{({ name }) => `Project Added Successfully`}</Context.Consumer>,
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
        description: <Context.Consumer>{({ name }) => `Unable to add Project `}</Context.Consumer>,
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
        description: <Context.Consumer>{({ name }) => `Project deleted Successfully`}</Context.Consumer>,
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
        description: <Context.Consumer>{({ name }) => `Unable to delete Project`}</Context.Consumer>,
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
      setproject({ ...project, [event.target.id]: event.target.value })
    }

    const handleFormSubmit = async () => {
        try {
            const USER_ID = getUserId()
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


    return (
        <div>
            <Context.Provider value={contextValue}>
                {contextHolder}
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
            </Context.Provider>
        </div>
    )
}

export default Projects