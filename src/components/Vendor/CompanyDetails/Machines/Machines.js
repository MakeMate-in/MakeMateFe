import React, { useState, useEffect } from 'react'
import { Table, Input, Button, Modal, Form, Row, Col, InputNumber, ConfigProvider, DatePicker, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { MACHINE_COLUMNS } from '../../../../utils/helper';

const Machines = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [form] = Form.useForm()
    const { Option } = Select;
    const [isVisible, setIsVisible] = useState(true)
    const [MachineDetails,setMachineDetails] = useState()
    const [Machine, setMachine] =useState({
        "machine_type": "",
        "spindle_rpm": "",
        "no_of_Axis": "",
        "manufacturing_year": "",
        "make":""
    })

    useEffect(() => {
        const fetchMachineDetails = async() => {

        }

        fetchMachineDetails()
    },[])

    const onChangeYear = (dateString) => {
        console.log(dateString);
    };

    const handleChange = (e) => {
        setMachine({...Machine,[e.target.id]:e.target.value})
    }

    
    const handleChangeType = (value) => {
        console.log(value);
        setMachine({...Machine,["machine_type"]: value})
        if (value == 'Conventional')
            setIsVisible(false);
        else
            setIsVisible(true);
    };

    const data = [
        {
            key: '1',
            type: 'John Brown',
            make: 32,
            bedSize: '800 X 300',
            rpm: 1500,
            axis: 3,
            year: 2019
        }
    ];


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
                    <Table columns={MACHINE_COLUMNS} dataSource={data} scroll={{ y: 265 }} />
                </div>
                <div style={{ marginTop: 'auto' }}>
                    <Button type="primary" onClick={() => setModalOpen(true)}>
                        + Add Machine
                    </Button>
                    <Modal
                        title="Add Machine"
                        centered
                        open={modalOpen}
                        okText="Save"
                        onOk={form.submit}
                        onCancel={() => setModalOpen(false)}
                        width={750}
                    >
                        {isVisible ? <Form layout="vertical" >
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item name="type" label="Machine Type" rules={[{ required: true, },]}>
                                        <Select size='large' variant="filled" onChange={handleChangeType}
                                            style={{ width: '93%' }} placeholder='Select Machine Type' >
                                            <Option value="CNC Machine 1">CNC Machine 1</Option>
                                            <Option value="CNC Machine 2">CNC Machine 2</Option>
                                            <Option value="CNC EDM 1">CNC EDM 1</Option>
                                            <Option value="CNC EDM 2">CNC EDM 2</Option>
                                            <Option value="ZNC EDM 1">ZNC EDM 1</Option>
                                            <Option value="ZNC EDM 2">ZNC EDM 2</Option>
                                            <Option value="Wirecut 1">Wirecut 1</Option>
                                            <Option value="Wirecut 2">Wirecut 2</Option>
                                            <Option value="Conventional">Conventional</Option>
                                        </Select>
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
                                        id="rpm" 
                                        size='large' 
                                        variant="filled" 
                                        placeholder='Enter Spindle RPM'
                                        value={Machine["make"]}
                                        onChange={handleChange} 
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
                                        value={Machine["make"]}
                                        onChange={handleChange}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Specification (Diameter)" name="diameter">
                                        <Input 
                                        className="custom-input" 
                                        variant="filled" 
                                        id="diameter" 
                                        placeholder='Enter Diameter' 
                                        value={Machine["make"]}
                                        onChange={handleChange}
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
                                        id="axis" 
                                        size='large' 
                                        variant="filled" 
                                        placeholder='Enter No. of Axis' 
                                        value={Machine["make"]}
                                        onChange={handleChange}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        label="Manufacturing Year"
                                        name="year"
                                        rules={[{ required: true, message: 'Year is required' }]}>
                                        <DatePicker 
                                        onChange={onChangeYear} 
                                        picker="year"
                                        placeholder='Select Manufacturing Year' 
                                        size="large" 
                                        variant="filled" 
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
                                        value={Machine["make"]}
                                        onChange={handleChange}
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
                                        value={Machine["make"]}
                                        onChange={handleChange}
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
                            </Row>
                        </Form> :



                            <Form layout="vertical" >
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item name="type" label="Machine Type" rules={[{ required: true, },]}>
                                            <Select size='large' variant="filled" onChange={handleChangeType}
                                                style={{ width: '93%' }} placeholder='Select Machine Type'>
                                                <Option value="CNC Machine 1">CNC Machine 1</Option>
                                                <Option value="CNC Machine 2">CNC Machine 2</Option>
                                                <Option value="CNC EDM 1">CNC EDM 1</Option>
                                                <Option value="CNC EDM 2">CNC EDM 2</Option>
                                                <Option value="ZNC EDM 1">ZNC EDM 1</Option>
                                                <Option value="ZNC EDM 2">ZNC EDM 2</Option>
                                                <Option value="Wirecut 1">Wirecut 1</Option>
                                                <Option value="Wirecut 2">Wirecut 2</Option>
                                                <Option value="Conventional">Conventional</Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            label="Specification (Length)"
                                            name="length">
                                            <InputNumber id="length" size='large' variant="filled" placeholder='Enter Length (mm)' />
                                        </Form.Item>
                                        <Form.Item
                                            label="Specification (Height)"
                                            name="height">
                                            <InputNumber id="height" size='large' variant="filled" placeholder='Enter Height (mm)' />
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
                                            <InputNumber id="breadth" size='large' variant="filled" placeholder='Enter Breadth (mm)' />
                                        </Form.Item>
                                        <Form.Item label="Specification (Diameter)" name="diameter">
                                            <Input className="custom-input" variant="filled" id="diameter" placeholder='Enter Diameter' />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>}
                    </Modal>
                </div>
            </ConfigProvider>
        </div>
    )
}

export default Machines