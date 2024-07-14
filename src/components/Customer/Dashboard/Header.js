import React,{useEffect, useState} from 'react'
import { Button, Layout, theme, AutoComplete, Input, Row, Flex } from 'antd';
import "./../../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import { useNavigate } from 'react-router-dom';
import { OPEN_ROUTES } from '../../../utils/constants';
import { UserOutlined } from '@ant-design/icons';
import Profile from '../../Vendor/Profile/Profile';
import { getJwt, getJWTData, openNotificationWithIcon } from '../../../utils/helper';
import { errorRouting } from '../../../utils/commons/validators';

const { Header, Content, Sider } = Layout;

const CustomerHeader = (props) => {

    const navigate = useNavigate()
    const [loggedIn, setloggedIn] = useState(false)

    useEffect(() => {
       try{
        const jwt = getJwt()
        const path= window.location.pathname
        if(jwt && jwt!='' && path == OPEN_ROUTES.CUSTOMER_DASHBOARD ){
            setloggedIn(true)
        }
        else{
            errorRouting()
            navigate(OPEN_ROUTES.PARENT_ROUTE)    
        }
       }
       catch(err){
            errorRouting()
            navigate(OPEN_ROUTES.PARENT_ROUTE)    
       }
    })
    
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
           {    
           loggedIn ? <Profile/>
           :<Button onClick={login} size='large' style={{ marginLeft: 'auto', background: 'transparent', color: 'white', border: 'transparent' }}><UserOutlined />Sign Up/Login</Button>
           }
            </div>
        </Header>
    )
}

export default CustomerHeader
