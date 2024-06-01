import { requestHandler } from "./../requestHandler";
import { INFRA_DETAILS_URL} from "../../utils/urls";
import axios from 'axios'
import { baseAPIUrl } from "./../../utils/constants";

export const getInfraDetails = async (company_id) => {
    try{
        const url = INFRA_DETAILS_URL.GET_INFRA_DETAILS;
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

export const updateInfraDetails = async (company_id,plant_area,assembly_area,no_of_assembly_table,manpower,designation,total_count,name,surface_table,CMM,crane_tonnage) => {
    try {
        const data = {
            company_id: company_id,
            plant_area: plant_area,
            assembly_area: assembly_area,
            no_of_assembly_table: no_of_assembly_table,
            manpower : [{
                designation: designation,
                total_count: total_count
            }],
            design_softwares :[{
                name: name
            }],
            surface_table: surface_table,
            CMM: CMM,
            crane_tonnage: crane_tonnage
        }
        const url = INFRA_DETAILS_URL.UPDATE_INFRA_DETAILS
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

export const addInfraDetails = async (company_id,plant_area,assembly_area,no_of_assembly_table,manpower,designation,total_count,name,surface_table,CMM,crane_tonnage) => {
    try {
        const data = {
            company_id: company_id,
            plant_area: plant_area,
            assembly_area: assembly_area,
            no_of_assembly_table: no_of_assembly_table,
            manpower : [{
                designation: designation,
                total_count: total_count
            }],
            design_softwares :[{
                name: name
            }],
            surface_table: surface_table,
            CMM: CMM,
            crane_tonnage: crane_tonnage
        }
        const url = INFRA_DETAILS_URL.ADD_INFRA_DETAILS;
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

export const deleteInfraDetails = async (company_id) => {
    try {
        const url = INFRA_DETAILS_URL.DELETE_INFRA_DETAILS;
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


