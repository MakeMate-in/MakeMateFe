import React, { useEffect, useState } from 'react'
import { Button, ConfigProvider, Input, Layout } from 'antd';
import "./../../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import { useNavigate } from 'react-router-dom';
import { OPEN_ROUTES, PRODUCT_URL_PATTERN } from '../../../utils/constants';
import { UserOutlined } from '@ant-design/icons';
import Profile from '../../Vendor/Profile/Profile';
import { getJwt } from '../../../utils/helper';
import { errorRouting } from '../../../utils/commons/validators';
import { SearchOutlined } from '@mui/icons-material';



const { Header, Content, Sider } = Layout;

const CustomerHeader = (props) => {

    const navigate = useNavigate()
    const [loggedIn, setloggedIn] = useState(false)
    const [search, setSearch] = useState(undefined)

    useEffect(() => {
        try {
            const jwt = getJwt()
            const path = window.location.pathname
            if (jwt && jwt != '' && path == OPEN_ROUTES.CUSTOMER_DASHBOARD) {
                setloggedIn(true)
            }
            else if (path !== OPEN_ROUTES.PARENT_ROUTE && !PRODUCT_URL_PATTERN.test(path)) {
                errorRouting()
                navigate(OPEN_ROUTES.PARENT_ROUTE)
            }
        }
        catch (err) {
            errorRouting()
            navigate(OPEN_ROUTES.PARENT_ROUTE)
        }
    }, [])

    const login = () => {
        navigate(OPEN_ROUTES.LOGIN)
    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    };

    return (
        <ConfigProvider
            theme={{
                components: {
                    Button: {
                        /* here is your component tokens */
                        defaultHoverBg: '#F5385D',
                        textHoverBg: 'none',
                        defaultHoverBorderColor: 'gray-100',
                        defaultHoverColor: '#F5385D',
                        // linkHoverBg: 'none'
                    },
                },
            }}
        >
            <Header className='flex justify-between items-center bg-white' style={{ height: '5rem', borderBottom: '1px solid gray' }}>
                <div
                    className="demo-logo font-bold text-white">
                    <span style={{ fontSize: '2.5rem' }}> 🛠 </span>
                    <span
                        style={{ color: 'black', fontSize: '1.8rem' }}>
                        MAKERS MATE
                    </span>
                </div>

                {(window.location.pathname == OPEN_ROUTES.PARENT_ROUTE || window.location.pathname == OPEN_ROUTES.CUSTOMER_DASHBOARD) ? <div className='flex gap-2 border border-gray-300 rounded-full items-center justify-center shadow-md shadow-gray-300 w-1/3'>
                    <Input
                        className='rounded-full border-transparent object-cover py-2 px-4'
                        placeholder='Search'
                        allowClear
                        size={"large"}
                        value={search}
                        onChange={handleChange}
                    />
                    <Button className='search-icon bg-primary text-white p-2 rounded-full' onClick={() => { props.handleSearch(search) }}>
                        <SearchOutlined />
                    </Button>
                </div> : ''}

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {
                        loggedIn ?
                            <Profile />
                            :
                            <div
                                className="bg-transparent border-transparent text-black hover:bg-gray-100 flex justify-center align-center gap-2"
                                style={{ fontSize: '1rem', cursor: 'pointer' }}
                                onClick={login}
                            ><UserOutlined style={{ fontSize: '1.8rem' }} />
                                Sign Up/Login
                            </div>
                    }
                </div>
            </Header>
        </ConfigProvider>
    )
}

export default CustomerHeader
