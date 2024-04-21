

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
};

export enum MESSAGES {
    SUCCESS= "SUCCESS",
    ERROR= "ERROR"
};

// export const EMAIL:RegExp =/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
// export const PASSWORD:RegExp=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
// export const MOBILE:RegExp=/^[0-9]{10}$/

// export const HANDLE_REGEX:RegExp = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?/~\\-]+$/;
