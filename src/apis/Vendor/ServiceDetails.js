import { requestHandler } from "./../requestHandler";
import { SERVICE_DETAILS_URL } from "../../utils/urls";
import axios from 'axios'
import { baseAPIUrl } from "./../../utils/constants";

export const getServiceDetails = async (company_id) => {
    try{
        const url = SERVICE_DETAILS_URL.GET_SERVICE_DETAILS;
        const params={
            id:company_id
        }
        let res = await axios.get(
            baseAPIUrl+url ,
            {
                params:params
            }).then((response) => {
            return response.data;
     })
        .catch((err) => {
            console.log(err);
        })
        return res;
    }
    catch(err)
    {
        throw err;
    }
    
}

export const updateServiceDetails = async (params,data) => {
    try {
       
        const url = SERVICE_DETAILS_URL.UPDATE_SERVICE_DETAILS;
        const response = await axios.patch(baseAPIUrl+url,data,{
            params:params
        }).then((res)=>{
          return res.data;
        })
        .catch(err=>console.log(err))
        return response
    }
    catch (err) {
        throw err
    }
}

export const addServiceDetails = async (params,services) => {
    try {
        const url = SERVICE_DETAILS_URL.ADD_SERVICE_DETAILS;
        const response = await axios.post(baseAPIUrl+url,services,{
            params:params
        }).then((res)=>{
          return res.data;
        })
        .catch(err=>console.log(err))
        return response
    }
    catch (err) {
        throw err
    }

}

export const deleteServiceDetails = async (company_id) => {
    try {
        const url = SERVICE_DETAILS_URL.DELETE_SERVICE_DETAILS;
        const params={
            id:company_id
        };
        const response = await axios.delete(baseAPIUrl+url,{
            params: params
        }).then((res)=>{
          return res.data;
        })
        .catch(err=>console.log(err))
        return response
    }
    catch (err) {
        throw err
    }

}