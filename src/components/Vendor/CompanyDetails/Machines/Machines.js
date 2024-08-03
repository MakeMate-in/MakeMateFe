import React, { useState, useEffect, useMemo } from 'react'
import { Table, Input, Button, Modal, Form, Row, Col, InputNumber, ConfigProvider, DatePicker, Select, Space, Popover, Flex } from 'antd';
import { MACHINE_TYPE, convertBufferToBinary, getCopanyId } from '../../../../utils/helper';
import { addMachineDetails, getMachineDetails, deleteMachineDetails, uploadMachineImages } from '../../../../apis/Vendor/MachineDetails';
import { DeleteTwoTone } from '@ant-design/icons';
import { notification } from 'antd';
import { OPEN_ROUTES, PRODUCT_URL_PATTERN } from '../../../../utils/constants';
import ImageUpload from '../../../ImageUpload/ImageUpload';
import { useParams } from 'react-router-dom';
import { getMachineDetailsCustomer } from '../../../../apis/commonFunctions';
const Context = React.createContext({
    name: 'Default',
});

const Machines = (props) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [isVisible, setIsVisible] = useState(true);
    const [loading, setLoading] = useState(false)
    const [api, contextHolder] = notification.useNotification();
    const [tab, setTab] = useState(0);          // used to toggle element visibility between Dashboard & Digital-Factory
    const [bedSize, setBedSize] = useState({
        "length": "",
        "height": "",
        "breadth": ""
    })
    const [Machine, setMachine] = useState({
        "machine_type": undefined,
        "tonnage": "",
        "no_of_Axis": "",
        "manufacturing_year": "",
        "make": "",
        "bed_Size": {},
        "machine_name": ""
    })

    const [conventionalModal, setConvetionalModal] = useState(false)
    const [conventionalMachinesData, setConvetionalMachinesData] = useState([])

    const [imageModal, setImageModal] = useState(false)
    let [MachineData, setMachineData] = useState([])
    const [modalMachine, setmodalMachine] = useState(undefined)
    const [show, setnoShow] = useState(false);


    const companyID = useParams()


    const openNotification = (placement) => {
        api.success({
            message: `Success`,
            description: `Machine Added Successfully`,
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

    const deleteFailedNotification = (placement, msg) => {
        api.success({
            message: `Success`,
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


    const fetchMachineDetails = async () => {
        try {
            const COMPANY_ID = getCopanyId()
            let params = { company_id: COMPANY_ID }
            const machines = await getMachineDetails(params)
            if (machines.success) {
                if (machines) {
                    let data = []
                    let totaldata = []
                    let conventionalMachines = []
                    if (machines.count > 0) {

                        machines.documents.filter((machine, i) => {
                            let machineObj = {
                                key: i + 1,
                                id: machine._id,
                                type: machine.machine_type,
                                name: machine.machine_name,
                                make: machine.make,
                                bedSize: machine.bed_Size ? <Flex>
                                    {machine.bed_Size.length ? <p style={{ margin: '0' }}> {machine.bed_Size.length}</p> : '-'}X
                                    {machine.bed_Size.breadth ? <p style={{ margin: '0' }}>{machine.bed_Size.breadth}</p> : '-'}X
                                    {machine.bed_Size.height ? <p style={{ margin: '0' }}> {machine.bed_Size.height}</p> : '-'}
                                </Flex> : '',
                                tonnage: machine.tonnage,
                                axis: machine.no_of_Axis,
                                year: machine.manufacturing_year
                            }
                            if (machineObj.type == "Conventional") {
                                machineObj.count = machine.tonnage
                                conventionalMachines.push(machineObj)
                            }
                            else {
                                data.push(machineObj)
                            }
                            totaldata.push(machineObj)
                        })
                    }
                    if (Object.keys(props).length > 0) {
                        console.log(conventionalMachines)
                        props.setMachineDetails(totaldata)
                    }
                    setMachineData([...data]);
                    setConvetionalMachinesData([...conventionalMachines])
                }
            }
        }
        catch (err) {
            //Toast
            openFailedNotification('topRight', 'Unable to Fetch Mahine Details')
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
                deleteFailedNotification('topRight', 'Unable to delete Machine Details')
            }
        }
        catch (err) {
            //Toast
            openFailedNotification('topRight', 'Unable to Delete Mahine Details')
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
        // {
        //     title: 'Machine Name',
        //     dataIndex: 'name',
        //     key: 'name',
        // },
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
            title: 'Tonnage',
            dataIndex: 'tonnage',
            key: 'tonnage',
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


    const CONVENTIONAL_MACHINE_COLUMNS = [
        {
            title: 'Machine Type',
            dataIndex: 'type',
            key: 'type',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Machine Name',
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'Machines Count',
            dataIndex: 'count',
            key: 'count',
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


    const uploadMachineImage = async (files) => {
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


    const getMachineImage = async () => {
        try {
            let COMPANY_ID;
            const pathname = window.location.pathname
            let machines;
            if (PRODUCT_URL_PATTERN.test(pathname)) {
                COMPANY_ID = companyID.company_id
                let params = { company_id: COMPANY_ID, machine_id: modalMachine.id }
                machines = await getMachineDetailsCustomer(params)
            }
            else {
                COMPANY_ID = getCopanyId()
                let params = { company_id: COMPANY_ID, machine_id: modalMachine.id }
                machines = await getMachineDetails(params)
            }

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
            //Toast
            openFailedNotification('topRight', 'Unable to Fetch Mahine Images')
            console.log(err)
        }
    }


    const fetchMachineDetailsCustomer = async () => {
        try {

            let params = { company_id: companyID.company_id }
            const machines = await getMachineDetailsCustomer(params)
            if (machines.success) {
                if (machines) {
                    let data = []
                    let totaldata = []
                    let conventionalMachines = []
                    if (machines.count > 0) {

                        machines.documents.filter((machine, i) => {
                            let machineObj = {
                                key: i + 1,
                                id: machine._id,
                                type: machine.machine_type,
                                make: machine.make,
                                name: machine.machine_name,
                                bedSize: machine.bed_Size ? <Flex>
                                    {machine.bed_Size.length ? <p style={{ margin: '0' }}>{machine.bed_Size.length}</p> : '-'}X
                                    {machine.bed_Size.breadth ? <p style={{ margin: '0' }}> {machine.bed_Size.breadth}</p> : '-'}X
                                    {machine.bed_Size.height ? <p style={{ margin: '0' }}> {machine.bed_Size.height}</p> : '-'}
                                </Flex> : '',
                                tonnage: machine.tonnage,
                                axis: machine.no_of_Axis,
                                year: machine.manufacturing_year
                            }
                            if (machineObj.type == "Conventional") {
                                machineObj.count = machine.tonnage
                                conventionalMachines.push(machineObj)

                            }
                            else {
                                data.push(machineObj)
                            }
                            totaldata.push(machineObj)
                        })
                    }
                    if (Object.keys(props).length > 0) {
                        props.setMachineDetails(totaldata)
                    }
                    setMachineData([...data]);
                    setConvetionalMachinesData([...conventionalMachines])
                }
            }
        }
        catch (err) {
            openFailedNotification('topRight', 'Unable to Fetch Mahine Details')
        }
    }

    useEffect(() => {

        const pathname = window.location.pathname
        setnoShow(PRODUCT_URL_PATTERN.test(pathname))
        if (PRODUCT_URL_PATTERN.test(pathname)) {
            fetchMachineDetailsCustomer()
        }
        else {
            fetchMachineDetails()
        }

    }, [])

    useEffect(() => {
        if (window.location.pathname == OPEN_ROUTES.DIGITAL_FACTORY) {
            setTab(1);
        }
    }, [window.location.pathname])



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
            const COMPANY_ID = getCopanyId()
            form.resetFields()
            let params = {
                company_id: COMPANY_ID
            }
            console.log(Machine)
            const res = await addMachineDetails(params, Machine)
            if (res.success) {
                openNotification('topRight');
                fetchMachineDetails()
                setMachine({
                    "machine_type": "",
                    "tonnage": "",
                    "no_of_Axis": "",
                    "manufacturing_year": "",
                    "make": "",
                    "bed_Size": {}
                })
                setBedSize({})
            }
            else {
                openFailedNotification('topRight', `Unable to Add Machine Details`);
            }
            setModalOpen(false)
            setLoading(false)
        }
        catch (err) {
            openFailedNotification('topRight', 'Unable to Add Mahine Details')
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
                    <Button
                        type="primary"
                        // style={{ display: tab ? 'block' : 'none' }} 
                        onClick={() => {
                            setConvetionalModal(true)
                        }}>
                        Conventional Machines
                    </Button>
                    <div >
                        <Table columns={MACHINE_COLUMNS} dataSource={MachineData} scroll={{ y: tab ? 265 : 200 }} />
                    </div>
                    <div style={{ marginTop: '10px' }}>

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

                                        {/* Tonnage */}

                                        <Form.Item
                                            label="Tonnage"
                                            name="tonnage"
                                            rules={[{ required: true, message: 'Tonnage is required' }]}>
                                            <InputNumber
                                                min={1}
                                                size='large'
                                                variant="filled"
                                                placeholder='Enter Tonnage'
                                                value={Machine["tonnage"]}
                                                onChange={(e) => { handleInputNumber("tonnage", e) }}
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
                                    </Col>
                                </Row>
                                <h3 style={{fontWeight: '500', fontFamily: 'sans-serif'}}>Bed Size</h3>
                                <Row gutter={0}>
                                    <Col span={7} >
                                        <Form.Item label="Length">                                            
                                            <InputNumber
                                                id="length"
                                                size='large'
                                                variant="filled"
                                                placeholder='Enter Length (mm)'
                                                style={{width: '90%'}}
                                                value={bedSize["length"]}
                                                onChange={(e) => { handleBedSize("length", e) }}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={1} >X</Col>
                                    <Col span={7} >
                                        <Form.Item label="Width">
                                            <InputNumber
                                                id="breadth"
                                                size='large'
                                                variant="filled"
                                                placeholder='Enter Breadth (mm)'
                                                value={bedSize["breadth"]}
                                                onChange={(e) => { handleBedSize("breadth", e) }}
                                                style={{width: '90%'}}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={1} >X</Col>
                                    <Col span={7} >
                                        <Form.Item label="Height">
                                            <InputNumber
                                                id="height"
                                                size='large'
                                                variant="filled"
                                                placeholder='Enter Height (mm)'
                                                value={bedSize["height"]}
                                                onChange={(e) => { handleBedSize("height", e) }}
                                                style={{width: '90%'}}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form> :
                                <Form layout="vertical" onFinish={handleFormSubmit} form={form} >
                                    <Row gutter={32}>
                                        <Col span={8}>


                                            <Form.Item name="type" label="Machine Type" rules={[{ required: true, },]}>
                                                <Select size='large' variant="filled" onChange={handleChangeType}
                                                    style={{ width: '93%' }} placeholder='Select Machine Type' options={MACHINE_TYPE} />
                                            </Form.Item>

                                        </Col>
                                        <Col span={8}>
                                            <Form.Item label="Machine Name" name="machineName" rules={[{ required: true, message: 'Machine Name is required' }]}>
                                                <Input
                                                    className="custom-input"
                                                    variant="filled"
                                                    id="machine_name"
                                                    placeholder='Enter Machine Name'
                                                    value={Machine["machine_name"]}
                                                    onChange={handleChange}
                                                />
                                            </Form.Item>


                                        </Col>

                                        <Col span={8}>
                                            <Form.Item label="Count" name="machine_count" rules={[{ required: true, message: 'Machine Count is required' }]}>
                                                <InputNumber
                                                    id="height"
                                                    size='large'
                                                    variant="filled"
                                                    placeholder='Enter Machines Count'
                                                    value={Machine["tonnage"]}
                                                    style={{ width: '90%' }}
                                                    onChange={(e) => { handleInputNumber("tonnage", e) }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>}
                        </Modal>
                    </div>

                    {imageModal && <Modal
                        title="Add Machine"
                        centered
                        open={imageModal}
                        okText="Save"
                        footer={show ? null : ''}
                        onOk={() => setImageModal(false)}
                        onCancel={() => setImageModal(false)}
                        width={750}
                    >
                        <ImageUpload uploadImages={uploadMachineImage} getImages={getMachineImage} tab={tab} />

                    </Modal>}

                    {conventionalModal && <Modal
                        title="Conventional Machines"
                        centered
                        open={conventionalModal}
                        // okText="Save"
                        footer={show ? null : ''}
                        onOk={() => setConvetionalModal(false)}
                        onCancel={() => setConvetionalModal(false)}
                        width={750}
                    >
                        <Table columns={CONVENTIONAL_MACHINE_COLUMNS} dataSource={conventionalMachinesData} scroll={{ y: tab ? 265 : 200 }} />

                    </Modal>}

                </Context.Provider>
            </ConfigProvider>
        </div>
    )
}

export default Machines