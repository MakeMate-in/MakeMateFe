import { requestHandler } from "./../requestHandler";
import { PRODUCT_DETAILS_URL} from "../../utils/urls";
import axios from 'axios'
import { baseAPIUrl } from "./../../utils/constants";

export const getProductDetails = async (data) => {
    try {
        const url = PRODUCT_DETAILS_URL.GET_PRODUCT_DETAILS;
        const response = await requestHandler.get(baseAPIUrl+url, data);
        return response
    }
    catch (err) {
        throw err
    }
}

export const updateProductDetails = async (company_id,product_id,customer_name,product_name,part_material,tool_material,no_of_cavity,runner,tool_tonnage,manufacturing_year) => {
    try {
        const data = {
            company_id: company_id,
            product_id: product_id,
            customer_name: customer_name,
            product_name: product_name,
            part_material: part_material,
            tool_material: tool_material,
            no_of_cavity: no_of_cavity,
            runner: runner,
            tool_tonnage: tool_tonnage,
            manufacturing_year: manufacturing_year
        }
        const url = PRODUCT_DETAILS_URL.UPDATE_PRODUCT
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

export const addProductDetails = async (params,data) => {
    try {
        const url = PRODUCT_DETAILS_URL.CREATE_PRODUCT
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

export const deleteProductDetails = async (params) => {
    try {
        const url = PRODUCT_DETAILS_URL.DELETE_SINGLE_PRODUCT;
        const data = await axios.delete(baseAPIUrl+url, {
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
