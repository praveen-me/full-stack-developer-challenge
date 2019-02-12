import { SIGN_UP, LOG_IN } from "../actions/types";

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

    default: return state;
  }
}

