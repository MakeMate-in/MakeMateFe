import React, { useState, useEffect, useMemo } from 'react'
import { Table, Input, Button, Modal, Form, Row, Col, InputNumber, ConfigProvider, DatePicker, Select, Upload, Space, Popover } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { MACHINE_TYPE, convertBufferToBinary } from '../../../../utils/helper';
import { addMachineDetails, getMachineDetails, deleteMachineDetails, uploadMachineImages } from '../../../../apis/Vendor/MachineDetails';
import { COMPANY_ID, OPEN_ROUTES } from '../../../../utils/constants';
import { DeleteTwoTone } from '@ant-design/icons';
import { notification } from 'antd';
import ImageUpload from '../../../ImageUpload/ImageUpload';
const Context = React.createContext({
    name: 'Default',
});

const Machines = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [isVisible, setIsVisible] = useState(true);
    const [loading, setLoading] = useState(false)
    const [api, contextHolder] = notification.useNotification();
    const [tab, setTab] = useState(0);          // used to toggle element visibility between Dashboard & Digital-Factory
    const [bedSize, setBedSize] = useState({
        "length": "",
        "height": "",
        "breadth": "",
        "diameter": ""
    })
    const [Machine, setMachine] = useState({
        "machine_type": undefined,
        "spindle_rpm": "",
        "no_of_Axis": "",
        "manufacturing_year": "",
        "make": "",
        "bed_Size": {}
    })

    const [imageModal, setImageModal] = useState(false)
    let [MachineData, setMachineData] = useState([])
    const [modalMachine, setmodalMachine] = useState(undefined)


    const openNotification = (placement) => {
        api.success({
            message: `Success`,
            description: <Context.Consumer>{({ name }) => `Machine Added Successfully`}</Context.Consumer>,
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
            description: <Context.Consumer>{({ name }) => `Unable to add Machine `}</Context.Consumer>,
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
            description: <Context.Consumer>{({ name }) => `Machine Details deleted Successfully`}</Context.Consumer>,
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
        api.success({
            message: `Success`,
            description: <Context.Consumer>{({ name }) => `Unable to delete Machine Details`}</Context.Consumer>,
            placement,
        });
    };
    contextValue = useMemo(
        () => ({
            name: 'Make Mate',
        }),
        [],
    );

    const fetchMachineDetails = async () => {
        let params = { company_id: COMPANY_ID }
        const machines = await getMachineDetails(params)
        if (machines.success) {
            if (machines) {
                let data = []
                if (machines.count > 0) {
                    data = machines.documents.map((machine, i) => {
                        // console.log(machine)
                        let machineObj = {
                            key: i + 1,
                            id: machine._id,
                            type: machine.machine_type,
                            make: machine.make,
                            bedSize: machine.bed_Size ? <div>
                                {machine.bed_Size.length ? <p style={{ margin: '0' }}><b>Length</b> - {machine.bed_Size.length}</p> : ''}
                                {machine.bed_Size.breadth ? <p style={{ margin: '0' }}><b>Width</b> - {machine.bed_Size.breadth}</p> : ''}
                                {machine.bed_Size.height ? <p style={{ margin: '0' }}><b>Height</b> - {machine.bed_Size.height}</p> : ''}
                                {machine.bed_Size.diameter ? <p style={{ margin: '0' }}><b>Diameter</b> - {machine.bed_Size.diameter}</p> : ''}
                            </div> : '',
                            rpm: machine.spindle_rpm,
                            axis: machine.no_of_Axis,
                            year: machine.manufacturing_year
                        }
                        return machineObj
                    })
                }
                setMachineData([...data]);
            }

        }
    }

    const handleDeleteInput = async (record) => {
        try {
            let params = {
                id: record.id
            }
            const res = await deleteMachineDetails(params)
            if (res.success) {
                deleteNotification('topRight');
                fetchMachineDetails()
            }
            else {
                deleteFailedNotification('topRight')
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const MACHINE_COLUMNS = [
        {
            title: 'Machine Type',
            dataIndex: 'type',
            key: 'type',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Company Name',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Make',
            dataIndex: 'make',
            key: 'make',
        },
        {
            title: 'Bed Size(in mm)',
            dataIndex: 'bedSize',
            key: 'bedSize',
        },
        {
            title: 'Spindle RPM (max)',
            dataIndex: 'rpm',
            key: 'rpm',
        },
        {
            title: 'No. of Axis',
            dataIndex: 'axis',
            key: 'axis',
        },
        {
            title: 'Manufacture Year',
            dataIndex: 'year',
            key: 'year',
        },
        {
            title: 'Image',
            key: 'image',
            render: (_, record) => (
                <Space size="large">
                    <a onClick={() => {
                        setImageModal(true)
                        setmodalMachine(record)
                    }}>View</a>
                    {tab ? <Popover content='Delete'>
                        <DeleteTwoTone onClick={() => handleDeleteInput(record)} twoToneColor="#F5222D" style={{ fontSize: '20px' }} />
                    </Popover> : ''}
                </Space>
            ),
        },
    ];


    const uploadMachineImage = async (COMPANY_ID, files) => {
        try {
            if (modalMachine) {
                const res = await uploadMachineImages(modalMachine.id, files)
                return res;
            }
            else {
                return { success: false }
            }
        }
        catch (err) {
            console.log(err)
        }
    }


    const getMachineImage = async (COMPANY_ID) => {
        try {
            let params = { company_id: COMPANY_ID, machine_id: modalMachine.id }
            const machines = await getMachineDetails(params)
            if (machines.success) {
                let newSrcList = [];
                machines.documents.image.map(async (item, i) => {
                    let data = {
                        uid: item._id,
                        name: item.name,
                        status: 'done',
                        url: convertBufferToBinary(item.image),
                    }
                    newSrcList.push(data)

                })
                return newSrcList;
            }

        }
        catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        if (window.location.pathname == OPEN_ROUTES.DIGITAL_FACTORY) {
            setTab(1);
        }

        fetchMachineDetails()
    }, [])



    useEffect(() => {
        setMachine({ ...Machine, ["bed_Size"]: { ...bedSize } })
    }, [bedSize])

    const onChangeYear = (dateString) => {
        setMachine({ ...Machine, ["manufacturing_year"]: dateString.$y })
    };

    const handleInputNumber = (id, value) => {
        setMachine({ ...Machine, [id]: value })
    }

    const handleBedSize = (id, value) => {
        setBedSize({ ...bedSize, [id]: value })
    }

    const handleChange = (e) => {
        setMachine({ ...Machine, [e.target.id]: e.target.value })
    }


    const handleChangeType = (value) => {
        setMachine({ ...Machine, ["machine_type"]: value })
        if (value == 'Conventional')
            setIsVisible(false);
        else
            setIsVisible(true);
    };


    const handleFormSubmit = async () => {
        try {
            form.resetFields()
            let params = {
                company_id: COMPANY_ID
            }
            const res = await addMachineDetails(params, Machine)
            if (res.success) {
                openNotification('topRight');
                fetchMachineDetails()
                setMachine({
                    "machine_type": "",
                    "spindle_rpm": "",
                    "no_of_Axis": "",
                    "manufacturing_year": "",
                    "make": "",
                    "bed_Size": {}
                })
                setBedSize({})
                //Add Toast
            }
            else {
                openFailedNotification('topRight');
            }
            setModalOpen(false)
            setLoading(false)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: tab ? '60vh' : '' }}>
            <ConfigProvider
                theme={{
                    components: {
                        InputNumber: {
                            controlWidth: 319
                        }
                    },
                }}
            >
                <Context.Provider value={contextValue}>
                    {contextHolder}
                    <div >
                        <Table columns={MACHINE_COLUMNS} dataSource={MachineData} scroll={{ y: tab ? 265 : 200 }} />
                    </div>
                    <div style={{ marginTop: 'auto' }}>
                        <Button type="primary" style={{ display: tab ? 'block' : 'none' }} onClick={() => {
                            setModalOpen(true)
                            setLoading(true)
                        }}>
                            + Add Machine
                        </Button>
                        <Modal
                            title="Add Machine"
                            centered
                            open={modalOpen}
                            okText="Save"
                            onOk={form.submit}
                            onCancel={() => {
                                setLoading(false)
                                setModalOpen(false)
                            }}
                            width={750}
                        >
                            {isVisible ? <Form layout="vertical"
                                onFinish={handleFormSubmit} form={form}
                            >
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item name="type" label="Machine Type" rules={[{ required: true, },]}>
                                            <Select size='large' variant="filled" onChange={handleChangeType}
                                                style={{ width: '93%' }} placeholder='Select Machine Type'
                                                options={MACHINE_TYPE} />
                                        </Form.Item>
                                        <Form.Item label="Make" name="make" rules={[{ required: true, message: 'Make is required' }]}>
                                            <Input
                                                className="custom-input"
                                                variant="filled"
                                                id="make"
                                                placeholder='Enter Machine Make'
                                                value={Machine["make"]}
                                                onChange={handleChange}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label="Spindle RPM(max)"
                                            name="rpm"
                                            rules={[{ required: true, message: 'No. of Axis is required' }]}>
                                            <InputNumber
                                                min={1}
                                                size='large'
                                                variant="filled"
                                                placeholder='Enter Spindle RPM'
                                                value={Machine["spindle_rpm"]}
                                                onChange={(e) => { handleInputNumber("spindle_rpm", e) }}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label="Specification (Breadth)"
                                            name="breadth">
                                            <InputNumber
                                                id="breadth"
                                                size='large'
                                                variant="filled"
                                                placeholder='Enter Breadth (mm)'
                                                value={bedSize["breadth"]}
                                                onChange={(e) => { handleBedSize("breadth", e) }}
                                            />
                                        </Form.Item>
                                        <Form.Item label="Specification (Diameter)" name="diameter">
                                            <InputNumber
                                                // className="custom-input" 
                                                label="Specification (Diameter)"
                                                variant="filled"
                                                id="diameter"
                                                size='large'
                                                placeholder='Enter Diameter'
                                                value={bedSize["diameter"]}
                                                onChange={(e) => { handleBedSize("diameter", e) }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="No. of Axis"
                                            name="axis"
                                            rules={[{ required: true, message: 'No. of Axis is required' }]}>
                                            <InputNumber
                                                min={1}
                                                size='large'
                                                variant="filled"
                                                placeholder='Enter No. of Axis'
                                                value={Machine["no_of_Axis"]}
                                                onChange={(e) => { handleInputNumber("no_of_Axis", e) }}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label="Manufacturing Year"
                                            name="year"
                                            rules={[{ required: true, message: 'Year is required' }]}>
                                            <DatePicker
                                                onChange={onChangeYear}
                                                id="year"
                                                picker="year"
                                                placeholder='Select Manufacturing Year'
                                                size="large"
                                                variant="filled"
                                                value={Machine["manufacturing_year"]}
                                                style={{ width: '93%' }}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label="Specification (Length)"
                                            name="length">
                                            <InputNumber
                                                id="length"
                                                size='large'
                                                variant="filled"
                                                placeholder='Enter Length (mm)'
                                                value={bedSize["length"]}
                                                onChange={(e) => { handleBedSize("length", e) }}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label="Specification (Height)"
                                            name="height">
                                            <InputNumber
                                                id="height"
                                                size='large'
                                                variant="filled"
                                                placeholder='Enter Height (mm)'
                                                value={bedSize["height"]}
                                                onChange={(e) => { handleBedSize("height", e) }}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form> :
                                <Form layout="vertical" onFinish={handleFormSubmit} form={form} >
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item name="type" label="Machine Type" rules={[{ required: true, },]}>
                                                <Select size='large' variant="filled" onChange={handleChangeType}
                                                    style={{ width: '93%' }} placeholder='Select Machine Type' options={MACHINE_TYPE} />
                                            </Form.Item>

                                            <Form.Item
                                                label="Specification (Length)"
                                                name="length">
                                                <InputNumber
                                                    id="length"
                                                    size='large'
                                                    variant="filled"
                                                    placeholder='Enter Length (mm)'
                                                    value={bedSize["length"]}
                                                    onChange={(e) => { handleBedSize("length", e) }}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label="Specification (Height)"
                                                name="height">
                                                <InputNumber
                                                    id="height"
                                                    size='large'
                                                    variant="filled"
                                                    placeholder='Enter Height (mm)'
                                                    value={bedSize["height"]}
                                                    onChange={(e) => { handleBedSize("height", e) }}
                                                />
                                            </Form.Item>

                                            <Form.Item
                                                label="Upload Image"
                                                name="image">
                                                <Upload>
                                                    <Button size='large' icon={<UploadOutlined />}>Click to Upload</Button>
                                                </Upload>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item label="Machine Name" name="machineName" rules={[{ required: true, message: 'Machine Name is required' }]}>
                                                <Input className="custom-input" variant="filled" id="machineName" placeholder='Enter Machine Name' />
                                            </Form.Item>
                                            <Form.Item
                                                label="Specification (Breadth)"
                                                name="breadth">
                                                <InputNumber
                                                    id="breadth"
                                                    size='large'
                                                    variant="filled"
                                                    placeholder='Enter Breadth (mm)'
                                                    value={bedSize["breadth"]}
                                                    onChange={(e) => { handleBedSize("breadth", e) }}
                                                />
                                            </Form.Item>
                                            <Form.Item label="Specification (Diameter)" name="diameter">
                                                <InputNumber
                                                    label="Specification (Diameter)"
                                                    variant="filled"
                                                    id="diameter"
                                                    placeholder='Enter Diameter'
                                                    value={bedSize["diameter"]}
                                                    onChange={(e) => { handleBedSize("diameter", e) }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>}
                        </Modal>
                    </div>

                    <Modal
                        title="Add Machine"
                        centered
                        open={imageModal}
                        okText="Save"
                        onOk={form.submit}
                        onCancel={() => setImageModal(false)}
                        width={750}
                    >
                        <ImageUpload uploadImages={uploadMachineImage} getImages={getMachineImage} />

                    </Modal>

                </Context.Provider>
            </ConfigProvider>
        </div>
    )
}

export default Machines