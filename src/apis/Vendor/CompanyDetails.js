import { requestHandler } from "./../requestHandler";
import  {  CERTIFICATES_URLS, COMPANY_DETAILS_URLS, PLANT_IMAGES_URLS }  from './../../utils/urls'
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

export const uploadCertificate = async (company_id, file) => {
    const url = CERTIFICATES_URLS.UPLOAD_CERTIFICATE;
    // const authToken = getAccessToken();
    const headers = {
        // 'Authorization': authToken,
        'Content-Type':' multipart/form-data;',
      }
    const params={
        company_id:company_id
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
}

export const getCertificates     = async (company_id) => {
    const url = CERTIFICATES_URLS.GET_CERTIFICATES;
    // const authToken = getAccessToken();
    const headers = {
        // 'Authorization': authToken,
        // 'Content-Type':' multipart/form-data;',
      }
      const params={
        company_id:company_id
    }
    let res = await axios.get(
        baseAPIUrl+url ,
        {
            // headers:headers,
            params:params
        
        }).then((response) => {
        return response.data;
    })
    .catch((err) => {
        console.log(err);
    })
    return res;
}

export const deleteCertificates = async (company_id, file) => {
    const url = CERTIFICATES_URLS.DELETE_CERTIFICATES;
    // const authToken = getAccessToken();
    const headers = {
        // 'Authorization': authToken,
        'Content-Type':' multipart/form-data;',
      }
    const params={
        company_id:company_id
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
}

export const uploadPlantImages = async (company_id, file) => {
    const url = PLANT_IMAGES_URLS.UPLOAD_IMAGE;
    // const authToken = getAccessToken();
    const headers = {
        // 'Authorization': authToken,
        'Content-Type':' multipart/form-data;',
      }
    const params={
        company_id:company_id
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
}

export const getPlantImages = async (company_id) => {
    const url = PLANT_IMAGES_URLS.GET_IMAGES;
    // const authToken = getAccessToken();
    const headers = {
        // 'Authorization': authToken,
        // 'Content-Type':' multipart/form-data;',
      }
      const params={
        company_id:company_id
    }
    let res = await axios.get(
        baseAPIUrl+url ,
        {
            // headers:headers,
            params:params
        
        }).then((response) => {
        return response.data;
    })
    .catch((err) => {
        console.log(err);
    })
    return res;
}

export const deletePlantImages = async (company_id, file) => {
    const url = PLANT_IMAGES_URLS.DELETE_IMAGES;
    // const authToken = getAccessToken();
    const headers = {
        // 'Authorization': authToken,
        'Content-Type':' multipart/form-data;',
      }
    const params={
        company_id:company_id
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
}

export const getAllDetails = async (data) => {
    try {
        const url = COMPANY_DETAILS_URLS.GET_ALL_DETAILS;
        const response = await requestHandler.get(baseAPIUrl+url, data);
        return response
    }
    catch (err) {
        throw err
    }
}