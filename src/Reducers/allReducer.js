import { AUTHEN_REDUX_CONSTANTS } from "../utils/reduxConstants";

const initialState = {
    progress:0
}

const allReducer = (state = initialState, action) => {
    switch (action.type){
        case AUTHEN_REDUX_CONSTANTS.SET_PROGRESS:{
            return {
                ...state,
                progress: action.payload
            }
        }
        default:
            return state;
    }
}

export default allReducer;
