export enum AUTHEN_URLS{
    LOGIN='/api/users/login',
    SIGNUP='/api/users/signup',
    FORGOTPASSWORD='/api/users/forgotpassword',
    SENDEMAILOTP='/api/users/emailOtp',
    CUSTOMER_SIGNUP='/api/users/customersignup',
    GET_MOBILE_OTP='/api/users/getOtp',
    VERIFY_MOBILE_OTP='/api/users/verifyOtp',
    GET_MAIL_OTP='/api/users/emailOtp',
    VERIFY_MAIL_OTP='/api/users/verifymailOtp',
    CHECK_USER='/api/users/check-user',
    CHANGE_PASSWORD='/api/users/change_Password',
    GOOGLE_AUTHENTICATION = '/api/users/google_authentication',
    GET_TOKEN = '/api/users/verifyToken',
    REFRESH_TOKEN = '/api/auth/refresh',
    LOGOUT = '/api/users/logout',
    GET_ALL_USER_DETAILS = '/api/common/all-user-details',
}

export enum COMPANY_DETAILS_URLS{
  UPDATE_COMPANY_DETAILS = '/api/company/update/company-details',
  UPDATE_COMPANY_DETAILS_ARRAY = '/api/company/update/company-details/add',
  UPDATE_COMPANY_DETAILS_ARRAY_ELEMENT = '/api/company/update/company-details/update',
  GET_COMPANY_DETAILS = '/api/company/get/company-details',
  REMOVE_COMPANY_DETAILS_ARRAY_ELEMENT = '/api/company/delete/company-detail/one',
  UPLOAD_AVATAR = '/api/company/upload-avatar',
  GET_ALL_DETAILS = '/api/company/get/company-details/all',
  UPDATE_PRIMARY_DETAILS = '/api/company/update/company-details/handle-primary'
}

export enum CERTIFICATES_URLS{
  UPLOAD_CERTIFICATE = '/api/company/upload-certificate',
  GET_CERTIFICATES = '/api/company/get-certifiates',
  DELETE_CERTIFICATES = '/api/company/delete-certifiates',
  UPLOAD_DATA = '/api/company/upload-data'
}

export enum PLANT_IMAGES_URLS{
  UPLOAD_IMAGE = '/api/company/upload-images',
  GET_IMAGES = '/api/company/get-images',
  DELETE_IMAGES = '/api/company/delete-images',
}

export enum MACHINE_DETAILS_URL{
    ADD_MACHINE_DETAILS = '/api/company/machine-details/add',
    UPDATE_MACHINE_DETAILS = '/api/company/machine-details/update',
    GET_MACHINE_DETAILS = '/api/company/machine-details/get',
    DELETE_MACHINE_DETAILS = '/api/company/machine-details/delete',
    UPLOAD_MACHINE_IMAGE = '/api/company/machine-details/upload-image'
}

export enum INFRA_DETAILS_URL{
  ADD_INFRA_DETAILS = '/api/company/infrastructure-details/add',
  UPDATE_INFRA_DETAILS = '/api/company/infrastructure-details/update',
  GET_INFRA_DETAILS = '/api/company/infrastructure-details/get',
  DELETE_INFRA_DETAILS = '/api/company/infrastructure-details/delete',
}

export enum SERVICE_DETAILS_URL{
  ADD_SERVICE_DETAILS = '/api/company/add/services',
  UPDATE_SERVICE_DETAILS = '/api/company/update/services',
  GET_SERVICE_DETAILS = '/api/company/get/services',
  DELETE_SERVICE_DETAILS = '/api/company/delete/services',
}

export enum UPLOAD_FILES_URL{

}

export enum PRODUCT_DETAILS_URL{
CREATE_PRODUCT = '/api/company/create-product',
UPDATE_PRODUCT = '/api/company/update-product',
GET_PRODUCT_DETAILS = '/api/company/get-products',
DELETE_SINGLE_PRODUCT = '/api/company/delete-product',
DELETE_ALL_PRODUCTS = '/api/company/delete-all-product',
UPLOAD_TOOL_IMAGE = '/api/company/upload-tool-images',
UPLOAD_PRODUCT_IMAGE = '/api/company/upload-product-images'
}