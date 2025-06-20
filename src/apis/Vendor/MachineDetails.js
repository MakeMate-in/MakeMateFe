import { requestHandler } from "./../requestHandler";
import  { MACHINE_DETAILS_URL }  from './../../utils/urls'
import axios from 'axios'
import { baseAPIUrl } from "./../../utils/constants";
import { getToken } from "../../utils/helper";
import { errorValidator } from "../../utils/commons/validators";

 
export const getMachineDetails = async (data) => {
    try {
        const url = MACHINE_DETAILS_URL.GET_MACHINE_DETAILS
        const response = await requestHandler.get(baseAPIUrl+url, data);
        return response
    }
    catch (err) {
        throw err
    }
}


export const updateMachineDetails = async (params,data) => {
    try {
        const url = MACHINE_DETAILS_URL.UPDATE_MACHINE_DETAILS
        data = await axios.patch(baseAPIUrl+url,data,{
            headers: {
                'Authorization': getToken(),
            },
            params: params
        }).then((res)=>{
          return res.data;
        })
        .catch(err=> {
            if (err.response.status == 401) {
                errorValidator(err)
            }
            else {
                return err
            }
        })
        return data
    }
    catch (err) {
        throw err
    }

}


export const addMachineDetails = async (params,data) => {
    try {
        const url = MACHINE_DETAILS_URL.ADD_MACHINE_DETAILS
        data = await axios.post(baseAPIUrl+url,data,{
            headers: {
                'Authorization': getToken(),
            },
            params: params
        }).then((res)=>{
          return res.data;
        })
        .catch(err=> {
            if (err.response.status == 401) {
                errorValidator(err)
            }
            else {
                return err
            }
        })
        return data
    }
    catch (err) {
        throw err
    }

}

export const deleteMachineDetails = async (params,data) => {
    try {
        const url = MACHINE_DETAILS_URL.DELETE_MACHINE_DETAILS
        data = await axios.delete(baseAPIUrl+url,{
            headers: {
                'Authorization': getToken(),
            },
            params: params
        }).then((res)=>{
          return res.data;
        })
        .catch(err=> {
            if (err.response.status == 401) {
                errorValidator(err)
            }
            else {
                return err
            }
        })
        return data
    }
    catch (err) {
        throw err
    }

}



export const uploadMachineImages = async (id, file) => {
    const url = MACHINE_DETAILS_URL.UPLOAD_MACHINE_IMAGE;
    // const authToken = getAccessToken();
    const headers = {
        'Authorization': getToken(),
        'Content-Type':' multipart/form-data;',
      }
    const params={
        machine_id:id
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
        if (err.response.status == 401) {
            errorValidator(err)
        }
        else {
            return err
        }
    })
    return res;
}
