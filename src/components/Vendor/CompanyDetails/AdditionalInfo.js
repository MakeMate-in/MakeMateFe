import { Button, Flex, Modal, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';


const AdditionalInfo = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <div style={{ overflow: 'auto', scrollbarWidth: 'thin' }}>
      <section style={{ height: '12rem' }}>
        <Flex>
          <div>
            <h2 style={{ margin: '0' }}>Key Customers you have Worked With</h2>
            <p style={{ margin: '0' }}>Add customers you have worked with so we can share your profile with similar set of new customers.</p>
          </div>
          <Button size='large' onClick={showModal} icon={<PlusOutlined />} iconPosition='start' style={{ fontWeight: 600, marginLeft: 'auto' }}>Add New Customer</Button>
          <Modal title="Basic Modal" centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form>
              <Form.Item label="Customer Name" name="customerName"
                rules={[{
                  required: true,
                  message: 'Please input your username!',
                }
                ]}
              >
                <Input />
              </Form.Item>

            </Form>
          </Modal>
        </Flex>
      </section>
      <hr />
      <section>
        <Flex>
          <div>
            <h2 style={{ margin: '0' }}>Projects</h2>
            <p style={{ margin: '0' }}>Add Projects</p>
          </div>
          <Button size='large' icon={<PlusOutlined />} iconPosition='start' style={{ fontWeight: 600, marginLeft: 'auto' }}>Add New Project</Button>
        </Flex>
      </section>
    </div>
  )
}

export default AdditionalInfo