import { getOtp } from "./authentication."
import { MESSAGES } from "../utils/constants"


export const sendOTP = async (mobile_no) => {
    try {
      let res = await getOtp(mobile_no)
      return res
    }
    catch (err) {
      throw err
    }
  }