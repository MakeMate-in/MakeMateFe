import { getOtp } from "./authentication."
import { MESSAGES } from "../utils/constants"


export const sendOTP = async (data,isEmail) => {
    try {
      let res = await getOtp(data,isEmail)
      return res
    }
    catch (err) {
      throw err
    }
  }