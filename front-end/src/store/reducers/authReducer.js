import { SIGN_UP } from "../actions/types";

const initState = {
  userData: {}
}

export function authReducer(state = initState, action) {
  switch(action.type) {
    case SIGN_UP: return state;
    
    default: return state;
  }
}


