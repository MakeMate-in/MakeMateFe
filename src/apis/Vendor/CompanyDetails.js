import { requestHandler } from "./../requestHandler";
import  {  COMPANY_DETAILS_URLS }  from './../../utils/urls'
import axios from 'axios'
import { baseAPIUrl } from "./../../utils/constants";


 
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
        data = await axios.patch(baseAPIUrl+url,data,{
            params: params
        }).then((res)=>{
          return res.data;
        })
        .catch(err=>console.log(err))
        return data
    }
    catch (err) {
        throw err
    }

}



export const updateAddressandContacts = async (params,data) => {
    try {
        const url = COMPANY_DETAILS_URLS.UPDATE_COMPANY_DETAILS_ARRAY
        data = await axios.patch(baseAPIUrl+url,data,{
            params: params
        }).then((res)=>{
          return res.data;
        })
        .catch(err=>console.log(err))
        return data
    }
    catch (err) {
        throw err
    }

}


export const deleteElement = async (params,data) => {
    try {
        data.params = params
        const url = COMPANY_DETAILS_URLS.REMOVE_COMPANY_DETAILS_ARRAY_ELEMENT
        data = await axios.delete(baseAPIUrl+url,{
            data: data
        }).then((res)=>{
          return res.data;
        })
        .catch(err=>console.log(err))
        return data
    }
    catch (err) {
        throw err
    }

}

export const updateElement = async (params,data) => {
    try {
        data.params = params
        const url = COMPANY_DETAILS_URLS.UPDATE_COMPANY_DETAILS_ARRAY_ELEMENT
        data = await axios.patch(baseAPIUrl+url,data,{
            params: params
        }).then((res)=>{
          return res.data;
        })
        .catch(err=>console.log(err))
        return data
    }
    catch (err) {
        throw err
    }

}


export const uploadAvatar = ( async(file,user) => {
    const url = COMPANY_DETAILS_URLS.UPLOAD_AVATAR;
    // const authToken = getAccessToken();
    const headers = {
        // 'Authorization': authToken,
        'Content-Type':' multipart/form-data;',
      }
    const params={
        user:user
    }
    let data={}
    data.file=file;
    let res = await axios.post(
        baseAPIUrl+url,data,
        {
            headers:headers,
            params:params
        
        }).then((response) => {
        return response.data;
    })
    .catch((err) => {
        console.log(err);
    })
    return res;
})