import Home from '@mui/icons-material/Home';
import Factory from '@mui/icons-material/Factory';
import Logout from '@mui/icons-material/Logout';

export const baseAPIUrl = 'http://localhost:5000';

export enum API_STATUS_ENUM {
    IDLE = "idle",
    LOADING = "loading",
    SUCCESS = "success",
    FAILED = "failed"
};

export enum API_METHODS {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete'
};

export enum OPEN_ROUTES {
    PARENT_ROUTE = '/', 
    LOGIN = '/login',
    SIGNUP = '/signup',
    FORGOTPASSWORD = '/forgotpassword',
    MAIN_PAGE = '/dashboard',
    CUSTOMER_SIGNUP = '/customer/signUp',
    VENDOR_DASHBOARD = '/vendor/dashboard',
    CUSTOMER_DASHBOARD = '/customer/dashboard'

};

export enum MESSAGES {
    SUCCESS= "SUCCESS",
    ERROR= "ERROR"
};

export const EMAIL:RegExp =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const PASSWORD:RegExp=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
export const MOBILE:RegExp=/^[0-9]{10}$/

export const ROLE = {
    VENDOR: "Vendor",
    CUSTOMER: "Customer"
}


export const VENDOR_DRAWER_LIST = [
    {
        name: 'Dashboard',
        icon: <Home/>
    },
    {
        name: 'Digital Factory',
        icon: <Factory/>
    },
    {
        name: 'Logout',
        icon: <Logout/>
    },
]

export const STEP_TAB_MAP = {
    0: '1',
    1: '2',
    2: '3',
    3: '4'
}

export const STEP_TAB_MAP_2 = {
    '1': 0,
    '2': 1,
    '3': 2,
    '4': 3
}
// export const HANDLE_REGEX:RegExp = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?/~\\-]+$/;
