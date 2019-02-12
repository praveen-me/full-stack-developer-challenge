import {combineReducers} from 'redux';
import { authReducer } from './authReducer';

// combining both reducers
const rootReducer = combineReducers({
  auth: authReducer,
});
export default rootReducer;