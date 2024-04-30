import { requestHandler } from "./requestHandler";
import  AUTHEN_URLS  from './../utils/urls'
import axios from 'axios'
import { baseAPIUrl } from "./../utils/constants";




export const getOtp = async (isMail, data) => {
    try {
        const url = isMail == 1 ? AUTHEN_URLS.GET_MAIL_OTP : AUTHEN_URLS.GET_MOBILE_OTP
        
        if (isMail) {
            let obj = {}
            obj.email = data;
            obj.type = "VERIFICATION"
            data = obj;
        }
        else {
            let obj = {};
            obj.mobile_no = data
            data = obj
        }
        const response = await requestHandler.get(baseAPIUrl+url, data);
        return response
    }
    catch (err) {
        throw err
    }
}

export const verifyOtp = async (isMail, data) => {
    try {
        const url = isMail == 1 ? AUTHEN_URLS.VERIFY_MAIL_OTP : AUTHEN_URLS.VERIFY_MOBILE_OTP
        const response = await requestHandler.get(baseAPIUrl+url, data);
        return response
    }
    catch (err) {
        throw err
    }

}


export const signUp = async (data) => {

    try {
        const url = AUTHEN_URLS.SIGNUP
        const user = await requestHandler.post(url, data)
        return user
    }
    catch (err) {
        throw (err)
    }
}


export const login =async (data,isMail)=>{
    data.isMail=isMail
    try{
       const url=AUTHEN_URLS.LOGIN;
       const user = await requestHandler.post(url,data);
       return user
    }
    catch(err){
        throw (err)
    }
}

export const checkUser=async (isMail,uniqueField,userName, id)=>{
      const url=AUTHEN_URLS.CHECK_USER;
       let isUser;
       let params={
        isMail: isMail,
        uniqueField: uniqueField,
        userName: userName,
        id: id
       }
      isUser= axios.get(baseAPIUrl+url, {
        params
      }).then((res)=>{
        return res.data;
      })
      .catch(err=>console.log(err))
     
      return isUser
}


export const chnagePassword =  ((uniqueField,oldPass,newPass)=>{
    const url=AUTHEN_URLS.CHANGE_PASSWORD;
    let isPasswordChanged;
    let params={
     uniqueField: uniqueField,
     oldpass: oldPass,
     newpass: newPass,
    }

    isPasswordChanged= axios.patch(baseAPIUrl+url,   params
      ).then((res)=>{
        return res.data;
      })
      .catch(err=>console.log(err))
     
      return isPasswordChanged
})

export const googleauthentication = ((data)=>{
    const url = AUTHEN_URLS.GOOGLE_AUTHENTICATION;
    let res = axios.post(baseAPIUrl+url , data).then((response)=>{
        return response.data;
    }).catch((err)=>{
        console.log(err)
    })

    return res

})

export const getTokendata = ((params) => {
    const url = AUTHEN_URLS.GET_TOKEN;
    let res = axios.get(baseAPIUrl+url, {params}).then((response) => {
        return response.data;
    }).catch((err) => {
        console.log(err)
    })
    return res;
})


export const getRefresh = (() => {
    const url = AUTHEN_URLS.REFRESH_TOKEN;
    let res = axios.get(baseAPIUrl+url,{
        withCredentials: true
    }).then((response) => {
        console.log(response)
        return response.data
    }).catch((err) => {
        console.log(err)
    })

    return res;
})

export const logOut = (() => {
    const url = AUTHEN_URLS.LOGOUT
    let res = axios.get (baseAPIUrl+url,{
        withCredentials: true
    }).then((response) => {
        return response.data
    }).catch((err) => {
        console.log(err)
    })

    return res
})