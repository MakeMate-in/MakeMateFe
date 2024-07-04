import axios from "axios";
import { API_METHODS, baseAPIUrl, baseURL, OPEN_ROUTES } from "./../utils/constants";
import { getToken } from "./../utils/helper";
import { openNotificationWithIcon } from "./../utils/helper";

const RequestInstance = axios.create({
    baseURL: baseAPIUrl
});

const makeGetRequest = async (url, params, method) => {
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': getToken(),
            },
          params,
        });
        
        return response.data;  
      } 
    catch(error) {
        const err = new Error();
        console.log(error)
        if(error.response.status == 500) {
            err.msg = "Something went wrong!";
            err.status = 500;
            openNotificationWithIcon("error", err.msg);
        }
        else if(error.response.status == 502) {
            err.msg = "Cannot reach the servers at the moment, Please try agian later!";
            err.status = 500;
            openNotificationWithIcon("error", err.msg);
        }
        else if(error.response.data.errors){
            error.response.data.errors.forEach(error => {
                openNotificationWithIcon("error", error.msg);
                err.msg = error.msg;
                err.status = error.status;
            });
            window.location.href = baseURL + OPEN_ROUTES.CUSTOMER_DASHBOARD
        }
        else if(error.response.status == 404) {
            err.msg = "Could not find the resource!";
            err.status = 500;
            openNotificationWithIcon("error", err.msg);
        }
       throw error
    }
};


const makePostRequest = async (url, data, method, headers) => {
    try {
    //    let  headers= {
    //         'Authorization': 'Bearer ' + getToken(),
    //             ...headers
    //         }
        
      const response=  await axios.post(
                       baseAPIUrl + url,
                       data)
                       .then(apiResponse => {
                                const res = apiResponse.data
                                return res
                            })
                        .catch(function (err) {
                            console.error(err);
                        });
            return response;
        }
    catch(error) {
        const err = new Error();
        console.log(error)
        if(error.response.status == 500) {
            err.msg = "Something went wrong!";
            err.status = 500;
            // openNotificationWithIcon("error", err.msg);
        }
        else if(error.response.status == 502) {
            err.msg = "Cannot reach the servers at the moment, Please try agian later!";
            err.status = 500;
            // openNotificationWithIcon("error", err.msg);
        }
        else if(error.response.data.errors){
            error.response.data.errors.forEach(error => {
                // openNotificationWithIcon("error", error.msg);
                err.msg = error.msg;
                err.status = error.status;
            });
        }
        else if(error.response.status == 404) {
            err.msg = "Could not find the resource!";
            err.status = 500;
            // openNotificationWithIcon("error", err.msg);
        }
        throw err;    
    }
};


const makeDeketeRequest = async (url, data, method, headers) => {
    try {
        const requestConfig = {
            url: baseAPIUrl + url,
            method: method,
            body: data,
            headers: {
                'Authorization': 'Bearer ' + getToken(),
                ...headers
            }
        };
      const response=  await axios.get(baseAPIUrl + url,{
                                    params:data
                            }).then(apiResponse => {
                                const res = apiResponse.data
                                return res
                            })
                        .catch(function (err) {
                            console.error(err);
                        });
            return response;
        }
    catch(error) {
        const err = new Error();
        console.log(error)
        if(error.response.status == 500) {
            err.msg = "Something went wrong!";
            err.status = 500;
            // openNotificationWithIcon("error", err.msg);
        }
        else if(error.response.status == 502) {
            err.msg = "Cannot reach the servers at the moment, Please try agian later!";
            err.status = 500;
            // openNotificationWithIcon("error", err.msg);
        }
        else if(error.response.data.errors){
            error.response.data.errors.forEach(error => {
                // openNotificationWithIcon("error", error.msg);
                err.msg = error.msg;
                err.status = error.status;
            });
        }
        else if(error.response.status == 404) {
            err.msg = "Could not find the resource!";
            err.status = 500;
            // openNotificationWithIcon("error", err.msg);
        }
        throw err;    
    }
};

const makePutRequest = async (url, data, method, headers) => {
    try {
        const requestConfig = {
            url: baseAPIUrl + url,
            method: method,
            body: data,
            headers: {
                'Authorization': 'Bearer ' + getToken(),
                ...headers
            }
        };
      const response=  await axios.get(baseAPIUrl + url,{
                                    params:data
                            }).then(apiResponse => {
                                const res = apiResponse.data
                                return res
                            })
                        .catch(function (err) {
                            console.error(err);
                        });
            return response;
        }
    catch(error) {
        const err = new Error();
        console.log(error)
        if(error.response.status == 500) {
            err.msg = "Something went wrong!";
            err.status = 500;
            // openNotificationWithIcon("error", err.msg);
        }
        else if(error.response.status == 502) {
            err.msg = "Cannot reach the servers at the moment, Please try agian later!";
            err.status = 500;
            // openNotificationWithIcon("error", err.msg);
        }
        else if(error.response.data.errors){
            error.response.data.errors.forEach(error => {
                // openNotificationWithIcon("error", error.msg);
                err.msg = error.msg;
                err.status = error.status;
            });
        }
        else if(error.response.status == 404) {
            err.msg = "Could not find the resource!";
            err.status = 500;
            // openNotificationWithIcon("error", err.msg);
        }
        throw err;    
    }
};

export const requestHandler = {
    get: (url,data) => makeGetRequest(url, data, API_METHODS.GET),
    post: (url, data = {}) => makePostRequest(url, data, API_METHODS.POST),
    put: (url, data = {}) => makePutRequest(url, data, API_METHODS.PUT),
    delete: (url, data = {}) => makeDeketeRequest(url, data, API_METHODS.DELETE)
};