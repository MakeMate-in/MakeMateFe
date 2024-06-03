import { requestHandler } from "./../requestHandler";
import { INFRA_DETAILS_URL} from "../../utils/urls";
import axios from 'axios'
import { baseAPIUrl } from "./../../utils/constants";


export const getInfraDetails = async (company_id) => {
    try{
        const url = INFRA_DETAILS_URL.GET_INFRA_DETAILS;
        const params={
            ids:company_id
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

        return res
    }
    catch(err)
    {
        throw err;
    }
}

export const updateInfraDetails = async (params,data) => {
    try {
       
        const url = INFRA_DETAILS_URL.UPDATE_INFRA_DETAILS
        data = await axios.patch(baseAPIUrl+url,data,{
            params:params
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

export const addInfraDetails = async (params,data) => {
    try {
        const url = INFRA_DETAILS_URL.ADD_INFRA_DETAILS;
        let response = await axios.post(baseAPIUrl+url,
            data,
            {
            params:params
            })
        return response
    }
    catch (err) {
        throw err
    }

}

export const deleteInfraDetails = async (company_id) => {
    try {
        const url = INFRA_DETAILS_URL.DELETE_INFRA_DETAILS;
        const params={
            id:company_id
        };
        const data = await axios.delete(baseAPIUrl+url,{
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


