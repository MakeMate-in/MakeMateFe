import React from 'react'
import { Button, Layout, theme, AutoComplete, Input, Row, Flex } from 'antd';
import "./../../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import { useNavigate } from 'react-router-dom';
import { OPEN_ROUTES } from '../../../utils/constants';
import { UserOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

const CustomerHeader = (props) => {

    const navigate = useNavigate()

    const login = () => {
        navigate(OPEN_ROUTES.LOGIN)
    }

    const handleSelect = (value) => {

    };


    return (
        <Header
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            <div className="demo-logo" style={{ color: '#fff', fontWeight: '700', fontSize: '1.5rem' }}>🛠MAKERS MATE</div>

            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                <AutoComplete
                    popupMatchSelectWidth={252}
                    style={{
                        width: 300,
                        marginRight: '20px'
                    }}
                    options={props.options.map(option => ({ value: option }))}
                    onSelect={handleSelect}
                    onSearch={props.handleSearch}
                    size="large"
                >
                    <Input.Search size="large" placeholder="Search" enterButton="Search" onSearch={handleSelect} />
                </AutoComplete>
                <Button onClick={login} size='large' style={{ marginLeft: 'auto', background: 'transparent', color: 'white', border: 'transparent' }}><UserOutlined />Sign Up/Login</Button>
            </div>
        </Header>
    )
}

export default CustomerHeader
