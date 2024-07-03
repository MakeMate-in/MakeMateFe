import { requestHandler } from "./../requestHandler";
import { PRODUCT_DETAILS_URL} from "../../utils/urls";
import axios from 'axios'
import { baseAPIUrl } from "./../../utils/constants";
import { getToken } from "../../utils/helper";

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
        data = await axios.patch(
            baseAPIUrl+url,
            data,
            {
                headers: {
                    'Authorization': getToken(),
                }
            }
        )
            .then((res)=>{
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

export const addProductDetails = async (params,data) => {
    try {
        const url = PRODUCT_DETAILS_URL.CREATE_PRODUCT
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

export const deleteProductDetails = async (params) => {
    try {
        const url = PRODUCT_DETAILS_URL.DELETE_SINGLE_PRODUCT;
        const data = await axios.delete(baseAPIUrl+url, {
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



export const uploadToolImages = async (id, file) => {
    const url = PRODUCT_DETAILS_URL.UPLOAD_TOOL_IMAGE;
    // const authToken = getAccessToken();
    const headers = {
        'Authorization': getToken(),
        'Content-Type':' multipart/form-data;',
      }
    const params={
        product_id:id
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
    .catch((err) =>  {
        if (err.response.status == 401) {
            errorValidator(err)
        }
        else {
            return err
        }
    })
    return res;
}



export const uploadProductImages = async (id, file) => {
    const url = PRODUCT_DETAILS_URL.UPLOAD_PRODUCT_IMAGE;
    // const authToken = getAccessToken();
    const headers = {
        'Authorization': getToken(),
        'Content-Type':' multipart/form-data;',
      }
    const params={
        product_id:id
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
    .catch((err) =>  {
        if (err.response.status == 401) {
            errorValidator(err)
        }
        else {
            return err
        }
    })
    return res;
}
