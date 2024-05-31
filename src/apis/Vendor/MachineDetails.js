import { requestHandler } from "./../requestHandler";
import  { MACHINE_DETAILS_URL }  from './../../utils/urls'
import axios from 'axios'
import { baseAPIUrl } from "./../../utils/constants";


 
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


export const addMachineDetails = async (params,data) => {
    try {
        const url = MACHINE_DETAILS_URL.ADD_MACHINE_DETAILS
        data = await axios.post(baseAPIUrl+url,data,{
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



export const deleteMachineDetails = async (params,data) => {
    try {
        const url = MACHINE_DETAILS_URL.DELETE_MACHINE_DETAILS
        data = await axios.delete(baseAPIUrl+url,data,{
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
