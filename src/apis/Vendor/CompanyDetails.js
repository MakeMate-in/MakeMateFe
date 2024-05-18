import { requestHandler } from "./requestHandler";
import  {  COMPANY_DETAILS_URLS }  from './../../utils/urls'
import axios from 'axios'
import { baseAPIUrl } from "./../utils/constants";


 
export const getCompanyDetails = async (data) => {
    try {
        const url = COMPANY_DETAILS_URLS.GET_COMPANY_DETAILS
        const response = await requestHandler.get(baseAPIUrl+url, data);
        return response
    }
    catch (err) {
        throw err
    }
}

export const updateCompanyDetails = async (params,data) => {
    try {
        const url = COMPANY_DETAILS_URLS.UPDATE_COMPANY_DETAILS
        data = axios.patch(baseAPIUrl+url,data,{
            params: params
        }).then((res)=>{
          return res;
        })
        .catch(err=>console.log(err))
        const response = await requestHandler.get(baseAPIUrl+url, data);
        return response
    }
    catch (err) {
        throw err
    }

}


export const addCompany_Details = async (userData,role) => {

    try {
        let data = {}
        data = getUserData(userData, role)
        console.log(data)
        const url = AUTHEN_URLS.SIGNUP
        const user = await requestHandler.post(url, data)
        return user
    }
    catch (err) {
        throw (err)
    }
}


export const login =async (data)=>{
    
    try{
       const url=AUTHEN_URLS.LOGIN;
       const user = await requestHandler.post(url,data);
       return user
    }
    catch(err){
        throw (err)
    }
}

export const customerSignUp = async (userData,role) => {

    try {
        let data = {}
        data = getCustomerData(userData, role)
        console.log(data)
        const url = AUTHEN_URLS.CUSTOMERSIGNUP
        const user = await requestHandler.post(url, data)
        return user
    }
    catch (err) {
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