import Home from '@mui/icons-material/Home';
import Factory from '@mui/icons-material/Factory';
import Logout from '@mui/icons-material/Logout';
import Dashboard from '@mui/icons-material/DashboardCustomizeRounded';

// export const baseAPIUrl = 'http://localhost:5000';
export const baseAPIUrl = 'http://148.135.136.187:5000';

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
    PATCH = 'patch',
    DELETE = 'delete'
};

export enum OPEN_ROUTES {
    PARENT_ROUTE = '/', 
    LOGIN = '/login',
    CUSTOMER_LOGIN = '/customer/login',
    SIGNUP = '/signup',
    FORGOTPASSWORD = '/forgotpassword',
    MAIN_PAGE = '/dashboard',
    CUSTOMER_SIGNUP = '/customer/signUp',
    VENDOR_DASHBOARD = '/vendor/dashboard',
    CUSTOMER_DASHBOARD = '/customer/dashboard',
    DIGITAL_FACTORY = '/vendor/digital-factory',
    PRODUCT_DETAILS = '/product/vendor/',
    PRODUCT = '/product/vendor/:company_id'
};

export const PRODUCT_URL_PATTERN = /^\/product\/vendor\/.*$/;

export enum MESSAGES {
    SUCCESS= "SUCCESS",
    ERROR= "ERROR",
    ADD='Add',
    EDIT='Edit'
};

export const EMAIL:RegExp =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
export const PASSWORD:RegExp=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
export const MOBILE:RegExp=/^[0-9]{10}$/

export const ROLE = {
    VENDOR: "Vendor",
    CUSTOMER: "Customer"
}


export const VENDOR_DRAWER_LIST = [
    {
        id: 0,
        name: 'Dashboard',
        icon: <Dashboard/>,
        route: OPEN_ROUTES.VENDOR_DASHBOARD
    },
    {
        id: 1,
        name: 'Digital Factory',
        icon: <Factory/>,
        route: OPEN_ROUTES.DIGITAL_FACTORY
    },
    {
        id: 2,
        name: 'Customer Dashboard',
        icon: <Home/>,
        route: OPEN_ROUTES.CUSTOMER_DASHBOARD
    },
    {
        id: 3,
        name: 'Logout',
        icon: <Logout/>,
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

export const STEP_TAB_MAP_INFRA = {
    0: '1',
    1: '2',
    2: '3',
}

export const STEP_TAB_MAP_INFRA_2 = {
    '1': 0,
    '2': 1,
    '3': 2,
    '4': 3
}

export const STEPS_HEADINGS = {
    0: 'Company Overview',
    1: 'Infrastructure Details',
    2: 'Product Details',
    3: 'Complete'
}


export const PER_COUNT=10
export const PER_INFRA_COUNT=2
export const PER_MACHINE_COUNT=1

export const MIN_VALUE=3
export const MAX_VALUE=5

// export const baseURL = 'http://localhost:3000'
export const baseURL = 'https://weconnect.makersmate.in'


// export const HANDLE_REGEX:RegExp = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?/~\\-]+$/;
