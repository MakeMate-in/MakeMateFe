// import React,{useEffect, useState} from 'react'
// import { Button, Layout, theme, AutoComplete, Input, Row, Flex } from 'antd';
// import "./../../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
// import { useNavigate } from 'react-router-dom';
// import { OPEN_ROUTES } from '../../../utils/constants';
// import { UserOutlined } from '@ant-design/icons';
// import Profile from '../../Vendor/Profile/Profile';
// import { getJwt, getJWTData, openNotificationWithIcon } from '../../../utils/helper';
// import { errorRouting } from '../../../utils/commons/validators';

// const { Header, Content, Sider } = Layout;

// const CustomerHeader = () => {

//     const navigate = useNavigate()
//     const [loggedIn, setloggedIn] = useState(false)

//     useEffect(() => {
//        try{
//         const jwt = getJwt()
//         const path= window.location.pathname
//         if(jwt && jwt!='' && path == OPEN_ROUTES.CUSTOMER_DASHBOARD ){
//             setloggedIn(true)
//         }
//         else if(path !== OPEN_ROUTES.PARENT_ROUTE){
//             errorRouting()
//             navigate(OPEN_ROUTES.PARENT_ROUTE)    
//         }
//        }
//        catch(err){
//             errorRouting()
//             navigate(OPEN_ROUTES.PARENT_ROUTE)    
//        }
//     },[])
    
//     const login = () => {
//         navigate(OPEN_ROUTES.LOGIN)
//     }

//     const handleSelect = (value) => {

//     };


//     return (
//         <Header
//             style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 background:'white'
//             }}
//         >
//             <div className="demo-logo" style={{ color: '#fff', fontWeight: '700', fontSize: '1.5rem' }}>🛠<span style={{color:'black'}}>MAKERS MATE</span></div>

//             <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
            
//            {    
//            loggedIn ? <Profile/>
//            :<Button onClick={login} size='large' style={{ marginLeft: 'auto', background: 'transparent', color: 'white', border: 'transparent', color:'black' }}><UserOutlined />Sign Up/Login</Button>
//            }
//             </div>
//         </Header>
//     )
// }

// export default CustomerHeader





import React, { useEffect, useState } from 'react';
import { Button, Layout, AutoComplete, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { OPEN_ROUTES } from '../../../utils/constants';
import { UserOutlined } from '@ant-design/icons';
import Profile from '../../Vendor/Profile/Profile';
import { getJwt, openNotificationWithIcon } from '../../../utils/helper';
import { errorRouting } from '../../../utils/commons/validators';
import './Header.css';

const { Header } = Layout;

const allOptions = [
    { value: 'One' },
    { value: 'Zero' },
    { value: 'Five' },
    { value: 'Two' },
    { value: 'Twelve' }
];

const CustomerHeader = () => {
    const navigate = useNavigate();
    const [loggedIn, setloggedIn] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        try {
            const jwt = getJwt();
            const path = window.location.pathname;
            if (jwt && jwt !== '' && path === OPEN_ROUTES.CUSTOMER_DASHBOARD) {
                setloggedIn(true);
            } else if (path !== OPEN_ROUTES.PARENT_ROUTE) {
                errorRouting();
                navigate(OPEN_ROUTES.PARENT_ROUTE);
            }
        } catch (err) {
            errorRouting();
            navigate(OPEN_ROUTES.PARENT_ROUTE);
        }
    }, [navigate]);

    const login = () => {
        navigate(OPEN_ROUTES.LOGIN);
    };

    const handleSearch = (value) => {
        if (value) {
            // Show options only if the input field is not empty
            const filteredOptions = allOptions.filter(option =>
                option.value.toLowerCase().includes(value.toLowerCase())
            );
            setOptions(filteredOptions);
        } else {
            // Hide options if the input field is empty
            setOptions([]);
        }
    };

    return (
        <Header
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'white'
            }}
        >
            <div className="demo-logo" style={{ color: '#fff', fontWeight: '700', fontSize: '1.5rem' }}>
                🛠<span style={{ color: 'black' }}>MAKERS MATE</span>
            </div>
            
            <div className="flex-1 flex justify-center">
                <AutoComplete
                    options={options}
                    style={{
                        width: 600,
                    }}
                    onSearch={handleSearch}
                    filterOption={false}
                >
                    <Input.Search
                        size="large"
                        variant="borderless"
                        placeholder="Search"
                        className="shadow-lg rounded-md px-3 py-2"
                        style={{
                            boxShadow: '0px px 8px rgba(0, 0, 0, 0.1)',
                            borderRadius: '5rem'
                        }}
                    />
                </AutoComplete>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                {loggedIn ? (
                    <Profile />
                ) : (
                    <Button
                        onClick={login}
                        size="large"
                        style={{
                            background: 'transparent',
                            border: 'transparent',
                            color: 'black'
                        }}
                    >
                        <UserOutlined /> Sign Up/Login
                    </Button>
                )}
            </div>
        </Header>
    );
};

export default CustomerHeader;
