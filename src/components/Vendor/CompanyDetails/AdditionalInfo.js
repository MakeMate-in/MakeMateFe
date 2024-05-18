import { Button, Flex } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const AdditionalInfo = () => {
  return (
    <div>
        <Flex>
        <h2>Key Customers you have Worked With</h2>
        <Button size='large' icon={<PlusOutlined />} iconPosition='start' style={{fontWeight:600}}>Add New Customer</Button>
        </Flex>
    </div>
  )
}

export default AdditionalInfo