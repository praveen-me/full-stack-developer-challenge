import { SIGN_UP, LOG_IN, LOG_OUT } from "../actions/types";

const initState = {
};

export function authReducer(state = initState, action) {
  switch(action.type) {
    case SIGN_UP: return state;
  
    case LOG_IN: {
      const {userData} = action;
      return {
        ...state,
        ...userData
      }
    }

    case LOG_OUT: {
      return {}
    }

    default: return state;
  }
}

