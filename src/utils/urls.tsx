export enum AUTHEN_URLS{
    LOGIN='/api/users/login',
    SIGNUP='/api/users/signup',
    CUSTOMERSIGNUP='api/users/customersignup',
    GET_MOBILE_OTP='/api/users/getOtp',
    VERIFY_MOBILE_OTP='/api/users/verifyOtp',
    GET_MAIL_OTP='/api/users/emailOtp',
    VERIFY_MAIL_OTP='/api/users/verifymailOtp',
    CHECK_USER='/api/users/check-user',
    CHANGE_PASSWORD='/api/users/change_Password',
    GOOGLE_AUTHENTICATION = '/api/users/google_authentication',
    GET_TOKEN = '/api/users/verifyToken',
    REFRESH_TOKEN = '/api/auth/refresh',
    LOGOUT = '/api/auth/logout'
}

export enum COMPANY_DETAILS_URLS{
  UPDATE_COMPANY_DETAILS = '/api/company/update/company-details',
  UPDATE_COMPANY_DETAILS_ARRAY = '/api/company/update/company-details/add',
  UPDATE_COMPANY_DETAILS_ARRAY_ELEMENT = '/api/company/update/company-details/update',
  GET_COMPANY_DETAILS = '/api/company//get/company-details',
  REMOVE_COMPANY_DETAILS_ARRAY_ELEMENT = '/api/company/delete/company-detail/one',
  UPLOAD_AVATAR = '/api/company/upload-avatar'
}

export enum MACHINE_DETAILS_URL{
    
}

export enum INFRA_DETAILS_URL{

}

export enum UPLOAD_FILES_URL{

}

export enum PRODUCT_DETAILS_URL{
CREATE_PRODUCT = '/api/company/create-product',
UPDATE_PRODUCT = '/api/company/update-product',
GET_PRODUCT_DETAILS = '/api/company/get-products',
DELETE_SINGLE_PRODUCT = '/api/company/delete-product',
DELETE_ALL_PRODUCTS = '/api/company/delete-all-product'
}