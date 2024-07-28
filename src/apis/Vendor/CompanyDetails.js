import { requestHandler } from "./../requestHandler";
import { CERTIFICATES_URLS, COMPANY_DETAILS_URLS, PLANT_IMAGES_URLS } from './../../utils/urls'
import axios from 'axios'
import { OPEN_ROUTES, baseAPIUrl, baseURL } from "./../../utils/constants";
import { getToken } from "../../utils/helper";
import { errorValidator } from "../../utils/commons/validators";



export const getCompanyDetails = async (data) => {
    try {
        const url = COMPANY_DETAILS_URLS.GET_COMPANY_DETAILS
        const response = await requestHandler.get(baseAPIUrl + url, data);
        return response
    }
    catch (err) {
        throw err
    }
}

export const updateCompanyDetails = async (params, data) => {
    try {
        const url = COMPANY_DETAILS_URLS.UPDATE_COMPANY_DETAILS
        data = await axios.patch(baseAPIUrl + url, data, {
            headers: {
                'Authorization': getToken(),
            },
            params: params
        }).then((res) => {
            if (res.data) {
                return res.data;
            }
            else {
                return res
            }
        })
            .catch(err => {
                return err
            })
        return data
    }
    catch (err) {
        throw err
    }

}

export const updateAddressandContacts = async (params, data) => {
    try {
        const url = COMPANY_DETAILS_URLS.UPDATE_COMPANY_DETAILS_ARRAY
        let resp = await axios.patch(baseAPIUrl + url, data, {
            headers: {
                'Authorization': getToken(),
            },
            params: params
        }).then((res) => {
            return res.data;
        })
            .catch(err => {
                if (err.response.status == 401) {
                    errorValidator(err)
                }
                else {
                    return err
                }
            })
        return resp
    }
    catch (err) {
        throw err
    }

}

export const deleteElement = async (params, data) => {
    try {
        data.params = params
        const url = COMPANY_DETAILS_URLS.REMOVE_COMPANY_DETAILS_ARRAY_ELEMENT
        data = await axios.delete(baseAPIUrl + url, {
            headers: {
                'Authorization': getToken(),
            },
            params:data
        }).then((res) => {
            return res.data;
        })
            .catch(err => {
                if (err.response.status == 401) {
                    console.log(err)
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

export const updateElement = async (params, data) => {
    try {
        data.params = params
        const url = COMPANY_DETAILS_URLS.UPDATE_COMPANY_DETAILS_ARRAY_ELEMENT
        data = await axios.patch(baseAPIUrl + url, data, {
            headers: {
                'Authorization': getToken(),
            },
            params: params
        }).then((res) => {
            return res.data;
        })
            .catch(err => {
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

export const uploadAvatar = (async (file, user) => {
    const url = COMPANY_DETAILS_URLS.UPLOAD_AVATAR;
    const headers = {
        'Authorization': getToken(),
        'Content-Type': ' multipart/form-data;',
    }
    const params = {
        user: user
    }
    let data = {}
    data.file = file;
    let res = await axios.post(
        baseAPIUrl + url, data,
        {
            headers: headers,
            params: params

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

export const uploadCertificate = async (company_id, file) => {
    const url = CERTIFICATES_URLS.UPLOAD_CERTIFICATE;
    const headers = {
        'Authorization': getToken(),
        'Content-Type': ' multipart/form-data;',
    }
    const params = {
        company_id: company_id
    }
    let data = {}
    data.file = file;
    let res = await axios.post(
        baseAPIUrl + url, data,
        {
            headers: headers,
            params: params

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

export const getCertificates = async (company_id) => {
    const url = CERTIFICATES_URLS.GET_CERTIFICATES;
    const headers = {
        'Authorization': getToken(),
    }
    const params = {
        company_id: company_id
    }
    let res = await axios.get(
        baseAPIUrl + url,
        {
            headers: headers,
            params: params

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

export const deleteCertificates = async (company_id, file) => {
    const url = CERTIFICATES_URLS.DELETE_CERTIFICATES;
    const headers = {
        'Authorization': getToken(),
        'Content-Type': ' multipart/form-data;',
    }
    const params = {
        company_id: company_id
    }
    let data = {}
    data.file = file;
    let res = await axios.post(
        baseAPIUrl + url, data,
        {
            headers: headers,
            params: params

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

export const uploadPlantImages = async (company_id, file) => {
    const url = PLANT_IMAGES_URLS.UPLOAD_IMAGE;
    const headers = {
        'Authorization': getToken(),
        'Content-Type': ' multipart/form-data;',
    }
    const params = {
        company_id: company_id
    }
    let data = {}
    data.file = file;
    let res = await axios.post(
        baseAPIUrl + url, data,
        {
            headers: headers,
            params: params

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

export const getPlantImages = async (company_id) => {
    const url = PLANT_IMAGES_URLS.GET_IMAGES;
    const headers = {
        'Authorization': getToken(),
        // 'Content-Type':' multipart/form-data;',
    }
    const params = {
        company_id: company_id
    }
    let res = await axios.get(
        baseAPIUrl + url,
        {
            headers: headers,
            params: params

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

export const deletePlantImages = async (company_id, file) => {
    const url = PLANT_IMAGES_URLS.DELETE_IMAGES;
    // const authToken = getAccessToken();
    const headers = {
        'Authorization': getToken(),
        'Content-Type': ' multipart/form-data;',
    }
    const params = {
        company_id: company_id
    }
    let data = {}
    data.file = file;
    let res = await axios.post(
        baseAPIUrl + url, data,
        {
            headers: headers,
            params: params

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

export const getAllDetails = async (data) => {
    try {
        const url = COMPANY_DETAILS_URLS.GET_ALL_DETAILS;
        const response = await requestHandler.get(baseAPIUrl + url, data);
        return response
    }
    catch (err) {
        console.log(err)
        throw err
    }
}

export const updatePrimaryAddressContacts = async (params, data) => {
    try {
        const url = COMPANY_DETAILS_URLS.UPDATE_PRIMARY_DETAILS
        data = await axios.patch(baseAPIUrl + url, data, {
            headers: {
                'Authorization': getToken(),
            },
            params: params
        }).then((res) => {
            return res.data;
        })
            .catch(err => {
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
