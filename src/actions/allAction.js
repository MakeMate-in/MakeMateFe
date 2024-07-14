import { AUTHEN_REDUX_CONSTANTS } from "../utils/reduxConstants"

export const setProgress = (data) => {
   return {
    type: AUTHEN_REDUX_CONSTANTS.SET_PROGRESS,
    payload: data
   } 
}