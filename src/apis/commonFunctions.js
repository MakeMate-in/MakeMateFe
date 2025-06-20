import { getOtp } from "./authentication."
import { baseAPIUrl, MESSAGES } from "../utils/constants"
import { AUTHEN_URLS } from "../utils/urls"
import { requestHandler } from "./requestHandler"


export const sendOTP = async (data,isEmail) => {
    try {
      let res = await getOtp(data,isEmail)
      return res
    }
    catch (err) {
      throw err
    }
  }


  export const getAllUserDetails = async (data) => {
    try {
        const url = AUTHEN_URLS.GET_ALL_USER_DETAILS
        const response = await requestHandler.get(baseAPIUrl + url, data);
        return response
    }
    catch (err) {
        console.log(err)
        throw err
    }
}

export const getAllDetailsCustomer = async (data) => {
  try {
      const url = AUTHEN_URLS.GET_COMPANY_DETAILS;
      const response = await requestHandler.get(baseAPIUrl + url, data);
      return response
  }
  catch (err) {
      console.log(err)
      throw err
  }
}


export const getMachineDetailsCustomer = async (data) => {
  try {
      const url =AUTHEN_URLS.GET_MACHINES_CUSTOMER;
      const response = await requestHandler.get(baseAPIUrl+url, data);
      return response
  }
  catch (err) {
      throw err
  }
}

export const getProductDetailsCustomer = async (data) => {
  try {
      const url = AUTHEN_URLS.GET_PRODUCT_CUSTOMER;
      const response = await requestHandler.get(baseAPIUrl+url, data);
      return response
  }
  catch (err) {
      throw err
  }
}

export const getSearchedProducts = async (data) => {
  try {
      const url =AUTHEN_URLS.SEARCH_PRODUCTS;
      const response = await requestHandler.get(baseAPIUrl+url, data);
      return response
  }
  catch (err) {
      throw err
  }
}


export const getSearchResults = async (data) => {
  try {
      const url =AUTHEN_URLS.SEARCH_FILTER;
      const response = await requestHandler.get(baseAPIUrl+url, data);
      return response
  }
  catch (err) {
      throw err
  }
}


export const getFilteredResults = async (data) => {
  try {
      const url =AUTHEN_URLS.FILTER_PRODUCTS;
      const response = await requestHandler.get(baseAPIUrl+url, data);
      return response
  }
  catch (err) {
      throw err
  }
}
