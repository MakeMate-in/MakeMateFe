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
    }
    catch(err)
    {
        throw err;
    }
        return res;
}

export const updateServiceDetails = async (company_id,service_name,service_type,supplier_details) => {
    try {
        const data = {
            company_id: company_id,
            service_name: service_name,
            service_type: service_type,
            supplier_details: supplier_details
        }
        const url = SERVICE_DETAILS_URL.UPDATE_SERVICE_DETAILS;
        data = await axios.patch(baseAPIUrl+url,data).then((res)=>{
          return res.data;
        })
        .catch(err=>console.log(err))
        return data
    }
    catch (err) {
        throw err
    }
}

export const addServiceDetails = async (company_id,service_name,service_type,supplier_details) => {
    try {
        const data = {
            company_id: company_id,
            service_name: service_name,
            service_type: service_type,
            supplier_details: supplier_details
        }
        const url = SERVICE_DETAILS_URL.ADD_SERVICE_DETAILS;
        data = await axios.post(baseAPIUrl+url,data).then((res)=>{
          return res.data;
        })
        .catch(err=>console.log(err))
        return data
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
        data = await axios.delete(baseAPIUrl+url,{
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