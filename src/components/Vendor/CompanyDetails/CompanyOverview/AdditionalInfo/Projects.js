import React, { useState, useMemo } from 'react';
import { Button, Flex, Modal, Form, Input, Tag, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { updateAddressandContacts, getCompanyDetails } from '../../../../../apis/Vendor/CompanyDetails'
import { notification } from 'antd';
import { getUserId } from '../../../../../utils/helper';
const Context = React.createContext({
    name: 'Default',
});

const Projects = (props) => {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [project, setproject] = useState({
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

    // const deleteNotification = (placement) => {
    //     api.success({
    //         message: `Success`,
    //         description: <Context.Consumer>{({ name }) => `Project deleted Successfully`}</Context.Consumer>,
    //         placement,
    //     });
    // };
    // contextValue = useMemo(
    //     () => ({
    //         name: 'Make Mate',
    //     }),
    //     [],
    // );

    // const deleteFailedNotification = (placement) => {
    //     api.error({
    //         message: `Success`,
    //         description: <Context.Consumer>{({ name }) => `Unable to delete Project`}</Context.Consumer>,
    //         placement,
    //     });
    // };
    // contextValue = useMemo(
    //     () => ({
    //         name: 'Make Mate',
    //     }),
    //     [],
    // );

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

    const colors = [
        'processing', 'success', 'error', 'warning', 'magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple',
    ];

    const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

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

                <Flex vertical gap={15}>
                    <Flex>
                        <div>
                        <Typography style={{ margin: '0px', fontSize:'25px', fontWeight:'600' }}>Projects</Typography>
                        <Typography style={{ margin: '0px', fontSize:'15px' }}>Add Projects</Typography>
                        </div>
                        <Button size='large' icon={<PlusOutlined />} onClick={showModal} iconPosition='start' style={{ fontWeight: 600, marginLeft: 'auto' }}>Add New Project</Button>

                    </Flex>
                    <Flex gap="small">
                        {props.CompanyDetails.product_details != undefined ? props.CompanyDetails.product_details.map((item) => {
                            return (
                                <Tag size='large' style={{ fontSize: '18px', fontFamily: 'none' }} color={getRandomColor()}>
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

export default Projects