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

export enum PROFILE_URLS{
    PROFILE='/api/profile/',
    GET_PROFILE = '/api/profile/getProfile',
    UPLOAD_AVATAR = '/api/profile/upload-profile',
    GET_AVATAR = '/api/profile/get-avatar',
    REMOVE_AVATAR = '/api/profile/remove-avatar'
}

export enum POSTS_URL{
    UPLOAD_POST='/api/posts/upload-post',
    UPLOAD_DATA='/api/posts/upload-data',
    GET_POST='/api/posts/get-posts',
    POST_COMMENT = '/api/posts/post-comment',
    GET_COMMENT = '/api/posts/get-comment'
}