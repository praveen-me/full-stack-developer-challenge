import {combineReducers} from 'redux';
import { authReducer } from './authReducer';
import storyReducer from './storyReducer';

// combining both reducers
const rootReducer = combineReducers({
  auth: authReducer,
  stories: storyReducer
});
export default rootReducer;