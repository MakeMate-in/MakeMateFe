import {combineReducers} from 'redux'
import allReducer from './allReducer';
import { ROOT_REDUX_CONSTANTS } from '../utils/reduxConstants';

const rootReducer = combineReducers({
    allReducer:allReducer,
})

const appReducer = (state, action) => {
    if (action.type === ROOT_REDUX_CONSTANTS.RESET_STORE) {
      state = undefined;
    }
    return rootReducer(state, action);
  };

export default appReducer;