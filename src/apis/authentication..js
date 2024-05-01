import { requestHandler } from "./requestHandler";
import  { AUTHEN_URLS }  from './../utils/urls'
import axios from 'axios'
import { baseAPIUrl } from "./../utils/constants";




export const getOtp = async (mobile_no) => {
    try {
        const url = AUTHEN_URLS.GET_MOBILE_OTP
        console.log(url)   
        let obj = {};
        obj.mobile_no = mobile_no
        const response = await requestHandler.get(baseAPIUrl+url, obj);
        return response
    }
    catch (err) {
        throw err
    }
}

export const verifyOtp = async (isMail, data) => {
    try {
        const url =  AUTHEN_URLS.VERIFY_MOBILE_OTP
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

export const checkUser=async (user, id)=>{
      const url=AUTHEN_URLS.CHECK_USER;
       let isUser;
       let params={
        user: user,
        id: id
       }
      isUser= axios.get(baseAPIUrl+url, {
        params
      }).then((res)=>{
        console.log(res)
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