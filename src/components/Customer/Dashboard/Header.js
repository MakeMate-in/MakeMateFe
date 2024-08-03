
import React, { useEffect, useState, useMemo } from 'react';
import { Button, Layout, AutoComplete } from 'antd';
import { useNavigate } from 'react-router-dom';
import { OPEN_ROUTES, PRODUCT_URL_PATTERN, ROLE } from '../../../utils/constants';
import { UserOutlined } from '@ant-design/icons';
import Profile from '../../Vendor/Profile/Profile';
import { getJwt, getRole } from '../../../utils/helper';
import { errorRouting } from '../../../utils/commons/validators';
import './Header.css';
import { SearchOutlined } from '@mui/icons-material';
import { getSearchResults } from '../../../apis/commonFunctions';
import debounce from 'lodash.debounce';
import Factory from '@mui/icons-material/Factory';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const { Header } = Layout;

const CustomerHeader = (props) => {
    const [search, setSearch] = useState(undefined)
    const navigate = useNavigate();
    const [loggedIn, setloggedIn] = useState(false);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        try {
            const jwt = getJwt();
            const path = window.location.pathname;
            if (jwt && jwt !== '' && (path === OPEN_ROUTES.CUSTOMER_DASHBOARD || PRODUCT_URL_PATTERN.test(path))) {
                setloggedIn(true);
            } else if (!PRODUCT_URL_PATTERN.test(path) && path !== OPEN_ROUTES.PARENT_ROUTE) {
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



    const handleSelect = (value) => {
        if (value == undefined || value == '') {
            props.fetchDetails()
        }
        setSearch(value)
    }

    const handleSearch = async (value) => {
        try {
            if (value) {
                setSearch(value)
                let params = {
                    search: value
                }
                const res = await getSearchResults(params)
                if (res.success) {
                    const filteredOptions = res.data.filter(option =>
                        option.value.toLowerCase().includes(value.toLowerCase())
                    );
                    setOptions(filteredOptions);
                }
            } else {
                setOptions([]);
            }
        }
        catch (err) {
            return err
        }
    };


    const debounceResults = useMemo(() => {
        return debounce(handleSearch, 300);
    }, [])

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            props.handleSearch(search)
        }
    };

    const backToHome = () => {
        if(loggedIn){
            navigate(OPEN_ROUTES.CUSTOMER_DASHBOARD);
        } else {
            navigate(OPEN_ROUTES.PARENT_ROUTE);
        }
    };


    return (
        <Header
            className='flex items-center justif-between bg-white'
            style={{
                justifyContent: 'space-between',
                background: 'white',
                borderBottom: '1px solid black',
                height: '80px'
            }}
        >
            {PRODUCT_URL_PATTERN.test(window.location.pathname) ? <ArrowBackIcon onClick={backToHome} style={{cursor: 'pointer'}} /> : ''}

            <div className="demo-logo" style={{ color: '#fff', fontWeight: '700', fontSize: '1.5rem' }}>
                🛠<span style={{ color: 'black' }}>MAKERS MATE</span>
            </div>


            {(window.location.pathname == OPEN_ROUTES.PARENT_ROUTE || window.location.pathname == OPEN_ROUTES.CUSTOMER_DASHBOARD) ?

                <div className='flex  border border-gray-300 rounded-full items-center justify-center shadow-md shadow-gray-300 w-1/3 '>

                    <AutoComplete
                        id="myInput"
                        placeholder='Search'
                        allowClear
                        size={"large"}
                        onKeyDown={handleKeyDown}
                        // value={search}
                        onChange={handleSelect}
                        options={options}
                        style={{
                            width: '110%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '9999px'
                        }}
                        onSelect={handleSelect}
                        onSearch={debounceResults}
                        filterOption={true}
                    />
                    <Button
                        id="myBtn"
                        className='bg-primary text-white p-2 rounded-full'
                        onClick={() => { props.handleSearch(search) }}
                        onKeyPress={() => { props.handleSearch(search) }}
                    >
                        <SearchOutlined />

                    </Button>
                </div> : ''}

            <div style={{ display: 'flex', alignItems: 'center' }}>
                {
                    getRole() == ROLE.VENDOR ? <Button
                        onClick={() => {
                            navigate(OPEN_ROUTES.DIGITAL_FACTORY)
                        }}
                        size="large"
                        style={{
                            background: 'transparent',
                            border: 'transparent',
                            color: 'black',
                            boxShadow: '0 4px 4px rgba(0, 0, 0, 0.2)',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            transition: 'all 0.2s ease-in-out',
                            marginRight: '2vw'
                        }}
                    >
                        <Factory /> Digital Factory
                    </Button> : ''
                }
                {loggedIn ? (
                    <Profile />
                ) : (
                    <Button

                        onClick={login}
                        size="large"
                        style={{
                            background: 'transparent',
                            border: 'transparent',
                            color: 'black',
                            boxShadow: '0 4px 4px rgba(0, 0, 0, 0.2)',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            transition: 'all 0.2s ease-in-out',
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
