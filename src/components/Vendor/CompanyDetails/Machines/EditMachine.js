import {useState, useEffect} from 'react'
import { Input, Modal, Form, Row, Col, InputNumber, DatePicker } from 'antd';
import { openNotificationWithIcon } from '../../../../utils/helper';

const EditMachine = (props) => {

    const [form] = Form.useForm();
    const EditMachine = props.editItem
    const [bedSize, setBedSize] = useState({
      "length": props.editItem.bedSize.props?props.editItem.bedSize.props.children[0]:0,
            "breadth": props.editItem.bedSize.props?props.editItem.bedSize.props.children[2]:0,
            "height": props.editItem.bedSize.props?props.editItem.bedSize.props.children[4]:0,
    })

    useEffect(() => {
        setMachine({ ...Machine, ["bed_Size"]: { ...bedSize } })
    }, [bedSize])

    const [Machine, setMachine] = useState({
        "machine_type": EditMachine.type,
        "tonnage": props.editItem.tonnage,
        "no_of_Axis": props.editItem.axis,
        "manufacturing_year": "",
        "make": props.editItem.make,
        "bed_Size": {
            "length": props.editItem.bedSize.props?props.editItem.bedSize.props.children[0]:0,
            "breadth": props.editItem.bedSize.props?props.editItem.bedSize.props.children[2]:0,
            "height": props.editItem.bedSize.props?props.editItem.bedSize.props.children[4]:0,
        },
        "machine_name": props.editItem.name
    })

    const initialValues = {
        "machine_type": EditMachine.type,
        "tonnage": props.editItem.tonnage,
        "no_of_Axis": props.editItem.axis,
        "manufacturing_year": "",
        "make": props.editItem.make,
        "length": props.editItem.bedSize.props?props.editItem.bedSize.props.children[0]:'',
        "breadth": props.editItem.bedSize.props?props.editItem.bedSize.props.children[2]:'',
        "height": props.editItem.bedSize.props?props.editItem.bedSize.props.children[4]:'',
        "machine_name": props.editItem.name
    }

    const handleFormSubmit =async () => {
        try{
            
            const res = await props.handleEditForm(Machine, props.editItem.id)
            if(res.success){
                props.fetchMachineDetails()
                openNotificationWithIcon("success","Machine Updated Syccessfully")
            }
            else{
                openNotificationWithIcon("error","Something went wrong")
            }
            props.setEditModal(false)
            props.setIsConventional(false)
        }
        catch(err){
            console.log(err)
            openNotificationWithIcon("error","Something went wrong")
        }
    }

    
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

  return (
    <div>
      <Modal
                        title="Edit Machine"
                        centered
                        open={props.editModal}
                        okText="Save"
                        // footer={show ? null : ''}
                        onOk={form.submit}
                        onCancel={() => {
                            props.setEditModal(false)
                            props.setIsConventional(false)
                        }}
                        width={750}
                    >
                      
                      {!props.isConventional ?  
                       <Form layout="vertical"
                                onFinish={handleFormSubmit} form={form}
                                initialValues={initialValues}
                            >
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item name="type" label="Machine Type">
                                            <Input size='large'
                                                style={{ width: '93%' }}
                                                placeholder='Select Machine Type'
                                                defaultValue = {props.editItem.type}
                                                disabled
                                                 />
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
                                            // rules={[{ required: true, message: 'Tonnage is required' }]}
                                            >
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
                                            label="Manufacturing Year"
                                            name="manufacturing_year"
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
                                            label="No. of Axis"
                                            name="no_of_Axis"
                                            // rules={[{ required: true, message: 'No. of Axis is required' }]}
                                            >
                                            <InputNumber
                                                min={1}
                                                size='large'
                                                variant="filled"
                                                placeholder='Enter No. of Axis'
                                                value={Machine["no_of_Axis"]}
                                                onChange={(e) => { handleInputNumber("no_of_Axis", e) }}
                                            />
                                        </Form.Item>
                                     
                                    </Col>
                                </Row>
                                <h3 style={{fontWeight: '500', fontFamily: 'sans-serif'}}>Bed Size</h3>
                                <Row gutter={0}>
                                    <Col span={7} >
                                        <Form.Item label="Length" name="length">                                            
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
                                        <Form.Item label="Width" name="breadth">
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
                                        <Form.Item label="Height" name="height">
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
                                <Form layout="vertical" onFinish={handleFormSubmit} form={form} initialValues={initialValues} >
                                    <Row gutter={32}>
                                        <Col span={8}>


                                            <Form.Item name="type" label="Machine Type">
                                            <Input size='large' 
                                                style={{ width: '93%' }}
                                                placeholder='Select Machine Type'
                                                defaultValue = {props.editItem.type}
                                                disabled
                                                 />
                                            </Form.Item>

                                        </Col>
                                        <Col span={8}>
                                            <Form.Item label="Machine Name" name="machine_name" rules={[{ required: true, message: 'Machine Name is required' }]}>
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
                                            <Form.Item label="Count" name="tonnage" rules={[{ required: true, message: 'Machine Count is required' }]}>
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
  )
}

export default EditMachine
