import { requestHandler } from "./../requestHandler";
import { PRODUCT_DETAILS_URL} from "../../utils/urls";
import axios from 'axios'
import { baseAPIUrl } from "./../../utils/constants";
import { getToken } from "../../utils/helper";
import { errorValidator } from "../../utils/commons/validators";

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

export const updateProductDetails = async (params,data) => {
    try {
        const url = PRODUCT_DETAILS_URL.UPDATE_PRODUCT
       let response = await axios.patch(
            baseAPIUrl+url,
            data,
            {
                headers: {
                    'Authorization': getToken(),
                },
                params: params
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
        return response
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


export const addProductReview = (async (data) => {
    const url = PRODUCT_DETAILS_URL.ADD_REVIEWS;
    const headers = {
        'Authorization': getToken(),
    }

    let res = await axios.post(
        baseAPIUrl + url, data,
        {
            headers: headers

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
})